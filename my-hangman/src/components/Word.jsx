export default function Word({ word, guessed }) {
  return (
    <div className="word">
      {word.split('').map((l, i) => (
        <span key={i}>
          {guessed.includes(l) ? l : '_'}
        </span>
      ))}
    </div>
  )
}