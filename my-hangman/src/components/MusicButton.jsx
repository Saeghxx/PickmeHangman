export default function MusicButton({ playing, setPlaying, audioRef }) {
  const toggle = () => {
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(prev => !prev)
  }

  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 100,
        padding: '8px 14px',
        background: '#3d1a3d',
        border: '2px solid #ff69b4',
        borderRadius: '6px',
        color: '#ffb6c1',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontFamily: 'Silkscreen, monospace',
        letterSpacing: '1px',
        boxShadow: '0 0 14px rgba(255,105,180,0.5)',
      }}
    >
      {playing ? '♪ OFF' : '♪ ON'}
    </button>
  )
}