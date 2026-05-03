export default function Character({ wrong }) {
  return (
    <svg width="200" height="220" style={{ margin: '20px auto', display: 'block' }}>
      {/* Шибениця */}
      <rect x="20" y="210" width="160" height="8" fill="#ff69b4" rx="2"/>
      <rect x="50" y="20" width="8" height="190" fill="#ff69b4" rx="2"/>
      <rect x="50" y="20" width="80" height="8" fill="#ff69b4" rx="2"/>
      <rect x="126" y="20" width="4" height="30" fill="#ff69b4"/>

      {/* Голова */}
      {wrong >= 1 && <rect x="112" y="50" width="32" height="32" rx="4" fill="#ffb6c1" stroke="#ff69b4" strokeWidth="3"/>}
      
      {/* Тіло */}
      {wrong >= 2 && <rect x="126" y="82" width="4" height="50" fill="#ffb6c1"/>}
      
      {/* Ліва рука */}
      {wrong >= 3 && <line x1="128" y1="90" x2="108" y2="115" stroke="#ff69b4" strokeWidth="4" strokeLinecap="round"/>}
      
      {/* Права рука */}
      {wrong >= 4 && <line x1="128" y1="90" x2="148" y2="115" stroke="#ff69b4" strokeWidth="4" strokeLinecap="round"/>}
      
      {/* Ліва нога */}
      {wrong >= 5 && <line x1="128" y1="130" x2="110" y2="165" stroke="#ff69b4" strokeWidth="4" strokeLinecap="round"/>}
      
      {/* Права нога */}
      {wrong >= 6 && <line x1="128" y1="130" x2="146" y2="165" stroke="#ff69b4" strokeWidth="4" strokeLinecap="round"/>}
    </svg>
  )
}