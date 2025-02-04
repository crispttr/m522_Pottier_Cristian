/*
Rôle : Point d'entrée du programme, il orchestre le lancement du jeu
Fonctionnalité
- Créer et initaliser le jeu avec un nombre determiné de tentative 
- Assurer la mise en place de la partie dès le chargement de la page
Interaction avec les autre modules
- Importe le module du Game.js pour instancier (en lui passant le nombre de tentative)
- Ne contient pas de logique spécifique au fonctionnement des tentatives ; délègue cette responsabilité au jeu
*/

'use strict'
import { initGame } from './modules/Game.js'
import { handleAnswer } from './modules/Answer.js'

document.addEventListener('DOMContentLoaded', () => {
  // Création du tableau de jeu
  const gameBoard = document.createElement('div')
  gameBoard.className = 'game-board'
  document.body.appendChild(gameBoard)

  // Création de l'input pour les réponses
  const input = document.createElement('input')
  input.type = 'text'
  input.maxLength = 5
  document.body.appendChild(input)

  // Création du bouton de soumission
  const submitButton = document.createElement('button')
  submitButton.textContent = 'Soumettre'
  document.body.appendChild(submitButton)

  // Initialisation du jeu
  initGame(gameBoard)

  // Gestion des soumissions
  submitButton.addEventListener('click', () => {
    handleAnswer(input.value, gameBoard)
    input.value = ''
  })
})
