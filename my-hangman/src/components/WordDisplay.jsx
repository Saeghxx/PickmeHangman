export default function WordDisplay({ word, guessed, revealed }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '12px 0'
      }}
    >
      {word.split('').map((l, i) => {
        const visible = guessed.includes(l) || revealed;
        const wrong = revealed && !guessed.includes(l);

        return (
          <div
            key={i}
            style={{
              width: '32px',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                fontSize: '1.4rem',
                fontFamily: 'Silkscreen, monospace',
                color: wrong ? '#ff4444' : '#ffe0ec',
                opacity: visible ? 1 : 0,
                transform: visible
                  ? 'translateY(0)'
                  : 'translateY(-8px)',
                transition: '0.2s ease',
                height: '28px'
              }}
            >
              {visible ? l : ''}
            </div>

            {/* полоска */}
            <div
              style={{
                height: '3px',
                background: '#5a2a5a',
                borderRadius: '999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: visible ? '100%' : '0%',
                  height: '100%',
                  background: wrong ? '#ff4444' : '#ff69b4',
                  transition:
                    'width 0.35s ease-in-out, background 0.2s ease'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}