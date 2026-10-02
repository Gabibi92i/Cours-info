# User flow — Déclic

**Persona :** Nora Lehmann, 24 ans (voir [persona.md](persona.md))
**Contexte réel :** debout dans le train, téléphone à une main, 90 secondes disponibles.

---

## Flow principal : faire avancer un shooting

> **Déclencheur :** Nora a livré les photos du mariage Kohler hier soir. Elle veut que l'app le sache.
> **Fin réussie :** la fiche est passée à « Livré », elle a disparu de la zone « en retard », Nora a rangé son téléphone.

```
   ┌─────────────────────────────────────────────────────────────┐
   │  1. OUVERTURE                                               │
   │  Écran : Liste des shootings                                │
   │  Nora voit en premier : « 3 en retard »                     │
   └──────────────────────────┬──────────────────────────────────┘
                              │ elle cherche « Kohler »
                              ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  2. REPÉRAGE                                                │
   │  Action : taper dans le champ de recherche OU filtrer       │
   │  Feedback : la liste se réduit pendant la frappe            │
   │  Cas limite : 0 résultat → message + bouton « tout voir »   │
   └──────────────────────────┬──────────────────────────────────┘
                              │ elle touche la carte « Mariage Kohler »
                              ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  3. VÉRIFICATION                                            │
   │  Écran : Détail du shooting                                 │
   │  Elle lit : étape actuelle « Tri & retouche », livré le 12  │
   │  Feedback : la frise des 7 étapes montre où elle en est     │
   └──────────────────────────┬──────────────────────────────────┘
                              │ elle appuie sur « Marquer comme livré »
                              ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  4. ACTION                                                  │
   │  Action : un seul appui sur le bouton principal             │
   │  Feedback immédiat : la frise avance, l'étape change de     │
   │  couleur, bandeau « Passé à Livré — Annuler » (5 secondes)  │
   │  Cas limite : erreur → annulation possible sans confirmation│
   └──────────────────────────┬──────────────────────────────────┘
                              │ retour automatique après 1 s
                              ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  5. CONFIRMATION                                            │
   │  Écran : Liste des shootings                                │
   │  Feedback : le compteur passe de « 3 en retard » à « 2 »    │
   │  La fiche Kohler a changé de place dans la liste            │
   └─────────────────────────────────────────────────────────────┘
```

### Le même flow, en tableau

| # | Écran | Action de l'utilisatrice | Feedback attendu de l'interface |
|---|---|---|---|
| 1 | Liste | Ouvre l'app | Compteur « 3 en retard » en haut, fiches triées par urgence |
| 2 | Liste | Tape « koh » dans la recherche | La liste se filtre à chaque lettre, sans bouton « rechercher » |
| 3 | Liste | Touche la carte du mariage Kohler | La carte s'enfonce légèrement, puis l'écran de détail s'ouvre |
| 4 | Détail | Lit l'étape actuelle | Frise des 7 étapes, l'étape courante est pleine, les suivantes vides |
| 5 | Détail | Appuie sur « Marquer comme livré » | La frise avance d'un cran + bandeau « Annuler » pendant 5 s |
| 6 | Détail | Ne fait rien pendant 1 s | Retour automatique à la liste |
| 7 | Liste | Lit le compteur | « 2 en retard », la fiche Kohler est descendue dans la liste |

**Nombre d'appuis pour la tâche n°1 : 3** (recherche, carte, bouton). C'est le chiffre que je dois
tenir. Si une décision de design le fait passer à 4, je dois pouvoir la justifier.

---

## Flow secondaire : ajouter un shooting

> **Déclencheur :** Nora raccroche, elle vient de décrocher un portrait pour le 14 mars.
> **Contrainte :** elle est debout, elle a 30 secondes avant d'oublier.

| # | Écran | Action | Feedback |
|---|---|---|---|
| 1 | Liste | Appuie sur le bouton « + » (en bas à droite, au pouce) | Le formulaire monte depuis le bas |
| 2 | Formulaire | Remplit **4 champs seulement** : client, type, date, prix | Le clavier adapté s'ouvre (texte, liste, date, numérique) |
| 3 | Formulaire | Laisse le reste vide | Les champs facultatifs sont repliés sous « Détails (optionnel) » |
| 4 | Formulaire | Appuie sur « Créer » | Validation : si un champ obligatoire manque, message **sous le champ**, jamais une `alert()` |
| 5 | Liste | — | La nouvelle fiche apparaît en surbrillance 2 s, à l'étape « Demande » |

---

## Cas limites prévus

| Situation | Ce que fait l'interface |
|---|---|
| Aucune fiche (premier lancement) | Écran vide illustré + bouton « Ajouter mon premier shooting », pas une liste blanche |
| Recherche sans résultat | « Aucun shooting ne correspond à *koh* » + bouton « Effacer la recherche » |
| Le JSON ne se charge pas | Message « Impossible de charger les shootings » + bouton « Réessayer ». Jamais une page blanche. |
| Chargement en cours | Trois cartes grises en squelette, pas un *spinner* seul |
| Fiche déjà à l'étape « Payé » | Le bouton principal devient « Terminé » et est désactivé, l'explication est écrite à côté |
| Avance d'étape par erreur | Bandeau « Annuler » pendant 5 s — pas de fenêtre de confirmation avant l'action |

> **Choix assumé :** je confirme *après* l'action (annulation) plutôt qu'*avant* (pop-up). Nora fait
> ce geste plusieurs fois par semaine : une confirmation à chaque fois deviendrait un réflexe vide,
> et ne protégerait plus de rien.

---

## Ce que ce flow exclut volontairement

Pas d'écran de connexion, pas de réglages, pas de statistiques, pas d'export PDF. Chaque écran
ajouté est un écran que je dois dessiner, coder, tester et présenter en 4 semaines.
