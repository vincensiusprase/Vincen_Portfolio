const GLM_ENDPOINT = 'https://api.z.ai/api/paas/v4/chat/completions'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const apiKey = process.env.GLM_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'GLM_API_KEY is not configured' })
    return
  }

  try {
    const response = await fetch(GLM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    })

    const responseBody = await response.text()
    res.status(response.status).send(responseBody)
  } catch (error) {
    console.error('GLM proxy request failed', error)
    res.status(502).json({ error: 'Unable to reach GLM API' })
  }
}
