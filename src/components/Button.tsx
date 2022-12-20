import { useState } from 'react'
import { Oval } from 'react-loading-icons'

export default function Button({ API_KEY }: { API_KEY: string }) {
  const [loading, setLoading] = useState(false)

  const generateAdvice = async () => {
    const adviceFor = [
      'sad',
      'angry',
      'bored',
      'lonely',
      'worried',
      'unhappy',
      'anxious',
      'stressed',
      'depressed',
      'demotivated'
    ]

    const index = Math.floor(Math.random() * adviceFor.length)

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Generate advice for someone feeling ${adviceFor[index]} in 16 words or less.`,
        max_tokens: 128,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    const data = await response.json()
    const advice: string = data.choices[0].text
      .split('\n')
      .filter((line: string) => line !== '')
      .map((line: string) => line.replace(/^[0-9]+\. /, ''))
      .splice(0, 1)
      .join('')

    return advice
  }

  const getAdvice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setLoading(true)
    generateAdvice().then((advice) => {
      document.getElementById('advice')!.innerHTML = `"${advice}"`
      const adviceno = Math.floor(Math.random() * 998)
      document.getElementById(
        'adviceno'
      )!.innerHTML = `Advice #${adviceno.toString()}`
      setLoading(false)
    })
  }

  return (
    <button
      onClick={(e) => getAdvice(e)}
      className='r:100% w:60 h:60 bg:neon-green m:0|auto bottom:0 flex ai:center jc:center shadow:3|3|30|neon-green:hover shadow:none:disabled cursor:progress:disabled'
      type='submit'
      disabled={loading}
    >
      {loading ? (
        <Oval height={24} width={24} stroke={'#202733'} />
      ) : (
        <img src='/icon-dice.svg' alt='dice' />
      )}
    </button>
  )
}
