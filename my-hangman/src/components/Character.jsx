import { useEffect, useState } from 'react'

const PARTS = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg']

export default function Character({ wrong }) {
  const [shown, setShown] = useState([])

  useEffect(() => {
    const newPart = PARTS[wrong - 1]
    if (newPart && !shown.includes(newPart)) {
      setTimeout(() => {
        setShown(prev => [...prev, newPart])
      }, 100)
    }
  }, [wrong])

  const has = (part) => shown.includes(part)
  const isDead = wrong >= 6

  const fadeIn = {
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  }

  return (
    <div style={{
      border: '3px solid #ff69b4',
      borderRadius: '16px',
      padding: '10px',
      display: 'inline-block',
      boxShadow: '0 0 20px rgba(255,105,180,0.4)',
      margin: '20px auto',
      background: 'rgba(255,105,180,0.05)'
    }}>
      <svg width="200" height="220">
        {/* Шибениця */}
        <rect x="20" y="210" width="160" height="8" fill="#ff69b4" rx="2"/>
        <rect x="50" y="20" width="8" height="190" fill="#ff69b4" rx="2"/>
        <rect x="50" y="20" width="80" height="8" fill="#ff69b4" rx="2"/>
        <rect x="126" y="20" width="4" height="30" fill="#ff69b4"/>

        {/* Голова */}
        <g style={{ ...fadeIn, opacity: has('head') ? 1 : 0, transform: has('head') ? 'translateY(0)' : 'translateY(-10px)' }}>
          <rect x="112" y="50" width="32" height="32" rx="4" fill="#ffb6c1" stroke="#ff69b4" strokeWidth="3"/>
          {/* Очі */}
          {isDead ? (
            <>
              <text x="118" y="68" fontSize="9" fill="#ff1493" fontFamily="monospace">✕</text>
              <text x="130" y="68" fontSize="9" fill="#ff1493" fontFamily="monospace">✕</text>
            </>
          ) : (
            <>
              <rect x="120" y="62" width="5" height="5" fill="#ff1493" rx="1"/>
              <rect x="133" y="62" width="5" height="5" fill="#ff1493" rx="1"/>
            </>
          )}
          {/* Рот */}
          {isDead
            ? <rect x="122" y="73" width="12" height="3" fill="#ff1493" rx="1"/>
            : <path d="M122 73 Q128 79 134 73" fill="none" stroke="#ff1493" strokeWidth="2"/>
          }
        </g>

        {/* Тіло */}
        <rect x="126" y="82" width="4" height="50" fill="#ffb6c1"
          style={{ ...fadeIn, opacity: has('body') ? 1 : 0 }}/>

        {/* Ліва рука */}
        <line x1="128" y1="90" x2="108" y2="115" stroke="#ff69b4" strokeWidth="4" strokeLinecap="round"
          style={{ ...fadeIn, opacity: has('leftArm') ? 1 : 0, transformOrigin: '128px 90px', transform: has('leftArm') ? 'rotate(0deg)' : 'rotate(-30deg)' }}/>

        {/* Права рука */}
        <line x1="128" y1="90" x2="148" y2="115" stroke="#ff69b4" strokeWidth="4" strokeLinecap="round"
          style={{ ...fadeIn, opacity: has('rightArm') ? 1 : 0, transformOrigin: '128px 90px', transform: has('rightArm') ? 'rotate(0deg)' : 'rotate(30deg)' }}/>

        {/* Ліва нога */}
        <line x1="128" y1="130" x2="110" y2="165" stroke="#ff69b4" strokeWidth="4" strokeLinecap="round"
          style={{ ...fadeIn, opacity: has('leftLeg') ? 1 : 0 }}/>

        {/* Права нога */}
        <line x1="128" y1="130" x2="146" y2="165" stroke="#ff69b4" strokeWidth="4" strokeLinecap="round"
          style={{ ...fadeIn, opacity: has('rightLeg') ? 1 : 0 }}/>
      </svg>
    </div>
  )
}