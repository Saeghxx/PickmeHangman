import { useEffect, useState } from 'react'

export default function StatsPanel({ isWin, isLose, gameKey, difficulty, onDifficultyChange }) {
    
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('hangman-stats')
    return saved ? JSON.parse(saved) : {
      bestStreak: 0,
      currentStreak: 0,
      totalGames: 0,
      totalTime: 0,
    }
  })
  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(true)

  // скидаємо таймер при новій грі
  useEffect(() => {
    setSeconds(0)
    setTimerActive(true)
  }, [gameKey])

  useEffect(() => {
    if (!timerActive) return
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [timerActive])

  useEffect(() => {
    if (isWin || isLose) setTimerActive(false)
  }, [isWin, isLose])

  useEffect(() => {
    if (isWin) {
      setStats(prev => {
        const newStreak = prev.currentStreak + 1
        const updated = {
          ...prev,
          totalGames: prev.totalGames + 1,
          currentStreak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          totalTime: prev.totalTime + seconds,
        }
        localStorage.setItem('hangman-stats', JSON.stringify(updated))
        return updated
      })
    }
    if (isLose) {
      setStats(prev => {
        const updated = {
          ...prev,
          totalGames: prev.totalGames + 1,
          currentStreak: 0,
          totalTime: prev.totalTime + seconds,
        }
        localStorage.setItem('hangman-stats', JSON.stringify(updated))
        return updated
      })
    }
  }, [isWin, isLose])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const avgTime = stats.totalGames > 0
    ? Math.round(stats.totalTime / stats.totalGames) : 0
  const avgMm = String(Math.floor(avgTime / 60)).padStart(2, '0')
  const avgSs = String(avgTime % 60).padStart(2, '0')

  const handleReset = () => {
    const reset = {
      bestStreak: 0,
      currentStreak: 0,
      totalGames: 0,
      totalTime: 0,
    }
    localStorage.setItem('hangman-stats', JSON.stringify(reset))
    setStats(reset)
    setSeconds(0)
    setTimerActive(true)
  }

  const row = (label, value, highlight = false) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 0',
      borderBottom: '1px solid rgba(255,105,180,0.15)',
    }}>
      <span style={{ color: '#ffb6c1', fontSize: '0.55rem', letterSpacing: '1px' }}>{label}</span>
      <span style={{
        color: highlight ? '#ffe066' : '#ff69b4',
        fontSize: '0.65rem',
        fontWeight: 'bold',
      }}>{value}</span>
    </div>
  )

  const box = {
    width: '160px',
    background: 'rgba(30, 5, 40, 0.85)',
    border: '2px solid #ff69b4',
    borderRadius: '12px',
    padding: '14px',
    boxShadow: '0 0 20px rgba(255,105,180,0.3)',
    fontFamily: 'Silkscreen, monospace',
  }

  const title = (text) => (
    <div style={{
      textAlign: 'center',
      color: '#ff69b4',
      fontSize: '0.6rem',
      letterSpacing: '2px',
      marginBottom: '10px',
      borderBottom: '1px solid #ff69b4',
      paddingBottom: '8px',
    }}>
      {text}
    </div>
  )

  return (
    <div style={{
      position: 'fixed',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      zIndex: 50,
    }}>

      {/* рамка 1 — складність */}
      <div style={box}>
        {title('✦ DIFFICULTY ✦')}
        <div style={{ display: 'flex', gap: '4px' }}>
          {['easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => onDifficultyChange(d)}
              style={{
                flex: 1,
                padding: '6px 0',
                background: difficulty === d ? '#ff69b4' : 'transparent',
                border: '1px solid #ff69b4',
                borderRadius: '4px',
                color: difficulty === d ? '#1a0a2e' : '#ffb6c1',
                cursor: 'pointer',
                fontSize: '0.4rem',
                fontFamily: 'Silkscreen, monospace',
                letterSpacing: '1px',
              }}
            >
              {d === 'easy' ? 'EASY' : d === 'medium' ? 'MED' : 'HARD'}
            </button>
          ))}
        </div>
      </div>

      {/* рамка 2 — статистика */}
      <div style={box}>
        {title('✦ STATS ✦')}

        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <div style={{ color: '#ffb6c1', fontSize: '0.5rem', letterSpacing: '1px', marginBottom: '4px' }}>
            GAME TIMER
          </div>
          <div style={{
            color: isWin ? '#ff69b4' : isLose ? '#ff4444' : '#ffe0ec',
            fontSize: '1.4rem',
            letterSpacing: '2px',
            textShadow: '0 0 10px rgba(255,105,180,0.5)',
          }}>
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
            marginTop: '12px',
            width: '100%',
            padding: '6px',
            background: 'transparent',
            border: '1px solid rgba(255,105,180,0.4)',
            borderRadius: '4px',
            color: 'rgba(255,182,193,0.5)',
            cursor: 'pointer',
            fontSize: '0.5rem',
            fontFamily: 'Silkscreen, monospace',
            letterSpacing: '1px',
          }}
        >
          RESET STATS
        </button>
      </div>
    </div>
  )
}