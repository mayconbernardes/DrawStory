export const en = {
  // Header
  title: 'DrawStory - Bring Your Drawings to Life',
  tagline: 'Your Imagination, Our Narrative.',

  // Toolbar
  pencil: 'Pencil',
  eraser: 'Eraser',
  undo: 'Undo',
  redo: 'Redo',
  clear: 'Clear Canvas',
  generating: 'Creating...',
  generateStory: 'Generate Story',

  // Story Display
  storyTitle: 'The Story of Your Drawing',
  storyDescriptionTitle: 'Description of Your Drawing',
  showStoryButton: 'Read the Full Story',
  errorTitle: 'An Error Occurred',
  initialStateTitle: 'Your Story Awaits',
  initialStatePrompt: 'Draw something on the canvas, then click "Generate Story" to watch your creation come to life through the magic of AI!',

  // App/Errors
  canvasEmptyError: 'The canvas is empty. Please draw something first!',
  
  // Gemini Service
  geminiPrompt: 'Based on the attached drawing, provide a JSON object with a "description" and a "story".',
  geminiError: 'Failed to generate a story. The AI might be busy, or there was a network issue. Please try again.',
  geminiSystemInstruction: `You are a master storyteller for all ages. Your task is to analyze a child's drawing and generate a JSON object with two fields: "description" and "story". 
1.  **description**: A short, objective summary of what you see in the drawing (e.g., "A drawing of a smiling sun, a blue house with a red door, and a green tree.").
2.  **story**: A short, imaginative story inspired by the drawing. The story should be magical, whimsical, and bring the elements from the drawing to life.`,
};