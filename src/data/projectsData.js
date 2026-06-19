export const projectsData = {
  lighting: {
    id: "lighting",
    title: "Installation d'Éclairage Commercial",
    category: "Commercial",
    image: "/pic1.jpg",
    client: "NexoSpace Headquarters",
    location: "Paris, France",
    duration: "3 mois",
    date: "Janvier 2026",
    challenge: "Le client souhaitait moderniser l'éclairage de son siège social de 3 étages pour réduire sa facture d'électricité de 30% tout en créant une atmosphère de travail dynamique et propice à la concentration. L'installation devait se faire en site occupé, sans interrompre les activités des employés.",
    solution: "Déploiement d'une solution d'éclairage LED intelligente interconnectée via le protocole DALI. Intégration de capteurs de luminosité naturelle et de détecteurs de présence dans toutes les salles de réunion et bureaux individuels. Programmation de scénarios automatisés pour les heures creuses et de détente.",
    results: [
      { label: "Économie d'Énergie", value: "-38%" },
      { label: "Luminaires Installés", value: "450 unités" },
      { label: "Taux de Satisfaction", value: "98%" }
    ],
    features: [
      "Luminaires LED à haute efficacité énergétique (160 lm/W)",
      "Passerelles DALI reliées à la GTB (Gestion Technique du Bâtiment)",
      "Capteurs de présence multi-zones et régulation de lumière constante",
      "Éclairage de secours connecté avec auto-test périodique"
    ],
    gallery: ["/pic1.jpg", "/pic5.jpg", "/pic3.jpg"],
    technologies: ["Philips MasterLED", "Schneider DALI Link", "Legrand BAES"],
    testimonial: {
      quote: "L'installation s'est faite en toute discrétion. Nos équipes n'ont ressenti aucune gêne et le confort visuel s'est considérablement amélioré. La baisse de notre facture électrique est déjà visible.",
      author: "Valérie Gomez",
      role: "Responsable RSE, NexoSpace"
    }
  },
  wiring: {
    id: "wiring",
    title: "Mise à Niveau du Câblage Résidentiel",
    category: "Résidentiel",
    image: "/pic2.jpg",
    client: "Famille Laurent - Villa Biarritz",
    location: "Biarritz, France",
    duration: "4 semaines",
    date: "Mars 2026",
    challenge: "Rénovation électrique complète d'une bâtisse historique des années 1920. Le câblage existant était vétuste et représentait un risque d'incendie élevé. L'objectif était de mettre l'ensemble aux normes de sécurité NF C 15-100 tout en préservant le cachet architectural et les moulures en plâtre d'origine.",
    solution: "Utilisation de techniques d'encastrement avancées sans saignées destructives. Remplacement intégral des conducteurs par des fils isolés sous gaines ICTA. Pose d'un tableau électrique haut de gamme avec protections différentielles à haute sensibilité (30mA) et parafoudre.",
    results: [
      { label: "Conformité Normes", value: "Consuel OK" },
      { label: "Prises installées", value: "84 points" },
      { label: "Protection Terre", value: "12 Ohms" }
    ],
    features: [
      "Tableau principal Hager 4 rangées équipé de disjoncteurs magnétothermiques",
      "Interrupteurs différentiels type A et AC pour une sécurité optimale des personnes",
      "Appareillage haut de gamme Legrand Céliane en finition laiton brossé",
      "Installation de prises de communication RJ45 dans toutes les pièces de vie"
    ],
    gallery: ["/pic2.jpg", "/pic5.jpg", "/pic1.jpg"],
    technologies: ["Hager Gamma", "Legrand Céliane", "Wago Connecteurs"],
    testimonial: {
      quote: "Un travail d'orfèvre ! Les électriciens ont réussi à cacher tout le câblage moderne sans toucher à nos plafonds en plâtre sculpté. Nous nous sentons enfin en sécurité chez nous.",
      author: "Hélène Laurent",
      role: "Propriétaire"
    }
  },
  switchboard: {
    id: "switchboard",
    title: "Installation de Tableaux Industriels",
    category: "Industriel",
    image: "/pic3.jpg",
    client: "Plasturgie Ouest - Usine Nantes",
    location: "Nantes, France",
    duration: "2 mois",
    date: "Mai 2026",
    challenge: "L'extension d'une usine de plasturgie nécessitait la création d'un nouveau Tableau Général Basse Tension (TGBT) capable d'alimenter 5 nouvelles extrudeuses industrielles de forte puissance tout en assurant une sélectivité totale des protections pour éviter les arrêts de production en cascade.",
    solution: "Étude de sélectivité réalisée sous Caneco BT. Assemblage et câblage dans notre atelier d'une armoire de puissance générale de 2500A avec jeu de barres en cuivre. Pose de disjoncteurs de puissance à déclenchement électronique communicants.",
    results: [
      { label: "Puissance Maximale", value: "2 500 A" },
      { label: "Sélectivité Protections", value: "Totale (Ampèremétrique)" },
      { label: "Indice de Protection", value: "IP54" }
    ],
    features: [
      "Armoire industrielle Rittal blindée avec ventilation forcée",
      "Disjoncteurs de puissance Schneider Masterpact avec centrale de mesure intégrée",
      "Compensation automatique de l'énergie réactive par batterie de condensateurs",
      "Inverseur de source motorisé pour raccordement rapide d'un groupe secours"
    ],
    gallery: ["/pic3.jpg", "/pic1.jpg", "/pic5.jpg"],
    technologies: ["Schneider Masterpact MTZ", "Rittal TS8", "Socomec Inverseurs"],
    testimonial: {
      quote: "La rigueur technique d'Elecpro a été remarquable. L'armoire de puissance a été livrée câblée et testée en atelier. La coupure générale de raccordement n'a duré que 4 heures un dimanche.",
      author: "Jean-Marc Piron",
      role: "Directeur Technique, Plasturgie Ouest"
    }
  },
  domotics: {
    id: "domotics",
    title: "Intégration Domotique Résidentielle",
    category: "Systèmes Intelligents",
    image: "/pic4.png",
    client: "Villa Connectée Saint-Jean",
    location: "Saint-Jean-de-Luz, France",
    duration: "6 semaines",
    date: "Juin 2026",
    challenge: "Concevoir un système de contrôle centralisé pour une villa neuve de 450m². L'utilisateur souhaitait piloter le chauffage au sol, la climatisation gainable, la piscine, 80 zones d'éclairage et les caméras de sécurité de manière simple, robuste et pérenne dans le temps, sans dépendre du cloud.",
    solution: "Déploiement d'un réseau bus câblé reposant sur le protocole standard ouvert KNX. Raccordement de l'ensemble des boutons multifonctions tactiles muraux. Intégration d'un serveur de supervision local avec écran de contrôle tactile de 10 pouces dans le séjour.",
    results: [
      { label: "Éléments Connectés", value: "142 adresses KNX" },
      { label: "Consommation Chauffage", value: "-25% mesurée" },
      { label: "Écrans de Contrôle", value: "2 dalles tactiles" }
    ],
    features: [
      "Câblage en bus KNX blindé garantissant zéro interférence radio",
      "Actionneurs de commutation et de variation en tableau électrique",
      "Sondes de température intégrées aux thermostats muraux pour régulation fine",
      "Passerelle IP sécurisée pour contrôle à distance crypté sur smartphone"
    ],
    gallery: ["/pic4.png", "/pic2.jpg", "/pic5.jpg"],
    technologies: ["Hager Domovea", "Schneider SpaceLYnk", "Basalte Keypads"],
    testimonial: {
      quote: "La maison s'adapte à nos habitudes. Le soir, un seul bouton éteint tout le rez-de-chaussée et active l'alarme extérieure. C'est d'une fiabilité totale au quotidien.",
      author: "Marc Roche",
      role: "Propriétaire"
    }
  }
};
