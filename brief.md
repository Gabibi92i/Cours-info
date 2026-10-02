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

## 8. Contraintes techniques (cahier des charges du cours)

| Exigence | Comment je la remplis dans Déclic |
|---|---|
| JSON personnel ≥ 30 entrées, chargé avec `fetch` | `data/shootings.json`, 32 fiches de shootings |
| Recherche ou filtre | Recherche par client **et** filtre par étape |
| Formulaire validé, messages soignés (pas d'`alert`) | Message d'erreur affiché sous chaque champ fautif |
| ≥ 3 micro-interactions | Carte qui s'enfonce au toucher · frise qui avance · bandeau « Annuler » · surbrillance de la nouvelle fiche |
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
- **Couleur :** une seule couleur d'accent, réservée à l'action principale et à l'état « en retard ».
  Tout le reste est neutre. L'information « en retard » n'est **jamais** portée par la couleur seule.
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
| **Relu par** | _(à compléter : prénom du binôme)_ |
| **Date** | _(à compléter)_ |

**Remarques reçues et ce que j'en ai fait :**

1. _(à compléter)_
2. _(à compléter)_
