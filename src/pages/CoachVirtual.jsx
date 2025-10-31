import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/TeamManagement.css'

const COACHES = [
  { id: 'jordan', name: 'Coach Jordan', symbol: '🔥', mantra: 'Respire le feu sacré.', gradient: 'linear-gradient(135deg, rgba(248,113,113,0.35), rgba(249,115,22,0.35))' },
  { id: 'mia', name: 'Mia “Le Rebond”', symbol: '🌙', mantra: 'Écoute ton souffle.', gradient: 'linear-gradient(135deg, rgba(125,211,252,0.35), rgba(56,189,248,0.35))' },
  { id: 'leo', name: 'Leo “The Veteran”', symbol: '🛡️', mantra: 'Ancre-toi et avance.', gradient: 'linear-gradient(135deg, rgba(134,239,172,0.35), rgba(74,222,128,0.35))' }
]

const QUESTIONS = [
  "1. Quand tu fermes les yeux, quel match rejoues-tu dans ta tête ?",
  "2. Quelle émotion te traverse quand tu entends un ballon rebondir ?",
  "3. Si ton mental était un terrain, à quoi ressemblerait-il aujourd'hui ?",
  "4. Quel souvenir de victoire te donne encore la chair de poule ?",
  "5. Quelle défaite a travaillé ton caractère plus que toute autre ?",
  "6. Quel coach intérieur te parle quand tu doutes ?",
  "7. Que dirait l'enfant que tu étais à propos de ton parcours ?",
  "8. Qu'est-ce qui t'empêche parfois de croire en ton futur ?",
  "9. Quelle blessure invisible demandes-tu à ton cœur de guérir ?",
  "10. Quand as-tu ressenti pour la dernière fois la pure joie de jouer ?",
  "11. Quelle odeur te ramène immédiatement au parquet ?",
  "12. Qu'aimerais-tu transmettre aux jeunes qui t'observent ?",
  "13. Quel rituel te manque le plus avant un match ?",
  "14. Que murmure ton corps quand tu penses à la compétition ?",
  "15. Quelle chanson décrit ton état d'esprit du moment ?",
  "16. Quel geste technique te définit comme joueur dans ton esprit ?",
  "17. Quand as-tu accepté pour la première fois tes limites ?",
  "18. Quel regard t'a donné confiance la première fois ?",
  "19. Quelle promesse t'es-tu faite après ta blessure ?",
  "20. De quoi es-tu le plus fier en dehors des stats ?",
  "21. Quel mot résume ta relation avec la douleur physique ?",
  "22. Que signifie pour toi 'rester dans le game' aujourd'hui ?",
  "23. Quelle personne t'a appris à rebondir mentalement ?",
  "24. Quel souvenir d'entraînement te fait encore sourire ?",
  "25. Qu'est-ce qui t'effraie encore dans l'idée de performer ?",
  "26. Où trouves-tu ton énergie quand le moral est bas ?",
  "27. Quel coach mériterait une lettre de gratitude de ta part ?",
  "28. Sur quel aspect mental travailles-tu en ce moment ?",
  "29. Quelle phrase te redonne envie de te lever tôt ?",
  "30. Quand as-tu découvert ta capacité à inspirer ?",
  "31. Quelle sensation associes-tu à l'esprit d'équipe ?",
  "32. Quelle peur voudrais-tu déposer sur ce parquet imaginaire ?",
  "33. Quel conseil donnerais-tu à un joueur en pleine rééducation ?",
  "34. Que signifie 'garder la flamme' pour toi ?",
  "35. Quel geste de soutien t'a le plus touché dans ta carrière ?",
  "36. Quelle vision future te fait avancer malgré tout ?",
  "37. Quelle partie de ton jeu mental reste inexplorée ?",
  "38. Qu'aimerais-tu que les gens comprennent de ton parcours ?",
  "39. Quelle voix intérieure dois-tu parfois faire taire ?",
  "40. Quand as-tu vraiment senti que tu étais un leader ?",
  "41. Quelle couleur symbolise ta résilience ?",
  "42. Quel moment de solitude t'a appris une grande leçon ?",
  "43. Quelle blessure émotionnelle cherches-tu encore à refermer ?",
  "44. Que réponds-tu au doute quand il frappe ?",
  "45. Quelle rencontre a changé ton rapport au basket ?",
  "46. Quel rêve as-tu mis en pause sans l'oublier ?",
  "47. Quand as-tu pleuré pour ce sport pour la dernière fois ?",
  "48. Quels mots voudrais-tu entendre après un effort immense ?",
  "49. Quelle image te motive à reprendre le contrôle ?",
  "50. Quel mantra as-tu besoin de réinventer aujourd'hui ?",
  "51. Quel sentiment te traverse quand tu entends le sifflet final ?",
  "52. Que signifie 'jouer avec le cœur' pour toi maintenant ?",
  "53. Quel compagnon de route mental t'accompagne encore ?",
  "54. Quelle émotion te submerge sur la ligne des lancers francs ?",
  "55. Quel sacrifice t'a le plus construit intérieurement ?",
  "56. Quelle scène de vestiaire reste gravée dans ta mémoire ?",
  "57. Quel personne hors basket nourrit ta force mentale ?",
  "58. Quelle saison mentale es-tu en train de vivre ?",
  "59. Quel rôle veux-tu jouer dans la salle des légendes mentales ?",
  "60. Quel livre décrirait ta saison actuelle ?",
  "61. Quelle habitude mentale aimerais-tu installer cette semaine ?",
  "62. Quel souvenir de fatigue t'a appris ton seuil ?",
  "63. Quand t'es-tu senti invincible pour la dernière fois ?",
  "64. Quelle promesse ferais-tu à ton corps aujourd'hui ?",
  "65. Quel message laisseras-tu à la génération suivante ?",
  "66. Quelle question aimerais-tu qu'on te pose plus souvent ?",
  "67. Quelle respiration t'aide à faire tomber la pression ?",
  "68. Quel moment de doute s'est transformé en victoire intérieure ?",
  "69. Quelle sensation sur le parquet te manque le plus ?",
  "70. Quel mot te rappelle que tu n'es pas seul ?",
  "71. Quelle image te rend fier malgré la blessure ?",
  "72. Quel mentor imaginaire consultes-tu dans ta tête ?",
  "73. Quelle partie de ton jeu mental aimerais-tu célébrer ?",
  "74. Quel morceau de toi as-tu oublié sur un parquet ?",
  "75. Quelle question te révèle toujours un nouvel angle ?",
  "76. Quel regard de coéquipier t'a donné envie de te dépasser ?",
  "77. Quel rituel mental te reconnecte à ton énergie ?",
  "78. Quelle victoire intérieure reste invisible aux autres ?",
  "79. Quelle phrase aimerais-tu écrire sur tes chaussures ?",
  "80. Quel souvenir d'enfance nourrit encore ton basket ?",
  "81. Quelle frustration récente peut devenir ton moteur ?",
  "82. Quel état d'esprit veux-tu transmettre à tes proches ?",
  "83. Quelle sensation dans les mains te manque le plus ?",
  "84. Quelle question poserais-tu à ton héros ?",
  "85. Quel doute transformes-tu en apprentissage aujourd'hui ?",
  "86. Quelle minute du passé voudrais-tu revivre pour la savourer ?",
  "87. Quel défi mental as-tu relevé sans témoin ?",
  "88. Quelle force intérieure veux-tu remercier ?",
  "89. Quel rêve t'aide à supporter la rééducation ?",
  "90. Quel moment de silence t'a le plus parlé ?",
  "91. Quelle odeur de salle te redonne envie d'y retourner ?",
  "92. Quelle phrase t'aide à pardonner ton corps ?",
  "93. Quelle promesse te lies-tu à tenir cette année ?",
  "94. Quelle chanson t'aide à canaliser tes émotions ?",
  "95. Quelle vérité aimerais-tu hurler dans un vestiaire vide ?",
  "96. Quel geste invisible fais-tu pour rester en paix ?",
  "97. Quelle émotion veux-tu exprimer davantage ?",
  "98. Quel souvenir partages-tu volontiers avec un jeune joueur ?",
  "99. Quelle sensation te dit que tu es prêt malgré tout ?",
  "100. Quel rêve t'a semblé impossible mais continue d'exister ?",
  "101. Quelle situation te demande encore de lâcher prise ?",
  "102. Quel regard de public t'a donné des ailes ?",
  "103. Quelle question aimerais-tu poser à ton futur toi ?",
  "104. Quel coéquipier t'a offert un modèle de résilience ?",
  "105. Quelle peur transformes-tu en curiosité ?",
  "106. Quel mot clé écrirais-tu sur un tableau blanc mental ?",
  "107. Quelle astuce mentale aimerais-tu enseigner ?",
  "108. Quel moment t'a fait croire en la magie du basket ?",
  "109. Quelle émotion te submerge pendant un temps mort ?",
  "110. Quelle partie de toi refuses-tu d'abandonner ?",
  "111. Quel souvenir de vestiaire penses-tu à chaque reprise ?",
  "112. Quel rituel mental respectes-tu encore sans jouer ?",
  "113. Quel instant précis t'a prouvé que tu étais fait pour ce sport ?",
  "114. Quelle différence veux-tu faire maintenant ?",
  "115. Quel geste symbolique te rattache à ton identité de joueur ?",
  "116. Quelle phrase te libère du regard des autres ?",
  "117. Quel moment t'a appris la patience ?",
  "118. Quelle question simple te ramène à l'essentiel ?",
  "119. Quelle émotion aimerais-tu revivre à l'infini ?",
  "120. Quel double intérieur dialogues-tu pour avancer ?",
  "121. Quel souvenir t'aide à te relever quand tout pèse lourd ?",
  "122. Quelle sensation dans les doigts te rappelle la précision ?",
  "123. Quel endroit symbolique représente ton courage ?",
  "124. Quelle vision nocturne te tient éveillé positivement ?",
  "125. Quelle question aimerais-tu poser à ton corps ?",
  "126. Quel mot d'encouragement veux-tu t'offrir ce soir ?",
  "127. Quelle promesse ferais-tu à ton équipe idéale ?",
  "128. Quelle respiration t'ancre avant de parler ?",
  "129. Quel souvenir de coach t'a marqué à vie ?",
  "130. Quelle partie de ton histoire mérite un documentaire ?",
  "131. Quel moment d'entraînement t'a rendu fier de ta discipline ?",
  "132. Quelle peur aimerais-tu laisser dans ce carnet ?",
  "133. Quel rêve aimerais-tu transformer en projet concret ?",
  "134. Quelle question t'aide à affronter les matins difficiles ?",
  "135. Quelle sensation corporelle te rassure immédiatement ?",
  "136. Quel moment d'équipe t'a réchauffé le cœur ?",
  "137. Quelle phrase t'aide à accepter le repos ?",
  "138. Quel rituel mental inventes-tu pour cette semaine ?",
  "139. Quel souvenir d'un public te remplit encore d'énergie ?",
  "140. Quelle question poserais-tu à ton coach idéal ?",
  "141. Quelle limite mentale es-tu prêt à repousser ?",
  "142. Quelle intuition voudrais-tu écouter davantage ?",
  "143. Quel geste quotidien nourrit ta confiance ?",
  "144. Quelle phrase te rappelle ta valeur intrinsèque ?",
  "145. Quel endroit hors basket te recharge réellement ?",
  "146. Quelle émotion te guide dans les moments critiques ?",
  "147. Quel souvenir d'enfance te motive en silence ?",
  "148. Quelle question simple t'aide à te recentrer ?",
  "149. Quelle promesse ferais-tu à celle ou celui qui croit en toi ?",
  "150. Quelle victoire intérieure veux-tu célébrer ce soir ?",
  "151. Quelle part de toi reste en compétition malgré l'absence de match ?",
  "152. Quel mot t'aide à accepter l'incertitude ?",
  "153. Quelle image mentale t'apporte du calme instantanément ?",
  "154. Quel souvenir t'apprend l'humilité encore aujourd'hui ?",
  "155. Quelle conviction te porterait même sans basket ?",
  "156. Quelle question poserais-tu au vestiaire vide si tu pouvais ?",
  "157. Quel moment a éveillé ton instinct de protecteur d'équipe ?",
  "158. Quelle émotion veux-tu apprivoiser cette année ?",
  "159. Quel souvenir t'aide à croire que tout est possible ?",
  "160. Quelle phrase t'aide à accepter la lenteur de la guérison ?",
  "161. Quel engagement te donne envie de te lever tôt ?",
  "162. Quelle question te reconnecte à ton amour du jeu ?",
  "163. Quel souvenir t'apprend le respect profond de ce sport ?",
  "164. Quelle sensation te rappelle que tu es vivant malgré la blessure ?",
  "165. Quel message voudrais-tu transmettre à ton futur public ?",
  "166. Quelle question aimerais-tu poser au basket lui-même ?",
  "167. Quelle expérience t'a appris la résilience mentale ultime ?",
  "168. Quelle émotion veux-tu partager avec ton entourage aujourd'hui ?",
  "169. Quel souvenir te donne envie de sourire sans raison ?",
  "170. Quelle question te libère de la pression extérieure ?",
  "171. Quel moment t'a appris la valeur d'une pause ?",
  "172. Quelle sensation corporelle te rassure quand tu doutes ?",
  "173. Quel regard de coéquipier a changé ta vision du travail ?",
  "174. Quelle pensée t'accompagne dans les jours gris ?",
  "175. Quel mot utiliserais-tu pour décrire ton rapport à la persévérance ?",
  "176. Quelle situation t'a montré la puissance de la patience ?",
  "177. Quel souvenir de famille te donne de la force ?",
  "178. Quelle phrase aimerais-tu entendre avant un grand défi ?",
  "179. Quel moment te rappelle la beauté du collectif ?",
  "180. Quelle question t'invite à rêver plus grand ?",
  "181. Quelle sensation ressens-tu quand tu encourages quelqu'un d'autre ?",
  "182. Quel souvenir t'apprend la valeur du silence ?",
  "183. Quelle phrase veux-tu écrire dans ton prochain chapitre ?",
  "184. Quel moment de faiblesse t'a donné une force inattendue ?",
  "185. Quelle question aimerais-tu poser à ton meilleur coéquipier ?",
  "186. Quel rêve as-tu transformé en plan récemment ?",
  "187. Quelle émotion veux-tu explorer pour te connaître mieux ?",
  "188. Quel souvenir te rappelle pourquoi tu aimes ce sport ?",
  "189. Quelle phrase te dit que tu as encore ta place ?",
  "190. Quel moment a transformé ta façon de voir la compétition ?",
  "191. Quelle respiration t'aide à sortir d'une spirale de pensées ?",
  "192. Quelle question te donne envie de reprendre la plume sur ton journal ?",
  "193. Quel souvenir de vestiaire te donne envie de rire encore ?",
  "194. Quelle conviction veux-tu ancrer aujourd'hui ?",
  "195. Quelle question te permet d'avancer malgré les obstacles ?",
  "196. Quel souvenir de soutien t'aide à croire en l'humanité du sport ?",
  "197. Quelle phrase t'aide à tendre la main quand tu en as besoin ?",
  "198. Quelle sensation te convainc de ne jamais abandonner ?",
  "199. Quelle question t'ouvre une porte vers un nouvel horizon ?",
  "200. Quelle image finale résume ta renaissance intérieure ?"
]

const LONG_HONEST_RESPONSES = [
  "Tu viens d’offrir une réponse qui respire la conscience de soi : tu as pris le temps de nommer ce que tu ressens, de mesurer ce qui se joue en toi. Continue de t’écouter avec cette précision, Youssouf. Les voix intérieures qui méritent d’être entendues sont souvent celles que l’on vient d’écrire.",
  "Je ressens dans tes mots une parfaite lucidité. Tu ne minimises pas ce que tu traverses, tu observes avec honnêteté les zones d’ombre comme les élans de lumière. Cette clarté est une alliée précieuse : garde-la près de toi, Youssouf, et autorise-toi à avancer à ton rythme.",
  "Ta réponse met en lumière un mental qui refuse de se raconter des histoires. Tu as posé des mots justes, parfois bruts, mais profondément authentiques. Ce réalisme tendre est la base d’une vraie reconstruction. Continue de parler à haute voix à partir de ce point d’ancrage, Youssouf.",
  "Tu viens de déposer une vérité qui résonne longtemps après la lecture. Tu connais tes forces, tu n’éludes pas tes fragilités et tu refuses de trahir ton histoire. Cette intégrité est rare : protège-la, Youssouf, et laisse-la guider les décisions que tu prendras demain.",
  "On sent dans ta réponse une grande maturité émotionnelle : tu accueilles la complexité de ce que tu traverses sans t’enfermer dedans. C’est ce regard nuancé qui permet d’habiter à nouveau son corps et son parcours. Continue de t’accorder cette honnêteté, Youssouf.",
  "Ce que tu viens d’écrire est une preuve que ton feu intérieur est vivant. Tu mets des mots sur les angles coupants comme sur les moments de grâce. Cette capacité à embrasser le spectre complet des émotions est un véritable talent, Youssouf.",
  "Tes phrases racontent un cœur qui a pris des coups mais qui respire encore avec profondeur. Tu ne fuis pas les souvenirs qui piquent, tu les regardes en face et tu apprends d’eux. C’est exactement l’attitude d’un leader intérieur. Continue de lui faire confiance, Youssouf.",
  "Ta réponse est un miroir fidèle de ton état d’esprit : elle ne ment pas, elle ne s’excuse pas, elle raconte simplement ce qui est. Cette sincérité est thérapeutique en elle-même. Laisse-la s’installer dans tous tes dialogues à venir, Youssouf.",
  "Ce que tu viens d’écrire montre que tu as trouvé un langage pour tes émotions. Tu ne laisses pas le flou gagner la partie : tu nommes, tu cadres, tu sens. Cette précision émotionnelle est un muscle que tu renforces. Continue de le travailler avec bienveillance, Youssouf.",
  "Je perçois dans ta réponse une forme de paix lucide : tu ne cherches pas à embellir le passé, tu cherches à comprendre comment l’habiter autrement. Cette intention est puissante. Entretiens-la comme on entretient une flamme sacrée, Youssouf."
]

const KEYWORD_THEMES = [
  {
    keywords: ['peur', 'crains', 'ango', 'stress', 'doute', 'inquiet', 'soucis'],
    responses: [
      "Tu viens d’oser nommer ta peur. C’est souvent le pas que beaucoup évitent parce qu’il oblige à se regarder sans filtre. Prends le temps de savourer cette honnêteté : c’est elle qui te permet de décider quels outils, quelles personnes et quelles routines peuvent t’aider. La peur n’est pas un verdict, Youssouf, c’est un signal."
    ]
  },
  {
    keywords: ['douleur', 'blessure', 'cicatrice', 'souffrance', 'physique', 'reeducation'],
    responses: [
      "J’entends dans tes mots une douleur qui ne cherche plus à être cachée. Tu sais ce qu’elle t’a pris, mais tu vois aussi ce qu’elle te pousse à construire. Laisse-toi le droit de la respecter comme on respecterait un professeur exigeant. Chaque sensation, chaque étape de guérison compte. Tu avances, Youssouf, même quand ça brûle."
    ]
  },
  {
    keywords: ['espoir', 'futur', 'avenir', 'rêve', 'vision', 'objectif', 'projet'],
    responses: [
      "Ta réponse respire la projection et la créativité. Même blessé, tu continues de t’autoriser à imaginer, et ça, c’est un choix puissant. Nourris cette vision en la découpant en petites balises quotidiennes. Chaque jour où tu y reviens met du concret dans ton espoir. Reste fidèle à cette lumière, Youssouf."
    ]
  },
  {
    keywords: ['équipe', 'coéquipier', 'collectif', 'leader', 'transmettre', 'mentor'],
    responses: [
      "On sent dans tes mots que le collectif compte encore énormément pour toi. Tu n’as pas perdu la fibre du leader : tu réfléchis déjà à ce que tu peux partager, même à distance du parquet. Continue de cultiver ces liens, propose ton regard, raconte ton vécu. Tu es toujours une voix qui pèse, Youssouf."
    ]
  },
  {
    keywords: ['fatigue', 'lassitude', 'épuisé', 'épuisement', 'usé'],
    responses: [
      "Tu as posé des mots sur la fatigue, et c’est un acte de respect envers toi-même. Reconnaître l’épuisement ne veut pas dire renoncer : cela veut dire réajuster pour durer. Autorise-toi des pauses conscientes, des respirations lentes. Le mental récupère aussi sur un tempo doux, Youssouf."
    ]
  },
  {
    keywords: ['gratitude', 'merci', 'remercie', 'reconnaissance'],
    responses: [
      "Ta réponse déborde de gratitude : c’est un carburant rare. Rappelle-toi que remercier ne diminue en rien ce que tu traverses, au contraire. Cela te relie à ceux qui t’ont soutenu et t’aide à continuer dans la fidélité à tes valeurs. Garde ce réflexe, Youssouf, il est noble."
    ]
  }
]

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const computeHonestFeedback = (rawAnswer) => {
  const text = rawAnswer.toLowerCase()
  for (const theme of KEYWORD_THEMES) {
    if (theme.keywords.some(keyword => text.includes(keyword))) {
      return pick(theme.responses)
    }
  }
  if (rawAnswer.trim().length < 30) {
    return "Merci d'avoir répondu avec honnêteté. Même une réponse courte raconte déjà ton état du moment. Si tu sens qu'il y a plus à dire, tu peux y revenir quand tu veux, Youssouf."
  }
  if (rawAnswer.trim().length > 280) {
    return "Tu viens de prendre le temps de vider une partie de ton sac mental, et c’est précieux. Garde cette trace quelque part, relis-la demain, et vois ce qui résonne encore. Elle deviendra peut-être la base d’un nouvel engagement avec toi-même, Youssouf."
  }
  return pick(LONG_HONEST_RESPONSES)
}

export default function CoachVirtual() {
  const navigate = useNavigate()
  const [active, setActive] = useState('jordan')
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [journal, setJournal] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('coachJournal') || '[]')
      return Array.isArray(saved) ? saved : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('coachJournal', JSON.stringify(journal))
  }, [journal])

  const currentQuestion = useMemo(() => QUESTIONS[index % QUESTIONS.length], [index])

  const handleSubmit = () => {
    if (!answer.trim()) return

    const honest = computeHonestFeedback(answer)

    const entry = {
      id: Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      coach: active,
      question: currentQuestion,
      answer: answer.trim(),
      honest
    }

    setFeedback({ honest })
    setJournal(prev => [...prev.slice(-49), entry])
    setAnswer('')
    setIndex(prev => prev + 1)
  }

  const coachData = COACHES.find(c => c.id === active) ?? COACHES[0]

  return (
    <div className="team-container coach-virtual">
      <div className="coach-aura"></div>
      <div className="team-header">
        <button className="back-button" onClick={() => navigate('/')}>← Retour</button>
        <h1>Coach Virtuel</h1>
      </div>

      <div className="coach-coaches">
        {COACHES.map(c => (
          <button
            key={c.id}
            className={`coach-card coach-pick ${c.id === active ? 'active' : ''}`}
            style={{ background: c.gradient }}
            onClick={() => setActive(c.id)}
          >
            <div className="coach-avatar">{c.symbol}</div>
            <div className="coach-name">{c.name}</div>
            <div className="coach-mantra">{c.mantra}</div>
          </button>
        ))}
      </div>

      <div className="coach-card coach-question" style={{ background: coachData.gradient }}>
        <div className="coach-question-title">{coachData.symbol} {coachData.name}</div>
        <div className="coach-question-mantra">{coachData.mantra}</div>
        <div className="coach-question-text">{currentQuestion}</div>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Écris ta réponse ici..."
          className="coach-textarea"
        />
        <button className="start-button" style={{ alignSelf: 'flex-start' }} onClick={handleSubmit}>
          Envoyer ma réponse
        </button>
      </div>

      {feedback && (
        <div className="coach-card feedback-panel">
          <div className="feedback-line honest">{feedback.honest}</div>
        </div>
      )}

      {journal.length > 0 && (
        <div className="coach-journal">
          <h2>Journal (dernières entrées)</h2>
          <div className="coach-journal-list">
            {[...journal].reverse().slice(0, 6).map(entry => (
              <div key={entry.id} className="coach-card journal-entry">
                <div className="journal-header">
                  <span>{entry.date}</span>
                  <span>{COACHES.find(c => c.id === entry.coach)?.name || ''}</span>
                </div>
                <div className="journal-question">{entry.question}</div>
                <div className="journal-answer">{entry.answer}</div>
                <div className="journal-feedback"><strong>Avis:</strong> {entry.honest}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

