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
import { Game } from './modules/Game.js'

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(5)
})
