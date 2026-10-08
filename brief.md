# Brief — Déclic

**Fichier de spécification officiel** · ICT 291 · Gabriel Siegenthaler · Classe C2b
Dernière mise à jour : 2 octobre 2026

---

## 1. En une phrase

**Déclic** suit chaque shooting photo de la première demande du client jusqu'au paiement, pour
qu'aucune commande ne reste oubliée sur une carte mémoire.

## 2. Le problème

Un photographe indépendant à temps partiel ne perd pas ses photos : il perd les étapes qui suivent
la prise de vue. Entre le shooting et le paiement il y a quatre moments où une commande sort du
radar — le devis non relancé, la retouche repoussée, la livraison en retard, la facture impayée.
Ces moments ne sont enregistrés nulle part : ils vivent dans l'agenda, la boîte mail et WhatsApp,
et aucun de ces trois outils ne sait qu'un shooting existe.

Résultat concret : c'est le client qui relance, pas le photographe. Et une facture oubliée est de
l'argent déjà travaillé mais jamais encaissé.

## 3. Pour qui

**Nora Lehmann, 24 ans**, employée à 60 % en agence de communication et photographe indépendante
le reste du temps, 3 à 5 shootings par mois. Persona complet : [design/persona.md](design/persona.md).

**Pour qui ce n'est pas :** les studios à plusieurs collaborateurs, qui ont besoin de rôles,
d'agenda partagé et de facturation TVA.

## 4. La tâche n°1

Faire avancer un shooting à l'étape suivante, et voir immédiatement ce qui est en retard.

**Objectif mesurable : 3 appuis maximum**, depuis l'ouverture de l'app jusqu'à la fiche avancée.
Parcours détaillé : [design/user-flow.md](design/user-flow.md).

## 5. Le modèle de données

Une seule entité : le **shooting**. Le client n'est pas une fiche séparée, c'est un champ.

```json
{
  "id": 17,
  "client": "Famille Kohler",
  "contact": "nkohler@example.ch",
  "type": "mariage",
  "date": "2026-09-19",
  "lieu": "Grandson",
  "prix": 1400,
  "acompte": 400,
  "etape": "tri",
  "livraisonPromise": "2026-10-10",
  "nbPhotos": 320,
  "notes": "Veut 15 photos en noir et blanc."
}
```

**Les sept étapes, dans l'ordre :**

`demande` → `devis` → `confirme` → `photographie` → `tri` → `livre` → `paye`

Une fiche est **en retard** si `livraisonPromise` est dépassée et que `etape` n'est ni `livre` ni
`paye`. C'est la seule règle métier de l'application.

**Volume :** 32 fiches inventées dans `data/shootings.json`, chargées avec `fetch`.

## 6. Les écrans

| # | Écran | Rôle | Contenu |
|---|---|---|---|
| 1 | **Liste** | Point d'entrée et écran de retour | Compteur « en retard », recherche, filtre par étape, cartes triées par urgence |
| 2 | **Détail** | Lire et agir | Frise des 7 étapes, infos de la fiche, bouton principal « Étape suivante » |
| 3 | **Formulaire** | Créer une fiche | 4 champs obligatoires, le reste replié sous « Détails (optionnel) » |

Trois écrans. Pas de page de connexion, pas de réglages, pas de statistiques.

## 7. Ce que l'app ne fera pas

Je le note ici pour pouvoir le montrer quand la tentation reviendra :

- pas d'envoi réel d'e-mails ni de SMS ;
- pas d'upload ni de galerie de photos ;
- pas de paiement en ligne ;
- pas de synchronisation d'agenda ;
- pas de comptes utilisateurs ni de mots de passe.

**Une exception, ajoutée après la revue croisée** (voir point 12) : l'app ne *envoie* rien, mais
elle **prépare** le message de relance et le copie dans le presse-papier. Nora le colle elle-même
dans sa messagerie. Le besoin est couvert sans service externe ni clé d'API.

## 8. Contraintes techniques (cahier des charges du cours)

| Exigence | Comment je la remplis dans Déclic |
|---|---|
| JSON personnel ≥ 30 entrées, chargé avec `fetch` | `data/shootings.json`, 32 fiches de shootings |
| Recherche ou filtre | Recherche par client **et** filtre par étape |
| Formulaire validé, messages soignés (pas d'`alert`) | Message d'erreur affiché sous chaque champ fautif |
| ≥ 3 micro-interactions | Carte qui s'enfonce au toucher · frise qui avance · bandeau « Annuler » · surbrillance de la nouvelle fiche · confirmation « Message copié » |
| Responsive | Conçu pour 375 px d'abord, puis élargi |
| Icônes SVG | Jeu d'icônes dessiné en SVG inline, aucune police d'icônes |
| GitHub Pages | Publié depuis ce dépôt |
| Commits réguliers et parlants | Un commit par étape, message à l'impératif |
| README avec journal IA | 3 prompts + corrections manuelles, dans [README.md](README.md) |

**Exclusions imposées par le cours et respectées :** pas de Bootstrap, pas de Sass, pas de
framework JS. CSS écrit à la main (flex, grid, variables).

## 9. Direction visuelle

Décidée après comparaison de trois propositions — voir [design/critique.md](design/critique.md).

- **Ton :** outil d'atelier, pas tableau de bord d'entreprise. Le vocabulaire est celui de Nora
  (« shooting », « livré », « payé »), jamais « lead » ou « pipeline ».
- **Couleur :** **une couleur, un sens.** L'encre `#17191C` porte le texte et l'action principale ;
  le rouge brique `#B3261E` ne sert **qu'**au retard ; le gris foncé porte la progression normale ;
  le laiton est purement décoratif. Tout le reste est neutre, et l'information « en retard » n'est
  **jamais** portée par la couleur seule.
  *(Corrigé après l'itération 1 : ce point disait d'abord « une seule couleur pour l'action et le
  retard », ce qui contredisait la critique comparative — voir [design/iteration.md](design/iteration.md).)*
- **Typographie :** deux tailles de titre, une taille de corps, un seul niveau de gris secondaire.
- **Contraste :** minimum 4.5:1 sur tout texte, parce que Nora lit en extérieur.
- **Cibles tactiles :** 44 × 44 px minimum, action principale atteignable au pouce.

## 10. Critères de réussite

L'app est réussie si :

1. un utilisateur qui ne l'a jamais vue fait avancer un shooting **en moins de 20 secondes**, sans
   explication ;
2. la question « qu'est-ce qui est en retard ? » trouve sa réponse **sans scroller** ;
3. chaque état d'erreur (chargement, échec, liste vide, recherche vide) a un écran dessiné ;
4. l'app reste utilisable à une main sur un écran de 375 px.

## 11. Planning

| Sprint | Semaines | Livrable |
|---|---|---|
| Design | s5 – s8 | Persona, flow, brief, wireframe, 3 propositions, choix — **Note 1** |
| Sprint 1 | s14 | Écran Liste, cartes alimentées par `fetch` |
| Sprint 2 | s15 – s16 | Écran Détail, avance d'étape, recherche et filtre |
| Sprint 3 | s17 | Formulaire, états d'erreur, micro-interactions, polish |

## 12. Revue croisée

> Exigence du cours : faire relire ce brief par un binôme avant de le commiter.

| | |
|---|---|
| **Relu par** | Zinedine |
| **Date** | 2 octobre 2026 |
| **Comment** | Brief envoyé par message, trois questions posées, réponses reçues par écrit |

### Question 1 — « En lisant juste le point 1 et le point 2, tu comprends à quoi sert l'app ? »

> « Oui, l'app sert à. centraliser toute les étapes de chaque projet avec chaque client »
> *(réponse recopiée telle quelle)*

**Ce que j'en fais.** Le brief est compris, donc je ne change pas les points 1 et 2. Mais sa
reformulation est instructive : il dit **« projet »** et **« client »**, là où j'écris partout
**« shooting »**. Deux lectures possibles, et elles ne mènent pas au même produit :

- « centraliser les étapes de chaque projet » → un outil de **gestion de projet**, qui marcherait
  pour n'importe quel métier ;
- « suivre chaque shooting » → un outil **de photographe**, dont le vocabulaire et les 7 étapes
  sont ceux du métier.

C'est la seconde que je veux. **Décision : je garde « shooting » partout**, et je l'ai rendu plus
explicite au point 1. Si même un camarade glisse vers « projet », l'interface devra tenir le
vocabulaire de Nora pour ne pas dériver.

### Question 2 — « Dans la liste "ce que l'app ne fera pas", il y a un truc qui te paraît indispensable ? »

> « envoyer directement des message au client »

**Ce que j'en fais.** C'est la remarque la plus utile des trois, et elle vise juste : le problème
que l'app résout, c'est que Nora **oublie de relancer**. Lui montrer qu'elle doit relancer sans lui
donner le moyen de le faire, c'est s'arrêter au milieu du chemin.

**Mais je maintiens l'exclusion pour les 4 semaines de code.** Envoyer réellement un e-mail
demanderait un service d'envoi, une clé d'API et une gestion des échecs — c'est exactement le genre
de morceau qui ferait exploser le périmètre, et le cours interdit de toute façon toute solution
payante.

**Le compromis que j'ajoute** : un bouton **« Copier le message de relance »** sur la fiche, qui
prépare le texte (nom du client, date du shooting, date de livraison promise) et le met dans le
presse-papier. Nora le colle dans son app de messagerie. Zéro envoi, zéro service externe, et le
besoin est couvert. C'est aussi une micro-interaction de plus pour le cahier des charges.

L'envoi réel est noté comme **la première chose à ajouter après le projet**.

### Question 3 — « Le parcours en 3 appuis, tu le trouves réaliste ou je me mens ? »

> « tout a fait realiste »

**Ce que j'en fais.** Rien pour l'instant — mais je note que c'est un avis donné **en lisant le
brief, pas en manipulant la maquette**. Ça ne vaut pas un test. Les 3 appuis seront vérifiés
chronomètre en main pendant les tests utilisateurs, et c'est là seulement que le chiffre comptera.

### Bilan de la revue

Une modification du périmètre (le bouton de copie), une décision de vocabulaire confirmée, et un
chiffre à vérifier autrement qu'à l'avis. La question 2 a changé le brief.
