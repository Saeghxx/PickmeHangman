import { useState } from 'react'
import { WORDS } from './data/words'
import HeartsDisplay from './components/HeartsDisplay'
import Character from './components/Character'
import Keyboard from './components/Keyboard'
import WordDisplay from './components/WordDisplay'

function getRandom() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export default function App() {
  const [current, setCurrent] = useState(getRandom())
  const [guessed, setGuessed] = useState([])

  const word = current.word
  const theme = current.theme

  const wrong = guessed.filter(l => !word.includes(l)).length
  const isWin = word.split('').every(l => guessed.includes(l))
  const isLose = wrong >= 6

  const guess = (letter) => {
    if (!guessed.includes(letter) && !isWin && !isLose) {
      setGuessed(prev => [...prev, letter])
    }
  }

  const newGame = () => {
    setCurrent(getRandom())
    setGuessed([])
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>

      <h1 style={{ fontWeight: 300 }}>✧ PICKME HANGMAN ✧</h1>

      <div className="theme">
        Theme: {theme}
      </div>

      <Character wrong={wrong} />

      <HeartsDisplay wrongGuesses={wrong} />

      <WordDisplay 
        word={word}
        guessed={guessed}
        revealed={isLose}
      />

      <Keyboard
        guessed={guessed}
        word={word}
        onGuess={guess}
        disabled={isWin || isLose}
      />

      {isWin && <div className="status">♥ YOU WIN! ♥</div>}
      {isLose && (
        <div className="status">
          Game over! The word was: {word}
        </div>
      )}

      {(isWin || isLose) && (
        <button
          onClick={newGame}
          style={{
            marginTop: '10px',
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