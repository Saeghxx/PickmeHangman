# ✧ PICKME HANGMAN ✧

A vibrant, interactive web-based Hangman game built with **React**, featuring adorable ghost animations, smooth gameplay, and multiple difficulty levels.

![JavaScript](https://img.shields.io/badge/JavaScript-86.6%25-F7DF1E?style=flat-square&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-12.3%25-1572B6?style=flat-square&logo=css3)
![HTML](https://img.shields.io/badge/HTML-1.1%25-E34C26?style=flat-square&logo=html5)

## 🎮 Overview

PickmeHangman is a modern take on the classic Hangman word-guessing game. It features:

- 🎨 **Colorful UI** with a playful pink and purple aesthetic
- 👻 **Animated Ghost Pet** that responds to game events
- 🎵 **Background Music** with mute/unmute controls
- 📊 **Difficulty Levels** (Easy, Medium, Hard) with themed word categories
- ⌨️ **Keyboard & Mouse Support** for guessing letters
- 🎯 **Sound Effects** for wins and losses using Web Audio API
- 💖 **Hearts System** tracking wrong guesses
- 📱 **Responsive Design** that works on different screen sizes

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saeghxx/PickmeHangman.git
   cd PickmeHangman/my-hangman
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The game will be available at `http://localhost:5173`

4. **Start the backend server (in another terminal):**
   ```bash
   npm run server
   ```
   The server runs on `http://localhost:3001` and provides random words for gameplay.

## 📦 Project Structure

```
PickmeHangman/
└── my-hangman/
    ├── public/              # Static assets
    ├── server/              # Backend server for word selection
    ├── src/
    │   ├── components/      # React components
    │   │   ├── Character.jsx         # Hangman character visualization
    │   │   ├── GhostPet.jsx          # Animated ghost pet
    │   │   ├── Keyboard.jsx          # Letter selection interface
    │   │   ├── WordDisplay.jsx       # Word progress display
    │   │   ├── HeartsDisplay.jsx     # Lives indicator
    │   │   ├── StatsPanel.jsx        # Difficulty & stats
    │   │   ├── MusicButton.jsx       # Audio controls
    │   │   └── Word.jsx              # Word component utility
    │   ├── App.jsx          # Main game logic
    │   ├── main.jsx         # React entry point
    │   ├── App.css          # Game styles
    │   └── index.css        # Global styles
    ├── index.html           # HTML template
    ├── package.json         # Dependencies
    └── vite.config.js       # Vite configuration
```

## 🛠️ Build & Deployment

### Development Mode
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR).

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Linting
```bash
npm run lint
```
Checks code quality using ESLint.

## 🎮 How to Play

1. **Start the Game** - The server provides a random word from a themed category
2. **Guess Letters** - Click letter buttons or use your keyboard (A-Z)
3. **Track Progress** - Watch the hangman character draw and the ghost react to your guesses
4. **Win or Lose** - 
   - 🎉 **Win**: Guess all letters before 6 wrong guesses
   - ☠️ **Lose**: Make 6 wrong guesses (the word will be revealed)
5. **Change Difficulty** - Select Easy, Medium, or Hard for different word categories
6. **Play Again** - Click "✦ NEW GAME ✦" to play another round

## 📚 Technology Stack

### Frontend
- **React 19** - UI library for component-based architecture
- **Vite** - Fast build tool and development server
- **Framer Motion** - Smooth animations for the ghost pet
- **Lucide React** - Icon components
- **Silkscreen Font** - Retro-style typography

### Backend
- **Node.js** - Server runtime
- **Express** (implied) - Web framework for API endpoints

### Development Tools
- **ESLint** - Code quality and formatting
- **React Hooks** - State management (useState, useEffect, useRef)

## 🎨 Features in Detail

### Ghost Pet 🐭
- Responds to game state (correct/incorrect guesses)
- Animated expressions and movements using Framer Motion
- Changes appearance based on win/lose conditions

### Sound Effects 🔊
- Utilizes Web Audio API for dynamic beep sounds
- Victory melody (3 ascending notes)
- Defeat sound (descending sawtooth wave)
- Background music (Baby Shark) with volume control

### Difficulty System
- **Easy**: Common words from simple categories
- **Medium**: Standard vocabulary and themes
- **Hard**: Challenging words and obscure categories

## 🎵 Audio Files

The game includes:
- Background music: `music_for_videos-baby-shark-122769.mp3`
- Sound effects generated programmatically via Web Audio API

## 🔧 Customization

### Change Background Music
Edit the path in `src/App.jsx` (line 57):
```javascript
const audio = new Audio('/path-to-your-audio.mp3')
```

### Modify Colors & Styling
- Primary colors defined in `src/App.css` and `src/index.css`
- Main theme colors: Pink (`#ff69b4`, `#ffb6f2`), Purple (`#3d1a3d`)

### Add New Word Categories
Update the backend server in `server/` directory to include additional word categories for different difficulty levels.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests with improvements

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute
Faculty of Informatics and Computer Engineering
Group: IM-54
GitHub: @Saeghxx

## 🙏 Acknowledgments

- Baby Shark background music for keeping the gaming mood fun and light
- Framer Motion for beautiful animations
- React community for excellent documentation and tools
- Vite for the fast development experience

---

**Happy guessing! 🎉** Enjoy the game and feel free to share feedback.
