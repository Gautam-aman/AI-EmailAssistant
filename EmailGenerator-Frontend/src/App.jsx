import { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from '@mui/material'
import { motion } from 'framer-motion'

function App() {
  const [emailContent, setEmailContent] = useState("")
  const [tone, setTone] = useState("")
  const [generatedReply, setGeneratedReply] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const backendurl =import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.post(`${backendurl}`, {
        emailContent,
        tone,
      })
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2)
      )
    } catch (err) {
      console.error(err)
      setError("⚠️ Failed to generate reply. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 5,
              borderRadius: 5,
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              align="center"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(45deg, #2196f3, #21cbf3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 4,
              }}
            >
              ✨ Email Reply Generator
            </Typography>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                label="📩 Original Email Content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="tone-label">🎭 Tone (Optional)</InputLabel>
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
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #2196f3, #21cbf3)",
                  boxShadow: "0px 4px 12px rgba(33, 150, 243, 0.4)",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)", boxShadow: "0px 6px 16px rgba(33, 150, 243, 0.6)" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "🚀 Generate Reply"}
              </Button>
            </motion.div>

            {error && (
              <Typography color="error" sx={{ mt: 3 }}>
                {error}
              </Typography>
            )}

            {generatedReply && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Box mt={4}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
                  >
                    ✅ Generated Reply
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
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      borderRadius: 3,
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        bgcolor: "primary.light",
                        color: "#fff",
                      },
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(generatedReply)
                    }}
                  >
                    📋 Copy to Clipboard
                  </Button>
                </Box>
              </motion.div>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default App
