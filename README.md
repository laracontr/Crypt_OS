# 🔐 CryptOS — Password Security Analyzer

> A hacker-aesthetic single-page app for analyzing password strength, checking data breaches, and visualizing classical encryption. Built with React + Vite.

## ✨ Features

### Password Analyzer
- **Real-time entropy calculation** using `zxcvbn` (Dropbox's password strength estimator)
- **Visual strength meter** with animated progress bar
- **Crack time estimation** against offline fast-hash attacks (10 billion guesses/sec)
- **Charset size & bit entropy** computed from character set composition
- **Have I Been Pwned integration** — checks your password against 10+ billion breached passwords using **k-anonymity**
- **Smart suggestions** from zxcvbn's feedback engine

### Caesar Cipher Visualizer
- Interactive **alphabet mapping visualization** — see how each letter shifts
- **Animated character-by-character output** with staggered transitions
- **Encrypt / Decrypt** toggle
- **Shift key slider** (1–25) with live updates
- Highlighted letter tracking: type text and watch which letters get mapped

### About
- Technical explanation of all algorithms used

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| **React** | Component-based UI |
| **Vite** | Lightning-fast build tool and dev server |
| **[zxcvbn](https://github.com/dropbox/zxcvbn)** | Realistic password strength estimation |
| **[Have I Been Pwned API](https://haveibeenpwned.com/API/v3)** | k-anonymity breach checking |
| **Web Crypto API** | SHA-1 hashing (built-in browser API) |
| CSS | Scanline effects, animations, dark theme |

## 🔒 Privacy

This app **never sends your password** to any server.

The HIBP check uses **k-anonymity**:
1. Your password is hashed locally using SHA-1
2. Only the **first 5 characters** of the hash are sent to the API
3. The API returns all hashes starting with those 5 chars
4. Matching is done **entirely in your browser**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/laracontr/Crypt_OS.git
cd Crypt_OS
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
Crypt_OS/
├── src/
│   ├── components/
│   │   ├── PasswordAnalyzer.jsx    # Password strength analyzer
│   │   ├── CaesarCipher.jsx        # Caesar cipher visualizer
│   │   ├── About.jsx               # About & how it works
│   │   └── TabNav.jsx              # Tab navigation
│   ├── hooks/
│   │   └── usePasswordAnalysis.js   # Password analysis logic
│   ├── App.jsx                      # Main app component
│   ├── App.css                      # Main styles
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🧠 Concepts Demonstrated

- **Password entropy**: `H = log₂(charset_size) × length`
- **k-anonymity**: a privacy model where a record is indistinguishable from k−1 others
- **Substitution cipher**: Caesar cipher shifts each letter by a fixed offset modulo 26
- **React hooks**: useState, useCallback, useEffect for state and side effects
- **Component composition**: Breaking down UI into reusable, focused components
- **Async operations**: Handling API calls for breach checking

## 📄 License

MIT — free to use, modify, and distribute.

---

*Built as a portfolio project demonstrating security concepts, REST API integration, React components, and CSS animations.*
