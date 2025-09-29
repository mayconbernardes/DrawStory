export const fr = {
  // Header
  title: 'DrawStory - Donnez Vie à Vos Dessins',
  tagline: 'Votre Imagination, Notre Récit.',
  
  // Toolbar
  pencil: 'Crayon',
  eraser: 'Gomme',
  undo: 'Annuler',
  redo: 'Rétablir',
  clear: 'Effacer le Canevas',
  generating: 'Création...',
  generateStory: "Générer l'Histoire",

  // Story Display
  storyTitle: 'L\'Histoire de Votre Dessin',
  storyDescriptionTitle: 'Description de Votre Dessin',
  showStoryButton: 'Lire l\'Histoire Complète',
  errorTitle: "Une Erreur s'est Produite",
  initialStateTitle: 'Votre Histoire Vous Attend',
  initialStatePrompt: "Dessinez quelque chose sur le canevas, puis cliquez sur \"Générer l'Histoire\" pour voir votre création prendre vie grâce à la magie de l'IA !",

  // App/Errors
  canvasEmptyError: "Le canevas est vide. Veuillez dessiner quelque chose d'abord !",

  // Gemini Service
  geminiPrompt: 'Sur la base du dessin ci-joint, fournissez un objet JSON avec une "description" et une "story".',
  geminiError: "Échec de la génération de l'histoire. L'IA est peut-être occupée ou il y a eu un problème de réseau. Veuillez réessayer.",
  geminiSystemInstruction: `Vous êtes un maître conteur pour tous les âges. Votre tâche est d'analyser le dessin d'un enfant et de générer un objet JSON avec deux champs : "description" et "story".
1.  **description**: Un résumé court et objectif de ce que vous voyez dans le dessin (par exemple, "Un dessin d'un soleil souriant, une maison bleue avec une porte rouge et un arbre vert.").
2.  **story**: Une histoire courte et imaginative inspirée du dessin. L'histoire doit être magique, fantaisiste et donner vie aux éléments du dessin.`,
};