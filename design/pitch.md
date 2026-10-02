# Pitch — mon app M291

**Nom de l'app :** Déclic

**En une phrase, elle sert à :** suivre chaque shooting photo de la première demande du client
jusqu'au paiement, pour qu'aucune commande ne reste oubliée sur une carte mémoire.

**À qui (prénom + âge + situation) :** Nora, 24 ans, employée à 60 % dans une agence de
communication à Yverdon-les-Bains et photographe indépendante le reste du temps. Elle fait trois à
cinq shootings par mois (portraits, mariages, concerts) et gère tout aujourd'hui entre les notes de
son téléphone, WhatsApp et sa boîte mail. Ce qu'elle perd, ce ne sont pas les photos : ce sont les
étapes d'après — relancer un devis, livrer dans les délais, réclamer une facture impayée.

**La tâche n°1 (celle du flow) :** faire avancer un shooting à l'étape suivante, et voir
immédiatement ce qui est en retard. Nora ouvre l'app, repère les fiches en retard en haut de la
liste, ouvre celle qui la concerne et appuie sur un seul bouton pour la passer à l'étape suivante.

**Les données (inventées) ressemblent à :** fiches de shootings. Chaque fiche porte un client, un
type de prestation (portrait, mariage, concert, corporate), une date, un lieu, un prix convenu, un
acompte, une date de livraison promise et une étape courante parmi les sept du parcours :

`Demande` → `Devis envoyé` → `Confirmé` → `Photographié` → `Tri & retouche` → `Livré` → `Payé`

**Pourquoi ce n'est pas trop grand pour 4 semaines de code :**

- **Une seule sorte de fiche.** Tout tourne autour du shooting. Pas de clients séparés, pas de
  factures séparées : le client est un champ de la fiche, le prix aussi.
- **Trois écrans, pas plus.** La liste, le détail d'une fiche, le formulaire d'ajout.
- **Un seul vrai bouton.** « Étape suivante » fait avancer la fiche d'un cran dans un tableau de
  sept valeurs. C'est une ligne de logique, pas un moteur de workflow.
- **Rien à installer côté serveur.** Les fiches vivent dans un fichier `shootings.json` chargé avec
  `fetch`. Pas de compte utilisateur, pas de mot de passe, pas de base de données.
- **Ce que je m'interdis volontairement :** l'envoi réel d'e-mails, l'upload des photos, le paiement
  en ligne, le calendrier synchronisé. Ce sont les quatre choses qui feraient exploser le périmètre.
