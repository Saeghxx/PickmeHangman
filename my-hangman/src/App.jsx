import { useState, useEffect, useRef } from 'react'
import HeartsDisplay from './components/HeartsDisplay'
import Character from './components/Character'
import Keyboard from './components/Keyboard'
import WordDisplay from './components/WordDisplay'
import MusicButton from './components/MusicButton'
import GhostPet from './components/GhostPet'
import StatsPanel from './components/StatsPanel'

let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

function beep(freq, duration, type = 'square', vol = 0.25) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.connect(gain)
  gain.connect(c.destination)
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.start()
  osc.stop(c.currentTime + duration)
}

function playWin() {
  beep(523, 0.12)
  setTimeout(() => beep(659, 0.12), 130)
  setTimeout(() => beep(784, 0.12), 260)
  setTimeout(() => beep(1047, 0.3), 390)
}

function playLose() {
  beep(330, 0.18, 'sawtooth')
  setTimeout(() => beep(250, 0.18, 'sawtooth'), 200)
  setTimeout(() => beep(180, 0.35, 'sawtooth'), 400)
}

export default function App() {
  const [current, setCurrent] = useState(null)
  const [guessed, setGuessed] = useState([])
  const [playing, setPlaying] = useState(false)
  const [gameKey, setGameKey] = useState(0)
  const [lastGuessCorrect, setLastGuessCorrect] = useState(null)
  const [difficulty, setDifficulty] = useState('easy')
  const audioRef = useRef(null)
  const difficultyRef = useRef('easy')

  useEffect(() => {
    const audio = new Audio('/music_for_videos-baby-shark-122769.mp3')
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.then(() => setPlaying(true)).catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [playing])

  useEffect(() => { fetchWord() }, [])

  const word = current?.word ?? ''
  const theme = current?.theme ?? ''
  const wrong = guessed.filter(l => !word.includes(l)).length
  const isWin = word.length > 0 && word.split('').every(l => guessed.includes(l))
  const isLose = wrong >= 6

  useEffect(() => {
    if (isWin) playWin()
    if (isLose) playLose()
  }, [isWin, isLose])

 const handleDifficultyChange = (d) => {
  setDifficulty(d)
  difficultyRef.current = d
  fetchWord()  
}

  const fetchWord = async () => {
    setGameKey(k => k + 1)
    setGuessed([])
    setLastGuessCorrect(null)
    setCurrent(null)
    try {
      const res = await fetch(`http://localhost:3001/words/random?difficulty=${difficultyRef.current}`)
      const data = await res.json()
      setCurrent(data)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const guess = (letter) => {
    if (guessed.includes(letter) || isWin || isLose) return
    setGuessed(prev => [...prev, letter])
    setLastGuessCorrect(word.includes(letter))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase()
      if (/^[A-Z]$/.test(key)) guess(key)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [guessed, isWin, isLose, word])

  if (!current?.word) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  return (
    <>
      <MusicButton playing={playing} setPlaying={setPlaying} audioRef={audioRef} />
      <StatsPanel
        isWin={isWin}
        isLose={isLose}
        gameKey={gameKey}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      <GhostPet isWin={isWin} isLose={isLose} wrongGuesses={wrong} lastGuessCorrect={lastGuessCorrect} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '16px' }}>
        <h1>✧ PICKME HANGMAN ✧</h1>
        <div style={{ marginBottom: '10px', color: '#ffb6f2' }}>
          Theme: {theme}
        </div>
        <Character wrong={wrong} />
        <HeartsDisplay wrongGuesses={wrong} />
        <WordDisplay word={word} guessed={guessed} revealed={isLose} />
        <Keyboard guessed={guessed} word={word} onGuess={guess} disabled={isWin || isLose} />
        {isWin && <div style={{ color: '#ff69b4', marginTop: '8px' }}>♥ YOU WIN! ♥</div>}
        {isLose && <div style={{ color: '#ff4444', marginTop: '8px' }}>Game over! The word was: {word}</div>}
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
    </>
  )
}