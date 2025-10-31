import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Statistics.css'

const BADGES = [
  { id: 'dunk', name: 'Champion Dunker', desc: 'Dunk parfait', icon: '🏀', unlocked: false },
  { id: 'impossible', name: 'Maître Panier', desc: '10 paniers impossibles', icon: '🎯', unlocked: false },
  { id: 'quiz', name: 'Quizz Master', desc: '100 points au quiz', icon: '🧠', unlocked: false },
  { id: 'know', name: 'Encyclopédie Basket', desc: 'Tout savoir', icon: '📚', unlocked: false }
]

export default function GamesChallenge() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('dunk')
  const [dunkScore, setDunkScore] = useState(0)
  const [impossibleScore, setImpossibleScore] = useState(0)
  const [badges, setBadges] = useState(BADGES)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('badges') || '[]')
    setBadges(saved.length ? saved : BADGES)
    const stats = JSON.parse(localStorage.getItem('gameStats') || '{}')
    setDunkScore(stats.dunk || 0)
    setImpossibleScore(stats.impossible || 0)
  }, [])

  const saveBadges = (updated) => {
    setBadges(updated)
    localStorage.setItem('badges', JSON.stringify(updated))
  }

  const handleDunk = () => {
    const newScore = dunkScore + 1
    setDunkScore(newScore)
    localStorage.setItem('gameStats', JSON.stringify({ ...JSON.parse(localStorage.getItem('gameStats') || '{}'), dunk: newScore }))
  }

  const handleImpossible = () => {
    const newScore = impossibleScore + 1
    setImpossibleScore(newScore)
    localStorage.setItem('gameStats', JSON.stringify({ ...JSON.parse(localStorage.getItem('gameStats') || '{}'), impossible: newScore }))
    if (newScore >= 10 && !badges.find(b => b.id === 'impossible')?.unlocked) {
      const u = badges.map(b => b.id === 'impossible' ? { ...b, unlocked: true } : b)
      saveBadges(u)
    }
  }

  const messages = dunkScore % 5 === 0 && dunkScore > 0
    ? { msg: `Incroyable! ${dunkScore} dunks!`, color: 'var(--success)' }
    : { msg: ['Boom! 🎉', 'Dunk parfait!', 'Nice!', 'Alley-oop!'][dunkScore % 4], color: 'var(--text)' }

  const impossibleMsgs = [
    { msg: '🫤 Facile... non ?', color: '#eab308' },
    { msg: '🫥 Bof.', color: '#f59e0b' },
    { msg: '😂 Non vraiment...', color: '#ef4444' },
    { msg: '🤦 Absurde!', color: '#dc2626' },
    { msg: '💀 L\'impossible n\'existe pas?!', color: '#991b1b' }
  ]

  return (
    <div className="stats-container">
      <div className="stats-header">
        <button className="back-button" onClick={() => navigate('/')}>← Retour</button>
        <h1>Défis & Jeux</h1>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <button className={`stat-card ${tab === 'dunk' ? 'win' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setTab('dunk')}>
          <div className="stat-value" style={{ fontSize: '2.5rem' }}>🏀</div>
          <div className="stat-label">Dunk Virtuel</div>
        </button>
        <button className={`stat-card ${tab === 'impossible' ? 'win' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setTab('impossible')}>
          <div className="stat-value" style={{ fontSize: '2.5rem' }}>🎯</div>
          <div className="stat-label">Panier Impossible</div>
        </button>
        <button className={`stat-card ${tab === 'badges' ? 'win' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setTab('badges')}>
          <div className="stat-value" style={{ fontSize: '2.5rem' }}>🏅</div>
          <div className="stat-label">Mes Badges</div>
        </button>
      </div>

      {tab === 'dunk' && (
        <div className="match-statistics">
          <div className="stat-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏀</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{dunkScore} Dunks</div>
            <div style={{ fontSize: '1.2rem', color: messages.color, marginBottom: '2rem' }}>{messages.msg}</div>
            <button className="start-button" onClick={handleDunk} style={{ margin: '0.5rem' }}>DUNK!</button>
          </div>
        </div>
      )}

      {tab === 'impossible' && (
        <div className="match-statistics">
          <div className="stat-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{impossibleScore} Paniers</div>
            <div style={{ fontSize: '1.2rem', color: impossibleMsgs[Math.min(impossibleScore, 4)].color, marginBottom: '2rem' }}>
              {impossibleMsgs[Math.min(impossibleScore, 4)].msg}
            </div>
            <button className="start-button" onClick={handleImpossible} style={{ margin: '0.5rem' }}>MARQUER!</button>
          </div>
        </div>
      )}

      {tab === 'badges' && (
        <div className="match-statistics">
          <h2>Mes Badges</h2>
          <div className="stats-grid">
            {badges.map(b => (
              <div key={b.id} className={`stat-card ${b.unlocked ? 'win' : ''}`} style={{ opacity: b.unlocked ? 1 : 0.5 }}>
                <div className="stat-value" style={{ fontSize: '3rem' }}>{b.icon}</div>
                <div className="stat-label">{b.name}</div>
                <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

