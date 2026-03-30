import { useState } from 'react'
import { usePasswordAnalysis } from '../hooks/usePasswordAnalysis'

const STRENGTH_COLORS = ['#ff4444','#ff7733','#ffb800','#88dd00','#00ff88']
const STRENGTH_LABELS_EN = ['VERY WEAK','WEAK','FAIR','STRONG','VERY STRONG']
const STRENGTH_LABELS_IT = ['MOLTO DEBOLE','DEBOLE','DISCRETO','FORTE','MOLTO FORTE']
const STRENGTH_WIDTHS = ['8%','28%','54%','78%','100%']

export default function PasswordAnalyzer({ lang, t }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { result, entropy, charsetSize, hibpResult, hibpLoading, checkHIBP, isEmpty } = usePasswordAnalysis(password)

  const STRENGTH_LABELS = lang === 'en' ? STRENGTH_LABELS_EN : STRENGTH_LABELS_IT
  const score = result?.score ?? -1
  const strength = !isEmpty ? STRENGTH_LABELS[score] : '—'
  const width = !isEmpty ? STRENGTH_WIDTHS[score] : '0%'
  const color = !isEmpty ? STRENGTH_COLORS[score] : 'var(--muted)'

  const crackTime = result?.crack_times_display?.offline_fast_hashing_1e10_per_second ?? '—'
  const guesses = result?.guesses ?? 0
  const guessesFormatted = !isEmpty ? formatGuesses(guesses) : '—'

  const suggestions = result?.feedback ? [
    result.feedback.warning,
    ...result.feedback.suggestions,
    entropy < 40 && (lang === 'en' 
      ? 'Try a longer password — aim for 12+ characters.' 
      : 'Prova una password più lunga — almeno 12 caratteri.'),
    charsetSize < 36 && (lang === 'en'
      ? 'Mix uppercase, lowercase, numbers, and symbols.'
      : 'Usa maiuscole, minuscole, numeri e simboli.'),
    password.length < 8 && (lang === 'en'
      ? 'Minimum recommended length is 8 characters.'
      : 'Lunghezza minima consigliata: 8 caratteri.')
  ].filter(Boolean) : []

  return (
    <div className="panel">
      <div className="input-wrap">
        <div className="input-label">// {t.enterPassword}</div>
        <input
          className="password-field"
          type={showPassword ? 'text' : 'password'}
          placeholder={t.typePassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          spellCheck="false"
        />
        <button className="eye-btn" onClick={() => setShowPassword(!showPassword)}>👁</button>
      </div>

      <div className="strength-row">
        <div className="bar-track">
          <div 
            className="bar-fill" 
            style={{ width, background: color }}
          ></div>
        </div>
        <div className="strength-label">{strength}</div>
      </div>

      <div className="metrics">
        <div className="metric-card">
          <div className="metric-label">{t.entropy}</div>
          <div className="metric-value">{entropy}</div>
          <div className="metric-sub">{t.bits}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t.crackTime}</div>
          <div className="metric-value" style={{ fontSize: '16px' }}>{crackTime}</div>
          <div className="metric-sub">{t.offlineFastHash}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t.guesses}</div>
          <div className="metric-value" style={{ fontSize: '14px' }}>{guessesFormatted}</div>
          <div className="metric-sub">{t.estimated}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t.charsetSize}</div>
          <div className="metric-value">{isEmpty ? '—' : charsetSize}</div>
          <div className="metric-sub">{t.symbolsAvailable}</div>
        </div>
      </div>

      <div className="hibp-card">
        <div className="hibp-icon">{getHibpIcon()}</div>
        <div className="hibp-text">
          <div className={`hibp-status ${getHibpStatusClass()}`}>
            {getHibpStatus()}
          </div>
          <div className="hibp-detail">{getHibpDetail()}</div>
        </div>
        <button 
          className="hibp-btn" 
          onClick={checkHIBP}
          disabled={isEmpty || hibpLoading}
        >
          {hibpLoading ? <span className="spinner"></span> : (hibpResult ? t.checkAgainBtn : t.checkLeaksBtn)}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          <div className="suggestions-title">// {t.recommendations}</div>
          <div>
            {suggestions.map((s, i) => (
              <div key={i} className="suggestion-item">{s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  function getHibpIcon() {
    if (!hibpResult) return '🔒'
    if (hibpResult.error) return '⚠️'
    return hibpResult.found > 0 ? '🚨' : '✅'
  }

  function getHibpStatus() {
    if (hibpLoading) return t.checking
    if (!hibpResult) return t.leakCheckNotRun
    if (hibpResult.error) return t.apiUnavailable
    return hibpResult.found > 0 
      ? `⚠ ${t.compromised} ${hibpResult.found.toLocaleString()} ${t.times}`
      : `✓ ${t.secure}`
  }

  function getHibpStatusClass() {
    if (!hibpResult) return 'text-muted'
    if (hibpResult.error) return 'text-amber'
    return hibpResult.found > 0 ? 'text-red' : 'text-green'
  }

  function getHibpDetail() {
    if (!hibpResult) return t.clickToCheck
    if (hibpResult.error) return t.apiError
    return hibpResult.found > 0 ? t.compromisedMsg : t.secureMsg
  }
}

function formatGuesses(g) {
  if (g > 1e15) return '>1 quadrillion'
  if (g > 1e12) return (g/1e12).toFixed(1)+'T'
  if (g > 1e9)  return (g/1e9).toFixed(1)+'B'
  if (g > 1e6)  return (g/1e6).toFixed(1)+'M'
  if (g > 1e3)  return (g/1e3).toFixed(0)+'K'
  return g.toFixed(0)
}
