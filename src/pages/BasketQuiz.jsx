import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Statistics.css'

const CATEGORIES = {
  legends: { name: 'Légendes', icon: '👑' },
  teams: { name: 'Clubs NBA', icon: '🏀' },
  records: { name: 'Records & Stats', icon: '📊' },
  shoes: { name: 'Chaussures', icon: '👟' }
}

const POSITIVE_FEEDBACK = [
  '🔥 Splendide ! Tu joues comme un champion.',
  '👏 Beau tir ! Continue sur cette lancée.',
  '💪 Tu enflammes le parquet, bravo !',
  '🌟 C’est ça, l’esprit basket !',
  '🏆 Youssouf, tu es injouable quand tu réponds comme ça.'
]

const NEGATIVE_FEEDBACK = [
  '🙃 Pas grave, on apprend de chaque dribble.',
  '🧠 Reste focus, le prochain sera le bon.',
  '💡 Même les légendes ratent parfois, persévère !',
  '🤝 On fait équipe : réessaie, tu vas y arriver.',
  '🏀 Respire, visualise le tir… et recommence.'
]

const QUESTIONS = {
  legends: [
    { q: 'Quel joueur est surnommé “His Airness” ?', choices: ['LeBron James', 'Michael Jordan', 'Kobe Bryant', 'Magic Johnson'], answer: 1, fact: 'Michael Jordan a obtenu ce surnom grâce à son hang time légendaire.' },
    { q: 'Combien de bagues NBA Bill Russell a-t-il remportées ?', choices: ['9', '11', '13', '8'], answer: 1, fact: 'Bill Russell a gagné 11 titres NBA avec les Celtics.' },
    { q: 'Quelle légende a popularisé la “Sky Hook” ?', choices: ['Kareem Abdul-Jabbar', 'Shaquille O’Neal', 'Tim Duncan', 'Wilt Chamberlain'], answer: 0, fact: 'Le skyhook de Kareem est l’un des moves les plus imparables.' },
    { q: 'Quel est le surnom de Kobe Bryant ?', choices: ['Black Panther', 'Mamba Noire', 'Black Mamba', 'Bryant Killer'], answer: 2, fact: 'La “Mamba mentality” symbolise son exigence extrême.' },
    { q: 'LeBron James a été drafté en ?', choices: ['2001', '2003', '2005', '2007'], answer: 1, fact: "LeBron a été drafté numéro 1 par Cleveland en 2003." },
    { q: 'Quelle légende a porté le numéro 32 au Showtime Lakers ?', choices: ['Magic Johnson', 'James Worthy', 'Kareem', 'Byron Scott'], answer: 0, fact: 'Magic portait le 32 et a redéfini le rôle de meneur.' },
    { q: 'Quel joueur est surnommé “The Diesel” ?', choices: ['Shaquille O’Neal', 'Karl Malone', 'Charles Barkley', 'Dwight Howard'], answer: 0, fact: "Shaq, c'est The Diesel, une force irrésistible dans la raquette." },
    { q: 'Quelle légende est célèbre pour le “Dream Shake” ?', choices: ['Hakeem Olajuwon', 'Patrick Ewing', 'David Robinson', 'Tim Duncan'], answer: 0, fact: 'Hakeem a révolutionné le post bas avec le Dream Shake.' },
    { q: 'Quel joueur a inscrit 100 points dans un match ?', choices: ['Wilt Chamberlain', 'Michael Jordan', 'Kobe Bryant', 'Elgin Baylor'], answer: 0, fact: 'Wilt Chamberlain a marqué 100 points en 1962.' },
    { q: 'Larry Bird a remporté combien de titres NBA ?', choices: ['2', '3', '4', '5'], answer: 1, fact: 'Larry Bird a été champion NBA trois fois avec Boston.' },
    { q: 'Quel joueur est surnommé “The Answer” ?', choices: ['Allen Iverson', 'Gary Payton', 'Dwyane Wade', 'Derrick Rose'], answer: 0, fact: 'Allen Iverson, “The Answer”, a marqué l’ère 2000.' },
    { q: 'Quelle légende a été appelée “Big Fundamental” ?', choices: ['Tim Duncan', 'Dirk Nowitzki', 'Kevin Garnett', 'Charles Barkley'], answer: 0, fact: 'Tim Duncan, sobre et technique, était “The Big Fundamental”.' },
    { q: 'Qui a gagné le plus de titres MVP en carrière ?', choices: ['Michael Jordan', 'Kareem Abdul-Jabbar', 'LeBron James', 'Wilt Chamberlain'], answer: 1, fact: 'Kareem détient 6 trophées MVP.' },
    { q: 'Quel joueur a inspiré la “Dream Team” 1992 ?', choices: ['Magic', 'Bird', 'Jordan', 'Tous ces joueurs'], answer: 3, fact: 'La Dream Team réunissait les plus grandes légendes.' },
    { q: 'Quel est le surnom de Paul Pierce ?', choices: ['The Truth', 'The Truthful', 'The Real', 'The Guard'], answer: 0, fact: 'Shaq l’a surnommé “The Truth”.' },
    { q: 'Qui était “Mr. Clutch” ?', choices: ['Jerry West', 'Reggie Miller', 'Ray Allen', 'John Havlicek'], answer: 0, fact: 'Jerry West était réputé pour ses tirs décisifs.' },
    { q: 'Quel joueur fut “The Mailman” ?', choices: ['Karl Malone', 'Patrick Ewing', 'David Robinson', 'Moses Malone'], answer: 0, fact: 'Karl Malone livrait ses points comme un facteur.' },
    { q: 'Quelle star portait le numéro 34 chez Houston ?', choices: ['Hakeem Olajuwon', 'Clyde Drexler', 'Tracy McGrady', 'Yao Ming'], answer: 0, fact: 'Le 34 d’Hakeem flotte désormais au plafond du Toyota Center.' },
    { q: 'Quel joueur est surnommé “The Greek Freak” ?', choices: ['Giannis Antetokounmpo', 'Nikola Jokic', 'Luka Doncic', 'Kristaps Porzingis'], answer: 0, fact: 'Giannis domine les deux côtés du terrain.' },
    { q: 'Qui est “Black Jesus” ?', choices: ['Michael Jordan', 'Kobe Bryant', 'Kevin Durant', 'Julius Erving'], answer: 0, fact: 'MJ avait ce surnom dans certaines salles hostiles.' },
    { q: 'Quel joueur a fait 40 points à 40 ans ?', choices: ['Michael Jordan', 'Kobe Bryant', 'Dirk Nowitzki', 'LeBron James'], answer: 0, fact: 'MJ a réalisé cet exploit avec Washington.' },
    { q: 'Quelle légende a été “Big Ticket” ?', choices: ['Kevin Garnett', 'Paul Pierce', 'Ray Allen', 'Chauncey Billups'], answer: 0, fact: 'KG apportait l’énergie et la rage de vaincre.' },
    { q: 'Qui est surnommé “Chef” ?', choices: ['Stephen Curry', 'Chris Paul', 'Damian Lillard', 'Kyrie Irving'], answer: 0, fact: 'Chef Curry est le maître des tirs longue distance.' },
    { q: 'Quel joueur a remporté 5 MVP des finales ?', choices: ['Michael Jordan', 'Magic Johnson', 'LeBron James', 'Tim Duncan'], answer: 0, fact: 'MJ est le seul avec 5 MVP Finals.' },
    { q: 'Quelle légende portait le numéro 21 à San Antonio ?', choices: ['Tim Duncan', 'Tony Parker', 'Manu Ginóbili', 'Kawhi Leonard'], answer: 0, fact: 'Tim Duncan a incarné les Spurs pendant 19 saisons.' }
  ],
  teams: [
    { q: 'Quelle équipe partage le record de titres (17) ?', choices: ['Lakers', 'Celtics', 'Bulls', 'Spurs'], answer: 1, fact: 'Les Boston Celtics ont 17 titres (à égalité avec les Lakers).' },
    { q: 'Les Warriors jouent aujourd’hui à ?', choices: ['Oracle Arena', 'Chase Center', 'Staples Center', 'Moda Center'], answer: 1, fact: 'Golden State évolue au Chase Center à San Francisco.' },
    { q: 'Quelle franchise a été “Sonics” ?', choices: ['Oklahoma City', 'Memphis', 'Toronto', 'Charlotte'], answer: 0, fact: 'Les Sonics sont devenus le Thunder d’OKC.' },
    { q: 'Les Spurs sont basés à ?', choices: ['San Antonio', 'Dallas', 'El Paso', 'Houston'], answer: 0, fact: 'Spurs = San Antonio depuis 1973.' },
    { q: 'Quelle franchise a jamais quitté son État ?', choices: ['New York Knicks', 'Los Angeles Clippers', 'Brooklyn Nets', 'Atlanta Hawks'], answer: 0, fact: 'Les Knicks sont restés à New York.' },
    { q: 'Les Raptors ont gagné leur premier titre en ?', choices: ['2017', '2018', '2019', '2020'], answer: 2, fact: 'Toronto a remporté le titre 2019 face aux Warriors.' },
    { q: 'Quelle équipe était “We Believe” ?', choices: ['Warriors 2007', 'Kings 2002', 'Pistons 2004', 'Heat 2006'], answer: 0, fact: 'Les Warriors 2007 ont éliminé Dallas au premier tour.' },
    { q: 'Quelle équipe a un parquet en mode “Purple & Gold” ?', choices: ['Lakers', 'Suns', 'Pacers', 'Nuggets'], answer: 0, fact: 'Le parquet du Staples/crypto.com est violet et or.' },
    { q: 'Quel club est surnommé “Rip City” ?', choices: ['Blazers', 'Bulls', 'Celtics', 'Jazz'], answer: 0, fact: 'Portland Trail Blazers = “Rip City”.' },
    { q: 'Quel est le rival historique des Bulls ?', choices: ['Pistons', 'Spurs', 'Heat', 'Bucks'], answer: 0, fact: 'Les Bad Boys Pistons ont longtemps rivalisé avec Chicago.' },
    { q: 'Les Bucks ont gagné leur premier titre avec ?', choices: ['Kareem & Oscar', 'Giannis', 'Ray Allen', 'Brandon Jennings'], answer: 0, fact: 'En 1971, Kareem Abdul-Jabbar et Oscar Robertson ont mené Milwaukee.' },
    { q: 'Quelle équipe a été “Lob City” ?', choices: ['Clippers', 'Rockets', 'Nets', 'Magic'], answer: 0, fact: 'Chris Paul, Blake Griffin et DeAndre Jordan ont popularisé “Lob City”.' },
    { q: 'Quel club a adopté le violet et noir dans les 90s ?', choices: ['Kings', 'Hawks', 'Jazz', 'Nuggets'], answer: 0, fact: 'Sacramento a marqué l’époque Webber-Divac-Stojakovic.' },
    { q: 'Quelle salle est connue comme “The Garden” ?', choices: ['Madison Square Garden', 'TD Garden', 'United Center', 'Spectrum Center'], answer: 0, fact: 'MSG est iconique, domicile des Knicks.' },
    { q: 'Quel club a un parquet “Miami Vice” ?', choices: ['Heat', 'Hornets', 'Grizzlies', 'Magic'], answer: 0, fact: 'Le Miami Heat a proposé une édition Vice aux couleurs flashy.' },
    { q: 'Les “Bad Boys” venaient de ?', choices: ['Detroit Pistons', 'New York Knicks', 'Indiana Pacers', 'Chicago Bulls'], answer: 0, fact: 'La défense rude des Pistons fin 80s/début 90s.' },
    { q: 'Quel club fut champion en 2011 ?', choices: ['Dallas Mavericks', 'Miami Heat', 'San Antonio', 'Boston Celtics'], answer: 0, fact: 'Dirk Nowitzki et les Mavericks ont triomphé en 2011.' },
    { q: 'Quel club a déménagé de New Jersey à Brooklyn ?', choices: ['Nets', '76ers', 'Bullets', 'Hornets'], answer: 0, fact: 'Les Nets ont quitté le New Jersey en 2012.' },
    { q: 'Quelle franchise a été “Grit and Grind” ?', choices: ['Grizzlies', 'Spurs', 'Jazz', 'Suns'], answer: 0, fact: 'Memphis Grizzlies avec Conley, Tony Allen, Gasol, Randolph.' },
    { q: 'Quel club a formé le “Big Three” LeBron/Wade/Bosh ?', choices: ['Heat', 'Cavaliers', 'Lakers', 'Celtics'], answer: 0, fact: 'Heat 2010-2014, 4 finales consécutives.' },
    { q: 'Quelle équipe est la plus titrée à l’Ouest (hors Lakers) ?', choices: ['Spurs', 'Warriors', 'Rockets', 'Blazers'], answer: 0, fact: 'San Antonio Spurs détient 5 titres.' },
    { q: 'Quel club a dominé la NBA de 1996 à 1998 ?', choices: ['Chicago Bulls', 'Houston Rockets', 'Utah Jazz', 'Seattle Supersonics'], answer: 0, fact: 'Les Bulls de Jordan ont enchaîné deux three-peat.' },
    { q: 'Quel club a été champion 2021 ?', choices: ['Bucks', 'Suns', 'Clippers', 'Nets'], answer: 0, fact: 'Milwaukee Bucks, emmenés par Giannis.' },
    { q: 'Quel club joue dans l’Utah ?', choices: ['Jazz', 'Thunder', 'Kings', 'Nuggets'], answer: 0, fact: 'Utah Jazz évolue à Salt Lake City.' },
    { q: 'Quel club a connu “Run TMC” ?', choices: ['Warriors', 'Kings', 'Clippers', 'Magic'], answer: 0, fact: 'Run TMC = Run T(h)ompson, Hardaway, Richmond.' }
  ],
  records: [
    { q: 'Record de rebonds en un match ?', choices: ['42', '51', '55', '60'], answer: 2, fact: 'Wilt Chamberlain détient 55 rebonds en 1960.' },
    { q: 'Record de passes en un match ?', choices: ['25', '30', '32', '38'], answer: 1, fact: 'Scott Skiles a distribué 30 passes en 1990.' },
    { q: 'Record de contres en un match ?', choices: ['17', '14', '12', '11'], answer: 0, fact: 'Elmore Smith a contré 17 tirs en 1973.' },
    { q: 'Record de interceptions en un match ?', choices: ['11', '12', '13', '10'], answer: 1, fact: 'Larry Kenon et Kendall Gill partagent 11 interceptions.' },
    { q: 'Record de points en carrière NBA ?', choices: ['Kareem', 'LeBron', 'Karl Malone', 'Kobe'], answer: 1, fact: 'LeBron a dépassé Kareem en 2023.' },
    { q: 'Record de triples-doubles en carrière ?', choices: ['Russell Westbrook', 'Oscar Robertson', 'Magic Johnson', 'Nikola Jokic'], answer: 0, fact: 'Westbrook a dépassé Oscar Robertson.' },
    { q: 'Record de points en demi-temps ?', choices: ['59', '60', '63', '73'], answer: 0, fact: 'Wilt Chamberlain a inscrit 59 points en une mi-temps.' },
    { q: 'Record de tirs à 3 points dans une saison ?', choices: ['Curry 402', 'Harden 378', 'Thompson 301', 'Allen 269'], answer: 0, fact: 'Stephen Curry a inscrit 402 tirs à 3 points en 2016.' },
    { q: 'Record de minutes jouées en carrière ?', choices: ['Kareem', 'Karl Malone', 'Wilt', 'LeBron'], answer: 3, fact: 'LeBron est leader minutes jouées.' },
    { q: 'Record de saisons jouées ?', choices: ['20', '21', '22', '23'], answer: 2, fact: 'Vince Carter a joué 22 saisons.' },
    { q: 'Record de points en playoffs ?', choices: ['LeBron', 'Jordan', 'Kareem', 'Kobe'], answer: 0, fact: 'LeBron est leader historique des playoffs.' },
    { q: 'Record de rebonds en playoffs ?', choices: ['Bill Russell', 'Wilt', 'Kareem', 'Shaq'], answer: 0, fact: 'Bill Russell domine les rebonds en playoffs.' },
    { q: 'Record de passes en playoffs ?', choices: ['Magic Johnson', 'LeBron', 'Jason Kidd', 'Chris Paul'], answer: 1, fact: 'LeBron est leader passes playoffs.' },
    { q: 'Record de contres en carrière ?', choices: ['Hakeem', 'Dikembe', 'Kareem', 'David Robinson'], answer: 0, fact: 'Hakeem Olajuwon tient le record de contres.' },
    { q: 'Record de pourcentage à 3 points sur une saison ?', choices: ['Kyle Korver', 'Steve Kerr', 'Ray Allen', 'Seth Curry'], answer: 1, fact: 'Steve Kerr a tiré à 45.4% sur sa carrière.' },
    { q: 'Record de points sur un quart-temps ?', choices: ['37', '40', '43', '36'], answer: 0, fact: 'Klay Thompson a marqué 37 points dans un quart en 2015.' },
    { q: 'Record du plus long match NBA ?', choices: ['4 prolongations', '5 prolongations', '6 prolongations', '7 prolongations'], answer: 2, fact: '6 prolongations (1951, Indianapolis vs Rochester).' },
    { q: 'Record d’équipes différentes jouées ?', choices: ['12', '13', '14', '15'], answer: 1, fact: 'Ish Smith a joué pour 13 franchises.' },
    { q: 'Record de points d’un rookie sur un match ?', choices: ['50', '55', '60', '63'], answer: 1, fact: 'Wilt Chamberlain a marqué 55 points en tant que rookie.' },
    { q: 'Record de points dans un match 7 ?', choices: ['42', '50', '54', '60'], answer: 2, fact: 'Kevin Durant a signé 48 points, record match 7 (2021).' },
    { q: 'Record de paniers à 3 consécutifs ?', choices: ['13', '14', '15', '11'], answer: 0, fact: 'Klay Thompson détient 13 tirs à 3 points consécutifs.' },
    { q: 'Record du plus grand différentiel en finale ?', choices: ['42', '39', '36', '33'], answer: 1, fact: '39 points d’écart (Celtics-Lakers 2008, match 6).' },
    { q: 'Record de victoires consécutives ?', choices: ['33', '30', '28', '26'], answer: 0, fact: 'Les Lakers ont gagné 33 matchs de suite en 1972.' },
    { q: 'Record de défaites consécutives ?', choices: ['26', '28', '30', '33'], answer: 1, fact: 'Les Sixers ont perdu 28 matchs d’affilée (2015).' },
    { q: 'Record de saisons avec +10 rebonds ?', choices: ['10', '12', '14', '16'], answer: 2, fact: 'Moses Malone a dépassé 14 saisons à 10 rebonds.' }
  ],
  shoes: [
    { q: 'Quelle chaussure a lancé la ligne Air Jordan ?', choices: ['AJ1', 'AJ3', 'AJ5', 'AJ11'], answer: 0, fact: 'L’Air Jordan 1 a débuté en 1985.' },
    { q: 'Quelle chaussure est associée au “Flu Game” ?', choices: ['AJ12', 'AJ11', 'AJ13', 'AJ8'], answer: 0, fact: 'Jordan portait des Jordan 12 lors du “Flu Game”.' },
    { q: 'Quelle ligne est signée Kobe chez Nike ?', choices: ['Zoom Kobe', 'Hyperdunk', 'KD', 'PG'], answer: 0, fact: 'La gamme Zoom Kobe a popularisé les chaussures basses.' },
    { q: 'Qui a porté les “Foamposite One” bleues ?', choices: ['Penny Hardaway', 'Shaq', 'Grant Hill', 'Scottie Pippen'], answer: 0, fact: 'Penny Hardaway a lancé la Foamposite One.' },
    { q: 'Quelle marque signe Stephen Curry ?', choices: ['Under Armour', 'Nike', 'Adidas', 'Puma'], answer: 0, fact: 'Steph est l’athlète phare d’Under Armour.' },
    { q: 'Quelle paire a popularisé le “pump” ?', choices: ['Reebok Pump', 'Nike Air Max', 'Adidas Crazy 8', 'Fila Grant Hill'], answer: 0, fact: 'Dee Brown a gonflé ses Reebok Pump avant un dunk contest.' },
    { q: 'Quelle chaussure signature pour Zion Williamson ?', choices: ['Jordan Zion', 'Nike Air Zion', 'Adidas Zion', 'UA Zion'], answer: 0, fact: 'Zion possède sa ligne Jordan Brand.' },
    { q: 'Quelle chaussure est associée à LeBron rookie ?', choices: ['Air Zoom Generation', 'LeBron II', 'LeBron Soldier', 'Lebron Witness'], answer: 0, fact: 'La Air Zoom Generation est la première LeBron.' },
    { q: 'Quel joueur a inspiré la “Answer 1” ?', choices: ['Allen Iverson', 'Gary Payton', 'Baron Davis', 'Jason Williams'], answer: 0, fact: 'Reebok Answer 1 pour Allen Iverson.' },
    { q: 'Quelle paire est surnommée “Space Jam” ?', choices: ['AJ11', 'AJ13', 'AJ8', 'AJ7'], answer: 0, fact: 'Michael Jordan portait les Air Jordan 11 dans Space Jam.' },
    { q: 'Quel joueur a une ligne “Why Not?”', choices: ['Russell Westbrook', 'Damian Lillard', 'Kyrie Irving', 'Chris Paul'], answer: 0, fact: 'Why Not Zer0? pour Westbrook (Jordan Brand).' },
    { q: 'Quelle marque signe Damian Lillard ?', choices: ['Adidas', 'Nike', 'Jordan', 'Puma'], answer: 0, fact: 'Damian Lillard a sa ligne adidas (Dame).' },
    { q: 'Quelle chaussure iconique pour Shaq ?', choices: ['Shaqnosis', 'Shaq Attack', 'Zoom Rize', 'Air Force'], answer: 1, fact: 'Shaq Attack et Shaqnosis sont ses modèles Reebok.' },
    { q: 'Quelle chaussure a relancé la hype AJ en 1995 ?', choices: ['AJ11 Concord', 'AJ10', 'AJ9', 'AJ12'], answer: 0, fact: 'La AJ11 Concord a fait un retour tonitruant.' },
    { q: 'Quel shoemaker collabore avec Luka Doncic ?', choices: ['Jordan Brand', 'Puma', 'New Balance', 'Li-Ning'], answer: 0, fact: 'Luka porte la Jordan Luka 1.' },
    { q: 'Quel joueur a signé chez Li-Ning ?', choices: ['Dwyane Wade', 'Klay Thompson', 'CJ McCollum', 'Toutes ces réponses'], answer: 3, fact: 'Wade, Klay et CJ ont signé avec Li-Ning/ANTA.' },
    { q: 'Quelle paire a marqué Vince Carter au Dunk Contest 2000 ?', choices: ['Nike Shox BB4', 'Nike Flightposite', 'Adidas Top Ten', 'Reebok Question'], answer: 0, fact: 'Vince Carter portait les Nike Shox BB4.' },
    { q: 'Quelle chaussure a fêté le 20e anniversaire en 2020 ?', choices: ['T-Mac 1', 'Zoom Kobe 5', 'KD3', 'Kyrie 1'], answer: 1, fact: 'La Zoom Kobe 5 a été rééditée en Protro.' },
    { q: 'Quelle série est signée par Kyrie Irving ?', choices: ['Kyrie', 'Zoom Freak', 'UA Flow', 'PG'], answer: 0, fact: 'Nike Kyrie a livré des modèles rapides et créatifs.' },
    { q: 'Quelle chaussure porte Giannis ?', choices: ['Zoom Freak', 'Air Max', 'Lebron Soldier', 'Harden'], answer: 0, fact: 'Nike Zoom Freak est la gamme de Giannis.' },
    { q: 'Quelle paire est surnommée “Graffiti” ?', choices: ['Lebron 4', 'Lebron 7', 'KD 4', 'Zoom BB'], answer: 0, fact: 'La LeBron 4 Graffiti est un classique 2006.' },
    { q: 'Quelle chaussure a le “Boost” ?', choices: ['Adidas Harden', 'Nike KD', 'Jordan Melo', 'Li-Ning Way of Wade'], answer: 0, fact: 'La technologie Boost équipe la gamme Harden.' },
    { q: 'Quelle collaboration basket x mode a marqué 2020 ?', choices: ['Dior x Air Jordan 1', 'Gucci x Kobe', 'Prada x Curry', 'LV x LeBron'], answer: 0, fact: 'La Air Jordan 1 Dior a marqué la haute couture.' },
    { q: 'Quelle chaussure a un strap signature ?', choices: ['LeBron Soldier', 'Air Zoom Flight', 'Kyrie Infinity', 'PG 5'], answer: 0, fact: 'La ligne Soldier possède un strap emblématique.' },
    { q: 'Quelle paire est associée à Derrick Rose ?', choices: ['adidas D Rose', 'Nike Air Dominator', 'Under Armour Rose', 'Puma D-Magic'], answer: 0, fact: 'Adidas D Rose accompagne le MVP 2011.' }
  ]
}

export default function BasketQuiz() {
  const navigate = useNavigate()
  const [active, setActive] = useState('legends')
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const saved = Number(localStorage.getItem('quizScore') || 0)
    setScore(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('quizScore', String(score))
  }, [score])

  useEffect(() => {
    setIdx(0)
    setResult(null)
  }, [active])

  const pool = QUESTIONS[active]
  const current = useMemo(() => pool[idx % pool.length], [pool, idx])

  const submit = (choiceIndex) => {
    const ok = choiceIndex === current.answer
    const feedback = ok
      ? POSITIVE_FEEDBACK[Math.floor(Math.random() * POSITIVE_FEEDBACK.length)]
      : NEGATIVE_FEEDBACK[Math.floor(Math.random() * NEGATIVE_FEEDBACK.length)]

    setResult({ ok, fact: current.fact, feedback })
    if (ok) setScore(s => s + 10)
    else setScore(s => Math.max(0, s - 5))

    setTimeout(() => {
      setResult(null)
      setIdx(prev => prev + 1)
    }, 3000)
  }

  return (
    <div className="stats-container quiz-bg">
      <div className="stats-header">
        <button className="back-button" onClick={() => navigate('/')}>← Retour</button>
        <h1>Quizz Basket</h1>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Points: {score}</div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
        {Object.entries(CATEGORIES).map(([k, v]) => (
          <button
            key={k}
            className={`stat-card ${k === active ? 'win' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setActive(k)}
            disabled={result !== null}
          >
            <div className="stat-value" style={{ fontSize: '2rem' }}>{v.icon}</div>
            <div className="stat-label">{v.name}</div>
          </button>
        ))}
      </div>

      <div className="match-statistics">
        <h2>{pool.length} questions • question {idx % pool.length + 1}</h2>
        <div className="stat-card" style={{ textAlign: 'left', maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>{current.q}</div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {current.choices.map((c, i) => (
              <button
                key={i}
                className="start-button"
                style={{ margin: 0, width: '100%' }}
                onClick={() => submit(i)}
                disabled={!!result}
              >
                {c}
              </button>
            ))}
          </div>
          {result && (
            <div className={`stat-card ${result.ok ? 'win' : 'loss'}`} style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease', textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{result.feedback}</div>
              {result.fact && <div style={{ fontStyle: 'italic', opacity: 0.9 }}>{result.fact}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

