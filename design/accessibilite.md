# Accessibilité — Déclic

**Objet :** la maquette retenue, [Atelier v2](iteration/v2-atelier.png).
**Référence :** WCAG 2.1 niveau AA, qui est aussi la base de la norme suisse **eCH-0059**.
**Méthode :** contrastes calculés sur les valeurs hexadécimales réelles de la maquette, tailles
relevées dans le code de la maquette. Rien n'est évalué à l'œil.

> **Pourquoi ça compte ici et pas seulement « pour la forme ».** Mon persona utilise l'app
> **dehors, en plein soleil, debout, à une main** ([persona.md](persona.md)). Un écran lu au soleil
> place n'importe quel utilisateur dans la situation d'une personne malvoyante : le contraste
> s'effondre. Les règles d'accessibilité ne protègent donc pas une minorité à part — ici, elles
> décrivent le cas d'usage normal.

---

## 1. Contrastes

Minimum exigé : **4.5:1** pour le texte courant, **3:1** pour le texte large et les éléments
d'interface.

| Élément | Couleurs | Mesuré | Exigé | |
|---|---|---|---|---|
| Texte principal (nom du client) | `#17191C` sur `#FFFFFF` | **17.61:1** | 4.5 | ✅ |
| Texte secondaire (type, lieu, date) | `#5F6670` sur `#FFFFFF` | **5.80:1** | 4.5 | ✅ |
| Libellé d'étape | `#5F6670` sur `#FFFFFF` | **5.80:1** | 4.5 | ✅ |
| Signal « Retard 4 j » | `#B3261E` sur `#FFFFFF` | **6.54:1** | 4.5 | ✅ |
| Chiffre d'alerte | `#B3261E` sur `#FFFFFF` | **6.54:1** | 3.0 | ✅ |
| Texte du bouton principal | `#FFFFFF` sur `#17191C` | **17.61:1** | 4.5 | ✅ |
| Jauge de progression | `#3A4049` sur `#FFFFFF` | **10.45:1** | 3.0 | ✅ |
| Filet laiton (décoratif) | `#8A6514` sur `#FFFFFF` | **5.31:1** | — | ✅ |

**Le cas limite, assumé.** Les filets de séparation entre les fiches sont à `#E2E5E9`, soit
**1.26:1**. C'est très en dessous de 3:1. Je le garde parce que ces filets sont **décoratifs** :
les fiches restent séparées par l'espacement et par la hiérarchie du texte, et aucune information
ne dépend de la ligne. Si le filet disparaissait complètement, la liste resterait lisible — c'est
le test qui permet de dire qu'il est décoratif.

**Ce que j'ai gagné par rapport à la v1 :** la direction A (« Carnet ») que je trouvais la plus
belle échouait à **3.75:1** sur le texte secondaire et sur le libellé d'étape. Le contraste est la
mesure qui l'a écartée ([critique.md](critique.md)).

## 2. L'information n'est jamais portée par la couleur seule

C'est le point le plus souvent raté, et il concerne environ **8 % des hommes** (daltonisme
rouge-vert) — dans une classe de vingt garçons, en moyenne un ou deux.

Le retard est signalé **quatre fois**, dont une seule par la couleur :

| Signal | Dépend de la couleur ? |
|---|---|
| Point rouge de 8 px devant le nom | oui |
| Texte « **Retard 4 j** » | non — c'est du texte |
| Position dans la liste (les retards remontent en haut) | non |
| Jauge remplie en rouge au lieu de gris | oui, mais redondant |

**En niveaux de gris, l'écran reste utilisable.** C'est le test que j'applique : si je désature la
maquette et que je perds une information, c'est qu'elle était portée par la couleur seule.

## 3. Cibles tactiles

Minimum visé : **44 × 44 px**, la taille approximative d'une pulpe de doigt.

| Élément | Taille dans la maquette | |
|---|---|---|
| Bouton « + Shooting » | 50 px de haut, 130 px de large | ✅ |
| Pastilles de filtre | 35 px de haut | ⚠️ à corriger |
| Ligne de fiche (zone cliquable entière) | ~85 px de haut, pleine largeur | ✅ |
| Champ de recherche | 44 px de haut | ✅ |

**Correction à faire au codage :** les pastilles de filtre font 35 px. J'augmenterai le `padding`
vertical pour atteindre 44 px **sans grossir le texte** — c'est la zone cliquable qui doit grandir,
pas la typographie.

C'est précisément le défaut que j'ai relevé chez quelqu'un d'autre pendant le roast : **224 cibles
sur 270** sous 44 px sur `cpnv.ch` ([roast-grille.md](roast-grille.md)). Je ne vais pas le
reproduire sans le voir.

## 4. Clavier et lecteur d'écran

La maquette est une image, donc ces points sont des **engagements pour le codage**, vérifiables
ensuite :

| Point | Ce que je m'engage à faire |
|---|---|
| Ordre de tabulation | Recherche → filtres → fiches dans l'ordre affiché → bouton « + ». L'ordre du DOM suit l'ordre visuel. |
| Focus visible | Anneau de 3 px, contrasté, **jamais** `outline: none`. Le CPNV le fait bien, je le garde. |
| Tout atteignable au clavier | Aucune action réservée au toucher ou au survol. |
| Structure de titres | Un seul `<h1>`, les fiches en `<h2>`, pas de saut de niveau. |
| Liste réelle | Les fiches sont une `<ul>`/`<li>`, pas une suite de `<div>` : le lecteur d'écran annonce « liste de 32 éléments ». |
| Jauge | `<progress>` ou `role="progressbar"` avec `aria-valuenow`, plus le texte « 5/7 » déjà visible. |
| Compteur de retard | `aria-live="polite"` : quand une fiche avance, le nouveau nombre est annoncé. |
| Icônes | SVG avec `<title>`, ou `aria-hidden` quand le texte à côté dit déjà la même chose. |
| Langue | `<html lang="fr">`. |

**Le piège que j'évite :** annoncer « Retard 4 j » au lecteur d'écran sans dire de quel shooting il
s'agit. Chaque fiche sera un groupe nommé, pour que l'annonce soit « Famille Kohler, mariage, en
retard de 4 jours » et pas une suite de fragments.

## 5. Lisibilité et taille du texte

| Point | État |
|---|---|
| Plus petit texte de la maquette | 10.5 px (le compteur « 5/7 ») — **trop petit**, à passer à 12 px |
| Texte courant | 12 à 15.5 px, correct pour du mobile |
| Zoom à 200 % sans perte | à vérifier au codage ; la mise en page est en flex, donc elle devrait tenir |
| Texte dans les images | **aucun** — tout est du vrai texte HTML |

Ce dernier point est la leçon n°1 du roast : sur `cpnv.ch`, les titres d'actualités sont à
l'intérieur des images, donc ni sélectionnables, ni traduisibles, ni lisibles par un lecteur
d'écran, et tronqués (« SAMEDI 28 NOVEMBRE 202… »).

## 6. Mouvement

Les micro-interactions prévues (carte qui s'enfonce, frise qui avance, bandeau « Annuler ») sont
courtes et sans défilement automatique. Elles seront désactivées sous
`@media (prefers-reduced-motion: reduce)` pour les personnes sujettes au vertige.

Aucun contenu ne disparaît tout seul **sauf** le bandeau « Annuler » (5 secondes). C'est un
compromis assumé : une confirmation permanente encombrerait l'écran. L'action reste réversible
après coup en revenant à l'étape précédente depuis la fiche.

---

## Bilan

| | Nombre |
|---|---|
| Points conformes | 18 |
| Points à corriger au codage | 2 (pastilles de filtre à 44 px, compteur à 12 px) |
| Écart assumé et justifié | 1 (filets de séparation décoratifs à 1.26:1) |

**Ce que je retiens.** Les deux corrections à faire sont minuscules — quelques pixels de `padding`.
Elles n'auraient jamais été trouvées à l'œil : c'est le fait de **mesurer** qui les a sorties. Même
démarche que pour le choix de la direction visuelle, où deux calculs de contraste ont éliminé la
maquette que je préférais.
