const NVIDIA_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const apiKey = process.env.NVIDIA_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'NVIDIA_API_KEY is not configured' })
    return
  }

  try {
    const response = await fetch(NVIDIA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
      body: JSON.stringify(req.body),
    })

    // For streaming, pipe the response directly
    if (req.body.stream) {
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')
      
      const reader = response.body?.getReader()
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          res.write(value)
        }
      }
      res.end()
    } else {
      const responseBody = await response.text()
      res.status(response.status).send(responseBody)
    }
  } catch (error) {
    console.error('NVIDIA proxy request failed', error)
    res.status(502).json({ error: 'Unable to reach NVIDIA API' })
  }
}