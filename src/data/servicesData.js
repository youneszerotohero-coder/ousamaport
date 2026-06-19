export const servicesData = {
  commercial: {
    id: "commercial",
    title: "Électricité Commerciale",
    category: "Commercial",
    image: "/pic1.jpg",
    tagline: "Des solutions électriques robustes et durables pour propulser votre entreprise.",
    description: "Nous offrons des solutions complètes de conception, d'installation et de maintenance électrique adaptées aux exigences des locaux commerciaux, bureaux, commerces de détail et bâtiments publics. Notre équipe d'électriciens certifiés assure la conformité, la sécurité et l'optimisation énergétique de vos espaces de travail.",
    benefits: [
      "Conformité réglementaire absolue (normes ERP/ERT)",
      "Optimisation de la consommation énergétique globale",
      "Éclairage intelligent et automatisé pour espaces de travail",
      "Systèmes d'alimentation de secours (onduleurs, groupes)",
      "Maintenance préventive pour éviter les arrêts d'activité"
    ],
    features: [
      {
        title: "Éclairage Intelligent & LED",
        description: "Intégration d'éclairage basse consommation avec détecteurs de présence et régulation de luminosité constante pour réduire vos factures.",
        icon: "Lightbulb"
      },
      {
        title: "Câblage Structuré & Réseaux",
        description: "Déploiement de câblage informatique RJ45 de catégorie 6A/7 et mise en place de baies de brassage pour une connectivité optimale.",
        icon: "Network"
      },
      {
        title: "Armoires & Tableaux de Puissance",
        description: "Conception, installation et câblage de tableaux divisionnaires de forte intensité, disjoncteurs de puissance et répartiteurs.",
        icon: "Cpu"
      },
      {
        title: "Sécurité & Contrôle d'Accès",
        description: "Installation de systèmes de sécurité incendie, blocs autonomes d'éclairage de sécurité (BAES) et contrôle d'accès biométrique.",
        icon: "ShieldAlert"
      }
    ],
    specifications: [
      { label: "Norme de Référence", value: "NF C 15-100 & NF C 14-100 (ERP/ERT)" },
      { label: "Matériel Certifié", value: "Schneider Electric, Legrand, ABB, Eaton" },
      { label: "Tension de Service", value: "Monophasé 230V / Triphasé 400V" },
      { label: "Garantie Décennale", value: "Couverture totale de 10 ans sur les installations" },
      { label: "Sécurité Incendie", value: "Conforme à la réglementation ERP de type L, M, N, W" },
      { label: "Certifications Équipe", value: "Habilitations électriques H0/B2V/BR, Qualifelec" }
    ],
    workflow: [
      {
        step: "01",
        title: "Audit & Analyse",
        description: "Analyse sur site de la puissance nécessaire, des contraintes d'agencement et définition du cahier des charges précis."
      },
      {
        step: "02",
        title: "Conception & Planification",
        description: "Réalisation des schémas unifilaires, plans d'implantation électrique CAO et budgétisation exhaustive."
      },
      {
        step: "03",
        title: "Déploiement & Câblage",
        description: "Exécution des travaux par des techniciens qualifiés avec respect rigoureux des plannings de chantier."
      },
      {
        step: "04",
        title: "Mise en service & Tests",
        description: "Contrôles de continuité, d'isolement, thermographie infrarouge et passage du bureau de contrôle agréé."
      }
    ],
    projects: [
      {
        name: "Tech Hub - Bureaux Paris",
        description: "Rénovation électrique complète d'un espace de coworking de 1500m² comprenant éclairage connecté DALI et câblage RJ45 de 400 postes.",
        image: "/pic5.jpg",
        stat: "1 500 m²"
      },
      {
        name: "Showroom Automobile",
        description: "Mise en valeur lumineuse par projecteurs sur rails suspendus, installation de bornes de recharge rapide de 22kW et armoire générale.",
        image: "/pic3.jpg",
        stat: "3 Bornes 22kW"
      }
    ],
    testimonial: {
      quote: "L'équipe d'Elecpro a su livrer notre chantier tertiaire de 3 étages dans des délais extrêmement serrés. La gestion du réseau informatique et de l'éclairage intelligent est un sans-faute. Un vrai partenaire professionnel.",
      author: "Julien Marceau",
      role: "Directeur de Projet, NexoSpace"
    },
    calculator: {
      basePrice: 150, // Per m2
      unitName: "Superficie (m²)",
      minUnit: 50,
      maxUnit: 5000,
      stepUnit: 50,
      options: [
        { id: "network", label: "Câblage réseau & Baie informatique (+25€/m²)", pricePerUnit: 25 },
        { id: "automation", label: "Gestion intelligente d'éclairage DALI (+15€/m²)", pricePerUnit: 15 },
        { id: "backup", label: "Installation d'onduleur centralisé (+4500€ fixe)", priceFixed: 4500 },
        { id: "chargePoints", label: "Installer 2 bornes de recharge VE (+3200€ fixe)", priceFixed: 3200 }
      ]
    }
  },
  residential: {
    id: "residential",
    title: "Câblage Résidentiel",
    category: "Résidentiel",
    image: "/pic2.jpg",
    tagline: "Sécurité, confort et efficacité énergétique au cœur de votre foyer.",
    description: "De la mise en conformité de tableaux électriques anciens au câblage de maisons neuves connectées, nous offrons un accompagnement de haute qualité. Nos solutions garantissent un système fiable pour votre famille et optimisent l'efficacité de vos équipements quotidiens.",
    benefits: [
      "Mise en sécurité totale selon la norme NF C 15-100",
      "Solutions d'éclairage d'ambiance et fonctionnel LED",
      "Installation certifiée de bornes de recharge pour véhicules électriques",
      "Tableaux électriques modernes équipés de protections différentielles 30mA",
      "Bilan thermique et électrique pour économies d'énergie"
    ],
    features: [
      {
        title: "Installation & Rénovation",
        description: "Mise aux normes complète des installations électriques vétustes, remplacement de fusibles par des disjoncteurs magnétothermiques.",
        icon: "Wrench"
      },
      {
        title: "Tableaux Électriques Premium",
        description: "Montage de tableaux électriques modernes de grandes marques avec interrupteurs différentiels de types A et AC et parafoudre.",
        icon: "Layers"
      },
      {
        title: "Bornes de Recharge (IRVE)",
        description: "Installation à domicile de Wallbox certifiées de 7.4kW à 11kW avec délestage dynamique pour recharger en toute sécurité.",
        icon: "Zap"
      },
      {
        title: "Éclairage LED sur-mesure",
        description: "Création d'ambiances lumineuses avec bandeaux LED intégrés, spots encastrés basse tension et variateurs d'intensité tactiles.",
        icon: "Sparkles"
      }
    ],
    specifications: [
      { label: "Norme de Conformité", value: "NF C 15-100 (Dernier amendement A5)" },
      { label: "Partenaires Matériels", value: "Legrand (Celiane), Schneider (Odace), Hager" },
      { label: "Tension Nominale", value: "Monophasé 230V, Fréquence 50Hz" },
      { label: "Garantie Assurance", value: "Garantie Décennale + Responsabilité Civile Professionnelle" },
      { label: "Certification IRVE", value: "Électricien habilité niveau 1 et 2 pour bornes de recharge" },
      { label: "Consuel", value: "Attestation de conformité visée par l'organisme officiel Consuel" }
    ],
    workflow: [
      {
        step: "01",
        title: "Diagnostic Électrique",
        description: "Examen approfondi des prises de terre, de la présence de conducteurs dénudés et du niveau de sécurité général."
      },
      {
        step: "02",
        title: "Plan d'implantation",
        description: "Détermination en concertation de l'emplacement optimal des interrupteurs, prises de courant et points lumineux."
      },
      {
        step: "03",
        title: "Chantier & Rénovation",
        description: "Passage des gaines, tirage des câbles et encastrement propre (sans saignées visibles grâce à nos techniques)."
      },
      {
        step: "04",
        title: "Validation & Réception",
        description: "Tests d'impédance de terre, équilibrage des phases et remise du rapport de conformité Consuel."
      }
    ],
    projects: [
      {
        name: "Villa Contemporaine - Biarritz",
        description: "Intégration électrique globale d'une villa neuve de 220m² comprenant éclairage d'ambiance et sonorisation multiroom intégrée.",
        image: "/pic5.jpg",
        stat: "220 m²"
      },
      {
        name: "Rénovation Appartement Haussmannien",
        description: "Remise aux normes complète sans dégrader les moulures d'époque, intégration de prises encastrées en laiton et mise en sécurité du tableau.",
        image: "/pic1.jpg",
        stat: "Normes Conformes"
      }
    ],
    testimonial: {
      quote: "Nous avons fait confiance à Elecpro pour la rénovation complète de notre appartement. Les ouvriers ont été extrêmement propres, minutieux et de bon conseil sur le choix de l'appareillage haut de gamme.",
      author: "Hélène & Thomas Laurent",
      role: "Propriétaires, Paris 16e"
    },
    calculator: {
      basePrice: 90, // Per m2
      unitName: "Surface habitable (m²)",
      minUnit: 30,
      maxUnit: 400,
      stepUnit: 10,
      options: [
        { id: "fullRenovation", label: "Rénovation totale (remplacement ancien câblage) (+50€/m²)", pricePerUnit: 50 },
        { id: "wallbox", label: "Installation d'une borne de recharge VE 7.4kW (+1450€ fixe)", priceFixed: 1450 },
        { id: "consuel", label: "Frais de dossier Consuel & Certificat (+250€ fixe)", priceFixed: 250 },
        { id: "legrandCeliane", label: "Appareillage haut de gamme Legrand Céliane (+12€/m²)", pricePerUnit: 12 }
      ]
    }
  },
  industrial: {
    id: "industrial",
    title: "Solutions Industrielles",
    category: "Industriel",
    image: "/pic3.jpg",
    tagline: "Puissance, continuité de service et conformité machine pour l'industrie d'avenir.",
    description: "Les installations industrielles exigent une expertise technique sans faille. Nous intervenons sur la conception de réseaux haute tension (HTA), le câblage de machines complexes, l'automatisation industrielle, et le diagnostic de réseaux électriques perturbés.",
    benefits: [
      "Continuité de service maximale (redondance d'alimentation)",
      "Compensation de l'énergie réactive (réduction des pénalités EDF)",
      "Filtrage des harmoniques et qualité de l'onde électrique",
      "Maintenance par thermographie infrarouge certifiée Q19",
      "Câblage d'armoires machines de sécurité (SIL / PL)"
    ],
    features: [
      {
        title: "Postes de Transformation HTA/BT",
        description: "Création, maintenance et mise en conformité de cellules moyenne tension et transformateurs à huile ou secs.",
        icon: "ZapOff"
      },
      {
        title: "Armoires Générales Basse Tension (TGBT)",
        description: "Conception d'armoires électriques jusqu'à 3200A avec jeux de barres en cuivre et automatisation de basculement de source.",
        icon: "Container"
      },
      {
        title: "Câblage de Machines & Process",
        description: "Connexion de moteurs de forte puissance, variateurs de vitesse électroniques, démarreurs progressifs et capteurs industriels.",
        icon: "Settings"
      },
      {
        title: "Analyse thermique Q19",
        description: "Inspections thermographiques préventives pour repérer les surchauffes anormales sur les connexions de puissance sous charge.",
        icon: "Thermometer"
      }
    ],
    specifications: [
      { label: "Norme Applicative", value: "NF C 13-100 & NF C 13-200 (HTA) / NF C 15-100 (BT)" },
      { label: "Types de Matériel", value: "Schneider Masterpact, ABB Emax, Siemens Sentron" },
      { label: "Courant Nominal", value: "Jusqu'à 4000A Triphasé" },
      { label: "Maintenance Q19", value: "Rapport agréé assurances par opérateur certifié CNPP" },
      { label: "Sécurité Process", value: "Systèmes d'arrêt d'urgence de catégorie 4 (ISO 13849)" },
      { label: "Index de Protection", value: "Armoires et coffrets IP55, IP65, antidéflagrants ATEX" }
    ],
    workflow: [
      {
        step: "01",
        title: "Calcul de charge & Simulation",
        description: "Calculs de court-circuit (Icc), de sélectivité des protections avec logiciels métiers type Caneco BT."
      },
      {
        step: "02",
        title: "Fabrication en Atelier",
        description: "Câblage et repérage rigoureux des armoires et pupitres de commande au sein de notre atelier de câblage."
      },
      {
        step: "03",
        title: "Pose & Raccordement",
        description: "Cheminement de câbles par dalles renforcées, câbles armés (U1000 RVFV) et raccordement final sous coupure planifiée."
      },
      {
        step: "04",
        title: "Essais sous charge",
        description: "Tests de déclenchement, contrôle de rotation des phases, analyse d'énergie et thermographie de référence."
      }
    ],
    projects: [
      {
        name: "Usine Agroalimentaire - Nantes",
        description: "Création d'un poste de transformation HTA 1250kVA et déploiement d'un TGBT 2500A alimentant 5 lignes de production automatisées.",
        image: "/pic5.jpg",
        stat: "1250 kVA HTA"
      },
      {
        name: "Plateforme Logistique Robotisée",
        description: "Réseau de distribution par gaines à barres préfabriquées (Canalis), onduleur triphasé 100kVA pour serveurs et éclairage LED haute hauteur.",
        image: "/pic3.jpg",
        stat: "Gaine Canalis 400A"
      }
    ],
    testimonial: {
      quote: "Une réactivité exemplaire. Elecpro a assuré le remplacement en urgence de notre disjoncteur général TGBT de 1600A après un sinistre. Grâce à eux, l'usine n'a perdu que 8 heures de production.",
      author: "Marc Lefèvre",
      role: "Responsable Maintenance, Plasturgie Ouest"
    },
    calculator: {
      basePrice: 280, // Per kW
      unitName: "Puissance requise (kW)",
      minUnit: 50,
      maxUnit: 2000,
      stepUnit: 50,
      options: [
        { id: "capacitorBank", label: "Batterie de condensateurs (compensation énergie réactive) (+4200€)", priceFixed: 4200 },
        { id: "q19Report", label: "Contrôle annuel par thermographie infrarouge Q19 (+850€/an)", priceFixed: 850 },
        { id: "dualSource", label: "Inverseur de source automatique pour groupe secours (+6500€)", priceFixed: 6500 },
        { id: "canecoStudy", label: "Étude de sélectivité & Note de calcul Caneco BT (+1800€)", priceFixed: 1800 }
      ]
    }
  },
  "smart-home": {
    id: "smart-home",
    title: "Domotique Intelligente",
    category: "Systèmes Intelligents",
    image: "/pic4.png",
    tagline: "L'intelligence artificielle et l'automatisation au service de vos bâtiments.",
    description: "Contrôlez votre environnement du bout des doigts ou par la voix. Nous concevons et intégrons des écosystèmes domotiques avancés reposant sur des protocoles ouverts et fiables (KNX, Zigbee, Crestron) pour les villas de standing, hôtels et bureaux haut de gamme.",
    benefits: [
      "Gestion centralisée du chauffage, climatisation, éclairage et stores",
      "Économies d'énergie automatiques (scénarios absence, météo)",
      "Sécurité active par caméras IA, détecteurs d'intrusion et alarmes techniques",
      "Interfaces de contrôle épurées et intuitives (écrans tactiles muraux, mobiles)",
      "Système évolutif et indépendant des fabricants (technologie KNX)"
    ],
    features: [
      {
        title: "Écosystème KNX Filaire",
        description: "Intégration du standard mondial pour le contrôle du bâtiment, garantissant une stabilité absolue sans dépendance au Wi-Fi.",
        icon: "Home"
      },
      {
        title: "Gestion d'Énergie & Climat",
        description: "Régulation thermique multizone connectée, s'adaptant à la présence et aux heures creuses pour minimiser les dépenses.",
        icon: "Sliders"
      },
      {
        title: "Sécurité & Télésurveillance",
        description: "Caméras intelligentes avec détection humaine/véhicule, alarmes anti-intrusion sans fil et capteurs de fuite d'eau/gaz.",
        icon: "Eye"
      },
      {
        title: "Audio/Vidéo Distribué",
        description: "Système de diffusion musicale multiroom (Sonos/Lutron) et salles home-cinéma privées avec automatisation d'éclairage.",
        icon: "Volume2"
      }
    ],
    specifications: [
      { label: "Protocoles Supportés", value: "KNX (Filaire), Zigbee 3.0, Lutron, Dali, Z-Wave" },
      { label: "Compatibilité Assistances", value: "Apple HomeKit, Google Home, Amazon Alexa, Home Assistant" },
      { label: "Matériel Intégration", value: "Schneider SpaceLYnk, Hager Domovea, Crestron, Sonos" },
      { label: "Câblage de Commande", value: "Câble bus KNX blindé vert certifié, topologie libre" },
      { label: "Garantie Système", value: "2 ans de maintenance logicielle incluse, garantie matériel 5 ans" },
      { label: "Sécurité Données", value: "Serveur local chiffré, pas de stockage obligatoire dans le cloud" }
    ],
    workflow: [
      {
        step: "01",
        title: "Étude d'Usage & Scénarios",
        description: "Définition avec le client des automatisations clés : scénario 'Départ', simulation de présence, régulation solaire."
      },
      {
        step: "02",
        title: "Schéma de Câblage Bus",
        description: "Conception du réseau bus basse tension qui relie l'ensemble des boutons-poussoirs, sondes et actionneurs de puissance."
      },
      {
        step: "03",
        title: "Programmation ETS",
        description: "Configuration logicielle via le logiciel ETS des adresses de groupe et paramétrage fin des modules en tableau."
      },
      {
        step: "04",
        title: "Supervision & Formation",
        description: "Création d'une interface graphique 3D sur-mesure sur tablettes murales et formation personnalisée des utilisateurs."
      }
    ],
    projects: [
      {
        name: "Villa Connectée - Saint-Jean-de-Luz",
        description: "Automatisation intégrale KNX d'une propriété de 450m² : contrôle de 82 circuits d'éclairage, piscine, climatisation gainable et sécurité.",
        image: "/pic5.jpg",
        stat: "450 m² KNX"
      },
      {
        name: "Bureaux 'Smart' - Bordeaux",
        description: "Gestion automatisée de la luminosité et du chauffage selon la présence pour 60 salles de réunion. Réduction de 34% des coûts énergétiques.",
        image: "/pic4.png",
        stat: "-34% d'Énergie"
      }
    ],
    testimonial: {
      quote: "Une expérience incroyable. Notre maison anticipe désormais nos besoins. L'éclairage s'adapte à l'heure de la journée, et nous pouvons tout éteindre d'un seul geste en partant. La réalisation d'Elecpro est exceptionnelle.",
      author: "Sébastien & Marie Roche",
      role: "Propriétaires de Villa"
    },
    calculator: {
      basePrice: 120, // Per m2
      unitName: "Surface habitable (m²)",
      minUnit: 50,
      maxUnit: 800,
      stepUnit: 10,
      options: [
        { id: "knxProtocol", label: "Standard KNX filaire haut de gamme (+65€/m²)", pricePerUnit: 65 },
        { id: "securityPack", label: "Pack alarme, 4 caméras IP extérieurs & Enregistreur (+2850€)", priceFixed: 2850 },
        { id: "multiroomAudio", label: "Système audio multiroom 4 zones Sonos (+3400€)", priceFixed: 3400 },
        { id: "wallTablet", label: "Écran de supervision tactile mural 10 pouces (+1200€)", priceFixed: 1200 }
      ]
    }
  }
};
