/*// Gestion de l'activation du formulaire
function toggleFormActivation(form) {
  if (form.hasAttribute('inert')) {
    form.removeAttribute('inert');
    focusFirstInput(form);
  } else {
    form.setAttribute('inert', '');
  }
}

// Focus sur le premier input
function focusFirstInput(form) {
  const firstInput = form.querySelector('input');
  if (firstInput) {
    firstInput.focus();
  }
}

// Gestion de la navigation au clavier
function handleKeyNavigation(event, input) {
  const key = event.key;
  
  if (isAlphaNumericKey(key) || key === 'ArrowRight') {
    const nextInput = input.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    }
  } else if (key === 'ArrowLeft') {
    const prevInput = input.previousElementSibling;
    if (prevInput) {
      prevInput.focus();
    }
  }
}

// Fonction helper pour vérifier si une touche est alphanumérique
function isAlphaNumericKey(key) {
  return /^([\x30-\x39]|[\x61-\x7a])$/i.test(key);
}