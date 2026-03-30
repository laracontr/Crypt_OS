import { useState, useEffect } from 'react'

export default function CaesarCipher({ lang, t }) {
  const [input, setInput] = useState('')
  const [shift, setShift] = useState(13)
  const [mode, setMode] = useState('encrypt')
  const [output, setOutput] = useState('')
  const [animOutput, setAnimOutput] = useState([])

  useEffect(() => {
    const result = caesar(input, shift, mode === 'decrypt')
    setOutput(result)
    
    const spans = input.split('').map((ch, i) => {
      const enc = caesar(ch, shift, mode === 'decrypt')
      const isAlpha = /[a-zA-Z]/.test(ch)
      return {
        char: enc,
        shifted: isAlpha,
        delay: i * 0.02
      }
    })
    setAnimOutput(spans)
  }, [input, shift, mode])

  return (
    <div className="panel">
      <div className="mode-row">
        <div className="shift-label">{t.mode}</div>
        <button 
          className={`mode-btn ${mode === 'encrypt' ? 'active' : ''}`}
          onClick={() => setMode('encrypt')}
        >
          {t.encrypt}
        </button>
        <button 
          className={`mode-btn ${mode === 'decrypt' ? 'active' : ''}`}
          onClick={() => setMode('decrypt')}
        >
          {t.decrypt}
        </button>
      </div>

      <div className="caesar-wrap">
        <div>
          <div className="section-label">// {t.inputText}</div>
          <textarea 
            className="text-field" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.typeHere}
          ></textarea>
        </div>
        <div>
          <div className="section-label">// {t.output}</div>
          <div className="output-display">{output || '—'}</div>
        </div>
      </div>

      <div className="shift-row">
        <div className="shift-label">{t.shiftKey}</div>
        <input 
          type="range" 
          min="1" 
          max="25" 
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value))}
        />
        <div className="shift-val">{shift}</div>
      </div>

      <AlphabetViz shift={shift} input={input} mode={mode} lang={lang} t={t} />

      <div className="section-label" style={{ marginBottom: '8px' }}>// {t.animatedOutput}</div>
      <div className="output-display" style={{ minHeight: '60px' }}>
        {animOutput.map((s, i) => (
          <span 
            key={i}
            className={`char-span ${s.shifted ? 'shifted' : 'unchanged'}`}
            style={{ transitionDelay: `${s.delay}s` }}
          >
            {s.char}
          </span>
        ))}
      </div>
    </div>
  )
}

function caesar(char, shift, decrypt) {
  const s = decrypt ? (26 - shift) % 26 : shift
  const code = char.charCodeAt(0)
  
  if (code >= 65 && code <= 90) 
    return String.fromCharCode(((code - 65 + s) % 26) + 65)
  if (code >= 97 && code <= 122) 
    return String.fromCharCode(((code - 97 + s) % 26) + 97)
  return char
}

function AlphabetViz({ shift, input, mode, lang, t }) {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const highlight = new Set()
  
  for (const ch of input.toUpperCase()) {
    if (ch >= 'A' && ch <= 'Z') highlight.add(ch)
  }

  const cipher = alpha.map(c => caesar(c, shift, mode === 'decrypt'))
  const dec = mode === 'decrypt'

  return (
    <div className="alphabet-viz">
      <div className="section-label" style={{ marginBottom: '4px' }}>// {t.plainAlphabet}</div>
      <div className="alpha-row">
        {alpha.map((c, i) => (
          <div 
            key={i}
            className={`alpha-cell ${highlight.has(c) ? 'highlighted' : ''}`}
          >
            {c}
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', margin: '2px 0' }}>
        {alpha.map((c, i) => (
          <div 
            key={i}
            style={{
              width: '26px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              color: highlight.has(c) ? 'var(--cyan)' : 'var(--border)'
            }}
          >
            {highlight.has(c) ? '↓' : '·'}
          </div>
        ))}
      </div>

      <div className="section-label" style={{ margin: '8px 0 4px' }}>// {t.cipherAlphabet} (shift +{shift})</div>
      <div className="alpha-row">
        {cipher.map((c, i) => (
          <div 
            key={i}
            className={`alpha-cell ${highlight.has(alpha[i]) ? 'target' : ''}`}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  )
}
