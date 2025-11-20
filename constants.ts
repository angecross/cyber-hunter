
import { KaliCategory, Tool, CourseModule } from './types';

export const KALI_CATEGORIES = Object.values(KaliCategory);

// Programme de formation COMPLET (Hardware -> Réseau -> Linux -> Python -> Hacking -> Crypto -> Kernel)
export const COURSES: CourseModule[] = [
  // --- BLOC 1 : HARDWARE & ARCHITECTURE ---
  {
    id: "mod-hardware",
    title: "Module 1 : Hardware & Architecture",
    difficulty: "Débutant",
    description: "Comprendre le fonctionnement physique d'un ordinateur pour mieux le sécuriser.",
    topics: [
      "CPU & GPU : Architecture, Caches, Pipeline et Threads",
      "Mémoire & Stockage : RAM (DDR4/5), SSD NVMe vs SATA",
      "La Carte Mère : BIOS/UEFI, Bus PCIe et Chipset",
      "Processus de Démarrage (Boot Process)",
      "Alimentation et Refroidissement (Gestion thermique)"
    ]
  },

  // --- BLOC 2 : RÉSEAUX INFORMATIQUES ---
  {
    id: "mod-net-fondamentaux",
    title: "Module 2 : Architecture Réseaux",
    difficulty: "Débutant",
    description: "Les fondations théoriques et protocoles essentiels de la communication.",
    topics: [
      "Modèles OSI (7 couches) vs TCP/IP (4 couches)",
      "Adressage IPv4, IPv6 et MAC",
      "Protocoles de Transport : TCP vs UDP",
      "Services Applicatifs : DNS, DHCP, HTTP/S, FTP, SSH",
      "Infrastructures : Switchs, Routeurs et Pare-feu"
    ]
  },
  {
    id: "mod-net-avance",
    title: "Module 3 : Réseaux Avancés",
    difficulty: "Intermédiaire",
    description: "Routage, segmentation et analyse de trafic approfondie.",
    topics: [
      "Routage Dynamique (OSPF, BGP) & Statique",
      "Segmentation : VLANs et Sous-réseaux (Subnetting)",
      "NAT/PAT, QoS et Multicast",
      "Analyse de paquets avec Wireshark (Inspection OSI)",
      "Outils CLI Réseau (ping, traceroute, netstat, tcpdump)"
    ]
  },

  // --- BLOC 3 : ADMINISTRATION LINUX ---
  {
    id: "mod-linux-base",
    title: "Module 4 : Linux - Les Bases",
    difficulty: "Débutant",
    description: "Installation, philosophie et maîtrise de la ligne de commande.",
    topics: [
      "Noyau, Distributions (Debian/RedHat) et FHS",
      "Navigation CLI (ls, cd, pwd, mkdir, cp, mv, rm)",
      "Visualisation de fichiers (cat, less, head, tail, grep)",
      "Gestion des Permissions (chmod, chown, UGO)",
      "Flux et Redirections (>, >>, |, 2>)"
    ]
  },
  {
    id: "mod-linux-admin",
    title: "Module 5 : Linux - Administration",
    difficulty: "Intermédiaire",
    description: "Gestion des utilisateurs, processus, stockage et services.",
    topics: [
      "Utilisateurs et Groupes (useradd, passwd, /etc/shadow)",
      "Gestion des Processus (ps, top, kill, jobs)",
      "Gestion des Paquets (APT, DNF, Pacman)",
      "Stockage : Partitionnement (fdisk), Montage et LVM",
      "Services et Init : Systemd (systemctl, journalctl)"
    ]
  },
  {
    id: "mod-linux-secu",
    title: "Module 6 : Linux - Sécurité & Réseau",
    difficulty: "Avancé",
    description: "Durcissement système et configuration réseau sécurisée.",
    topics: [
      "Configuration Réseau (ip, nmcli) et SSH (Clés, Config)",
      "Pare-feu : Iptables, NFTables et UFW",
      "Sécurité MAC : SELinux vs AppArmor",
      "Gestion des Logs (/var/log) et Audit",
      "Automatisation avec Cron et Backups (rsync, tar)"
    ]
  },

  // --- BLOC 4 : PROGRAMMATION PYTHON ---
  {
    id: "mod-python-base",
    title: "Module 7 : Python pour la Cyber",
    difficulty: "Débutant",
    description: "Bases du langage Python appliquées à la sécurité.",
    topics: [
      "Syntaxe, Variables et Types de données",
      "Structures de contrôle (if, loops) et Fonctions",
      "Manipulation de Fichiers et Context Managers",
      "Programmation Orientée Objet (Classes, Héritage)",
      "Modules et Environnements Virtuels (venv, pip)"
    ]
  },
  {
    id: "mod-python-ops",
    title: "Module 8 : Scripting Offensif Python",
    difficulty: "Avancé",
    description: "Création d'outils de sécurité et bibliothèques spécialisées.",
    topics: [
      "Programmation Réseau bas niveau (Socket)",
      "Manipulation de paquets avec Scapy",
      "Requêtes Web et Brute-force avec Requests",
      "SSH Automatisé avec Paramiko",
      "Analyse de données (Logs) avec Pandas et Regex"
    ]
  },

  // --- BLOC 5 : HACKING & KALI TOOLS ---
  {
    id: "mod-recon",
    title: "Module 9 : Reconnaissance & OSINT",
    difficulty: "Intermédiaire",
    description: "Collecte d'informations passives et actives.",
    topics: ["Google Dorking", "Recherche DNS (TheHarvester)", "Shodan & Maltego"]
  },
  {
    id: "mod-scan",
    title: "Module 10 : Scanning & Enumération",
    difficulty: "Intermédiaire",
    description: "Cartographie réseau et détection de failles.",
    topics: ["Nmap Expert", "Nessus/OpenVAS", "Énumération SMB/SNMP"]
  },
  {
    id: "mod-exploit",
    title: "Module 11 : Exploitation & Post-Exploit",
    difficulty: "Expert",
    description: "Metasploit, Reverse Shells et PrivEsc.",
    topics: ["Metasploit Framework", "Escalade de privilèges", "Pivoting & Tunneling"]
  },

  // --- BLOC 6 : CRYPTOGRAPHIE & SÉCURITÉ ---
  {
    id: "mod-crypto-fondamentaux",
    title: "Module 12 : Cryptographie Appliquée",
    difficulty: "Intermédiaire",
    description: "Maîtrise des algorithmes de chiffrement modernes et de la PKI.",
    topics: [
      "Concepts : Symétrique vs Asymétrique, Hachage et Salt",
      "Algorithmes Standards : AES, RSA, ECC et ChaCha20",
      "Fonctions de Hachage : SHA-256, SHA-3, Bcrypt et Collisions",
      "Infrastructure à Clés Publiques (PKI) : Certificats X.509, CA et Trust Chain",
      "Protocoles Sécurisés : TLS 1.3 Handshake et SSH"
    ]
  },
  {
    id: "mod-crypto-attaque",
    title: "Module 13 : Cryptanalyse & Attaques",
    difficulty: "Expert",
    description: "Analyse des faiblesses et attaques sur les implémentations cryptographiques.",
    topics: [
      "Attaques sur le chiffrement : Padding Oracle, Known-Plaintext",
      "Cassage de Hash : Rainbow Tables, John the Ripper & Hashcat",
      "Faiblesses d'implémentation : Générateurs aléatoires (RNG) faibles",
      "Attaques Man-in-the-Middle (MitM) et SSL Stripping",
      "Cryptographie Post-Quantique : Introduction et enjeux"
    ]
  },

  // --- BLOC 7 : LINUX KERNEL INTERNALS ---
  {
    id: "mod-kernel-arch",
    title: "Module 14 : Architecture Noyau Linux",
    difficulty: "Avancé",
    description: "Exploration des entrailles du système : User Space vs Kernel Space.",
    topics: [
      "Architecture Monolithique vs Micro-noyau",
      "Rings de protection (Ring 0 vs Ring 3) et Context Switches",
      "Gestion de la Mémoire : Paging, Virtual Memory et VFS",
      "Appels Système (Syscalls) : Fonctionnement et Tracing (strace)",
      "Ordonnancement (Scheduling) et Gestion des interruptions"
    ]
  },
  {
    id: "mod-kernel-hacking",
    title: "Module 15 : Kernel Hacking & Modules",
    difficulty: "Expert",
    description: "Formation expert sur le développement noyau : création de modules (LKM), manipulation de structures internes, hooks réseaux et système, techniques de rootkits et théorie de l'exploitation.",
    topics: [
      "Loadable Kernel Modules (LKM) : Développement et cycle de vie",
      "Manipulation des structures internes (task_struct, creds)",
      "Netfilter Hooks : Interception de paquets dans le noyau",
      "Rootkits : Techniques de dissimulation (Syscall Hooking)",
      "Kernel Exploitation Theory : Vulnérabilités et vecteurs d'attaque"
    ]
  }
];

// Ajout des outils systèmes et langages à la base de données d'outils
export const POPULAR_TOOLS: Tool[] = [
  // Outils Système Linux (Essentiels pour l'admin)
  { name: "ls", category: KaliCategory.SYSTEM, description: "Liste le contenu des répertoires.", popular: true },
  { name: "cd", category: KaliCategory.SYSTEM, description: "Change le répertoire courant.", popular: true },
  { name: "grep", category: KaliCategory.SYSTEM, description: "Recherche de motifs dans le texte.", popular: true },
  { name: "cat", category: KaliCategory.SYSTEM, description: "Affiche le contenu de fichiers.", popular: true },
  { name: "chmod", category: KaliCategory.SYSTEM, description: "Modifie les permissions de fichiers.", popular: true },
  { name: "chown", category: KaliCategory.SYSTEM, description: "Modifie le propriétaire de fichiers.", popular: true },
  { name: "ps", category: KaliCategory.SYSTEM, description: "Affiche les processus en cours.", popular: true },
  { name: "kill", category: KaliCategory.SYSTEM, description: "Envoie un signal à un processus.", popular: true },
  { name: "systemctl", category: KaliCategory.SYSTEM, description: "Contrôle le système systemd et les services.", popular: true },
  { name: "ip", category: KaliCategory.SYSTEM, description: "Affiche/Manipule le routage, les périphériques, les tunnels.", popular: true },
  { name: "iptables", category: KaliCategory.SYSTEM, description: "Outil d'administration pour le filtrage de paquets IPv4.", popular: true },
  { name: "ufw", category: KaliCategory.SYSTEM, description: "Uncomplicated Firewall - Pare-feu simplifié.", popular: true },
  { name: "fdisk", category: KaliCategory.SYSTEM, description: "Manipulateur de table de partitions.", popular: true },
  
  // Langages & Bibliothèques
  { name: "python3", category: KaliCategory.PROGRAMMING, description: "Interpréteur Python 3.", popular: true },
  { name: "pip", category: KaliCategory.PROGRAMMING, description: "Gestionnaire de paquets Python.", popular: true },
  { name: "scapy", category: KaliCategory.PROGRAMMING, description: "Bibliothèque Python pour la manipulation de paquets.", popular: true },
  { name: "requests", category: KaliCategory.PROGRAMMING, description: "Bibliothèque HTTP pour Python.", popular: true },
  { name: "paramiko", category: KaliCategory.PROGRAMMING, description: "Implémentation SSHv2 pour Python.", popular: false },

  // Outils Hardware (Diagnostic)
  { name: "lshw", category: KaliCategory.HARDWARE, description: "Liste le matériel.", popular: false },
  { name: "lspci", category: KaliCategory.HARDWARE, description: "Affiche les périphériques PCI.", popular: false },
  { name: "lsusb", category: KaliCategory.HARDWARE, description: "Affiche les périphériques USB.", popular: false },
  { name: "dmidecode", category: KaliCategory.HARDWARE, description: "Table de décodage DMI (infos BIOS/Matériel).", popular: false },

  // Outils Cryptographie
  { name: "openssl", category: KaliCategory.PASSWORD, description: "Boîte à outils robuste pour SSL/TLS et crypto.", popular: true },
  { name: "gpg", category: KaliCategory.PASSWORD, description: "Outil de chiffrement et de signature (OpenPGP).", popular: true },
  { name: "hashcat", category: KaliCategory.PASSWORD, description: "Outil de récupération de mot de passe (Hash cracker).", popular: true },
  { name: "john", category: KaliCategory.PASSWORD, description: "Crackeur de mots de passe (John the Ripper).", popular: true },
  
  // Outils Kernel & Debugging
  { name: "strace", category: KaliCategory.REVERSE_ENG, description: "Traceur d'appels système et de signaux.", popular: true },
  { name: "gdb", category: KaliCategory.REVERSE_ENG, description: "Le débogueur GNU.", popular: true },
  { name: "dmesg", category: KaliCategory.SYSTEM, description: "Affiche les messages du tampon circulaire du noyau.", popular: true },
  { name: "lsmod", category: KaliCategory.SYSTEM, description: "Affiche l'état des modules du noyau Linux.", popular: false },
  { name: "insmod", category: KaliCategory.SYSTEM, description: "Insère un module dans le noyau Linux.", popular: false },

  // ... (Le reste des 600 outils existants précédents reste ici) ...
  { name: "nmap", category: KaliCategory.INFO_GATHERING, description: "Le standard du scan réseau.", popular: true },
  { name: "metasploit-framework", category: KaliCategory.EXPLOITATION, description: "Framework de développement d'exploits.", popular: true },
  { name: "wireshark", category: KaliCategory.SNIFFING, description: "Analyseur de protocole réseau.", popular: true },
  { name: "burpsuite", category: KaliCategory.WEB_APP, description: "Plateforme de test de sécurité web.", popular: true },
  { name: "aircrack-ng", category: KaliCategory.WIRELESS, description: "Suite complète audit Wi-Fi.", popular: true },
  { name: "hydra", category: KaliCategory.PASSWORD, description: "Crackeur de login réseau.", popular: true },
  { name: "sqlmap", category: KaliCategory.DATABASE, description: "Injection SQL automatique.", popular: true },
  { name: "nikto", category: KaliCategory.VULN_ANALYSIS, description: "Scanner de serveur web.", popular: true },
  { name: "netcat", category: KaliCategory.SNIFFING, description: "Le couteau suisse TCP/IP.", popular: true }
];
