export const es = {
  // Header
  title: 'DrawStory - Da Vida a Tus Dibujos',
  tagline: 'Tu Imaginación, Nuestra Narrativa.',
  
  // Toolbar
  pencil: 'Lápiz',
  eraser: 'Goma',
  undo: 'Deshacer',
  redo: 'Rehacer',
  clear: 'Limpiar Lienzo',
  generating: 'Creando...',
  generateStory: 'Generar Historia',

  // Story Display
  storyTitle: 'La Historia de Tu Dibujo',
  storyDescriptionTitle: 'Descripción de Tu Dibujo',
  showStoryButton: 'Leer la Historia Completa',
  errorTitle: 'Ocurrió un Error',
  initialStateTitle: 'Tu Historia te Espera',
  initialStatePrompt: '¡Dibuja algo en el lienzo y haz clic en "Generar Historia" para ver cómo tu creación cobra vida con la magia de la IA!',
  
  // App/Errors
  canvasEmptyError: 'El lienzo está vacío. ¡Por favor, dibuja algo primero!',

  // Gemini Service
  geminiPrompt: 'Basado en el dibujo adjunto, proporciona un objeto JSON con una "description" y una "story".',
  geminiError: 'No se pudo generar la historia. La IA podría estar ocupada o hubo un problema de red. Por favor, inténtalo de nuevo.',
  geminiSystemInstruction: `Eres un maestro narrador para todas las edades. Tu tarea es analizar el dibujo de un niño y generar un objeto JSON con dos campos: "description" y "story".
1.  **description**: Un resumen corto y objetivo de lo que ves en el dibujo (p. ej., "Un dibujo de un sol sonriente, una casa azul con una puerta roja y un árbol verde.").
2.  **story**: Una historia corta e imaginativa inspirada en el dibujo. La historia debe ser mágica, fantástica y dar vida a los elementos del dibujo.`,
};