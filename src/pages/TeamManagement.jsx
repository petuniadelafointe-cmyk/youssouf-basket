import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/TeamManagement.css'

function TeamManagement() {
  const navigate = useNavigate()
  const [players, setPlayers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState({})

  useEffect(() => {
    const savedPlayers = localStorage.getItem('players')
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers))
    } else {
      const defaultPlayers = [
        { id: 1, name: 'Youssouf', position: 'Meneur', speed: 85, precision: 80, strength: 75, defense: 78, endurance: 90, health: 100, medicalRecord: 'Aucun antécédent', lastMeal: 'Pâtes au poulet', drinksAlcohol: false },
        { id: 2, name: 'Kylian', position: 'Ailier', speed: 95, precision: 85, strength: 70, defense: 74, endurance: 88, health: 97, medicalRecord: 'Entorse cheville 2023', lastMeal: 'Riz + poisson', drinksAlcohol: false },
        { id: 3, name: 'Mohamed', position: 'Arrière', speed: 75, precision: 90, strength: 80, defense: 82, endurance: 85, health: 99, medicalRecord: 'Tendinite épaule 2022', lastMeal: 'Salade protéinée', drinksAlcohol: false },
        { id: 4, name: 'Sadio', position: 'Ailier fort', speed: 90, precision: 85, strength: 88, defense: 86, endurance: 92, health: 95, medicalRecord: 'Fracture doigt 2021', lastMeal: 'Quinoa + poulet', drinksAlcohol: false },
        { id: 5, name: 'Karim', position: 'Pivot', speed: 70, precision: 92, strength: 95, defense: 90, endurance: 80, health: 93, medicalRecord: 'Lombalgie passée', lastMeal: 'Omelette, toasts', drinksAlcohol: false }
      ]
      setPlayers(defaultPlayers)
      localStorage.setItem('players', JSON.stringify(defaultPlayers))
    }
  }, [])

  const savePlayers = (updated) => {
    setPlayers(updated)
    localStorage.setItem('players', JSON.stringify(updated))
  }

  const addPlayer = () => {
    const newPlayer = {
      id: Date.now(), name: `Joueur ${players.length + 1}`, position: 'Remplaçant',
      speed: 60, precision: 60, strength: 60, defense: 60, endurance: 60, health: 100,
      medicalRecord: '—', lastMeal: '—', drinksAlcohol: false
    }
    savePlayers([...players, newPlayer])
  }

  const removePlayer = (id) => {
    savePlayers(players.filter(p => p.id !== id))
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setEditDraft({ ...p })
  }
  const cancelEdit = () => {
    setEditingId(null)
    setEditDraft({})
  }
  const commitEdit = () => {
    const updated = players.map(p => (p.id === editingId ? { ...p, ...editDraft, speed: clamp(editDraft.speed), precision: clamp(editDraft.precision), strength: clamp(editDraft.strength), defense: clamp(editDraft.defense), endurance: clamp(editDraft.endurance), health: clamp(editDraft.health) } : p))
    savePlayers(updated)
    cancelEdit()
  }

  const clamp = (v) => Math.max(0, Math.min(100, Number(v)))

  const teamAverage = (key) => players.length ? Math.round(players.reduce((a, p) => a + (Number(p[key]) || 0), 0) / players.length) : 0

  return (
    <div className="team-container">
      <div className="team-header">
        <button className="back-button" onClick={() => navigate('/')}>← Retour</button>
        <h1>Tableau de bord équipe</h1>
        <button className="simulate-button" onClick={() => navigate('/simulate')}>Jouer un match 🎮</button>
      </div>

      <div className="dashboard-cards">
        <div className="dash-card"><div className="dash-title">Joueurs</div><div className="dash-value">{players.length}</div></div>
        <div className="dash-card"><div className="dash-title">Vitesse moy.</div><div className="dash-value">{teamAverage('speed')}</div></div>
        <div className="dash-card"><div className="dash-title">Défense moy.</div><div className="dash-value">{teamAverage('defense')}</div></div>
        <div className="dash-card"><div className="dash-title">Santé moy.</div><div className="dash-value">{teamAverage('health')}%</div></div>
      </div>

      <div className="table-wrap">
        <table className="players-table pro">
          <thead>
            <tr>
              <th>Joueur</th>
              <th>Poste</th>
              <th>Vitesse</th>
              <th>Précision</th>
              <th>Force</th>
              <th>Défense</th>
              <th>Endurance</th>
              <th>Santé</th>
              <th>Dossier médical</th>
              <th>Dernier repas</th>
              <th>Alcool</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p.id} className={editingId === p.id ? 'editing' : ''}>
                <td className="player-col">
                  <div className="player-name-cell">
                    <div className="avatar-circle">{p.name.charAt(0)}</div>
                    {editingId === p.id ? (
                      <input value={editDraft.name} onChange={e => setEditDraft({ ...editDraft, name: e.target.value })} />
                    ) : (
                      <div className="player-name">{p.name}</div>
                    )}
                  </div>
                </td>
                <td>{editingId === p.id ? (
                  <input value={editDraft.position} onChange={e => setEditDraft({ ...editDraft, position: e.target.value })} />
                ) : p.position}</td>
                {['speed','precision','strength','defense','endurance','health'].map(key => (
                  <td key={key}>
                    {editingId === p.id ? (
                      <input type="number" min="0" max="100" value={editDraft[key]} onChange={e => setEditDraft({ ...editDraft, [key]: e.target.value })} />
                    ) : (
                      <div className="meter">
                        <div className="bar" style={{ width: `${clamp(p[key])}%` }} />
                        <span>{clamp(p[key])}%</span>
                      </div>
                    )}
                  </td>
                ))}
                <td>{editingId === p.id ? (
                  <input value={editDraft.medicalRecord} onChange={e => setEditDraft({ ...editDraft, medicalRecord: e.target.value })} />
                ) : p.medicalRecord}</td>
                <td>{editingId === p.id ? (
                  <input value={editDraft.lastMeal} onChange={e => setEditDraft({ ...editDraft, lastMeal: e.target.value })} />
                ) : p.lastMeal}</td>
                <td>{editingId === p.id ? (
                  <label className="toggle">
                    <input type="checkbox" checked={!!editDraft.drinksAlcohol} onChange={e => setEditDraft({ ...editDraft, drinksAlcohol: e.target.checked })} />
                    <span />
                  </label>
                ) : (
                  <span className={`badge ${p.drinksAlcohol ? 'bad' : 'good'}`}>{p.drinksAlcohol ? 'Oui' : 'Non'}</span>
                )}</td>
                <td className="actions">
                  {editingId === p.id ? (
                    <>
                      <button className="ghost-button" onClick={commitEdit}>Enregistrer</button>
                      <button className="ghost-button" onClick={cancelEdit}>Annuler</button>
                    </>
                  ) : (
                    <>
                      <button className="ghost-button" onClick={() => startEdit(p)}>Éditer</button>
                      <button className="ghost-button" onClick={() => removePlayer(p.id)}>Supprimer</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="add-player-button" onClick={addPlayer}>+ Ajouter un joueur</button>
    </div>
  )
}

export default TeamManagement