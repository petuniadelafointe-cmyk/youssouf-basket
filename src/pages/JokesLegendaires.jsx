import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Statistics.css'

const PLAYERS = {
  all: 'Tous les joueurs',
  lebron: 'LeBron James',
  jordan: 'Michael Jordan',
  kobe: 'Kobe Bryant',
  curry: 'Stephen Curry',
  shaq: 'Shaquille O\'Neal'
}

const DEFAULT_JOKES = [
  { id: 1, joke: "Pourquoi LeBron a toujours un téléphone sur lui ? Parce qu'il appelle le championnat chaque année.", player: 'lebron', rating: 0 },
  { id: 2, joke: "Jordan entre dans un bar. Le barman lui dit : 'Salut Mike!' Jordan répond : 'Appelle-moi MVP.'", player: 'jordan', rating: 0 },
  { id: 3, joke: "Qu'est-ce que Kobe et un lance-fusées ont en commun ? Les deux font boom de n'importe où.", player: 'kobe', rating: 0 },
  { id: 4, joke: "Pourquoi Curry ne va jamais en boîte ? Parce qu'il tire déjà assez de 3 points.", player: 'curry', rating: 0 },
  { id: 5, joke: "Que dit Shaq quand il rit ? RIM SHATTER.", player: 'shaq', rating: 0 },
  { id: 6, joke: "LeBron lit ses contrats plus vite qu'un contre-attaque.", player: 'lebron', rating: 0 },
  { id: 7, joke: "Jordan ne perd pas… il laisse des légendes naître.", player: 'jordan', rating: 0 },
  { id: 8, joke: "Kobe vise la lune, et s'il rate… c'est 3 points quand même.", player: 'kobe', rating: 0 },
  { id: 9, joke: "Curry ne cuit pas des pâtes, il les '3'-cuit.", player: 'curry', rating: 0 },
  { id: 10, joke: "Quand Shaq s'assoit sur un banc, c'est un temps mort pour le bois.", player: 'shaq', rating: 0 },
  { id: 11, joke: "LeBron signe là où la gravité baisse au money time.", player: 'lebron', rating: 0 },
  { id: 12, joke: "Jordan compte les moutons en step-back.", player: 'jordan', rating: 0 },
  { id: 13, joke: "Kobe donnait des devoirs au panier: 'Rends-moi 81 lignes.'", player: 'kobe', rating: 0 },
  { id: 14, joke: "Curry fait pleurer les arcs: trop de trajectoires parfaites.", player: 'curry', rating: 0 },
  { id: 15, joke: "Shaq ne casse pas les panneaux; ils démissionnent.", player: 'shaq', rating: 0 },
  { id: 16, joke: "LeBron a deux saisons: régulière et historique.", player: 'lebron', rating: 0 },
  { id: 17, joke: "Jordan n'a pas de montre, il a le 'Jordan time'.", player: 'jordan', rating: 0 },
  { id: 18, joke: "Kobe ne faisait pas du trash talk, il faisait de la poésie guerrière.", player: 'kobe', rating: 0 },
  { id: 19, joke: "Curry n'a pas la main chaude, il a le soleil dans la main.", player: 'curry', rating: 0 },
  { id: 20, joke: "Shaq a inventé le mot 'dunkologue'.", player: 'shaq', rating: 0 },
  { id: 21, joke: "LeBron change la météo: annonce de finals.", player: 'lebron', rating: 0 },
  { id: 22, joke: "Jordan ne suit pas les règles de la gravité; elles le suivent.", player: 'jordan', rating: 0 },
  { id: 23, joke: "Kobe a laissé des fantômes sur chaque parquet.", player: 'kobe', rating: 0 },
  { id: 24, joke: "Curry vise si bien que les filets signent des pétitions.", player: 'curry', rating: 0 },
  { id: 25, joke: "Shaq mesure les distances en 'dunks'.", player: 'shaq', rating: 0 },
  { id: 26, joke: "LeBron a un GPS intégré: direction l'anneau.", player: 'lebron', rating: 0 },
  { id: 27, joke: "Jordan n'a pas besoin d'ailes pour voler.", player: 'jordan', rating: 0 },
  { id: 28, joke: "Kobe parlait au panier. Le panier répondait: 'Oui, monsieur'.", player: 'kobe', rating: 0 },
  { id: 29, joke: "Curry a mis un filtre beauté sur la ligne à 3 points.", player: 'curry', rating: 0 },
  { id: 30, joke: "Shaq n'a pas de fauteuil; il a un trône anti-slam.", player: 'shaq', rating: 0 },
  { id: 31, joke: "LeBron ne vieillit pas, il patch sa mise à jour.", player: 'lebron', rating: 0 },
  { id: 32, joke: "Jordan a laissé la peur dans le vestiaire.", player: 'jordan', rating: 0 },
  { id: 33, joke: "Kobe: 'Si tu me vois reculer, c'est pour mieux te pulvériser.'", player: 'kobe', rating: 0 },
  { id: 34, joke: "Curry confond la ligne médiane avec un spot de tir.", player: 'curry', rating: 0 },
  { id: 35, joke: "Shaq a un abonnement 'panneaux cassés'.", player: 'shaq', rating: 0 },
  { id: 36, joke: "LeBron fait ses courses en fast break.", player: 'lebron', rating: 0 },
  { id: 37, joke: "Jordan: 'Le seul défaut de l'air? Il n'a pas ma signature.'", player: 'jordan', rating: 0 },
  { id: 38, joke: "Kobe a transformé le panier en confessionnal.", player: 'kobe', rating: 0 },
  { id: 39, joke: "Curry a inventé la passe à 3 points (pour lui-même).", player: 'curry', rating: 0 },
  { id: 40, joke: "Shaq n'enfile pas ses chaussures, il les dompte.", player: 'shaq', rating: 0 },
  { id: 41, joke: "LeBron fait des alley-oops avec le destin.", player: 'lebron', rating: 0 },
  { id: 42, joke: "Jordan compte ses moutons par bagues.", player: 'jordan', rating: 0 },
  { id: 43, joke: "Kobe écrivait son nom en filet.", player: 'kobe', rating: 0 },
  { id: 44, joke: "Curry: 'La distance, c'est une opinion.'", player: 'curry', rating: 0 },
  { id: 45, joke: "Shaq rit en dunk majeur.", player: 'shaq', rating: 0 },
  { id: 46, joke: "LeBron a un passeport pour les Finales.", player: 'lebron', rating: 0 },
  { id: 47, joke: "Jordan a mis le 'Air' dans l'air.", player: 'jordan', rating: 0 },
  { id: 48, joke: "Kobe a appris au chrono à respecter le money time.", player: 'kobe', rating: 0 },
  { id: 49, joke: "Curry arrose le filet, pas le jardin.", player: 'curry', rating: 0 },
  { id: 50, joke: "Shaq ne prend pas l'ascenseur; il le poste.", player: 'shaq', rating: 0 },
  { id: 51, joke: "LeBron signe des posters en haute altitude.", player: 'lebron', rating: 0 },
  { id: 52, joke: "Jordan met des cross à l'ennui.", player: 'jordan', rating: 0 },
  { id: 53, joke: "Kobe a mis 81 points… et la barre encore plus haut.", player: 'kobe', rating: 0 },
  { id: 54, joke: "Curry cuisine: recette 3 points al dente.", player: 'curry', rating: 0 },
  { id: 55, joke: "Shaq a inventé la météo: probabilité 100% de dunk.", player: 'shaq', rating: 0 },
  { id: 56, joke: "LeBron n'a pas de limites, il a des prolongations.", player: 'lebron', rating: 0 },
  { id: 57, joke: "Jordan mesure les rêves en bagues.", player: 'jordan', rating: 0 },
  { id: 58, joke: "Kobe a laissé sa signature sur chaque mi-temps.", player: 'kobe', rating: 0 },
  { id: 59, joke: "Curry a mis un code promo sur la ligne à 3.", player: 'curry', rating: 0 },
  { id: 60, joke: "Shaq: 'Le cercle? Un ancien ami.'", player: 'shaq', rating: 0 },
  { id: 61, joke: "LeBron construit des équipes comme des gratte-ciel.", player: 'lebron', rating: 0 },
  { id: 62, joke: "Jordan: 'La chance s'entraîne.'", player: 'jordan', rating: 0 },
  { id: 63, joke: "Kobe laissait des braises sur le parquet.", player: 'kobe', rating: 0 },
  { id: 64, joke: "Curry a un aimant dans la balle.", player: 'curry', rating: 0 },
  { id: 65, joke: "Shaq, unité de mesure: '1 shaquille' de puissance.", player: 'shaq', rating: 0 },
  { id: 66, joke: "LeBron: 'Chef de projet: Finale'.", player: 'lebron', rating: 0 },
  { id: 67, joke: "Jordan a des miles aériens illimités.", player: 'jordan', rating: 0 },
  { id: 68, joke: "Kobe a mis le 'mamba' dans mentalité.", player: 'kobe', rating: 0 },
  { id: 69, joke: "Curry: 'Green light depuis la cuisine.'", player: 'curry', rating: 0 },
  { id: 70, joke: "Shaq n'a pas de surnoms, il a un dictionnaire.", player: 'shaq', rating: 0 },
  { id: 71, joke: "LeBron est abonné aux finales comme Netflix.", player: 'lebron', rating: 0 },
  { id: 72, joke: "Jordan a une carte fidélité chez l'Histoire.", player: 'jordan', rating: 0 },
  { id: 73, joke: "Kobe n'éteint pas la lumière; il la clutch.", player: 'kobe', rating: 0 },
  { id: 74, joke: "Curry marque avant que le ralenti ne commence.", player: 'curry', rating: 0 },
  { id: 75, joke: "Shaq: tremblement de terre, magnitude dunk.", player: 'shaq', rating: 0 },
  { id: 76, joke: "LeBron écrit en majuscules: GOAT?", player: 'lebron', rating: 0 },
  { id: 77, joke: "Jordan met la pression au tableau d'affichage.", player: 'jordan', rating: 0 },
  { id: 78, joke: "Kobe: 'Travail. Encore.'", player: 'kobe', rating: 0 },
  { id: 79, joke: "Curry a une tête chercheuse dans la balle.", player: 'curry', rating: 0 },
  { id: 80, joke: "Shaq ne shoote pas, il annonce la météo.", player: 'shaq', rating: 0 },
  { id: 81, joke: "LeBron: biographie en sept matchs.", player: 'lebron', rating: 0 },
  { id: 82, joke: "Jordan ne saute pas, le sol recule.", player: 'jordan', rating: 0 },
  { id: 83, joke: "Kobe signe ses autographes en fadeaway.", player: 'kobe', rating: 0 },
  { id: 84, joke: "Curry: 'Distance? Oui.'", player: 'curry', rating: 0 },
  { id: 85, joke: "Shaq: 'Le cercle n'était pas prêt.'", player: 'shaq', rating: 0 },
  { id: 86, joke: "LeBron a des plans quinquennaux en finales.", player: 'lebron', rating: 0 },
  { id: 87, joke: "Jordan a mis 'air' en majuscule.", player: 'jordan', rating: 0 },
  { id: 88, joke: "Kobe a appris aux défenseurs l'humilité.", player: 'kobe', rating: 0 },
  { id: 89, joke: "Curry fait du yoga avec la trajectoire.", player: 'curry', rating: 0 },
  { id: 90, joke: "Shaq: mode 'backboard breaker'.", player: 'shaq', rating: 0 },
  { id: 91, joke: "LeBron planifie des parades avant la saison.", player: 'lebron', rating: 0 },
  { id: 92, joke: "Jordan a donné son numéro à la légende.", player: 'jordan', rating: 0 },
  { id: 93, joke: "Kobe: 'Les excuses ne marquent pas.'", player: 'kobe', rating: 0 },
  { id: 94, joke: "Curry: 'Catch-and-splash.'", player: 'curry', rating: 0 },
  { id: 95, joke: "Shaq prend l'avion? Non, il dunk vers la destination.", player: 'shaq', rating: 0 },
  { id: 96, joke: "LeBron lit la défense comme un livre audio.", player: 'lebron', rating: 0 },
  { id: 97, joke: "Jordan signe 'Air-mail'.", player: 'jordan', rating: 0 },
  { id: 98, joke: "Kobe a mis des alarmes sur les quarts-temps.", player: 'kobe', rating: 0 },
  { id: 99, joke: "Curry a une adresse: Ligne à 3, Parquet City.", player: 'curry', rating: 0 },
  { id: 100, joke: "Shaq a une application: 'Smashboard'.", player: 'shaq', rating: 0 }
]

export default function JokesLegendaires() {
  const navigate = useNavigate()
  const [jokes, setJokes] = useState([])
  const [filter, setFilter] = useState('all')
  const [newJoke, setNewJoke] = useState({ text: '', player: 'lebron' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('legendJokes') || 'null')
    setJokes(saved || DEFAULT_JOKES)
  }, [])

  const saveJokes = (updated) => {
    setJokes(updated)
    localStorage.setItem('legendJokes', JSON.stringify(updated))
  }

  const rate = (id, rating) => {
    const u = jokes.map(j => j.id === id ? { ...j, rating } : j)
    saveJokes(u)
  }

  const addJoke = () => {
    if (!newJoke.text.trim()) return
    const j = { id: Date.now(), joke: newJoke.text, player: newJoke.player, rating: 0 }
    saveJokes([...jokes, j])
    setNewJoke({ text: '', player: 'lebron' })
    setShowForm(false)
  }

  const filtered = filter === 'all' ? jokes : jokes.filter(j => j.player === filter)

  return (
    <div className="stats-container">
      <div className="stats-header">
        <button className="back-button" onClick={() => navigate('/')}>← Retour</button>
        <h1>Blagues Légendaires 😄</h1>
        <button className="start-button" style={{ margin: 0 }} onClick={() => setShowForm(v => !v)}>
          + Ajouter
        </button>
      </div>

      {showForm && (
        <div className="stat-card" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          <div style={{ marginBottom: '1rem' }}>Nouvelle blague</div>
          <textarea
            value={newJoke.text}
            onChange={e => setNewJoke({ ...newJoke, text: e.target.value })}
            placeholder="Écris ta blague..."
            style={{ width: '100%', minHeight: '80px', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
          />
          <select
            value={newJoke.player}
            onChange={e => setNewJoke({ ...newJoke, player: e.target.value })}
            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
          >
            {Object.entries(PLAYERS).filter(([k]) => k !== 'all').map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="start-button" style={{ margin: 0, flex: 1 }} onClick={addJoke}>Ajouter</button>
            <button className="ghost-button" style={{ margin: 0 }} onClick={() => setShowForm(false)}>Annuler</button>
          </div>
        </div>
      )}

      <div className="stats-grid" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        {Object.entries(PLAYERS).map(([k, v]) => (
          <button key={k} className={`stat-card ${k === filter ? 'win' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilter(k)}>
            <div className="stat-label">{v}</div>
          </button>
        ))}
      </div>

      <div className="match-statistics">
        <h2>Blagues ({filtered.length})</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filtered.map(j => (
            <div key={j.id} className="stat-card" style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#4fd1c5' }}>{PLAYERS[j.player]}</div>
              <div style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{j.joke}</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map(r => (
                  <button
                    key={r}
                    onClick={() => rate(j.id, r)}
                    style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0.2rem' }}
                  >
                    {r <= j.rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

