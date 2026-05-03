import { useState } from 'react'
import Character from './components/Character'

const WORDS = [
  "JAVASCRIPT", "REACT", "FUNCTION", "VARIABLE",
  "COMPONENT", "DEVELOPER", "ALGORITHM", "OBJECT",
  "ARRAY", "ASYNC", "PROMISE", "DEBUG"
]

function getRandom() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export default function App() {
  const [word, setWord] = useState(getRandom)
  const [guessed, setGuessed] = useState([])

  const wrong = guessed.filter(l => !word.includes(l)).length
  const isWin = word.split('').every(l => guessed.includes(l))
  const isLose = wrong >= 6

  const guess = (letter) => {
    if (!guessed.includes(letter) && !isWin && !isLose) {
      setGuessed([...guessed, letter])
    }
  }

  const newGame = () => {
    setWord(getRandom())
    setGuessed([])
  }


  return (
  <div style={{ textAlign: 'center', padding: '40px' }}>
   <h1 style={{ fontWeight: 300 }}>PICKME HANGMAN</h1>
    <Character wrong={wrong} />

     <p style={{ marginBottom: '10px' }}>Errors: {wrong} / 6</p>

      <div className="word">
        {word.split('').map((l, i) => (
          <span key={i}>{guessed.includes(l) ? l : '_'}</span>
        ))}
      </div>

      <div className="keyboard">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
          <button key={l} onClick={() => guess(l)} disabled={guessed.includes(l)}>
            {l}
          </button>
        ))}
      </div>

      {isWin && <div className="status">♥ YOU WIN! ♥</div>}
      {isLose && <div className="status">Game over! The word was: {word}</div>}

      {(isWin || isLose) && (
        <button
          onClick={newGame}
          style={{
            marginTop: '20px',
            padding: '12px 30px',
            background: '#ff69b4',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontFamily: 'Silkscreen, monospace',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          NEW GAME
        </button>
      )}
    </div>
  )
}