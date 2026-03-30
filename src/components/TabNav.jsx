export default function TabNav({ activeTab, setActiveTab, lang, t }) {
  return (
    <nav className="tabs">
      <button 
        className={`tab ${activeTab === 'analyzer' ? 'active' : ''}`}
        onClick={() => setActiveTab('analyzer')}
      >
        // {t.analyzer}
      </button>
      <button 
        className={`tab ${activeTab === 'caesar' ? 'active' : ''}`}
        onClick={() => setActiveTab('caesar')}
      >
        // {t.caesarCipher}
      </button>
      <button 
        className={`tab ${activeTab === 'about' ? 'active' : ''}`}
        onClick={() => setActiveTab('about')}
      >
        // {t.about}
      </button>
    </nav>
  )
}
