export default function Keyboard({ guessed, word, onGuess }) {
  return (
    <div className="keyboard">
      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => {
        const isGuessed = guessed.includes(l)
        const isCorrect = word.includes(l)

        let className = ""

        if (isGuessed && isCorrect) className = "correct"
        else if (isGuessed && !isCorrect) className = "wrong"

        return (
          <button
            key={l}
            onClick={() => onGuess(l)}
            disabled={isGuessed}
            className={className}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}
