export default function WordDisplay({ word, guessed, revealed }) {

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '12px 0'
    }}>

      {word.split('').map((l, i) => {
        const visible = guessed.includes(l) || revealed
        const wrong = revealed && !guessed.includes(l)

        return (
          <div key={i} style={{ width: '32px', textAlign: 'center' }}>

            <div style={{
              fontSize: '1.4rem',
              fontFamily: 'Silkscreen, monospace',
              color: wrong ? '#ff4444' : '#ffe0ec',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-8px)',
              transition: '0.2s ease'
            }}>
              {l}
            </div>

            <div style={{
              height: '3px',
              background: visible ? '#ff69b4' : '#5a2a5a',
              transition: '0.2s ease'
            }} />

          </div>
        )
      })}
    </div>
  )
}