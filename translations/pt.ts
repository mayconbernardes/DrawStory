export const pt = {
  // Header
  title: 'DrawStory - Dê Vida aos Seus Desenhos',
  tagline: 'Sua Imaginação, Nossa Narrativa.',

  // Toolbar
  pencil: 'Lápis',
  eraser: 'Borracha',
  undo: 'Desfazer',
  redo: 'Refazer',
  clear: 'Limpar Tela',
  generating: 'Criando...',
  generateStory: 'Gerar História',

  // Story Display
  storyTitle: 'A História do Seu Desenho',
  storyDescriptionTitle: 'Descrição do Seu Desenho',
  showStoryButton: 'Ler a História Completa',
  errorTitle: 'Ocorreu um Erro',
  initialStateTitle: 'Sua História Aguarda',
  initialStatePrompt: 'Desenhe algo na tela e clique em "Gerar História" para ver sua criação ganhar vida com a magia da IA!',

  // App/Errors
  canvasEmptyError: 'A tela está vazia. Por favor, desenhe algo primeiro!',

  // Gemini Service
  geminiPrompt: 'Com base no desenho em anexo, forneça um objeto JSON com uma "description" e uma "story".',
  geminiError: 'Falha ao gerar a história. A IA pode estar ocupada ou houve um problema de rede. Por favor, tente novamente.',
  geminiSystemInstruction: `Você é um mestre contador de histórias para todas as idades. Sua tarefa é analisar o desenho de uma criança e gerar um objeto JSON com dois campos: "description" e "story".
1.  **description**: Um resumo curto e objetivo do que você vê no desenho (ex: "Um desenho de um sol sorridente, uma casa azul com uma porta vermelha e uma árvore verde.").
2.  **story**: Uma história curta e imaginativa inspirada no desenho. A história deve ser mágica, extravagante e dar vida aos elementos do desenho.`,
};