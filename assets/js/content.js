// Modifiez ce fichier pour changer les textes, les coordonnées et les vidéos.
// Chaque clip: file = nom du fichier sans extension (videos/<file>.mp4, posters/<file>.jpg).
window.SITE = {
  contact: {
    name: "Malek Ben Sassi",
    role: "Élève ingénieur en informatique (3ᵉ année) — ESPRIT, Tunis",
    email: "malek.ben.sassi@esprit.tn",     // ex. "prenom.nom@exemple.com" (le formulaire n’apparaît que si renseigné)
    linkedin: "",  // ex. "https://www.linkedin.com/in/votre-profil"
    github: "https://github.com/Malek720",
    phone: "96 510 796"      // facultatif
  },

  roles: {
    technicien: {
      eyebrow: "Parcours du technicien",
      title: "Sur le terrain, en quelques gestes",
      intro: "Le technicien est l’utilisateur de terrain. Son interface est pensée d’abord pour le téléphone : grandes zones tactiles, actions principales en un geste et notifications à chaque affectation. Il ne voit que les données de son propre site.",
      abilities: [
        "Déclarer une panne en quelques secondes",
        "Recevoir et exécuter ses interventions",
        "Suivre l’état de son site sur la carte",
        "Être notifié à chaque affectation"
      ],
      clips: [
        {
          file: "t1_technicien",
          title: "Connexion et tableau de bord",
          tags: ["Connexion", "Tableau de bord", "Responsive"],
          summary: "Le technicien se connecte et arrive directement sur son tableau de bord : interventions qui lui sont affectées, notifications non lues et accès rapide à la déclaration de panne. Le menu latéral, avec une icône devant chaque entrée, se réduit automatiquement sur tablette et devient une barre d’onglets sur téléphone.",
          points: [
            "Connexion sécurisée : les droits viennent des rôles enregistrés en base, jamais du sélecteur de la page de connexion",
            "Cartes de synthèse : interventions, notifications et accès à la déclaration",
            "Navigation adaptative : menu latéral, rail d’icônes ou barre d’onglets",
            "Cloche de notifications avec compteur de messages non lus"
          ]
        },
        {
          file: "t2_technicien",
          title: "Carte de la Tunisie et parc de machines",
          tags: ["Carte", "Parc", "Filtres"],
          summary: "La carte affiche les sites avec leur état de santé : vert quand tout va bien, orange quand une maintenance approche ou est échue, rouge en cas de panne critique. Chaque état est indiqué par une couleur, une icône et un texte. Le technicien consulte la page de son site, regroupée par zone, puis le parc de machines avec recherche et filtres.",
          points: [
            "Marqueurs par site avec fenêtre détaillée : machines par statut et par modèle",
            "Page du site organisée par zone d’atelier",
            "Recherche par nom, numéro de série ou modèle, filtres de statut, de modèle et de famille",
            "Périmètre limité au site du technicien"
          ]
        },
        {
          file: "t3_technicien",
          title: "Déclarer une panne avec le schéma 3D",
          tags: ["Panne", "Schéma 3D", "Notifications"],
          summary: "Le formulaire ne propose que les machines du site du technicien, puis restreint les modules et les pièces à ceux du modèle choisi. Le module concerné peut aussi être sélectionné directement sur un schéma 3D interactif, avec vue éclatée et indicateur de santé. Une fois validée, la panne génère une confirmation, une intervention et des notifications.",
          points: [
            "Choix de la machine, du module, de la pièce, du symptôme et de la gravité",
            "Schéma 3D : rotation, zoom, vue éclatée et détail des pièces du module",
            "Validation côté serveur, avec un message d’erreur sous chaque champ",
            "Protection contre le double envoi : un seul enregistrement, même en cas de double clic",
            "Affectation automatique : même site, technicien ayant le moins d’interventions ouvertes"
          ]
        },
        {
          file: "t4_technicien",
          title: "Exécuter une intervention en sécurité",
          tags: ["Sécurité", "Check-list", "Clôture"],
          summary: "L’intervention affectée s’ouvre avec les consignes de sécurité. Pour démarrer, le technicien doit cocher la check-list de consignation (coupure des alimentations électrique et pneumatique, verrouillage). Il suit ensuite les étapes de la procédure, enregistre les pièces remplacées, puis clôture avec un commentaire obligatoire : la panne est résolue et les responsables sont notifiés.",
          points: [
            "Consignation obligatoire avant tout démarrage",
            "Check-list de procédure enregistrée au fur et à mesure",
            "Pièces remplacées et commentaire de clôture",
            "Option « Je ne peux pas intervenir » : l’intervention retourne au tableau de répartition avec un motif"
          ]
        }
      ]
    },

    responsable: {
      eyebrow: "Parcours du responsable",
      title: "Piloter la maintenance de tous les sites",
      intro: "Le responsable pilote la maintenance de l’ensemble des sites : il répartit le travail, suit l’état du parc, planifie les échéances et mesure la performance.",
      abilities: [
        "Répartir et réaffecter les interventions",
        "Piloter la maintenance préventive",
        "Consulter les indicateurs et exporter les données",
        "Suivre chaque machine de bout en bout"
      ],
      clips: [
        {
          file: "r1_responsable",
          title: "Tableau de bord du responsable",
          tags: ["Vue d’ensemble"],
          summary: "Une vue d’ensemble de tous les sites : pannes à répartir, maintenances en retard, machines par statut, carte de la Tunisie et accès aux indicateurs. Les cartes de synthèse mènent directement aux écrans concernés.",
          points: [
            "Pannes en attente d’affectation",
            "Échéances de maintenance en retard",
            "Répartition des machines par statut",
            "Carte des sites et accès aux indicateurs"
          ]
        },
        {
          file: "r2_responsable",
          title: "Notifications et tableau de répartition",
          tags: ["Répartition", "Notifications"],
          summary: "Lorsqu’une panne est déclarée, le responsable est notifié. Le tableau de répartition classe les pannes par gravité et permet d’affecter ou de réaffecter une intervention en un clic, en voyant la charge de chaque technicien du site. Il peut aussi créer manuellement une intervention préventive ou corrective.",
          points: [
            "Notification avec lien direct vers la panne",
            "Classement par gravité puis par ancienneté",
            "Affectation et réaffectation, avec le nombre d’interventions ouvertes par technicien",
            "Création manuelle d’une intervention pour une machine"
          ]
        },
        {
          file: "r3_responsable",
          title: "Fiche machine, historique et visionneuse 3D",
          tags: ["Fiche machine", "Schéma 3D", "QR code"],
          summary: "La fiche rassemble l’identité de la machine, la chronologie des pannes et des interventions (filtrable par module) et la visionneuse 3D, colorée selon la santé de chaque module. Un QR code imprimable ouvre le formulaire de déclaration déjà rempli pour cette machine.",
          points: [
            "Modification de la zone, du statut et du numéro de série",
            "Chronologie des pannes et des interventions",
            "Visionneuse 3D : santé par module, pièces, vue éclatée",
            "QR code imprimable, sans les menus",
            "Clôture ou réouverture d’une panne avec motif"
          ]
        },
        {
          file: "r4_responsable",
          title: "Maintenance préventive, indicateurs et recherche",
          tags: ["Préventif", "Indicateurs", "Export CSV"],
          summary: "Le plan de maintenance liste les échéances à venir et en retard par site, et une échéance peut être reportée avec un motif. Une commande planifiée génère automatiquement les interventions préventives dues, sans doublon. La page d’indicateurs calcule la disponibilité, le temps moyen de réparation et les pannes par mois, avec export CSV ; la recherche globale retrouve machines et interventions.",
          points: [
            "Plan de maintenance par site, calculé sur les heures de fonctionnement",
            "Génération automatique des interventions préventives, une seule par échéance",
            "Report d’une échéance avec motif et nouvelle date",
            "Indicateurs : disponibilité, temps moyen de réparation, pannes par site et par mois, export CSV",
            "Recherche globale limitée aux droits de l’utilisateur"
          ]
        }
      ]
    },

    administrateur: {
      eyebrow: "Parcours de l’administrateur",
      title: "Les données de référence, sous contrôle",
      intro: "L’administrateur gère les données de référence de l’application : utilisateurs, sites, machines, et catalogue des modèles, modules, pièces et tâches de maintenance.",
      abilities: [
        "Administrer utilisateurs, sites et machines",
        "Gérer le catalogue multi-modèles",
        "Importer et exporter par fichier CSV",
        "Garder les plannings à jour"
      ],
      clips: [
        {
          file: "a1_admin",
          title: "Administration et données de référence",
          tags: ["Administration"],
          summary: "Le tableau de bord d’administration présente des statistiques et des graphiques, avec un basculement entre vue tableau et vue grille. L’administrateur gère les machines (filtres par modèle et par famille), les utilisateurs, les sites et les plannings de maintenance.",
          points: [
            "Statistiques et graphiques sur le parc",
            "Vue tableau ou vue grille sur chaque liste",
            "Filtres par modèle et par famille",
            "Gestion des utilisateurs, des sites et des plannings"
          ]
        },
        {
          file: "a2_admin",
          title: "Catalogue multi-modèles",
          tags: ["Catalogue", "Modèles"],
          summary: "Chaque modèle de machine possède ses propres modules (imbriqués), pièces et tâches de maintenance. La fiche d’un modèle affiche son arborescence, ses tâches et les machines concernées. L’application est générique : ajouter un modèle est une opération de données, pas de code. La fonction « Dupliquer ce modèle » en crée un nouveau à partir d’un modèle existant.",
          points: [
            "Modules imbriqués, pièces et tâches par modèle",
            "Badge « Données de démonstration » sur les données d’exemple",
            "Duplication d’un modèle en un clic",
            "Références de pièces et charge maximale à confirmer clairement signalées"
          ]
        },
        {
          file: "a3_admin",
          title: "Import et export CSV sécurisés",
          tags: ["CSV", "Sécurité"],
          summary: "Le catalogue d’un modèle s’exporte en CSV, compatible Excel. L’import commence par un aperçu : nombre de créations et de mises à jour, avertissements, et tableau des erreurs avec numéro de ligne et de colonne. Rien n’est écrit tant que l’administrateur n’a pas confirmé, et l’import ne supprime jamais de données.",
          points: [
            "Export CSV avec protection contre l’injection de formules",
            "Aperçu avant tout enregistrement",
            "Erreurs détaillées par ligne et par colonne",
            "Fichiers invalides, trop volumineux ou non CSV refusés",
            "Import transactionnel : tout ou rien"
          ]
        },
        {
          file: "a4_admin",
          title: "Garde-fous et plannings",
          tags: ["Intégrité", "Plannings"],
          summary: "L’application protège ses données : un modèle utilisé par des machines ne peut pas être supprimé. Lorsqu’un modèle reçoit de nouvelles tâches, l’action « Régénérer les plannings » crée uniquement les échéances manquantes, sans toucher à l’historique. Changer le modèle d’une machine archive ses anciens plannings au lieu de les supprimer.",
          points: [
            "Suppression refusée, avec le détail des éléments liés",
            "Régénération des plannings sans doublon",
            "Archivage des plannings lors d’un changement de modèle",
            "Actions sensibles protégées (méthode POST et jeton CSRF)"
          ]
        }
      ]
    }
  },

  about: {
    company: {
      paragraphs: [
        "Roller Technology Systems Industry (RolTech) est une entreprise industrielle basée à Tunis. Elle conçoit des convoyeurs aériens et des systèmes de manutention pour l’industrie.",
        "Ses solutions couvrent notamment la logistique de bobines de câbles, de gros faisceaux de câbles et de caisses (plastiques ou carton), ainsi que les lignes de peinture. RolTech propose également un service après-vente et des pièces de rechange."
      ],
      note: "Informations générales issues du site public de l’entreprise.",
      link: "https://convoyeur-aerien.com"
    },
    internship: {
      paragraphs: [
        "Ce projet a été réalisé pendant un stage chez RolTech, pour remplacer un suivi de maintenance manuel (papier et tableur) par une application web.",
        "Le stage s’est déroulé en quatre sprints : cahier des charges et modélisation UML, conception de la base de données, modules cœur (machines, pannes, interventions) avec premiers tests fonctionnels, puis tableaux de bord, indicateurs et documentation."
      ]
    },
    project: {
      paragraphs: [
        "La GMAO gère un parc de machines réparties sur plusieurs sites, qui fonctionnent 24 h/24. Elle couvre la déclaration de pannes, l’affectation automatique des techniciens, la maintenance préventive, les indicateurs, la carte de la Tunisie et une visionneuse 3D des modules.",
        "Les vidéos de ce site utilisent des données d’exemple : aucune donnée confidentielle de RolTech n’y est publiée."
      ],
      figures: [
        { value: "3", label: "rôles utilisateurs" },
        { value: "4", label: "sites en Tunisie" },
        { value: "≈ 40", label: "machines visées" },
        { value: "24 h/24", label: "fonctionnement" }
      ],
      stack: ["Symfony 7", "Doctrine", "MariaDB / MySQL", "EasyAdmin", "Twig", "Turbo", "Leaflet", "Three.js", "Chart.js", "PHPUnit"]
    }
  }
};