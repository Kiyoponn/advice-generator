import type { APIRoute } from 'astro'

export const post: APIRoute = async ({ request }) => {
  const { prompt } = (await request.json()) as {
    prompt?: string
  }

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 })
  }

  const payload = {
    model: 'text-davinci-003',
    prompt,
    max_tokens: 128,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
    n: 1,
  }

  if (!import.meta.env.OPENAI_API_KEY) {
    return new Response('No OpenAI API key found', { status: 500 })
  }

  const response = await fetch('https://api.openai.com/v1/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const json = await response.json()
  const text: string = json.choices[0].text.replace(/\n/g, '')

  return {
    body: JSON.stringify({
      text,
    }),
  }
}
