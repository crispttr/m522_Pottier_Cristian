/*
Rôle : Piloter la progression de la partie et gérer l'ensemble des tentatives
Fonctionnalité 
- Maintenir l'état global (en cours, terminé etc.)
- Organiser et stocker un ensemble de tentatives.
- Activer et désactiver la tentative courante selon l’avancement du jeu.
- Déterminer si la partie doit continuer ou s’arrêter (par exemple, après le dernier essai).
- Diffuser des messages d’information ou d’erreur à l’écran
Interaction avec les autres modules :
- Crée plusieurs objets représentant les tentatives (depuis le module des tentatives Answer.js).
- Reçoit des retours des tentatives (propositions, résultats) et gère la suite de la partie en conséquence.
-Affiche des informations ou avertit en cas d’erreur au travers du DOM (sans s’occuper du détail de la saisie).
*/

'use strict'
export const initGame = async (gameBoard) => {
  const API_URL = 'https://progweb-wwwordle-api.onrender.com'

  try {
    const response = await fetch(`${API_URL}/new-game`)
    const data = await response.json()

    // Initialisation de l'état du jeu
    window.gameState = {
      attempts: 0,
      maxAttempts: 6,
      gameId: data.gameId,
    }

    // Création de la grille
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('div')
      row.className = 'row'
      for (let j = 0; j < 5; j++) {
        const cell = document.createElement('div')
        cell.className = 'cell'
        row.appendChild(cell)
      }
      gameBoard.appendChild(row)
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}
