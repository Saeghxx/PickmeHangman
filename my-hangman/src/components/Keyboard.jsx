import { motion } from 'framer-motion'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

let audioCtx = null
function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}
function beep(freq, duration, type = 'square', vol = 0.25) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.connect(gain); gain.connect(c.destination)
  osc.type = type; osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.start(); osc.stop(c.currentTime + duration)
}
function playKey() { beep(660, 0.07) }
function playWrong() { beep(180, 0.35, 'sawtooth') }

export default function Keyboard({ guessed, word, onGuess, disabled }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '6px',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      {LETTERS.map((l, i) => {
        const isCorrect = guessed.includes(l) && word.includes(l)
        const isWrong = guessed.includes(l) && !word.includes(l)
        const isUsed = guessed.includes(l)

        return (
          <motion.button
            key={l}
            initial={{ opacity: 0 }}
            animate={
              isCorrect
                ? { opacity: 1, backgroundColor: '#ff69b4' }
                : isWrong
                ? { opacity: 0.3, backgroundColor: '#2a0f2a' }
                : { opacity: 1 }
            }
            transition={{ delay: isUsed ? 0 : i * 0.02, duration: 0.3 }}
            whileHover={!isUsed && !disabled ? { scale: 1.1, backgroundColor: '#ff69b4', color: '#fff' } : {}}
            whileTap={!isUsed && !disabled ? { scale: 0.9 } : {}}
            onClick={() => {
              if (!isUsed && !disabled) {
                onGuess(l)
                word.includes(l) ? playKey() : playWrong()
              }
            }}
            disabled={isUsed || disabled}
            style={{
              width: '43px',
              height: '45px',
              background: isCorrect ? '#ff69b4' : '#3d1a3d',
              border: `2px solid ${isCorrect ? '#ff1493' : '#ff69b4'}`,
              color: isCorrect ? 'white' : '#ffb6c1',
              fontFamily: 'Silkscreen, monospace',
              fontSize: '0.7rem',
              cursor: isUsed ? 'not-allowed' : 'pointer',
              borderRadius: '6px',
              boxShadow: isCorrect ? '0 0 14px rgba(255,105,180,0.7)' : 'none',
            }}
          >
            {l}
          </motion.button>
        )
      })}
    </div>
  )
}