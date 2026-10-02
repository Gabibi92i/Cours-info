// Compteur — version réparée
// Les trois bugs d'origine sont documentés dans bug.md

const affichage = document.getElementById("affichage");
const etat      = document.getElementById("etat");
const boutonMoins = document.getElementById("moins");
const boutonPlus  = document.getElementById("plus");
const boutonRemise = document.getElementById("remise");

const MINIMUM = 0;

// CORRECTION 2 : la valeur est gardée ici, dans un vrai nombre.
// Avant, elle était relue depuis le HTML avec affichage.textContent — donc du TEXTE.
// "0" + 1 donne "01", puis "011"... Le compteur collait des caractères au lieu d'additionner.
let compteur = 0;

function afficher(message = "") {
  affichage.textContent = compteur;
  etat.textContent = message;
  // Le bouton « − » se désactive au minimum : l'interface explique la limite
  // au lieu de laisser l'utilisateur cliquer dans le vide.
  boutonMoins.disabled = compteur === MINIMUM;
}

boutonPlus.addEventListener("click", () => {
  compteur = compteur + 1;
  afficher();
});

boutonMoins.addEventListener("click", () => {
  // CORRECTION 3 : le test se fait AVANT la soustraction.
  // Avant, on soustrayait puis on testait, donc le compteur passait par -1
  // et s'affichait une fraction de seconde en négatif.
  if (compteur === MINIMUM) {
    afficher("Le compteur est déjà à zéro.");
    return;
  }
  compteur = compteur - 1;
  afficher();
});

boutonRemise.addEventListener("click", () => {
  compteur = 0;
  afficher("Compteur remis à zéro.");
});

afficher();
