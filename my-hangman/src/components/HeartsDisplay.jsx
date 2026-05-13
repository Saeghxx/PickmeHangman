import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const MAX_LIVES = 6

export default function HeartsDisplay({ wrongGuesses }) {
  const livesLeft = MAX_LIVES - wrongGuesses

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      marginTop: '10px'
    }}>
      {Array.from({ length: MAX_LIVES }).map((_, i) => (
        <motion.div
          key={i}
          animate={
            i < livesLeft
              ? { scale: [1, 1.2, 1], opacity: 1 }
              : { scale: 0.8, opacity: 0.3 }
          }
          transition={
            i < livesLeft
              ? { duration: 1.2, repeat: Infinity, delay: i * 0.1 }
              : { duration: 0.3 }
          }
        >
          <Heart
            style={{
              width: '30px',
              height: '30px',
              color: i < livesLeft ? '#fb71cd' : '#4c0536',
              fill: i < livesLeft ? '#fb71cd' : 'transparent',
              filter: i < livesLeft
                ? 'drop-shadow(0 0 6px rgba(244,114,182,0.7))'
                : 'none'
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}