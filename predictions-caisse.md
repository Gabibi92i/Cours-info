# predictions-caisse.md — la caisse du kiosque

**Exercice :** une caisse de kiosque calcule un total, applique un rabais, arrondit au 5 centimes
et rend la monnaie. Je prédis chaque sortie **avant** d'exécuter, puis je compare.

**Le panier utilisé pour tous les tests :**

| Article | Prix unitaire | Quantité | Ligne |
|---|---|---|---|
| Croissant | 1.80 | 3 | 5.40 |
| Journal | 4.50 | 3 | 13.50 |
| Thé | 3.90 | 1 | 3.90 |
| | | **Total attendu** | **22.80** |

Le client est apprenti : **rabais de 10 %**. Il paie avec un billet de 50 francs.

---

## Test 1 — le sous-total

```js
const panier = [
  { nom: "Croissant", prix: 1.80, qte: 3 },
  { nom: "Journal",   prix: 4.50, qte: 3 },
  { nom: "Thé",       prix: 3.90, qte: 1 },
];

const brut = panier.reduce((somme, a) => somme + a.prix * a.qte, 0);
console.log(brut);
```

| | |
|---|---|
| **Ma prédiction** | `22.8` |
| **Résultat réel** | `22.799999999999997` |
| **Verdict** | ❌ faux |

**Pourquoi.** Les nombres à virgule sont stockés en binaire, et `1.80`, `4.50`, `3.90` n'ont pas
d'écriture binaire exacte — comme `1/3` n'a pas d'écriture décimale exacte. Chaque multiplication
et chaque addition ajoute une poussière d'erreur.

**Pourquoi c'est grave ici.** Une caisse affiche de l'argent. `22.799999999999997 CHF` sur un
ticket, c'est une caisse cassée — même si l'écart vaut un millionième de centime.

---

## Test 2 — le rabais de 10 %

```js
const remise = brut * 0.9;
console.log(remise);
```

| | |
|---|---|
| **Ma prédiction** | `20.519999999999996` (l'erreur du test 1 devrait se propager) |
| **Résultat réel** | `20.52` |
| **Verdict** | ❌ faux — et c'est le résultat le plus instructif de l'exercice |

**Pourquoi.** L'erreur n'a pas disparu : elle est devenue trop petite pour être visible à
l'affichage. JavaScript affiche le nombre décimal le plus court qui correspond à la valeur binaire
stockée, et après cette multiplication c'est `20.52`.

**Ce que ça m'apprend.** L'erreur de virgule flottante **ne se voit pas de façon fiable**. Elle
apparaît à une ligne, disparaît à la suivante, et revient trois calculs plus loin. Je ne peux donc
pas la détecter en testant : je dois l'empêcher par construction.

---

## Test 3 — l'arrondi suisse à 5 centimes

En Suisse, un paiement en espèces s'arrondit au multiple de **0.05** le plus proche.

```js
const arrondi = Math.round(remise / 0.05) * 0.05;
console.log(arrondi);
console.log("Total : " + arrondi + " CHF");
```

| | |
|---|---|
| **Ma prédiction** | `20.5` puis `"Total : 20.50 CHF"` |
| **Résultat réel** | `20.5` puis `"Total : 20.5 CHF"` |
| **Verdict** | ❌ faux sur l'affichage |

**Pourquoi.** La valeur est juste : 20.52 arrondi au 5 centimes donne bien 20.50. Mais un nombre
ne connaît pas ses zéros de fin — pour JavaScript, `20.50` **est** `20.5`. Un prix affiché
`20.5 CHF` n'est pas un prix.

**La correction :** `arrondi.toFixed(2)` → `"20.50"`.

---

## Test 4 — la vraie solution : travailler en centimes

```js
// tout en nombres entiers : 1.80 CHF devient 180 centimes
const panierC = [
  { prix: 180, qte: 3 },
  { prix: 450, qte: 3 },
  { prix: 390, qte: 1 },
];

const brutC   = panierC.reduce((s, a) => s + a.prix * a.qte, 0);  // centimes
const remiseC = Math.round(brutC * 0.9);
const arrondiC = Math.round(remiseC / 5) * 5;                     // arrondi au 5 ct

console.log(brutC, remiseC, arrondiC);
console.log((arrondiC / 100).toFixed(2) + " CHF");
```

| | |
|---|---|
| **Ma prédiction** | `2280 2052 2050` puis `"20.50 CHF"` |
| **Résultat réel** | `2280 2052 2050` puis `"20.50 CHF"` |
| **Verdict** | ✅ juste |

**Pourquoi ça marche.** `180`, `2280`, `2050` sont des **entiers**. Les entiers n'ont pas d'erreur
d'arrondi en JavaScript, et de très loin pas aux montants d'un kiosque. On ne revient aux francs
qu'à la toute dernière ligne, pour l'affichage.

Le seul `Math.round` qui reste sert à décider ce qu'on fait du demi-centime du rabais — et c'est
une décision commerciale, pas un accident technique.

---

## Test 5 — rendre la monnaie

```js
const donne = 5000;                  // billet de 50.-
const rendu = donne - arrondiC;
console.log(rendu, (rendu / 100).toFixed(2) + " CHF");
```

| | |
|---|---|
| **Ma prédiction** | `2950` puis `"29.50 CHF"` |
| **Résultat réel** | `2950` puis `"29.50 CHF"` |
| **Verdict** | ✅ juste |

Une soustraction entre deux entiers est exacte. Rien à surveiller.

---

## Test 6 — le piège de `toFixed`

```js
console.log(typeof (20.50).toFixed(2));
console.log((20.50).toFixed(2) + 1);
```

| | |
|---|---|
| **Ma prédiction** | `"number"` puis `21.5` |
| **Résultat réel** | `"string"` puis `"20.501"` |
| **Verdict** | ❌ faux |

**Pourquoi.** `toFixed()` ne renvoie pas un nombre arrondi : il renvoie **du texte**. Le `+` qui
suit colle au lieu d'additionner — exactement le bug du compteur dans [bug.md](bug.md), et
l'extrait n°7 de [predictions.md](predictions.md).

---

## Bilan

| Tests | Justes | Faux |
|---|---|---|
| 6 | 3 | 3 |

**Les trois erreurs ont la même origine :** j'ai supposé que JavaScript manipulait les nombres à
virgule comme une calculatrice. Il ne le fait pas, et il ne prévient jamais.

Le test 2 est celui qui m'a le plus marqué : l'erreur du test 1 **a disparu toute seule**. Si
j'avais testé uniquement cette ligne, j'aurais conclu que mon code était juste.

### Les trois règles que j'emporte

1. **L'argent se compte en centimes, en nombres entiers.** On divise par 100 au moment d'afficher,
   jamais avant.
2. **`toFixed(2)` est la dernière ligne du calcul**, jamais le milieu — et c'est elle qui garantit
   le zéro final de `20.50`.
3. **Arrondi suisse :** `Math.round(centimes / 5) * 5`. Sur des entiers, c'est exact.

**Lien avec mon projet.** Déclic stocke un prix et un acompte par shooting. Je stockerai les deux
**en centimes** dans `shootings.json`, et je n'afficherai les francs qu'au dernier moment. Ce n'est
pas une précaution théorique : avec la version « naturelle », une fiche à 1400 CHF avec 400 CHF
d'acompte afficherait un solde faux d'un milliardième — et surtout un prix écrit `1400.5` au lieu
de `1400.50`.
