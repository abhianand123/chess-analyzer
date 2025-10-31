# FreeChess - Chess Game Analysis Tool

A powerful, free chess game analysis tool that helps you understand your games better. Analyze your moves, find mistakes and brilliancies, and improve your chess skills.

**Developer:** Abhi Anand  
**Instagram:** [@chessbasebgs](https://www.instagram.com/chessbasebgs/)

## ✨ Features

### Game Analysis
- **Move Classification**: Automatically classify moves as brilliant, great, best, good, inaccuracy, mistake, or blunder
- **Engine Evaluation**: Deep analysis using Stockfish chess engine
- **Cloud Evaluation**: Uses Lichess cloud evaluation when available for faster analysis
- **Position Evaluation**: Real-time evaluation bar showing position strength

### Game Loading
- **PGN Input**: Paste or type PGN notation directly
- **Chess.com Integration**: Fetch and analyze games from your Chess.com account
- **Lichess Integration**: Fetch and analyze games from your Lichess account
- **JSON Support**: Load games in JSON format
- **Copy PGN**: One-click copy button to easily copy PGN text (works in all modes)

### Analysis Tools
- **Best Move Display**: See the engine's recommended best move at each position
- **Auto-Play**: Automatically play through the game move by move
- **Move Navigation**: Navigate through moves with next/previous buttons
- **Evaluation Graph**: Visual graph showing position evaluation throughout the game
- **Engine Suggestions**: View multiple engine lines and evaluations

### User Experience
- **Mobile Responsive**: Fully optimized for mobile devices with Chess.com-style layout
- **Modern UI**: Glassmorphic design with smooth animations
- **Error Handling**: Graceful error handling for network issues and API failures
- **Dark Theme**: Beautiful dark theme optimized for long analysis sessions

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd freechess-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   ```
   
   Optional (for CAPTCHA):
   ```env
   RECAPTCHA_SECRET=your_secret_key
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open in browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Analyzing a Game

1. **Enter PGN**: Select "PGN" mode and paste your game notation
2. **Or Fetch from Chess.com/Lichess**: 
   - Select "Chess.com" or "Lichess.org"
   - Enter your username
   - Click the arrow button (or press Enter)
   - Select a game from the list
3. **Click "Analyse"** to start analysis
4. **Review Results**: Navigate through moves to see classifications and evaluations

### Features in Action

- **Copy PGN**: Click the copy button next to the dropdown to copy the current PGN
- **Best Move**: View the engine's recommended move shown in the analysis panel
- **Auto-Play**: Click the play button to automatically go through the game
- **Move Navigation**: Use arrow buttons to jump between moves

## 🛠️ Development

### Project Structure
```
freechess-master/
├── src/
│   ├── api.ts              # API routes
│   ├── index.ts            # Express server setup
│   └── public/
│       └── pages/
│           └── report/     # Main application
├── dist/                   # Compiled TypeScript output
├── package.json
└── .env                    # Environment variables (not in repo)
```

### Scripts
- `npm start` - Compile TypeScript and start the server
- `npm run build` - Compile TypeScript only
- `npm test` - Run test reports

### Building for Production
1. Run `npm run build`
2. Set environment variables
3. Start with `node dist/index.js`

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Recommended Hosting:** [Railway](https://railway.app/) (Free tier available)

## 🎨 Recent Updates

### Version 2.0 Features
- ✅ Copy PGN button for easy sharing
- ✅ Best move display showing engine recommendations
- ✅ Auto-play functionality to review games automatically
- ✅ Mobile-responsive layout optimized for all screen sizes
- ✅ Improved error handling for API calls
- ✅ Enhanced UI with glassmorphic design
- ✅ Better layout preventing content blocking

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Yes | Server port (default: 3000) |
| `RECAPTCHA_SECRET` | No | Google reCAPTCHA secret key |

### Optional Features

**reCAPTCHA**: If you want to use CAPTCHA verification:
1. Get keys from [Google reCAPTCHA](https://www.google.com/recaptcha)
2. Add `RECAPTCHA_SECRET` to `.env`
3. Update `data-sitekey` in `src/public/pages/report/index.html`

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices:
- **Top Half**: Chess board (fixed size, responsive)
- **Bottom Half**: Analysis panel (scrollable)
- **Navigation**: Fixed toolbar at bottom for easy access
- **Touch-Friendly**: Large buttons and touch targets

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
- Change `PORT` in `.env` to a different port

**API errors**
- Lichess cloud-eval 404 errors are normal (falls back to local Stockfish)
- Chess.com/Lichess game fetching may fail if username doesn't exist

**Copy button not visible**
- Make sure PGN text is entered
- Button appears automatically when text is detected

## 📄 License

This project is open source and available for free use.

## 👤 Developer

**Abhi Anand**

- **Instagram**: [@chessbasebgs](https://www.instagram.com/chessbasebgs/)
- **Other Projects**:
  - [The Ultimate YouTube & YouTube Music Downloader](https://web-production-14214.up.railway.app/)
  - [Class 10 Science Hub](https://abhianand123.github.io/science-hub/)

## 🙏 Acknowledgments

- Original project by WintrCat
- Stockfish chess engine
- Chess.js library
- Font Awesome icons

## 📝 Notes

- This project is based on the original FreeChess by WintrCat
- Has been enhanced with new features and improvements
- All API integrations work without requiring API keys

---

**Made with ♟️ for chess enthusiasts**

