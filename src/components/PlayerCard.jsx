import React, { useState } from 'react';
import '../styles/PlayerCard.css';

function PlayerCard({ player, onUpgrade, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);

  const getOverallRating = () => {
    const stats = [player.speed, player.precision, player.strength, player.endurance];
    return Math.round(stats.reduce((a, b) => a + b, 0) / stats.length);
  };

  const getLevelColor = () => {
    switch(player.level) {
      case 'Legend': return '#FFD700';
      case 'All-Star': return '#FF6B6B';
      case 'Pro': return '#4ECDC4';
      default: return '#95A5A6';
    }
  };

  const getHealthColor = () => {
    if (player.health >= 80) return '#4CAF50';
    if (player.health >= 50) return '#FFA726';
    return '#EF5350';
  };

  return (
    <div className="player-card-enhanced">
      <button className="delete-btn" onClick={() => onDelete(player.id)}>×</button>
      
      <div className="card-header">
        <div className="player-avatar-large">{player.avatar}</div>
        <div className="player-main-info">
          <h3>{player.name}</h3>
          <p className="position">{player.position}</p>
          <div className="level-badge" style={{backgroundColor: getLevelColor()}}>
            {player.level}
          </div>
        </div>
        <div className="overall-rating">
          <div className="rating-circle">
            {getOverallRating()}
          </div>
          <span>NOTE</span>
        </div>
      </div>

      <div className="player-description">
        <p>{player.description}</p>
      </div>

      <div className="health-moral-bars">
        <div className="stat-display">
          <label>❤️ Santé</label>
          <div className="bar-container">
            <div 
              className="bar-fill health" 
              style={{width: `${player.health}%`, backgroundColor: getHealthColor()}}
            ></div>
            <span className="bar-value">{player.health}%</span>
          </div>
        </div>
        <div className="stat-display">
          <label>😊 Moral</label>
          <div className="bar-container">
            <div 
              className="bar-fill moral" 
              style={{width: `${player.moral}%`}}
            ></div>
            <span className="bar-value">{player.moral}%</span>
          </div>
        </div>
      </div>

      <div className="stats-detailed">
        <div className="stat-item">
          <label>⚡ Vitesse</label>
          <div className="stat-with-upgrade">
            <div className="stat-bar-container">
              <div className="stat-bar" style={{width: `${player.speed}%`}}></div>
              <span>{player.speed}</span>
            </div>
            <button className="upgrade-btn" onClick={() => onUpgrade(player.id, 'speed')}>+</button>
          </div>
        </div>

        <div className="stat-item">
          <label>🎯 Précision</label>
          <div className="stat-with-upgrade">
            <div className="stat-bar-container">
              <div className="stat-bar" style={{width: `${player.precision}%`}}></div>
              <span>{player.precision}</span>
            </div>
            <button className="upgrade-btn" onClick={() => onUpgrade(player.id, 'precision')}>+</button>
          </div>
        </div>

        <div className="stat-item">
          <label>💪 Force</label>
          <div className="stat-with-upgrade">
            <div className="stat-bar-container">
              <div className="stat-bar" style={{width: `${player.strength}%`}}></div>
              <span>{player.strength}</span>
            </div>
            <button className="upgrade-btn" onClick={() => onUpgrade(player.id, 'strength')}>+</button>
          </div>
        </div>

        <div className="stat-item">
          <label>🏃 Endurance</label>
          <div className="stat-with-upgrade">
            <div className="stat-bar-container">
              <div className="stat-bar" style={{width: `${player.endurance}%`}}></div>
              <span>{player.endurance}</span>
            </div>
            <button className="upgrade-btn" onClick={() => onUpgrade(player.id, 'endurance')}>+</button>
          </div>
        </div>
      </div>

      <div className="player-quote-card">
        <div className="quote-icon">💬</div>
        <p>"{player.quote}"</p>
      </div>

      <button 
        className="details-toggle" 
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? '▲ Moins de détails' : '▼ Plus de détails'}
      </button>

      {showDetails && (
        <div className="additional-details">
          <h4>📊 Statistiques détaillées</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Taille:</span>
              <span className="detail-value">1.98m</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Poids:</span>
              <span className="detail-value">95kg</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Âge:</span>
              <span className="detail-value">25 ans</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Matchs:</span>
              <span className="detail-value">156</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerCard;