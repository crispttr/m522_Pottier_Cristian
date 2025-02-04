/*
Rôle : Gérer la saisie d’une proposition par l’utilisateur pour un essai précis (une ligne du jeu).
Fonctionnalités :
- Générer et insérer un formulaire de saisie (un ensemble de champs pour la proposition).
- Permettre la navigation intuitive dans les champs (déplacement automatique du focus).
- Vérifier la validité de la saisie (longueur, caractères autorisés).
- Envoyer la proposition au serveur et traiter la réponse (colorisation, affichage du résultat).
- Alterner entre un état actif et inactif, selon la progression du jeu.

Interaction avec les autres modules :
- Est créé et géré par le module du jeu (chaque partie possède un certain nombre de tentatives).
- Informe le jeu des résultats après validation (pour savoir si l’essai est correct ou non).
- Peut déclencher un message d’erreur ou de victoire, mais l’affichage final est géré par le jeu.
*/ 'use strict'
export const handleAnswer = async (guess, gameBoard) => {
  const API_URL = 'https://progweb-wwwordle-api.onrender.com'

  if (guess.length !== 5) {
    alert('Le mot doit contenir 5 lettres')
    return
  }

  try {
    const response = await fetch(`${API_URL}/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId: window.gameState.gameId,
        guess: guess.toUpperCase(),
      }),
    })

    const data = await response.json()

    // Mise à jour de la grille
    const currentRow = gameBoard.children[window.gameState.attempts]
    for (let i = 0; i < 5; i++) {
      const cell = currentRow.children[i]
      cell.textContent = guess[i].toUpperCase()
      cell.className = `cell ${data.result[i]}`
    }

    window.gameState.attempts++

    // Message de victoire ou défaite
    if (data.correct) {
      alert('Bravo ! Vous avez gagné !')
    } else if (window.gameState.attempts >= window.gameState.maxAttempts) {
      alert('Game Over !')
    }
  } catch (error) {
    console.error('Erreur:', error)
  }
}
