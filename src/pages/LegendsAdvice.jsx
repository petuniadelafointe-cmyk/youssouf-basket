import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Statistics.css'

const LEGENDS = {
  all: { name: 'Toutes les légendes', icon: '🌟' },
  mj: { name: 'Michael Jordan', icon: '👑', avatar: 'MJ', gradient: 'linear-gradient(135deg, #f97316, #fb7185)' },
  kobe: { name: 'Kobe Bryant', icon: '💜', avatar: 'KB', gradient: 'linear-gradient(135deg, #6d28d9, #facc15)' },
  lebron: { name: 'LeBron James', icon: '🤴', avatar: 'LJ', gradient: 'linear-gradient(135deg, #22c55e, #0ea5e9)' },
  shaq: { name: "Shaq", icon: '🔨', avatar: 'SH', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  magic: { name: 'Magic Johnson', icon: '✨', avatar: 'MJ*', gradient: 'linear-gradient(135deg, #14b8a6, #6366f1)' },
  kareem: { name: 'Kareem Abdul-Jabbar', icon: '🛕', avatar: 'KA', gradient: 'linear-gradient(135deg, #f87171, #fbbf24)' },
  bird: { name: 'Larry Bird', icon: '🕊️', avatar: 'LB', gradient: 'linear-gradient(135deg, #a3e635, #22d3ee)' },
  wilt: { name: 'Wilt Chamberlain', icon: '🏛️', avatar: 'WC', gradient: 'linear-gradient(135deg, #f472b6, #facc15)' },
  russell: { name: 'Bill Russell', icon: '🏆', avatar: 'BR', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  duncan: { name: 'Tim Duncan', icon: '🧱', avatar: 'TD', gradient: 'linear-gradient(135deg, #c084fc, #60a5fa)' }
}

const ADVICE = [
  { legend: 'mj', title: 'Ose le tir', quote: "Ne crains pas d'échouer, crains de ne pas essayer.", explanation: "Tente et apprends. Chaque shoot manqué enseigne.", theme: 'Discipline' },
  { legend: 'kobe', title: 'Mamba mindset', quote: 'Travaille quand les autres dorment.', explanation: 'La constance bat le talent non travaillé.', theme: 'Motivation' },
  { legend: 'lebron', title: 'Préparation totale', quote: "La confiance vient de l'entraînement.", explanation: 'Prépare-toi pour toutes les situations.', theme: 'Leadership' },
  { legend: 'shaq', title: 'Garde le sourire', quote: 'Amuse-toi en progressant.', explanation: "L'attitude positive t'emmène plus loin.", theme: 'Résilience' },
  { legend: 'magic', title: 'Partage', quote: 'Fais briller tes coéquipiers.', explanation: 'La passe juste crée la victoire.', theme: 'Leadership' },
  { legend: 'kareem', title: 'Routine', quote: "L'excellence est une habitude.", explanation: 'Construis des rituels simples et durables.', theme: 'Discipline' },
  { legend: 'bird', title: 'Travail invisible', quote: 'Le public voit le résultat, pas les matins froids.', explanation: 'Accumule les répétitions intelligentes.', theme: 'Motivation' },
  { legend: 'wilt', title: 'Dominer sa zone', quote: 'Impose ton style de jeu.', explanation: 'Connais tes forces et use-en sans complexe.', theme: 'Leadership' },
  { legend: 'russell', title: 'Défense d’abord', quote: 'La défense gagne des titres.', explanation: 'Engage-toi sur chaque possession.', theme: 'Leadership' },
  { legend: 'duncan', title: 'Simple et efficace', quote: 'Fais simple, fais bien, recommence.', explanation: 'Les fondamentaux sont une arme.', theme: 'Discipline' },
  { legend: 'mj', title: 'Mental d’acier', quote: 'Le prochain tir est le bon.', explanation: 'Oublie l’échec précédent, reste présent.', theme: 'Résilience' },
  { legend: 'kobe', title: 'Obsession saine', quote: 'Sois obsédé par le progrès.', explanation: 'Petits gains quotidiens → grands résultats.', theme: 'Motivation' },
  { legend: 'lebron', title: 'Polyvalence', quote: 'Aide partout où tu peux.', explanation: 'Rebond, passe, défense: élève tout le monde.', theme: 'Leadership' },
  { legend: 'shaq', title: 'Force bienveillante', quote: 'Sois puissant sans écraser.', explanation: 'La domination inspire aussi par le respect.', theme: 'Leadership' },
  { legend: 'magic', title: 'Vision', quote: 'Vois la passe avant qu’elle existe.', explanation: 'Anticipe, lis le jeu tôt.', theme: 'Discipline' },
  { legend: 'kareem', title: 'Longévité', quote: 'Entretiens ton corps et ton esprit.', explanation: 'La récupération est un entraînement.', theme: 'Résilience' },
  { legend: 'bird', title: 'Confiance humble', quote: 'Parle peu, prouve beaucoup.', explanation: 'L’exécution parle plus fort que les mots.', theme: 'Motivation' },
  { legend: 'wilt', title: 'Travaille tes atouts', quote: 'Rends ton point fort imparable.', explanation: 'Deviens prévisible et injouable à la fois.', theme: 'Discipline' },
  { legend: 'russell', title: 'Esprit d’équipe', quote: 'Ta valeur = ce que tu apportes aux autres.', explanation: 'Fais le sale boulot avec fierté.', theme: 'Leadership' },
  { legend: 'duncan', title: 'Calme sous pression', quote: 'Reste simple quand la tempête arrive.', explanation: 'La sérénité est un super-pouvoir.', theme: 'Résilience' },
  { legend: 'mj', title: 'Compétition saine', quote: 'Mesure-toi à ton toi de hier.', explanation: 'Gagne le duel quotidien avec toi-même.', theme: 'Motivation' },
  { legend: 'kobe', title: 'Détail', quote: 'Maîtrise les micro-gestes.', explanation: 'Le footwork change une carrière.', theme: 'Discipline' },
  { legend: 'lebron', title: 'Leadership vocal', quote: 'Parle pour organiser, pas pour briller.', explanation: 'La voix au service du collectif.', theme: 'Leadership' },
  { legend: 'shaq', title: 'Plaisir', quote: 'Garde le jeu fun, même sérieux.', explanation: 'Le plaisir soutient l’effort long terme.', theme: 'Motivation' },
  { legend: 'magic', title: 'Énergie', quote: 'Apporte de la joie au parquet.', explanation: 'L’énergie se transmet.', theme: 'Motivation' },
  { legend: 'kareem', title: 'Lecture', quote: 'Lis, apprends, nourris ton esprit.', explanation: 'L’intelligence guide le corps.', theme: 'Discipline' },
  { legend: 'bird', title: 'Courage', quote: 'Demande la balle quand ça compte.', explanation: 'Le clutch commence dans la tête.', theme: 'Leadership' },
  { legend: 'wilt', title: 'Habitude', quote: 'Répète ce qui marche.', explanation: 'Renforce les routines gagnantes.', theme: 'Discipline' },
  { legend: 'russell', title: 'Confiance', quote: 'Fais confiance au plan de l’équipe.', explanation: 'L’exécution collective dépasse l’individuel.', theme: 'Leadership' },
  { legend: 'duncan', title: 'Humilité', quote: 'Reste coachable, toujours.', explanation: 'Le progrès aime l’écoute.', theme: 'Motivation' },
  { legend: 'mj', title: 'Faim', quote: 'Reste affamé après la victoire.', explanation: 'Nouvelle saison, nouveau défi.', theme: 'Motivation' },
  { legend: 'kobe', title: 'Résilience', quote: 'Transforme la douleur en moteur.', explanation: 'Reviens meilleur après blessure.', theme: 'Résilience' },
  { legend: 'lebron', title: 'Prends soin des tiens', quote: 'Rassemble autour d’un objectif.', explanation: 'Crée une culture d’équipe.', theme: 'Leadership' },
  { legend: 'shaq', title: 'Impact', quote: 'Fais sentir ta présence.', explanation: 'Pose des écrans, protège la raquette.', theme: 'Leadership' },
  { legend: 'magic', title: 'Créativité', quote: 'Invente des angles.', explanation: 'La passe impossible ouvre le jeu.', theme: 'Motivation' },
  { legend: 'kareem', title: 'Patience', quote: 'Le progrès est lent et sûr.', explanation: 'Accepte le temps long.', theme: 'Discipline' },
  { legend: 'bird', title: 'Rigueur', quote: 'Travaille aussi ton point faible.', explanation: 'Équilibre ton arsenal.', theme: 'Discipline' },
  { legend: 'wilt', title: 'Intimidation', quote: 'Occupe l’espace mental.', explanation: 'Sois présent, physique et juste.', theme: 'Leadership' },
  { legend: 'russell', title: 'Exemple', quote: 'Montre l’effort que tu demandes.', explanation: 'Inspire par l’action.', theme: 'Leadership' },
  { legend: 'duncan', title: 'Silence utile', quote: 'Parle peu, communique bien.', explanation: 'Un regard suffit parfois.', theme: 'Leadership' },
  { legend: 'mj', title: 'Focus', quote: 'Une possession à la fois.', explanation: 'Le présent est ton meilleur allié.', theme: 'Discipline' },
  { legend: 'kobe', title: 'Curiosité', quote: 'Apprends de tous les sports.', explanation: 'Transfère des concepts utiles.', theme: 'Motivation' },
  { legend: 'lebron', title: 'Adaptation', quote: 'Change de rythme et de rôle.', explanation: 'Flexibilité = longévité.', theme: 'Résilience' },
  { legend: 'shaq', title: 'Présence', quote: 'Ancre ton équipe.', explanation: 'Sécurise le rebond et la peinture.', theme: 'Leadership' },
  { legend: 'magic', title: 'Confiance donnée', quote: 'Fais confiance aux jeunes.', explanation: 'Laisse les autres grandir.', theme: 'Leadership' },
  { legend: 'kareem', title: 'Respiration', quote: 'Respire, centre-toi.', explanation: 'La respiration stabilise la décision.', theme: 'Discipline' },
  { legend: 'bird', title: 'Anticipation', quote: 'Sois en avance d’une passe.', explanation: 'Lis la défense tôt.', theme: 'Leadership' },
  { legend: 'wilt', title: 'Force sereine', quote: 'Ne confonds pas agressivité et violence.', explanation: 'Maîtrise ton corps et ton impact.', theme: 'Résilience' },
  { legend: 'russell', title: 'Respect', quote: 'Respecte l’adversaire pour te dépasser.', explanation: 'Le respect élève le niveau.', theme: 'Motivation' },
  { legend: 'duncan', title: 'Détails', quote: 'Angles, appuis, équilibre.', explanation: 'Retourne aux bases en crise.', theme: 'Discipline' },
  { legend: 'mj', title: 'Rythme', quote: 'Impose ton tempo.', explanation: 'Accelère, ralentis, contrôle.', theme: 'Leadership' },
  { legend: 'kobe', title: 'Inspire', quote: 'Deviens le joueur que tu voulais voir.', explanation: 'Laisse un héritage positif.', theme: 'Motivation' },
  { legend: 'lebron', title: 'Vision long terme', quote: 'Pense saison, carrière, vie.', explanation: 'Planifie au-delà du match.', theme: 'Leadership' },
  { legend: 'shaq', title: 'Protège-toi', quote: 'Préviens plutôt que guérir.', explanation: 'Mobilité, gainage, hanches.', theme: 'Discipline' },
  { legend: 'magic', title: 'Joie', quote: 'N’oublie jamais pourquoi tu joues.', explanation: 'La passion est le carburant.', theme: 'Motivation' },
  { legend: 'kareem', title: 'Équilibre', quote: 'Étudie et entraîne-toi.', explanation: 'L’esprit nourrit le corps.', theme: 'Discipline' },
  { legend: 'bird', title: 'Fierté', quote: 'Sois fier du travail bien fait.', explanation: 'Chaque détail compte.', theme: 'Motivation' },
  { legend: 'wilt', title: 'Confiance physique', quote: 'Bâtis ta force utile.', explanation: 'Puissance contrôlée > puissance brute.', theme: 'Discipline' },
  { legend: 'russell', title: 'Culture', quote: 'Construis une identité d’équipe.', explanation: 'Valeurs claires, efforts partagés.', theme: 'Leadership' },
  { legend: 'duncan', title: 'Constante', quote: 'Sois le plus fiable, pas le plus flashy.', explanation: 'La régularité gagne.', theme: 'Discipline' }
]

export default function LegendsAdvice() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [quoteDay] = useState(() => ADVICE[Math.floor(Math.random() * ADVICE.length)])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('legendFavorites') || '[]')
    setFavorites(saved)
  }, [])

  const toggleFavorite = (item) => {
    const n = favorites.includes(item.quote) ? favorites.filter(f => f !== item.quote) : [...favorites, item.quote]
    setFavorites(n)
    localStorage.setItem('legendFavorites', JSON.stringify(n))
  }

  const filtered = filter === 'all' ? ADVICE : ADVICE.filter(a => a.legend === filter)

  const Avatar = ({ legendKey, size = 72 }) => {
    const legend = LEGENDS[legendKey]
    if (!legend) return null
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: legend.gradient || 'linear-gradient(135deg, #4c1d95, #f97316)',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 'bold',
          fontSize: size * 0.32,
          color: '#fff',
          boxShadow: '0 10px 25px rgba(0,0,0,0.35)'
        }}
      >
        {legend.avatar || legend.icon}
      </div>
    )
  }

  return (
    <div className="stats-container legends-bg">
      <div className="stats-header">
        <button className="back-button" onClick={() => navigate('/')}>← Retour</button>
        <h1>Conseils des Légendes</h1>
      </div>

      <div className="stat-card" style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: '80px 1fr', alignItems: 'center', gap: '1rem', background: 'linear-gradient(135deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3))', border: '1px solid rgba(255,255,255,0.25)' }}>
        <Avatar legendKey={quoteDay.legend} size={80} />
        <div>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem', opacity: 0.9 }}>💎 Citation du Jour</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{LEGENDS[quoteDay.legend].name}</div>
          <div style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '0.3rem' }}>&quot;{quoteDay.quote}&quot;</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Thème: {quoteDay.theme}</div>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {Object.entries(LEGENDS).map(([k, v]) => (
          <button key={k} className={`stat-card ${k === filter ? 'win' : ''}`} style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: v.avatar ? '48px 1fr' : undefined, alignItems: 'center', gap: '0.6rem' }} onClick={() => setFilter(k)}>
            {v.avatar && <Avatar legendKey={k} size={48} />}
            <div>
              <div className="stat-value" style={{ fontSize: '1.2rem' }}>{v.icon}</div>
              <div className="stat-label" style={{ textAlign: 'left' }}>{v.name}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="match-statistics">
        <h2>Conseils ({filtered.length})</h2>
        <div className="stats-grid">
          {filtered.map((item, i) => (
            <div key={i} className="stat-card" style={{ textAlign: 'left', gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '72px 1fr', gap: '1rem', alignItems: 'start' }}>
              <Avatar legendKey={item.legend} size={72} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{LEGENDS[item.legend].name}</div>
                  <button onClick={() => toggleFavorite(item)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
                    {favorites.includes(item.quote) ? '⭐' : '☆'}
                  </button>
                </div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>{item.title}</div>
                <div style={{ fontStyle: 'italic', marginBottom: '0.4rem', opacity: 0.95 }}>&quot;{item.quote}&quot;</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>{item.explanation}</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.4rem', color: '#4fd1c5' }}>{item.theme}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

