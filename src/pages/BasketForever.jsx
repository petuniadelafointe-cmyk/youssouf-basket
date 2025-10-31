import React from 'react'
import '../styles/Statistics.css'

export default function BasketForever() {
  return (
    <div className="stats-container neutral-bg">
      <div className="stats-header">
        <h1>Basket Forever</h1>
      </div>

      <div className="match-statistics">
        <h2>Conseils pour progresser et durer</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">💪</div>
            <div className="stat-label">Renforcement</div>
            <p>Travaille le tronc, hanches et chevilles. Une base forte protège tes genoux et améliore tes changements de direction.</p>
          </div>
          <div className="stat-card">
            <div className="stat-value">🧠</div>
            <div className="stat-label">Intelligence de jeu</div>
            <p>Regarde des matchs, coupe les temps morts, analyse le spacing et les rotations défensives. Comprendre te rend plus rapide que courir.</p>
          </div>
          <div className="stat-card">
            <div className="stat-value">⏱️</div>
            <div className="stat-label">Routine</div>
            <p>20-30 min/jour: 50 layups main faible, 100 tirs mi-distance, 50 tirs à 3 pts en séries, 5 min dribbles yeux levés.</p>
          </div>
          <div className="stat-card">
            <div className="stat-value">🩺</div>
            <div className="stat-label">Après blessure</div>
            <p>Reprise progressive: mobilité sans douleur → renfo isométrique → pliométrie légère → situations de jeu. Écoute la douleur, consulte un pro.</p>
          </div>
          <div className="stat-card">
            <div className="stat-value">🥗</div>
            <div className="stat-label">Récupération</div>
            <p>Sommeil 7-9h, hydratation, protéines suffisantes. Étirements doux post-match et respiration pour redescendre le stress.</p>
          </div>
          <div className="stat-card">
            <div className="stat-value">🔥</div>
            <div className="stat-label">Mental</div>
            <p>Fixe des objectifs SMART, visualise 2 min/jour des actions réussies, célèbre les petits progrès.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
