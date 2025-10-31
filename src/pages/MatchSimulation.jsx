import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MatchSimulation.css';

function MatchSimulation() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [matchResult, setMatchResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [commentary, setCommentary] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameTime, setGameTime] = useState('12:00');
  const [quarter, setQuarter] = useState(1);

  useEffect(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      const parsedPlayers = JSON.parse(savedPlayers);
      setPlayers(parsedPlayers);
      generateOpponentTeam(parsedPlayers);
    }
  }, []);

  const generateOpponentTeam = (myTeam) => {
    const teamNames = ['Lions', 'Eagles', 'Sharks', 'Wolves', 'Tigers', 'Dragons'];
    const randomTeam = teamNames[Math.floor(Math.random() * teamNames.length)];
    
    const avgStrength = myTeam.reduce((acc, p) => 
      acc + (p.speed + p.precision + p.strength) / 3, 0) / myTeam.length;
    
    const variation = 10;
    
    const opponents = [
      { name: 'Marcus', position: 'Meneur', avatar: '👨‍🦰', stats: Math.round(avgStrength + (Math.random() * variation - variation/2)) },
      { name: 'James', position: 'Arrière', avatar: '👨🏾', stats: Math.round(avgStrength + (Math.random() * variation - variation/2)) },
      { name: 'Kevin', position: 'Ailier', avatar: '👨🏼', stats: Math.round(avgStrength + (Math.random() * variation - variation/2)) },
      { name: 'Paul', position: 'Ailier fort', avatar: '👨🏻‍🦲', stats: Math.round(avgStrength + (Math.random() * variation - variation/2)) },
      { name: 'Anthony', position: 'Pivot', avatar: '👨🏿‍🦱', stats: Math.round(avgStrength + (Math.random() * variation - variation/2)) }
    ];
    
    setOpponentTeam({ name: randomTeam, players: opponents });
  };

  const simulateMatch = () => {
    if (players.length < 5) {
      alert('Tu dois avoir au moins 5 joueurs pour jouer un match !');
      return;
    }

    setIsSimulating(true);
    setMatchResult(null);
    setCommentary([]);
    setMyScore(0);
    setOpponentScore(0);
    setGameTime('12:00');
    setQuarter(1);

    const comments = [];
    let myCurrentScore = 0;
    let oppCurrentScore = 0;

    comments.push('🏀 Le match commence ! Les deux équipes sont sur le terrain.');
    
    const playByPlay = [
      { time: '11:30', action: 'offensive', team: 'my' },
      { time: '11:00', action: 'defensive', team: 'opp' },
      { time: '10:30', action: 'offensive', team: 'opp' },
      { time: '10:00', action: 'defensive', team: 'my' },
      { time: '9:30', action: 'offensive', team: 'my' },
      { time: '9:00', action: 'offensive', team: 'opp' },
      { time: '8:30', action: 'defensive', team: 'opp' },
      { time: '8:00', action: 'offensive', team: 'my' },
      { time: '7:30', action: 'offensive', team: 'my' },
      { time: '7:00', action: 'defensive', team: 'my' },
      { time: '6:30', action: 'offensive', team: 'opp' },
      { time: '6:00', action: 'offensive', team: 'my' },
      { time: '5:30', action: 'defensive', team: 'opp' },
      { time: '5:00', action: 'offensive', team: 'opp' },
      { time: '4:30', action: 'offensive', team: 'my' },
      { time: '4:00', action: 'defensive', team: 'my' },
      { time: '3:30', action: 'offensive', team: 'opp' },
      { time: '3:00', action: 'offensive', team: 'my' },
      { time: '2:30', action: 'offensive', team: 'opp' },
      { time: '2:00', action: 'offensive', team: 'my' }
    ];

    let delay = 500;
    playByPlay.forEach((play, index) => {
      setTimeout(() => {
        setGameTime(play.time);
        
        if (play.team === 'my') {
          const randomPlayer = players[Math.floor(Math.random() * players.length)];
          const successRate = (randomPlayer.precision + randomPlayer.speed) / 2;
          const isSuccess = Math.random() * 100 < successRate;
          
          if (play.action === 'offensive') {
            if (isSuccess) {
              const points = Math.random() > 0.7 ? 3 : 2;
              myCurrentScore += points;
              setMyScore(myCurrentScore);
              const action = points === 3 ? 'marque un panier à 3 points ! 🎯' : 'marque 2 points ! 🏀';
              comments.push(`⏱️ ${play.time} - ${randomPlayer.name} ${action}`);
            } else {
              comments.push(`⏱️ ${play.time} - ${randomPlayer.name} tente un tir... raté ! 😔`);
            }
          } else {
            comments.push(`⏱️ ${play.time} - Belle défense de ${randomPlayer.name} ! 🛡️`);
          }
        } else {
          const randomOpp = opponentTeam.players[Math.floor(Math.random() * opponentTeam.players.length)];
          const successRate = randomOpp.stats;
          const isSuccess = Math.random() * 100 < successRate;
          
          if (play.action === 'offensive') {
            if (isSuccess) {
              const points = Math.random() > 0.7 ? 3 : 2;
              oppCurrentScore += points;
              setOpponentScore(oppCurrentScore);
              const action = points === 3 ? 'marque à 3 points' : 'marque 2 points';
              comments.push(`⏱️ ${play.time} - ${randomOpp.name} (${opponentTeam.name}) ${action}`);
            } else {
              comments.push(`⏱️ ${play.time} - ${randomOpp.name} rate son tir`);
            }
          }
        }
        
        setCommentary([...comments]);
        
        if (index === playByPlay.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            
            let result = '';
            let message = '';
            let playerReactions = [];
            
            if (myCurrentScore > oppCurrentScore) {
              result = 'Victoire';
              message = `🎉 VICTOIRE ! Ton équipe a gagné ${myCurrentScore}-${oppCurrentScore} !`;
              playerReactions = [
                `${players[0]?.name}: "Quelle victoire ! On a tout donné ! 💪"`,
                `${players[1]?.name}: "Bravo coach, excellente stratégie !"`,
                `${players[2]?.name}: "On forme une vraie équipe ! 🏆"`
              ];
            } else if (myCurrentScore < oppCurrentScore) {
              result = 'Défaite';
              message = `😔 Défaite... ${myCurrentScore}-${oppCurrentScore}. On fera mieux la prochaine fois !`;
              playerReactions = [
                `${players[0]?.name}: "On a bien joué, mais on peut faire mieux..."`,
                `${players[1]?.name}: "La prochaine fois sera la bonne !"`,
                `${players[2]?.name}: "On va s'entraîner plus dur ! 💪"`
              ];
            } else {
              result = 'Match nul';
              message = `🤝 Match nul ${myCurrentScore}-${oppCurrentScore} ! Match très serré !`;
              playerReactions = [
                `${players[0]?.name}: "On était si proche de la victoire !"`,
                `${players[1]?.name}: "Match équilibré, ils étaient forts"`,
                `${players[2]?.name}: "On les aura la prochaine fois !"`
              ];
            }

            const stats = JSON.parse(localStorage.getItem('matchStats') || '{"played": 0, "won": 0, "lost": 0, "drawn": 0}');
            stats.played += 1;
            if (result === 'Victoire') stats.won += 1;
            else if (result === 'Défaite') stats.lost += 1;
            else stats.drawn += 1;
            localStorage.setItem('matchStats', JSON.stringify(stats));

            setMatchResult({
              myScore: myCurrentScore,
              opponentScore: oppCurrentScore,
              result,
              message,
              playerReactions
            });
          }, 1000);
        }
      }, delay * index);
    });
  };

  return (
    <div className="simulation-container">
      <div className="simulation-header">
        <button className="back-button" onClick={() => navigate('/team')}>← Retour</button>
        <h1>🏀 Match de Basket</h1>
        <button className="stats-button" onClick={() => navigate('/stats')}>Statistiques 📊</button>
      </div>

      <div className="scoreboard">
        <div className="score-display">
          <div className="team-score my">
            <h3>Mon Équipe</h3>
            <div className="score-number">{myScore}</div>
          </div>
          <div className="game-info">
            <div className="quarter">Q{quarter}</div>
            <div className="time">{gameTime}</div>
          </div>
          <div className="team-score opponent">
            <h3>{opponentTeam.name || 'Adversaire'}</h3>
            <div className="score-number">{opponentScore}</div>
          </div>
        </div>
      </div>

      <div className="court-container">
        <div className="basketball-court">
          <div className="court-line center-circle"></div>
          <div className="court-line three-point-line left"></div>
          <div className="court-line three-point-line right"></div>
          
          <div className="team-positions my-team-positions">
            <h4>🏆 Mon Équipe</h4>
            {players.slice(0, 5).map((player, index) => (
              <div key={player.id} className={`player-on-court pos-${index}`}>
                <span className="player-avatar">{player.avatar}</span>
                <span className="player-name">{player.name}</span>
              </div>
            ))}
          </div>

          <div className="team-positions opponent-positions">
            <h4>⚔️ {opponentTeam.name}</h4>
            {opponentTeam.players?.slice(0, 5).map((player, index) => (
              <div key={index} className={`player-on-court opp pos-${index}`}>
                <span className="player-avatar">{player.avatar}</span>
                <span className="player-name">{player.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="commentary-box">
        <h3>📢 Commentaires en direct</h3>
        <div className="commentary-feed">
          {commentary.map((comment, index) => (
            <div key={index} className="comment-line">
              {comment}
            </div>
          ))}
          {commentary.length === 0 && !isSimulating && (
            <p className="no-commentary">Clique sur "Lancer le match" pour commencer !</p>
          )}
        </div>
      </div>

      {matchResult && (
        <div className={`result-box ${matchResult.result.toLowerCase()}`}>
          <h2>{matchResult.result}</h2>
          <p className="result-message">{matchResult.message}</p>
          <div className="player-reactions">
            <h4>💬 Réactions des joueurs :</h4>
            {matchResult.playerReactions.map((reaction, index) => (
              <p key={index} className="reaction">{reaction}</p>
            ))}
          </div>
        </div>
      )}

      <button 
        className="simulate-btn" 
        onClick={simulateMatch}
        disabled={isSimulating}
      >
        {isSimulating ? '⏳ Match en cours...' : '🏀 Lancer le match'}
      </button>
    </div>
  );
}

export default MatchSimulation;