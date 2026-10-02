# M291 — Développement d'interfaces UI

> Dépôt de cours · Gabriel Siegenthaler · Médiamaticien CFC, 3e année · Classe C2b · CPNV

---

## Qui je suis

Je m'appelle **Gabriel Siegenthaler**, je suis en troisième année d'apprentissage de médiamaticien
CFC, en **option web** et **option création d'entreprise**.

J'ai choisi la médiamatique parce que c'est une des rares formations qui n'oblige pas à choisir
entre créer et construire : on y touche au design, à la photo et à la vidéo, mais aussi au web, au
code et à la gestion de projet. Ce qui m'intéresse, c'est de prendre une idée et de l'amener
jusqu'au bout — la penser, lui donner une forme, la mettre en ligne.

À côté de l'école, mon activité principale est la **photographie**. C'est aussi de là que vient le
sujet de mon projet de semestre.

## Ce que je veux apprendre dans ce module

- [ ] Maîtriser Git et GitHub pour de vrai : commits propres, messages parlants, un dépôt par projet
- [ ] Savoir **lire** du code avant de l'écrire, et repérer ce qui ne va pas dans le code généré par une IA
- [ ] Concevoir une interface en partant de l'utilisateur (persona, flow, wireframe) et non de l'écran
- [ ] Justifier mes choix visuels avec des critères mesurables, pas avec mon goût
- [ ] Publier un projet en ligne avec GitHub Pages

## Mon projet de semestre — Déclic

**Déclic** suit chaque shooting photo de la première demande du client jusqu'au paiement, pour
qu'aucune commande ne reste oubliée sur une carte mémoire.

| | |
|---|---|
| **Pour qui** | Nora, 24 ans, photographe indépendante à temps partiel |
| **La tâche n°1** | Faire avancer un shooting à l'étape suivante, en 3 appuis maximum |
| **Les données** | 32 fiches de shootings en JSON, chargées avec `fetch` |
| **Direction visuelle** | Proposition C « Atelier », corrigée — voir [critique.md](design/critique.md) |

📄 Spécification complète : **[brief.md](brief.md)**

## Structure du dépôt

| Fichier | Semaine | Ce que c'est |
|---|---|---|
| [`README.md`](README.md) | s1–s2 | Cette page |
| [`Kit-IA.md`](Kit-IA.md) | s2 | Mon plan d'utilisation des chatbots et mes quotas |
| [`index.html`](index.html) | s3 | Page de profil publiée sur GitHub Pages |
| [`predictions.md`](predictions.md) | s4 | Exercice « prédis avant de cliquer » — 7 extraits |
| [`compteur.html`](compteur.html) · [`compteur.js`](compteur.js) | s4 | Exercice « l'IA a tort » — version réparée |
| [`bug.md`](bug.md) | s4 | Les 3 bugs du compteur, expliqués |
| [`predictions-caisse.md`](predictions-caisse.md) | s4 | Exercice « la caisse du kiosque » |
| [`design/roast-grille.md`](design/roast-grille.md) | s5 | Roast d'une interface avec grille d'évaluation |
| [`design/pitch.md`](design/pitch.md) | s6 | Le pitch de Déclic |
| [`design/persona.md`](design/persona.md) | s7 | Persona de référence |
| [`design/user-flow.md`](design/user-flow.md) | s7 | Parcours détaillé, écrans et feedbacks |
| [`design/wireframes/`](design/wireframes) | s7 | Wireframe des 3 écrans |
| [`design/propositions/`](design/propositions) | s7 | Les 3 propositions de design générées |
| [`design/critique.md`](design/critique.md) | s7 | Critique comparative et choix final |
| [`brief.md`](brief.md) | s7 | Spécification officielle du projet |

## Journal IA

> Exigence du cahier des charges : 3 prompts, et les corrections faites à la main derrière.

### Prompt 1 — générer trois directions de design

> « Produis trois maquettes HTML du même écran (liste de shootings), mêmes données et même
> structure, en ne faisant varier que la direction artistique : une papier/sérif, une sombre, une
> blanche et sobre. »

**Ce que l'IA a produit :** trois maquettes exploitables du premier coup.
**Ce que j'ai corrigé à la main :** une collision de noms de classes CSS. La classe `.c` servait à
la fois pour « carte » et pour « étape courante », donc les pastilles de la frise héritaient du
`padding` des cartes et s'affichaient comme d'énormes ronds. Renommée en `.actif`. Le bouton
flottant était aussi en `position: fixed` et ne sortait pas au rendu : passé en `position: absolute`
dans un conteneur positionné.

### Prompt 2 — écrire l'exercice de la caisse du kiosque

> « Écris les prédictions pour une caisse de kiosque : total, rabais, arrondi suisse à 5 centimes,
> rendu de monnaie. »

**Ce que l'IA a produit :** un fichier complet et bien structuré — **avec des résultats inventés**.
Le total annoncé était `23.40` alors que le panier fait `22.50`, et l'artefact de virgule flottante
annoncé n'existait pas sur ces valeurs.
**Ce que j'ai corrigé à la main :** j'ai exécuté chaque extrait dans Node avant de l'écrire, puis
j'ai reconstruit le panier pour qu'il produise **réellement** l'erreur à démontrer
(`22.799999999999997`). C'est l'illustration exacte du cours : l'IA écrit un texte plausible, la
vérification reste à ma charge.

### Prompt 3 — comparer les trois propositions

> « Compare les trois directions et choisis-en une, en justifiant contre le persona et le brief. »

**Ce que l'IA a produit :** une comparaison qui penchait vers la direction sombre, parce qu'elle
est la plus spectaculaire en capture d'écran.
**Ce que j'ai corrigé à la main :** j'ai calculé les **contrastes réels** de chaque palette. Ça a
disqualifié la proposition A (3.75:1 sur deux textes courants, sous le minimum de 4.5:1). Et j'ai
réintroduit le critère que l'IA avait oublié : mon persona utilise l'app **dehors, en plein
soleil**, ce qui élimine l'interface sombre. Le choix final est la proposition C.

---

## Règle de travail

Un commit à chaque fin d'étape, avec un message qui dit ce qui change.
Pas de Bootstrap, pas de Sass, pas de framework JS — CSS écrit à la main.
