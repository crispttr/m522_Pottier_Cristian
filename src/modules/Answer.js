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
export class Answer {
  constructor(rowIndex) {
    this.form = this.createForm(rowIndex)
    this.setupKeyboardNavigation()
    this.setupFormSubmission()
    this.setActive(false)
  }

  createForm(rowIndex) {
    const form = document.createElement('form')
    form.className = 'row'
    form.id = `row-${rowIndex}`
    form.setAttribute('inert', '')

    for (let i = 0; i < 5; i++) {
      const input = document.createElement('input')
      input.type = 'text'
      input.className = 'letter'
      input.name = `letter-${i}`
      input.id = `row-${rowIndex}--${i}`
      input.maxLength = 1
      form.appendChild(input)
    }

    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.hidden = true
    form.appendChild(submit)

    return form
  }

  setActive(active) {
    if (active) {
      this.form.removeAttribute('inert')
      this.focusFirstInput()
    } else {
      this.form.setAttribute('inert', '')
    }
  }

  focusFirstInput() {
    this.form.querySelector('input').focus()
  }

  setupKeyboardNavigation() {
    const inputs = this.form.querySelectorAll('input[type="text"]')

    inputs.forEach((input, index) => {
      input.addEventListener('keyup', (event) => {
        if (this.isAlphaNumericKey(event.key) || event.key === 'ArrowRight') {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus()
          }
        } else if (event.key === 'ArrowLeft' && index > 0) {
          inputs[index - 1].focus()
        }
      })
    })
  }

  isAlphaNumericKey(key) {
    return /^([\x30-\x39]|[\x61-\x7a])$/i.test(key)
  }

  setupFormSubmission() {
    this.form.addEventListener('submit', async (event) => {
      event.preventDefault()

      const guess = Array.from(this.form.querySelectorAll('input[type="text"]'))
        .map((input) => input.value)
        .join('')

      if (guess.length !== 5) {
        Game.showMessage('Le mot doit contenir 5 lettres')
        return
      }

      try {
        const response = await fetch(
          'https://progweb-wwwordle-api.onrender.com/guess',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guess: guess.toUpperCase() }),
          }
        )

        const data = await response.json()

        if (data.status === 'invalid') {
          Game.showMessage(data.message)
          return
        }

        return data
      } catch (error) {
        console.error('Erreur:', error)
        Game.showMessage('Une erreur est survenue')
      }
    })
  }
}
