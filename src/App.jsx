import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TeamManagement from './pages/TeamManagement.jsx'
import MatchSimulation from './pages/MatchSimulation.jsx'
import Statistics from './pages/Statistics.jsx'
import TeamOverview from './pages/TeamOverview.jsx'
import Challenge from './pages/Challenge.jsx'
import BasketForever from './pages/BasketForever.jsx'
import BasketQuiz from './pages/BasketQuiz.jsx'
import GamesChallenge from './pages/GamesChallenge.jsx'
import CoachVirtual from './pages/CoachVirtual.jsx'
import LegendsAdvice from './pages/LegendsAdvice.jsx'
import JokerCorner from './pages/JokerCorner.jsx'
import JokesLegendaires from './pages/JokesLegendaires.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/simulate" element={<MatchSimulation />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/know-team" element={<TeamOverview />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/basket-forever" element={<BasketForever />} />
          <Route path="/quiz" element={<BasketQuiz />} />
          <Route path="/games" element={<GamesChallenge />} />
          <Route path="/coach" element={<CoachVirtual />} />
          <Route path="/legends" element={<LegendsAdvice />} />
          <Route path="/joker" element={<JokerCorner />} />
          <Route path="/jokes" element={<JokesLegendaires />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
