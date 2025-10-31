import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate()
  const [musicOn, setMusicOn] = useState(false)
  const ballRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (!ballRef.current) return
      const { clientX, clientY } = e
      ballRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    if (musicOn) {
      audioRef.current.volume = 0.25
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [musicOn])

  return (
    <div className="home-container minimal">
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_a2d2a5d5de.mp3?filename=lofi-study-112191.mp3" loop />
      <div className="overlay soft"></div>

      <div className="content hero compact">
        <div className="hero-badge">BASKET UNIVERSE</div>
        <h1 className="title">Bienvenue dans ton monde, Youssouf !</h1>
        <p className="subtitle emphasis">Y'a mille façons de vivre de sa passion</p>

        <div className="cta-row">
          <button className="start-button" onClick={() => navigate('/team')}>
            Commencer
          </button>
          <button className="start-button alt" onClick={() => navigate('/coach')}>
            Coach Virtuel
          </button>
        </div>

        <div className="quick-links">
          <button onClick={() => navigate('/quiz')}>Quizz</button>
          <span>•</span>
          <button onClick={() => navigate('/legends')}>Légendes</button>
          <span>•</span>
          <button onClick={() => navigate('/joker')}>Coin du Joker</button>
          <span>•</span>
          <button onClick={() => navigate('/basket-forever')}>Conseils Basket</button>
          <span>•</span>
          <button className={musicOn ? 'on' : ''} onClick={() => setMusicOn(v => !v)}>
            {musicOn ? 'Musique ON' : 'Musique OFF'}
          </button>
        </div>
      </div>

      <div ref={ballRef} className="mouse-ball">🏀</div>
    </div>
  )
}

export default Home
