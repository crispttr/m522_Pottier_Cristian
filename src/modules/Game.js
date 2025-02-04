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
//Importantion de answer
import { Answer } from './Answer.js'

export class Game {
  constructor(maxAttempts) {
    this.maxAttempts = maxAttempts
    this.currentAttempt = 0
    this.answers = []
    this.messageElement = document.querySelector('.message')
    this.board = document.querySelector('.board')

    this.initGame()
  }

  //Initialisation de la partie
  async initGame() {
    try {
      const response = await fetch(
        'https://progweb-wwwordle-api.onrender.com/new-game'
      )
      const data = await response.json()

      for (let i = 0; i < this.maxAttempts; i++) {
        const answer = new Answer(i)
        this.answers.push(answer)
        this.board.appendChild(answer.form)
      }

      this.answers[0].setActive(true)
    } catch (error) {
      console.error('Erreur:', error)
      this.showMessage('Impossible de démarrer une nouvelle partie')
    }
  }

  nextAttempt() {
    if (this.currentAttempt < this.maxAttempts - 1) {
      this.answers[this.currentAttempt].setActive(false)
      this.currentAttempt++
      this.answers[this.currentAttempt].setActive(true)
    }
  }

  static showMessage(message) {
    const messageElement = document.querySelector('.message')
    messageElement.textContent = message
  }
}
