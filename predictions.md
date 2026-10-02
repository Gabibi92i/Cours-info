# Prédis avant de cliquer

**Règle de l'exercice :** je lis l'extrait, j'écris ma prédiction **avant** d'exécuter le code.
Ensuite j'exécute, je note le résultat réel, et j'explique l'écart. Se tromper est le but : c'est
l'écart qui m'apprend quelque chose, pas la bonne réponse.

---

## Extrait 1 — le plus et le moins

```js
console.log("5" + 3);
console.log("5" - 3);
```

| | |
|---|---|
| **Ma prédiction** | `"53"` puis `2` |
| **Résultat réel** | `"53"` puis `2` |
| **Verdict** | ✅ juste |

**Pourquoi.** Le `+` est ambigu en JavaScript : il additionne *ou* il colle des textes. Dès qu'un
des deux côtés est une chaîne, il colle. Le `-` n'a pas cette ambiguïté : il n'existe qu'en
version mathématique, donc JavaScript convertit `"5"` en nombre.

---

## Extrait 2 — trier des nombres

```js
console.log([1, 2, 10].sort());
```

| | |
|---|---|
| **Ma prédiction** | `[1, 2, 10]` |
| **Résultat réel** | `[1, 10, 2]` |
| **Verdict** | ❌ faux |

**Pourquoi.** `sort()` sans argument convertit tout en texte et trie dans l'ordre alphabétique.
En texte, `"10"` vient avant `"2"` parce qu'on compare caractère par caractère : `1` < `2`.

**La version correcte :**

```js
[1, 2, 10].sort((a, b) => a - b);   // [1, 2, 10]
```

**Pourquoi ça compte pour mon app.** Je vais trier des shootings par prix et par date. Si j'oublie
la fonction de comparaison, un shooting à 1400 CHF passera avant un shooting à 900 CHF.

---

## Extrait 3 — l'addition qui ne tombe pas juste

```js
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
```

| | |
|---|---|
| **Ma prédiction** | `0.3` puis `true` |
| **Résultat réel** | `0.30000000000000004` puis `false` |
| **Verdict** | ❌ faux |

**Pourquoi.** Les nombres à virgule sont stockés en binaire. `0.1` n'a pas d'écriture binaire
exacte, exactement comme `1/3` n'a pas d'écriture décimale exacte. L'erreur est minuscule, mais
elle suffit à casser un test d'égalité.

**La règle que j'en tire.** On ne compare jamais deux nombres à virgule avec `===`. On compare un
écart : `Math.abs(a - b) < 0.001`. Et pour de l'argent, on travaille en centimes, donc en entiers.

---

## Extrait 4 — la variable qui survit à la boucle

```js
for (var i = 0; i < 3; i++) {
  // ...
}
console.log(i);
```

| | |
|---|---|
| **Ma prédiction** | une erreur, `i` n'existe plus |
| **Résultat réel** | `3` |
| **Verdict** | ❌ faux |

**Pourquoi.** `var` ne connaît pas les accolades : la variable est créée dans toute la fonction,
pas dans la boucle. Elle survit donc après, et elle vaut `3` — la valeur qui a fait échouer le test
`i < 3`.

**Avec `let`**, la variable est bien limitée à la boucle, et la même ligne provoque une erreur
`ReferenceError: i is not defined`. C'est le comportement que j'attendais, et c'est la raison pour
laquelle j'écris `let` partout.

---

## Extrait 5 — deux égalités qui ne disent pas la même chose

```js
console.log("10" == 10);
console.log("10" === 10);
```

| | |
|---|---|
| **Ma prédiction** | `true` puis `false` |
| **Résultat réel** | `true` puis `false` |
| **Verdict** | ✅ juste |

**Pourquoi.** `==` convertit avant de comparer, `===` compare la valeur **et** le type. Comme tout
ce qui sort d'un `<input>` est du texte, `==` masque les bugs au lieu de les montrer. J'utilise
`===` systématiquement.

---

## Extrait 6 — le piège le plus vicieux

```js
console.log([10, 9, 8].map(parseInt));
```

| | |
|---|---|
| **Ma prédiction** | `[10, 9, 8]` |
| **Résultat réel** | `[10, NaN, NaN]` |
| **Verdict** | ❌ faux |

**Pourquoi.** `map` ne passe pas un seul argument à la fonction, il en passe trois : la valeur,
l'index, et le tableau complet. Or `parseInt` accepte un deuxième argument, la **base** de
numérotation. Donc le code exécuté est en réalité :

```js
parseInt(10, 0)   // base 0 → traitée comme base 10 → 10
parseInt(9, 1)    // base 1 n'existe pas          → NaN
parseInt(8, 2)    // base 2 (binaire) : "8" n'existe pas en binaire → NaN
```

**La version correcte :**

```js
[10, 9, 8].map(n => parseInt(n, 10));   // [10, 9, 8]
```

**Ce que je retiens.** Ne jamais passer une fonction toute faite à `map` sans vérifier combien
d'arguments elle accepte.

---

## Extrait 7 — ajouté par moi

> Exigence du devoir : ajouter un 7e extrait et y faire répondre un camarade avant de dévoiler
> le résultat.

```js
let compteur = "0";
compteur = compteur + 1;
compteur = compteur + 1;
console.log(compteur);
```

| | |
|---|---|
| **Prédiction d'un camarade** _(à compléter : prénom)_ | _(à compléter)_ |
| **Ma prédiction** | `"011"` |
| **Résultat réel** | `"011"` |

**Pourquoi j'ai choisi cet extrait.** Parce que je suis tombé dedans pour de vrai dans
[compteur.html](compteur.html) : la valeur venait du HTML, donc c'était du texte, et mon compteur
affichait `011` au lieu de `2`. Voir [bug.md](bug.md).

**Ce qui le rend traître.** Il n'y a pas d'erreur, pas de message rouge, rien dans la console. Le
code « marche » — il fait juste autre chose que ce que je croyais.

---

## Bilan

| Extraits | Justes | Faux |
|---|---|---|
| 7 | 3 | 4 |

**Ce que les quatre erreurs ont en commun :** à chaque fois, JavaScript a **converti un type
silencieusement**. Texte devenu nombre, nombre devenu texte, argument en trop accepté sans
protester. C'est ce qui rend le langage difficile à prédire : il ne refuse presque jamais, il
s'arrange.

**Ma règle pour le projet :** dès qu'une valeur vient du HTML ou d'un fichier JSON, je la convertis
explicitement avec `Number()` avant de m'en servir dans un calcul.
