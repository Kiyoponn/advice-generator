import { useEffect, useState } from 'react'

export default function Divider() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 500)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 500)
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  return (
    <>
      {isDesktop ? (
        <img
          id='divider'
          src='/pattern-divider-desktop.svg'
          className='m:0|auto'
          alt='divider'
        />
      ) : (
        <img
          id='divider'
          src='/pattern-divider-mobile.svg'
          className='m:0|auto'
          alt='divider'
        />
      )}
    </>
  )
}
