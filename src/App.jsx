import { useState } from 'react'
import TabNav from './components/TabNav'
import PasswordAnalyzer from './components/PasswordAnalyzer'
import CaesarCipher from './components/CaesarCipher'
import About from './components/About'
import { translations } from './i18n'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('analyzer')
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  return (
    <div className="app">
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div className="logo">CRYPT<span>/</span>OS</div>
            <div className="tagline">password security & encryption analyzer</div>
          </div>
          <button 
            onClick={() => setLang(lang === 'en' ? 'it' : 'en')}
            style={{
              background: 'none',
              border: '1px solid var(--cyan)',
              color: 'var(--cyan)',
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '2px',
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all .2s',
              textTransform: 'uppercase',
              marginRight: '10px'
            }}
          >
            {lang === 'en' ? 'IT' : 'EN'}
          </button>
        </div>
      </header>

      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} t={t} />

      {activeTab === 'analyzer' && <PasswordAnalyzer lang={lang} t={t} />}
      {activeTab === 'caesar' && <CaesarCipher lang={lang} t={t} />}
      {activeTab === 'about' && <About lang={lang} t={t} />}

      <footer className="footer">
        CRYPTOS v1.0<br />Password entropy analyzer
        <br /><br />
        <a href="https://github.com/laracontr/Crypt_OS">source code</a>
      </footer>
    </div>
  )
}

export default App
