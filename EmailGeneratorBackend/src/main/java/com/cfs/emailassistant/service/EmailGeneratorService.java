package com.cfs.emailassistant.service;

import com.cfs.emailassistant.dto.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.PriorityOrdered;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;


@Data
@Service
public class EmailGeneratorService {
    private final WebClient webClient;


    @Value("${gemini.api.url}")
    private String GeminiAPIURL;

    @Value("${gemini.api.key}")
    private String GeminiAPIKEY;


    public EmailGeneratorService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }


    public String generateEmailReply(EmailRequest emailRequest) {
        // Build the prompt

        String prompt = buildPrompt(emailRequest);
        
        // Craft the request
         Map<String , Object> requestBody = Map.of(
                 "contents" , new Object[] {
                      Map.of("parts" , new Object[]{
                            Map.of("text" , prompt)
                     })
                 }
         );


         // Do request and get response
        String Response = webClient.post()
                .uri(GeminiAPIURL + GeminiAPIKEY)
                .header("Content-type" , "application/json")
                .bodyValue( requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Time to return Response Extract
        return ExtractResponseContent(Response);

    }

    private String ExtractResponseContent(String response) {

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
             return rootNode.path("candidates")
                     .get(0)
                     .path("content")
                     .path("parts").get(0).path("text").asText();
        } catch(Exception e){
            return "Error processing request" + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a profession mail reply for this content, Please dont add subject line");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Tone will be ").append(emailRequest.getTone());
        }

        prompt.append("\n Original Email : \n") .append(emailRequest.getEmailContent());
        return prompt.toString();

    }
}
