import { useState, useEffect } from 'react'
import HeartsDisplay from './components/HeartsDisplay'
import Character from './components/Character'
import Keyboard from './components/Keyboard'
import WordDisplay from './components/WordDisplay'

export default function App() {
  const [current, setCurrent] = useState(null)
  const [guessed, setGuessed] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchWord = async () => {
  setGuessed([])
  setCurrent(null)
  try {
    const res = await fetch("http://localhost:3001/words/random")
    const data = await res.json()
    setCurrent(data)
  } catch (err) {
    console.log("Error:", err)
  }
}

  useEffect(() => {
    fetchWord()
  }, [])

  if (!current?.word) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

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

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>✧ PICKME HANGMAN ✧</h1>
      <div style={{ marginBottom: '10px', color: '#ffb6f2' }}>
        Theme: {theme}
      </div>
      <Character wrong={wrong} />
      <HeartsDisplay wrongGuesses={wrong} />
      <WordDisplay word={word} guessed={guessed} revealed={isLose} />
      <Keyboard guessed={guessed} word={word} onGuess={guess} disabled={isWin || isLose} />
      {isWin && <div>♥ YOU WIN! ♥</div>}
      {isLose && <div>Game over! The word was: {word}</div>}
      {(isWin || isLose) && (
        <button
  onClick={fetchWord}
  style={{
    marginTop: '12px',
    padding: '10px 28px',
    background: '#3d1a3d',
    border: '2px solid #ff69b4',
    borderRadius: '6px',
    color: '#ffb6c1',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontFamily: 'Silkscreen, monospace',
    letterSpacing: '1px',
    boxShadow: '0 0 14px rgba(255,105,180,0.5)',
  }}
>
  ✦ NEW GAME ✦
</button>
      )}
    </div>
  )
}