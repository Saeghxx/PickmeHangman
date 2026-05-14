import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const PIXEL_SIZE = 8

const PALETTE = {
  b: '#ffb6c1',
  d: '#ff69b4',
  e: '#ff1493',
  p: '#ffd6e7',
  w: '#ffffff',
  r: '#ff4444',
  y: '#ffe066',
}

const bodyPixels = [
  [null,'d','d',null,null,null,null,null,null,null,null,null,'d','d',null,null],
  ['d','b','b','d',null,null,null,null,null,null,null,'d','b','b','d',null],
  ['d','b','b','b','d','d','d','d','d','d','d','b','b','b','d',null],
  [null,'d','b','b','b','b','b','b','b','b','b','b','b','d',null,null],
  [null,'d','b','b','b','b','b','b','b','b','b','b','b','d',null,null],
  [null,'d','b','b','b','b','b','b','b','b','b','b','b','d',null,null],
  [null,null,'d','b','b','b','b','b','b','b','b','b','d',null,null,null],
  [null,null,'d','b','b','b','b','b','b','b','b','b','d',null,null,null],
  [null,null,'d','b','b','b','b','b','b','b','b','b','d',null,null,null],
  [null,null,'d','b','b','b','b','b','b','b','b','b','d',null,null,null],
  [null,null,'d','b','b','b','b','b','b','b','b','b','d',null,null,null],
  [null,null,'d','b','b','b','b','b','b','b','b','b','d',null,null,null],
  [null,null,null,'d','b','b','b','b','b','b','b','d',null,null,null,null],
  [null,null,null,'d','b','d',null,null,null,'d','b','d',null,null,null,null],
  [null,null,null,'d','d',null,null,null,null,null,'d','d',null,null,null,null],
]

function getEyes(mood) {
  switch (mood) {
    case 'happy':
    case 'win':
      return [
        { x: 4, y: 5, char: '▲', color: PALETTE.e },
        { x: 9, y: 5, char: '▲', color: PALETTE.e },
      ]

    case 'sad':
      return [
        { x: 4, y: 5, char: '▼', color: PALETTE.r },
        { x: 9, y: 5, char: '▼', color: PALETTE.r },
      ]

    case 'scared':
      return [
        {
          x: 3,
          y: 5,
          char: '●',
          color: PALETTE.e,
          big: true,
        },
        {
          x: 8,
          y: 5,
          char: '●',
          color: PALETTE.e,
          big: true,
        },
      ]

    default:
      return [
        { x: 4, y: 5, char: '●', color: PALETTE.e },
        { x: 9, y: 5, char: '●', color: PALETTE.e },
      ]
  }
}

function getMouth(mood) {
  switch (mood) {
    case 'happy':
    case 'win':
      return {
        x: 5,
        y: 8,
        char: '◡◡',
        color: PALETTE.e,
      }

    case 'sad':
      return {
        x: 5,
        y: 8,
        char: '◠◠',
        color: PALETTE.r,
      }

    case 'scared':
      return {
        x: 5,
        y: 8,
        char: 'ᗒᗕ',
        color: PALETTE.e,
      }

    default:
      return {
        x: 5,
        y: 8,
        char: '◡◡',
        color: PALETTE.e,
      }
  }
}

function PixelCat({ mood }) {
  const P = PIXEL_SIZE

  const eyes = getEyes(mood)
  const mouth = getMouth(mood)

  return (
    <div
      style={{
        position: 'relative',
        imageRendering: 'pixelated',
        display: 'inline-block',
      }}
    >
      {bodyPixels.map((row, y) =>
        row.map((cell, x) => {
          if (!cell) return null

          return (
            <div
              key={`${x}-${y}`}
              style={{
                position: 'absolute',
                left: x * P,
                top: y * P,
                width: P,
                height: P,
                backgroundColor:
                  PALETTE[cell] || cell,
              }}
            />
          )
        })
      )}

      <div
        style={{
          width: 16 * P,
          height: 15 * P,
        }}
      />

      {eyes.map((eye, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left:
              eye.x * P -
              (eye.big ? 2 : 0),
            top:
              eye.y * P -
              (eye.big ? 2 : 0),
            fontSize: eye.big
              ? P * 1.8
              : P * 1.4,
            color: eye.color,
            lineHeight: 1,
            fontFamily: 'monospace',
          }}
        >
          {eye.char}
        </div>
      ))}

      <div
        style={{
          position: 'absolute',
          left: mouth.x * P,
          top: mouth.y * P,
          fontSize: P * 1.2,
          color: mouth.color,
          lineHeight: 1,
          fontFamily: 'monospace',
          letterSpacing: 1,
        }}
      >
        {mouth.char}
      </div>
    </div>
  )
}

const MOOD_CONFIG = {
  idle: {
    bodyAnim: {
      y: [0, -6, 0],
    },

    bodyTransition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },

    bubble: null,
  },

  happy: {
    bodyAnim: {
      y: [0, -14, 0, -10, 0],
    },

    bodyTransition: {
      duration: 0.6,
      repeat: 2,
    },

    bubble: '♥',
  },

  sad: {
    bodyAnim: {
      x: [0, -4, 4, -2, 2, 0],
    },

    bodyTransition: {
      duration: 0.4,
    },

    bubble: '...',
  },

  scared: {
    bodyAnim: {
      x: [0, -6, 6, -4, 4, 0],
    },

    bodyTransition: {
      duration: 0.3,
      repeat: 3,
    },

    bubble: '!!',
  },

  win: {
    bodyAnim: {
      y: [0, -20, 0, -16, 0],
      rotate: [0, -10, 10, -5, 5, 0],
    },

    bodyTransition: {
      duration: 1,
    },

    bubble: '★ YAY! ★',
  },
}

export default function GhostPet({
  wrongGuesses,
  isWin,
  isLose,
  lastGuessCorrect,
}) {
  const [mood, setMood] = useState('idle')

  const [showBubble, setShowBubble] =
    useState(false)

  const [triggerKey, setTriggerKey] =
    useState(0)

  useEffect(() => {
    if (isWin) {
      setMood('win')
      setShowBubble(true)
      setTriggerKey(k => k + 1)
      return
    }

    if (isLose) {
      setMood('sad')
      setShowBubble(true)
      setTriggerKey(k => k + 1)
      return
    }

    if (lastGuessCorrect === true) {
      setMood('happy')
      setShowBubble(true)
      setTriggerKey(k => k + 1)

      const t = setTimeout(() => {
        setMood('idle')
        setShowBubble(false)
      }, 1200)

      return () => clearTimeout(t)
    }

    if (lastGuessCorrect === false) {
      setMood('scared')
      setShowBubble(true)
      setTriggerKey(k => k + 1)

      const t = setTimeout(() => {
        setMood('idle')
        setShowBubble(false)
      }, 1000)

      return () => clearTimeout(t)
    }
  }, [
    isWin,
    isLose,
    lastGuessCorrect,
    wrongGuesses,
  ])

  const config = MOOD_CONFIG[mood]

  return (
    <div
      style={{
        position: 'fixed',
        left: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 50,
        userSelect: 'none',
      }}
    >
      <div
        style={{
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence>
          {showBubble &&
            config.bubble && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                }}
                style={{
                  fontFamily:
                    'Silkscreen, monospace',
                  fontSize: '0.65rem',
                  color: '#ffe0f0',
                  background:
                    'rgba(100,0,60,0.7)',
                  border:
                    '2px solid #ff69b4',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {config.bubble}
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      <motion.div
        key={triggerKey}
        animate={config.bodyAnim}
        transition={config.bodyTransition}
        whileHover={{
          scale: 1.08,
          rotate: -2,
        }}
        onClick={() => {
          setMood('happy')
          setShowBubble(true)

          setTimeout(() => {
            setMood('idle')
            setShowBubble(false)
          }, 800)
        }}
        style={{
          cursor: 'pointer',
        }}
      >
        <PixelCat mood={mood} />
      </motion.div>

 <div
  style={{
    fontFamily: 'Silkscreen, monospace',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    color: '#ff8fc7',
    letterSpacing: '3px',
    marginTop: '6px',
    textShadow: `
      0 0 4px #ff69b4,
      0 0 8px rgba(255,105,180,0.7),
      2px 2px 0px #7a1d52
    `,
    padding: '2px 6px',
    border: '2px solid rgba(255,105,180,0.4)',
    borderRadius: '6px',
    background: 'rgba(255,182,193,0.08)',
    boxShadow: '0 0 10px rgba(255,105,180,0.2)',
  }}
>
  ✦ PIXEL CAT ✦
</div>
    </div>
    )
}