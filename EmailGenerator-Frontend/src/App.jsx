import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

function App() {
  const [emailContent, setEmailContent] = useState("")
  const [tone, setTone] = useState("")
  const [generatedReply, setGeneratedReply] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    try {
      // API call
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
      })

      // Assume backend returns a string reply
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2) // formatted JSON
      )
    } catch (err) {
      console.error(err)
      setError("Failed to generate reply. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tone-label">Tone (Optional)</InputLabel>
          <Select
            labelId="tone-label"
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="casual">Informal</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !emailContent}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Generated Reply
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply}
            inputProps={{ readOnly: true }}
          />

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => {
              navigator.clipboard.writeText(generatedReply)
            }}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default App
