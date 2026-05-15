import { useEffect, useState } from 'react'

export default function StatsPanel({
  isWin,
  isLose,
  gameKey,
  difficulty,
  onDifficultyChange,
}) {

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('hangman-stats')

    return saved
      ? JSON.parse(saved)
      : {
          bestStreak: 0,
          currentStreak: 0,
          totalGames: 0,
          totalTime: 0,
        }
  })

  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(true)

  // reset timer on new game
  useEffect(() => {
    setSeconds(0)
    setTimerActive(true)
  }, [gameKey])

  // timer
  useEffect(() => {
    if (!timerActive) return

    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timerActive])

  // stop timer
  useEffect(() => {
    if (isWin || isLose) {
      setTimerActive(false)
    }
  }, [isWin, isLose])

  // update stats
  useEffect(() => {

    if (isWin) {
      setStats((prev) => {

        const newStreak = prev.currentStreak + 1

        const updated = {
          ...prev,
          totalGames: prev.totalGames + 1,
          currentStreak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          totalTime: prev.totalTime + seconds,
        }

        localStorage.setItem(
          'hangman-stats',
          JSON.stringify(updated)
        )

        return updated
      })
    }

    if (isLose) {
      setStats((prev) => {

        const updated = {
          ...prev,
          totalGames: prev.totalGames + 1,
          currentStreak: 0,
          totalTime: prev.totalTime + seconds,
        }

        localStorage.setItem(
          'hangman-stats',
          JSON.stringify(updated)
        )

        return updated
      })
    }

  }, [isWin, isLose])

  // timer format
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  // avg time
  const avgTime =
    stats.totalGames > 0
      ? Math.round(stats.totalTime / stats.totalGames)
      : 0

  const avgMm = String(Math.floor(avgTime / 60)).padStart(2, '0')
  const avgSs = String(avgTime % 60).padStart(2, '0')

  // reset stats
  const handleReset = () => {

    const reset = {
      bestStreak: 0,
      currentStreak: 0,
      totalGames: 0,
      totalTime: 0,
    }

    localStorage.setItem(
      'hangman-stats',
      JSON.stringify(reset)
    )

    setStats(reset)
    setSeconds(0)
    setTimerActive(true)
  }

  // stat row
  const row = (label, value, highlight = false) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '9px 0',
        borderBottom: '1px solid rgba(255,105,180,0.18)',
      }}
    >
      <span
        style={{
          color: '#ffb6c1',
          fontSize: '0.72rem',
          letterSpacing: '1.5px',
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: highlight ? '#ffe066' : '#ff69b4',
          fontSize: '0.9rem',
          fontWeight: 'bold',
        }}
      >
        {value}
      </span>
    </div>
  )

  // panel box
  const box = {
    width: '210px',
    minHeight: '130px',
    background: 'rgba(30, 5, 40, 0.88)',
    border: '3px solid #ff69b4',
    borderRadius: '18px',
    padding: '18px',
    boxShadow: '0 0 30px rgba(255,105,180,0.35)',
    fontFamily: 'Silkscreen, monospace',
  }

  // title
  const title = (text) => (
    <div
      style={{
        textAlign: 'center',
        color: '#ff69b4',
        fontSize: '0.82rem',
        letterSpacing: '2px',
        marginBottom: '15px',
        borderBottom: '2px solid #ff69b4',
        paddingBottom: '10px',
      }}
    >
      {text}
    </div>
  )

  return (
    <div
      style={{
        position: 'fixed',
        left: '28px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        zIndex: 50,
      }}
    >

      {/* difficulty */}
      <div style={box}>

        {title('✦ DIFFICULTY ✦')}

        <div
          style={{
            display: 'flex',
            gap: '6px',
          }}
        >

          {['easy', 'medium', 'hard'].map((d) => (

            <button
              key={d}
              onClick={() => onDifficultyChange(d)}
              style={{
                flex: 1,
                padding: '10px 0',

                background:
                  difficulty === d
                    ? '#ff69b4'
                    : 'transparent',

                border: '2px solid #ff69b4',
                borderRadius: '7px',

                color:
                  difficulty === d
                    ? '#1a0a2e'
                    : '#ffb6c1',

                cursor: 'pointer',

                fontSize: '0.58rem',

                fontFamily: 'Silkscreen, monospace',

                letterSpacing: '1px',

                transition: '0.2s',
              }}
            >
              {d === 'easy'
                ? 'EASY'
                : d === 'medium'
                ? 'MED'
                : 'HARD'}
            </button>

          ))}

        </div>
      </div>

      {/* stats */}
      <div style={box}>

        {title('✦ STATS ✦')}

        {/* timer */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >

          <div
            style={{
              color: '#ffb6c1',
              fontSize: '0.65rem',
              letterSpacing: '2px',
              marginBottom: '8px',
            }}
          >
            GAME TIMER
          </div>

          <div
            style={{
              color: isWin
                ? '#ff69b4'
                : isLose
                ? '#ff4444'
                : '#ffe0ec',

              fontSize: '1.8rem',

              letterSpacing: '3px',

              textShadow:
                '0 0 14px rgba(255,105,180,0.5)',
            }}
          >
            {mm}:{ss}
          </div>

        </div>

        {row('TOTAL', stats.totalGames)}
        {row('AVG TIME', `${avgMm}:${avgSs}`)}
        {row('STREAK', stats.currentStreak)}
        {row('BEST', stats.bestStreak, true)}

        <button
          onClick={handleReset}
          style={{
            marginTop: '16px',

            width: '100%',

            padding: '10px',

            background: 'transparent',

            border:
              '2px solid rgba(255,105,180,0.4)',

            borderRadius: '7px',

            color: 'rgba(255,182,193,0.75)',

            cursor: 'pointer',

            fontSize: '0.65rem',

            fontFamily: 'Silkscreen, monospace',

            letterSpacing: '1px',

            transition: '0.2s',
          }}
        >
          RESET STATS
        </button>

      </div>
    </div>
  )
}