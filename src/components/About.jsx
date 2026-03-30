export default function About({ lang, t }) {
  return (
    <div className="panel">
      <div className="about-section">
        <h3>// {t.howItWorks}</h3>
        <p>
          <strong style={{ color: 'var(--cyan)' }}>{t.passwordAnalyzer}</strong> {t.passwordAnalyzerDesc}
        </p>
        <p>
          <strong style={{ color: 'var(--cyan)' }}>{t.entropyCalc}</strong> {t.entropyDesc}
        </p>
        <p>
          <strong style={{ color: 'var(--cyan)' }}>{t.hibpCheck}</strong> {t.hibpDesc}
        </p>
        <p>
          <strong style={{ color: 'var(--cyan)' }}>{t.caesarExplain}</strong> {t.caesarDesc}
        </p>
        <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--muted)' }}>
          {t.madeWith}
        </p>
        <p style={{ marginTop: '8px', fontSize: '10px', color: 'var(--cyan-dim)' }}>
          {t.designedBy}
        </p>
      </div>
    </div>
  )
}
