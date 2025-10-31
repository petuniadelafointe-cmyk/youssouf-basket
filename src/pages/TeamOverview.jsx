import React, { useMemo, useState } from 'react'
import '../styles/TeamManagement.css'

const TEAM = [
  { id: 1, name: 'Capitaine Ali', role: 'Meneur titulaire', emoji: '🏀', story: 'Leader vocal, il doute parfois en fin de match.' },
  { id: 2, name: 'Sprinteur Max', role: 'Arrière titulaire', emoji: '⚡', story: 'Très rapide, gestion de l’endurance à améliorer.' },
  { id: 3, name: 'Sniper Malik', role: 'Ailier titulaire', emoji: '🎯', story: 'Excellent à 3 pts, a besoin de systèmes adaptés.' },
  { id: 4, name: 'Mur Ibra', role: 'Ailier fort titulaire', emoji: '🛡️', story: 'Défenseur dur, fautes rapides quand il s’énerve.' },
  { id: 5, name: 'Géant Koffi', role: 'Pivot titulaire', emoji: '🏗️', story: 'Domine au rebond, travaille les lancers-francs.' },
  { id: 6, name: 'Clutch Sadio', role: '6e homme', emoji: '🔥', story: 'Aime les moments chauds, parfois trop isolations.' },
  { id: 7, name: 'Cerveau Nina', role: 'Remplaçant', emoji: '🧠', story: 'Vision du jeu top, manque de confiance au tir.' },
  { id: 8, name: 'Glace Omar', role: 'Remplaçant', emoji: '🧊', story: 'Calme sous pression, démarre lentement les matchs.' },
  { id: 9, name: 'Acier Lamine', role: 'Remplaçant', emoji: '🛞', story: 'Costaud dans la raquette, mobilité à travailler.' },
  { id: 10, name: 'Turbo Awa', role: 'Remplaçant', emoji: '🏎️', story: 'Contre-attaques foudroyantes, pertes de balle.' },
  { id: 11, name: 'Snatch Idriss', role: 'Remplaçant', emoji: '🤾', story: 'Interceptions, mais se perd en attaque placée.' },
  { id: 12, name: 'Murielle Shot', role: 'Remplaçant', emoji: '🎯', story: 'Bonne main, timing de tir à stabiliser.' }
]

const DIALOGUE = {
  intro: (player) => [
    { id: 'p1', text: `${player.name}: Mon souci sur le terrain: ${player.story}` },
    { id: 'u1', text: 'Que veux-tu faire ?', options: [
      { id: 'c1', label: 'Donner un conseil', next: 'coach' },
      { id: 'c2', label: 'Poser une question', next: 'ask' },
      { id: 'c3', label: 'Encourager', next: 'motivate' }
    ]}
  ],
  coach: [
    { id: 'p2', text: 'Merci, je vais l’essayer à l’entraînement !' }
  ],
  ask: [
    { id: 'p3', text: 'Bonne question ! On peut revoir la vidéo du dernier match.' }
  ],
  motivate: [
    { id: 'p4', text: 'Je me sens prêt pour le prochain match, coach !' }
  ]
}

export default function TeamOverview() {
  const [selectedId, setSelectedId] = useState(TEAM[0].id)
  const [branch, setBranch] = useState('intro')

  const current = useMemo(() => TEAM.find(p => p.id === selectedId), [selectedId])
  const messages = useMemo(() => {
    if (branch === 'intro') return DIALOGUE.intro(current)
    return DIALOGUE[branch]
  }, [branch, current])

  return (
    <div className="team-container">
      <div className="team-header">
        <h1>Connaître mon équipe</h1>
      </div>

      <div className="players-grid">
        {TEAM.map(p => (
          <button
            key={p.id}
            className={`player-pill ${p.id === selectedId ? 'active' : ''}`}
            onClick={() => { setSelectedId(p.id); setBranch('intro') }}
          >
            <span className="pill-emoji">{p.emoji}</span> {p.name}
          </button>
        ))}
      </div>

      <div className="dialogue-box">
        <div className="dialogue-header">
          <div className="avatar-emoji" style={{ fontSize: '2rem' }}>{current.emoji}</div>
          <div>
            <div className="dialogue-name">{current.name}</div>
            <div className="dialogue-role">{current.role}</div>
          </div>
        </div>
        <div className="dialogue-messages">
          {messages.map(m => (
            <div key={m.id} className={`message ${m.id.startsWith('p') ? 'player' : 'user'}`}>
              <div>{m.text}</div>
              {'options' in m && (
                <div className="options">
                  {m.options.map(o => (
                    <button key={o.id} className="option-btn" onClick={() => setBranch(o.next)}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
