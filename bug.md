# bug.md — le compteur cassé

**Exercice :** « l'IA a tort ». Je demande un compteur à une IA, je le teste, je trouve ce qui
cloche, je répare, et surtout **j'explique pourquoi** c'était faux.
**Fichiers réparés :** [compteur.html](compteur.html) et [compteur.js](compteur.js)

---

## Bug n°1 — la page ne réagit à rien

### Symptôme
Je clique sur « + », rien ne se passe. Aucun message à l'écran. Dans la console du navigateur :

```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
```

### Le code fautif

```html
<head>
  <script src="compteur.js"></script>   <!-- exécuté tout de suite -->
</head>
<body>
  <p id="affichage">0</p>
  <button id="plus">+</button>
</body>
```

### La cause
Le navigateur lit le fichier de haut en bas. Quand il arrive sur la balise `<script>`, il
l'exécute **immédiatement** — et à cet instant le `<body>` n'existe pas encore. Donc
`document.getElementById("plus")` ne trouve rien et renvoie `null`. Demander
`null.addEventListener(...)` plante.

Ce n'était donc pas un bug de logique : le code était bon, il arrivait trop tôt.

### La correction

```html
<script src="compteur.js" defer></script>
```

`defer` dit au navigateur : télécharge le script maintenant, mais ne l'exécute qu'une fois la page
entièrement construite.

### Comment je l'ai trouvé
En lisant le message d'erreur au lieu de retoucher le code au hasard. « Cannot read properties of
**null** » veut dire « la chose que tu cherches n'existe pas » — donc le problème est *quand* je la
cherche, pas *comment*.

---

## Bug n°2 — le compteur affiche 011 au lieu de 2

### Symptôme
Je clique trois fois sur « + ». J'attends `3`. J'obtiens :

```
0  →  01  →  011  →  0111
```

Aucune erreur dans la console. Le code « marche », il fait juste autre chose.

### Le code fautif

```js
boutonPlus.addEventListener("click", () => {
  affichage.textContent = affichage.textContent + 1;
});
```

### La cause
`affichage.textContent` renvoie toujours du **texte**, jamais un nombre — même quand ce texte
ressemble à un chiffre. Et en JavaScript, `+` entre un texte et un nombre ne fait pas une
addition : il **colle** les deux.

```js
"0" + 1    // "01"   (collage, pas addition)
"01" + 1   // "011"
```

C'est exactement le piège de l'extrait n°7 de [predictions.md](predictions.md).

### La correction
Je ne relis plus la valeur depuis le HTML. Je la garde dans une vraie variable, en nombre, et le
HTML ne fait plus qu'**afficher** cette valeur.

```js
let compteur = 0;              // un nombre, pas un texte

boutonPlus.addEventListener("click", () => {
  compteur = compteur + 1;     // vraie addition
  afficher();
});

function afficher() {
  affichage.textContent = compteur;
}
```

### La règle que j'en tire
**Le HTML affiche l'état, il ne le stocke pas.** La source de vérité est la variable JavaScript.
C'est la règle que j'appliquerai dans Déclic pour l'étape courante d'un shooting.

> Si j'avais vraiment dû relire la valeur depuis la page, il aurait fallu la convertir :
> `Number(affichage.textContent) + 1`. Mais garder l'état dans une variable est plus sûr.

---

## Bug n°3 — le compteur passe par −1

### Symptôme
Le compteur est à `0`. Je clique sur « − ». Il affiche `-1` pendant un très court instant, puis
revient à `0`. Visible seulement si on regarde bien — donc le genre de bug qui passe en production.

### Le code fautif

```js
boutonMoins.addEventListener("click", () => {
  compteur = compteur - 1;       // on soustrait d'abord
  if (compteur < 0) {
    compteur = 0;                // ... et on rattrape après
  }
  afficher();
});
```

### La cause
Le test est fait **après** l'opération. L'état interdit existe donc réellement, ne serait-ce qu'une
fraction de seconde, avant d'être corrigé.

### La correction
Tester **avant**, et ne rien faire si l'opération n'est pas permise :

```js
boutonMoins.addEventListener("click", () => {
  if (compteur === MINIMUM) {
    afficher("Le compteur est déjà à zéro.");
    return;                      // on sort, l'état interdit n'arrive jamais
  }
  compteur = compteur - 1;
  afficher();
});
```

J'ai aussi désactivé le bouton quand le minimum est atteint (`boutonMoins.disabled = true`) :
l'interface explique la limite au lieu de laisser cliquer dans le vide.

### La règle que j'en tire
**On empêche l'état interdit, on ne le répare pas.** Dans Déclic, c'est la même logique : le bouton
« Étape suivante » sera désactivé à la dernière étape, plutôt que d'avancer puis revenir en arrière.

---

## Ce que l'IA avait bien fait, et ce qu'elle a raté

| | |
|---|---|
| **Bien fait** | La structure HTML, les noms de variables clairs, l'utilisation de `addEventListener` plutôt que `onclick` dans le HTML |
| **Raté** | Les trois bugs ci-dessus — et aucun des trois ne provoque de message d'erreur visible, sauf le premier |

**Ce que je retiens pour tout le semestre.** L'IA produit du code qui *a l'air* juste, et c'est
précisément ce qui le rend dangereux. Les bugs 2 et 3 ne cassent rien : ils donnent une réponse
fausse, calmement. Le seul moyen de les trouver, c'est de **prédire ce que le code devrait faire,
puis de vérifier** — exactement l'exercice de [predictions.md](predictions.md).
