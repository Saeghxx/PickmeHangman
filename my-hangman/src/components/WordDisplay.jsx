import { useState, useEffect } from 'react'

export default function WordDisplay({ word, guessed, revealed }) {
  const [shown, setShown] = useState({})

  //скидання при новому слові
  useEffect(() => {
    setShown({})
  }, [word])

  //анімація відкриття букв
  useEffect(() => {
    word.split('').forEach((l, i) => {
      if (guessed.includes(l) || revealed) {
        setTimeout(() => {
          setShown(prev => ({ ...prev, [i]: true }))
        }, i * 60)
      }
    })
  }, [guessed, revealed, word])

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '24px 0'
    }}>
      {word.split('').map((l, i) => {
        const visible = shown[i]
        const isWrong = revealed && !guessed.includes(l)

        return (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '32px'
          }}>
            
            <div style={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                fontSize: '1.8rem',
                fontFamily: 'Silkscreen, monospace',
                color: isWrong ? '#ff4444' : '#ffe0ec',
                textShadow: isWrong
                  ? '0 0 10px #ff4444'
                  : '0 0 10px rgba(255,105,180,0.7)',
                opacity: visible ? 1 : 0,
                transform: visible
                  ? 'translateY(0)'
                  : 'translateY(-12px)',
                transition: 'all 0.25s ease'
              }}>
                {l}
              </span>
            </div>

            <div style={{
              width: '32px',
              height: '3px',
              borderRadius: '2px',
              background: visible ? '#ff69b4' : '#5a2a5a',
              boxShadow: visible
                ? '0 0 8px rgba(255,105,180,0.6)'
                : 'none',
              transition: 'all 0.25s ease'
            }} />
          </div>
        )
      })}
    </div>
  )
}