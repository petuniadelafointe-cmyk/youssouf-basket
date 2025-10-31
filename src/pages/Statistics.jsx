import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Statistics.css'

function Statistics() {
  const navigate = useNavigate()
  const [players, setPlayers] = useState([])
  const [matchStats, setMatchStats] = useState({ played: 0, won: 0, lost: 0, drawn: 0 })

  useEffect(() => {
    const savedPlayers = localStorage.getItem('players')
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers))
    }

    const savedStats = localStorage.getItem('matchStats')
    if (savedStats) {
      setMatchStats(JSON.parse(savedStats))
    }
  }, [])

  const winRate = matchStats.played > 0 
    ? ((matchStats.won / matchStats.played) * 100).toFixed(1) 
    : 0

  return (
    <div className="stats-container">
      <div className="stats-header">
        <button className="back-button" onClick={() => navigate('/simulate')}>← Retour</button>
        <h1>Statistiques</h1>
      </div>

      <div className="match-statistics">
        <h2>📊 Statistiques des Matchs</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{matchStats.played}</div>
            <div className="stat-label">Matchs Joués</div>
          </div>
          <div className="stat-card win">
            <div className="stat-value">{matchStats.won}</div>
            <div className="stat-label">Victoires</div>
          </div>
          <div className="stat-card loss">
            <div className="stat-value">{matchStats.lost}</div>
            <div className="stat-label">Défaites</div>
          </div>
          <div className="stat-card draw">
            <div className="stat-value">{matchStats.drawn}</div>
            <div className="stat-label">Matchs Nuls</div>
          </div>
          <div className="stat-card rate">
            <div className="stat-value">{winRate}%</div>
            <div className="stat-label">Taux de Victoire</div>
          </div>
        </div>
      </div>

      <div className="players-statistics">
        <h2>👥 Statistiques des Joueurs</h2>
        <div className="players-table">
          <div className="table-header">
            <div>Joueur</div>
            <div>Position</div>
            <div>Vitesse</div>
            <div>Précision</div>
            <div>Force</div>
            <div>Note</div>
          </div>
          {players.map(player => {
            const overall = Math.round((player.speed + player.precision + player.strength) / 3)
            return (
              <div key={player.id} className="table-row">
                <div className="player-name">
                  <span className="player-emoji">{player.image}</span>
                  {player.name}
                </div>
                <div>{player.position}</div>
                <div className="stat-bar">
                  <div className="bar" style={{width: `${player.speed}%`}}></div>
                  <span>{player.speed}</span>
                </div>
                <div className="stat-bar">
                  <div className="bar" style={{width: `${player.precision}%`}}></div>
                  <span>{player.precision}</span>
                </div>
                <div className="stat-bar">
                  <div className="bar" style={{width: `${player.strength}%`}}></div>
                  <span>{player.strength}</span>
                </div>
                <div className={`overall ${overall >= 80 ? 'excellent' : overall >= 60 ? 'good' : 'average'}`}>
                  {overall}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Statistics
