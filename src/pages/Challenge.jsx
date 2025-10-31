import React, { useEffect, useMemo, useState } from 'react'
import '../styles/Statistics.css'

const QUESTIONS = [
  { q: 'Combien de joueurs par équipe sur le terrain ?', choices: ['3', '5', '7'], answer: 1 },
  { q: 'Durée d’un quart-temps (FIBA) ?', choices: ['10 min', '12 min', '8 min'], answer: 0 },
  { q: 'Un tir derrière la ligne vaut ?', choices: ['2 points', '3 points', '4 points'], answer: 1 },
  { q: 'Marcher, c’est…', choices: ['Faute technique', 'Violation', 'Rien du tout'], answer: 1 },
]

export default function Challenge() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const saved = Number(localStorage.getItem('quizScore') || 0)
    setScore(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('quizScore', String(score))
  }, [score])

  const current = useMemo(() => QUESTIONS[index % QUESTIONS.length], [index])

  const submit = () => {
    if (selected == null) return
    if (selected === current.answer) setScore(s => s + 10)
    else setScore(s => Math.max(0, s - 5))
    setSelected(null)
    setIndex(i => i + 1)
  }

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h1>Me challenger</h1>
        <div style={{ fontWeight: 'bold' }}>Points: {score}</div>
      </div>

      <div className="match-statistics">
        <h2>Question</h2>
        <div className="stat-card" style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{current.q}</div>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {current.choices.map((c, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input type="radio" checked={selected === i} onChange={() => setSelected(i)} /> {c}
              </label>
            ))}
          </div>
          <button className="simulate-button" style={{ marginTop: '1rem' }} onClick={submit}>Valider</button>
        </div>
      </div>
    </div>
  )
}
