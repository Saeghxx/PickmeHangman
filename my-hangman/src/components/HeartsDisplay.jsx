import { motion } from 'framer-motion'

export default function HeartsDisplay({ lives, maxLives }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      {Array.from({ length: maxLives }).map((_, index) => {
        const isAlive = index < lives

        return (
          <motion.span
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{
              fontSize: '30px',
            }}
          >
            <span
              style={{
                color: isAlive ? '#ff4d6d' : '#444',
                textShadow: isAlive ? '0 0 10px #ff4d6d' : 'none',
              }}
            >
              ♥
            </span>
          </motion.span>
        )
      })}
    </div>
  )
}