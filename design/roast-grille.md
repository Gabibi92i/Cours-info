# Roast — grille d'évaluation d'une interface

**Interface analysée :** page d'accueil de `cpnv.ch`
**Date de l'analyse :** 2 octobre 2026
**Méthode :** observation à 1024 px et à 375 px, puis mesures relevées directement dans le
navigateur (attributs `alt`, tailles des zones cliquables, styles calculés, poids de la page).
Les chiffres ci-dessous sont mesurés, pas estimés.

> **Pourquoi cette interface ?** Parce que tout le monde dans la classe la connaît, qu'elle est
> publique, et qu'elle est honnête : ce n'est pas un site raté, c'est un site **moyen**. Les
> défauts qu'on y trouve sont exactement ceux qu'on reproduit sans s'en rendre compte.

---

## La grille

Chaque critère est noté de **0** (absent / cassé) à **3** (exemplaire).

| # | Critère | Ce que je regarde | Note |
|---|---|---|---|
| 1 | Hiérarchie | Est-ce que je sais où regarder en premier ? | 2 / 3 |
| 2 | Lisibilité | Le texte est-il lisible dans son contexte réel ? | **1 / 3** |
| 3 | Contraste | Texte et fond se détachent-ils (≥ 4.5:1) ? | **1 / 3** |
| 4 | Cohérence | Les éléments de même nature se ressemblent-ils ? | **0 / 3** |
| 5 | Affordance | Devine-t-on ce qui est cliquable ? | 2 / 3 |
| 6 | Feedback | L'interface répond-elle à mes actions ? | 2 / 3 |
| 7 | Accessibilité | Utilisable au clavier et au lecteur d'écran ? | **1 / 3** |
| 8 | Cibles tactiles | Peut-on viser au doigt sans se tromper ? | **1 / 3** |
| 9 | Charge | La page est-elle raisonnable à charger ? | **1 / 3** |
| 10 | Mobile | L'écran de 375 px est-il conçu, ou subi ? | **1 / 3** |
| | | **Total** | **12 / 30** |

---

## Le détail — ce qui cloche, précisément

### 1. Hiérarchie — 2 / 3

**Ce qui marche.** Un seul `<h1>`, un bloc d'accroche, deux boutons d'action. La structure de la
page est correcte : bannière, actualités, formations. On comprend l'ordre de lecture.

**Ce qui cloche.** Les deux boutons « FORMATIONS » et « ADMISSION » ont le même poids visuel alors
qu'ils ne mènent pas au même type de contenu. Rien ne dit lequel est l'action principale.

**Correction.** Un seul bouton plein, le second en lien souligné.

---

### 2. Lisibilité — 1 / 3

**Mesuré.** Le `<h1>` est en blanc pur, 30 px, graisse 600, et `text-shadow: none`. Il est posé
directement sur une photographie du bâtiment — donc sur du verre clair, des reflets et du
feuillage. Le fond change de luminosité derrière chaque mot.

**Pourquoi c'est grave.** Du texte blanc sur une photo n'est pas lisible « en moyenne » : il est
lisible sur les zones sombres et illisible sur les zones claires. Ici, « Ensemble, développons »
tombe sur le ciel et les vitres.

**Correction.** Trois solutions, par ordre de préférence : un voile sombre semi-transparent sur
toute la photo ; un dégradé du bas vers le haut sous le texte ; à défaut, une ombre portée. Le
voile est le seul qui garantisse un résultat quelle que soit la photo chargée.

---

### 3. Contraste — 1 / 3

**Mesuré.** Le site a un bon point : l'anneau de focus est visible (`outline: auto 5px` orange).
Mais le texte de la bannière n'a aucun contraste garanti, puisqu'il dépend de l'image derrière.

**Pourquoi c'est grave.** Un visiteur sur un téléphone en plein soleil, ou une personne
malvoyante, ne lit tout simplement pas la phrase d'accroche du site — c'est-à-dire la seule phrase
que l'école a choisi de mettre en avant.

**Correction.** Imposer un minimum de 4.5:1 et le vérifier sur la photo la plus claire du lot, pas
sur la plus pratique.

---

### 4. Cohérence — 0 / 3

**C'est le vrai problème du site.** Les quatre tuiles d'actualités viennent de quatre univers
graphiques différents : une affiche bleue avec des pictogrammes, une tuile jaune fluo, une
photographie d'élèves en uniforme, une affiche verte avec un tampon. Polices différentes, palettes
différentes, formats différents.

**Pire :** le texte de ces tuiles est **à l'intérieur des images**. Conséquences concrètes : il ne
peut pas être sélectionné, il ne peut pas être traduit, il est flou quand on zoome, il est
invisible pour un lecteur d'écran, et il se fait tronquer — « SAMEDI 28 NOVEMBRE 202… » est coupé
en plein milieu de la date.

**Correction.** Le visuel reste une image, le titre et la date sortent de l'image et deviennent du
vrai texte HTML sous la vignette. Une seule grille, un seul format, un seul traitement.

---

### 5. Affordance — 2 / 3

**Ce qui marche.** Les boutons ressemblent à des boutons : forme arrondie, fond plein, majuscules.

**Ce qui cloche.** Les tuiles d'actualités sont entièrement cliquables mais rien ne l'indique : pas
de flèche, pas de « lire la suite », pas de changement visible au survol.

---

### 6. Feedback — 2 / 3

L'anneau de focus au clavier est présent et visible, ce qui est déjà mieux que beaucoup de sites.
En revanche, rien ne se passe visuellement au survol des tuiles.

---

### 7. Accessibilité — 1 / 3

**Mesuré, et c'est le chiffre le plus parlant du roast :**

- **26 images sur 30 n'ont pas d'attribut `alt`** (87 %).
- **12 liens n'ont aucun intitulé accessible** — ni texte, ni image décrite.

**Pourquoi c'est grave.** Les actualités étant des images sans `alt`, un visiteur aveugle n'a
aucun moyen de savoir que la journée portes ouvertes a lieu le 28 novembre. L'information n'est
pas « mal présentée » pour lui : elle n'existe pas.

**Ce qui est correct.** `lang="fr-FR"` est bien déclaré, le `<title>` est explicite, il n'y a
qu'un seul `<h1>`.

**Correction.** Un `alt` qui décrit l'information, pas le fichier. Pas `alt="affiche2026.jpg"`
mais `alt="Portes ouvertes, samedi 28 novembre, 9h–16h"`.

---

### 8. Cibles tactiles — 1 / 3

**Mesuré.** **224 éléments cliquables sur 270 mesurent moins de 44 × 44 px** (une partie se trouve
dans les menus déroulants, mais le compte reste très élevé). La recommandation courante est 44 px
minimum, parce que c'est la taille approximative d'un doigt.

**Correction.** Augmenter la zone cliquable avec du `padding`, pas en grossissant le texte.

---

### 9. Charge — 1 / 3

**Mesuré.** **92 requêtes, environ 5,9 Mo transférés** pour une page d'accueil. L'essentiel vient
des affiches d'actualités envoyées en pleine résolution.

**Pourquoi c'est grave.** Un élève de 3e année qui consulte le site depuis son téléphone, en 4G,
dans le train, paie ces 5,9 Mo. Et le contenu principal — les actualités — est précisément ce qui
arrive en dernier.

**Correction.** Format `.webp`, images redimensionnées à la taille d'affichage, chargement différé
des tuiles sous la ligne de flottaison.

---

### 10. Mobile — 1 / 3

**Observé à 375 px.** La mise en page passe correctement en une colonne, donc la base technique
est là. Mais les problèmes ne sont pas corrigés, ils sont **amplifiés** :

- le titre blanc occupe trois lignes sur la photo la plus claire, et devient très difficile à lire ;
- le bouton « ADMISSION » est blanc, posé sur la photo, sans fond plein ;
- les affiches d'actualités sont rognées, donc le texte qu'elles contiennent est coupé encore plus tôt.

**Correction.** Traiter le mobile comme le cas de référence, pas comme une adaptation.

---

## Ce que je retiens pour ma propre application

Les trois erreurs à ne pas reproduire dans **Déclic** :

1. **Jamais de texte posé directement sur une photo** sans voile de protection. Si je ne peux pas
   garantir le contraste, je change la composition.
2. **Jamais de texte à l'intérieur d'une image.** Un titre est du texte HTML. Toujours.
3. **Une seule grille, un seul style de carte.** Mes 32 fiches de shootings seront toutes
   présentées exactement de la même façon — c'est la régularité qui rend une liste lisible.

Et le bon point à copier : **garder un anneau de focus visible**. Le CPNV l'a, beaucoup de sites
bien plus beaux l'ont supprimé.

---

## Notes pour la présentation de 3 minutes

| Temps | Ce que je dis |
|---|---|
| 0:00 – 0:30 | Le site et pourquoi je l'ai choisi : il est moyen, pas raté. C'est ça qui est utile. |
| 0:30 – 1:30 | Le défaut principal : texte dans les images. Je montre le titre tronqué « 202… ». |
| 1:30 – 2:15 | Les deux chiffres qui frappent : 26 images sur 30 sans `alt`, 5,9 Mo pour une page d'accueil. |
| 2:15 – 2:45 | Les corrections, dans l'ordre du rapport effet/effort. |
| 2:45 – 3:00 | Les trois règles que j'en tire pour mon app. |
