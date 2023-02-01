import { useState } from 'react'
import { Oval } from 'react-loading-icons'

export default function Button() {
  const [loading, setLoading] = useState(false)

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
    'demotivated',
  ]

  const index = Math.floor(Math.random() * adviceFor.length)

  const prompt = `Generate advice for someone feeling ${adviceFor[index]} in 16 words or less.`

  const getAdvice = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch('/api/advice.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    let advice = await response.json()
    advice = advice.text

    // TODO: Try streaming with edge functions

    document.getElementById('advice')!.innerHTML = `"${advice}"`
    const adviceno = Math.floor(Math.random() * 998)
    document.getElementById(
      'adviceno'
    )!.innerHTML = `Advice #${adviceno.toString()}`

    setLoading(false)
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
