
import { GoogleGenAI } from "@google/genai";
import { ExerciseScenario, ExerciseFeedback, VideoResource } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Tu es l'Instructeur Chef de la plateforme Cyber-Hunter.
Tu es un expert absolu en :
1. Administration Système Linux (Kernel, CLI, Permissions, Storage)
2. Architecture Matérielle (CPU, RAM, Boot process)
3. Réseaux TCP/IP (OSI, Protocoles, Routing)
4. Programmation Python pour la Cybersécurité (Socket, Scapy)

TA MISSION : Fournir un contenu éducatif d'une précision chirurgicale.
TON STYLE : Autoritaire mais encourageant, ultra-technique mais clair.
LANGUE : Français.
`;

export const generateToolGuide = async (toolName: string): Promise<string> => {
  try {
    const prompt = `
      Rédige un manuel technique complet pour l'outil/commande : "${toolName}".
      
      Structure requise :
      1. **Résumé Technique**: À quoi ça sert ? (Kernel space vs User space si pertinent).
      2. **Catégorie**: (ex: SysAdmin, Network, Scripting...)
      3. **Syntaxe Complète**: Analyse de la syntaxe de base.
      4. **Flags & Options Critiques**: Tableau détaillé des arguments les plus importants.
      5. **Laboratoire Pratique (Step-by-Step)**: 
         - Cas 1 : Usage standard.
         - Cas 2 : Usage avancé / Expert.
         - Pour chaque cas : Commande exacte, Explication de CHAQUE paramètre, Exemple de sortie (Output) simulée.
      6. **Mise en garde**: Risques potentiels (perte de données, détection...).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    return response.text || "Erreur lors de la génération du guide.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, service temporairement indisponible.";
  }
};

export const generateExercise = async (toolName: string): Promise<ExerciseScenario | null> => {
  try {
    const prompt = `
      Génère un défi technique (mini-CTF ou Tâche Admin) pour l'outil "${toolName}".
      
      Réponds UNIQUEMENT avec un objet JSON :
      {
        "context": "Mise en situation (ex: Serveur Linux compromis ou Analyse réseau)",
        "task": "Objectif technique précis (ex: Trouver le PID du processus apache2)",
        "target": "Cible fictive (Fichier, IP, Processus)",
        "difficulty": "Easy" | "Medium" | "Hard"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });
    
    return JSON.parse(response.text) as ExerciseScenario;
  } catch (error) {
    console.error("Exercise Gen Error:", error);
    return null;
  }
};

export const generateVideoResources = async (topic: string): Promise<VideoResource[]> => {
  try {
    const prompt = `
      Pour le sujet technique "${topic}" en Cybersécurité/Informatique, suggère 3 à 4 excellentes ressources vidéo (YouTube) ou sujets de recherche vidéo.
      
      Réponds UNIQUEMENT avec un tableau JSON :
      [
        {
          "title": "Titre de la vidéo idéale ou du concept",
          "description": "Pourquoi cette vidéo est importante (1 phrase)",
          "searchQuery": "Recherche YouTube optimisée (ex: 'TCP Handshake explained animation')",
          "duration": "Court (~5min) ou Long (~30min)"
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    return JSON.parse(response.text) as VideoResource[];
  } catch (error) {
    console.error("Video Gen Error", error);
    return [];
  }
};

export const verifyExerciseAnswer = async (
  toolName: string, 
  scenario: ExerciseScenario, 
  userCommand: string
): Promise<ExerciseFeedback> => {
  try {
    const prompt = `
      CONTEXTE: Exercice sur ${toolName}.
      SCÉNARIO: ${scenario.context}
      TÂCHE: ${scenario.task}
      
      COMMANDE UTILISATEUR: "${userCommand}"

      Analyse la commande. Est-elle syntaxiquement correcte pour ${toolName} ? Résout-elle le problème ?
      Sois strict sur les options/flags.

      Réponds UNIQUEMENT avec un JSON :
      {
        "correct": boolean,
        "message": "Feedback court (ex: Accès Refusé ou Succès)",
        "tips": "Explication technique détaillée."
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    return JSON.parse(response.text) as ExerciseFeedback;
  } catch (error) {
    return { correct: false, message: "Erreur d'analyse", tips: "Réessayez." };
  }
};

export const generateLesson = async (topic: string, context: string): Promise<string> => {
  try {
    const prompt = `
      Génère un cours magistral complet et ultra-détaillé sur : "${topic}".
      Contexte du module : "${context}".

      RÈGLE D'OR : Si le sujet mentionne des commandes (Linux, Réseau, Python...), tu DOIS expliquer CHAQUE commande, CHAQUE flag et donner des exemples concrets. NE RIEN OUBLIER.

      Structure du cours :
      1. **Théorie Approfondie**: Fonctionnement interne, protocoles, architecture.
      2. **Dictionnaire de Commandes** (Si applicable):
         - Pour CHAQUE commande liée au sujet (ex: ls, cd, grep, ip, socket...):
           - Syntaxe.
           - Arguments clés.
           - Exemple concret.
      3. **Démonstration Pratique**: Scénario complet étape par étape.
      4. **Sécurité & Bonnes Pratiques**: Comment sécuriser ou optimiser.
      5. **Quiz de validation**: 3 questions pour tester la compréhension.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    return response.text || "Erreur génération cours.";
  } catch (error) {
    return "Service indisponible.";
  }
};

export const askTutor = async (question: string): Promise<string> => {
  try {
    const prompt = `L'utilisateur demande : "${question}". Réponds comme un expert senior. Donne des détails techniques, des commandes et des exemples.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    return response.text || "Pas de réponse.";
  } catch (error) {
    return "Erreur connexion tuteur.";
  }
};