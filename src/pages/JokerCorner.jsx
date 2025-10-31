import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Statistics.css'

const JOKES = [
  'Pourquoi les basketteurs ne font jamais confiance aux murs ? Parce qu\'ils passent toujours à côté !',
  'Quelle est la différence entre LeBron et un GPS ? Aucune, tous les deux te guident vers le succès... sauf que LeBron ne bug jamais !',
  'Pourquoi Jordan ne joue jamais au Monopoly ? Parce qu\'il achète tout d\'un coup.',
  'Kobe est dans un ascenseur. L\'ascenseur tombe, mais lui... tombe à 81 points.',
  'Qu\'est-ce qu\'un dunk de Shaq et un météore ont en commun ? Quand ils touchent, ça fait BOOM.',
  'Pourquoi Stephen Curry n\'utilise jamais de casque audio ? Parce qu\'il entend déjà les rims pleurer.',
  'Que dit Magic Johnson en réunion d\'équipe ? "Passons le ballon... et les responsabilités !"',
  'Différence entre un tireur NBA et un tireur d\'élite ? Le tireur NBA fait 40 millions par saison.',
  'Pourquoi les joueurs NBA n\'aiment pas les maths ? Trop de calculs dans les contrats.',
  'Tu sais que t\'es un fan quand tu connais mieux les stats de LeBron que ton propre âge.'
]

export default function JokerCorner() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setCurrent(Math.floor(Math.random() * JOKES.length))
  }, [])

  const nextJoke = () => {
    setCurrent(Math.floor(Math.random() * JOKES.length))
  }

  return (
    <div className="stats-container joker-bg">
      <div className="stats-header">
        <button className="back-button" onClick={() => navigate('/')}>← Retour</button>
        <h1>Coin du Joker 🃏</h1>
      </div>

      <div className="match-statistics">
        <div className="stat-card" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>😏</div>
          <div style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.8', fontStyle: 'italic' }}>
            "{JOKES[current]}"
          </div>
          <button className="start-button" onClick={nextJoke} style={{ margin: '0.5rem' }}>
            Nouvelle Blague
          </button>
          <div style={{ fontSize: '0.9rem', marginTop: '2rem', opacity: 0.8 }}>
            {current + 1}/{JOKES.length} • Chaque clic = Absurdité garantie
          </div>
        </div>

        <div className="stats-grid" style={{ marginTop: '2rem' }}>
          <div className="stat-card">
            <div className="stat-value" style={{ fontSize: '3rem' }}>🤣</div>
            <div className="stat-label">Humour Noir</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ fontSize: '3rem' }}>💀</div>
            <div className="stat-label">Sarcasme Max</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ fontSize: '3rem' }}>🎭</div>
            <div className="stat-label">100% Absurde</div>
          </div>
        </div>
      </div>
    </div>
  )
}

