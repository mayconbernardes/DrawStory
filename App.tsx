import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DrawingCanvas, type DrawingCanvasRef } from './components/DrawingCanvas';
import { Toolbar } from './components/Toolbar';
import { StoryDisplay } from './components/StoryDisplay';
import { Header } from './components/Header';
import { generateStoryFromImage } from './services/geminiService';
import { Tool } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import { useTranslations } from './hooks/useTranslations';

const AppContent: React.FC = () => {
  const [tool, setTool] = useState<Tool>(Tool.PENCIL);
  const [color, setColor] = useState<string>('#FFFFFF');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [description, setDescription] = useState<string>('');
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<DrawingCanvasRef>(null);
  const { language, t } = useTranslations();

  useEffect(() => {
    document.title = t('title');
  }, [t]);

  const handleGenerateStory = useCallback(async () => {
    if (!canvasRef.current) return;

    const base64Image = canvasRef.current.getImageAsBase64();
    if (!base64Image) {
      setError(t('canvasEmptyError'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setDescription('');
    setStory('');

    try {
      const { description, story } = await generateStoryFromImage(base64Image, language, t);
      setDescription(description);
      setStory(story);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [language, t]);
  
  const handleUndo = () => canvasRef.current?.undo();
  const handleRedo = () => canvasRef.current?.redo();
  const handleClear = () => canvasRef.current?.clearCanvas();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row gap-4 p-4">
        <div className="flex flex-col gap-4 lg:w-3/5">
          <Toolbar
            tool={tool}
            setTool={setTool}
            color={color}
            setColor={setColor}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onClear={handleClear}
            onGenerate={handleGenerateStory}
            isGenerating={isLoading}
          />
          <div className="flex-grow bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-700">
            <DrawingCanvas
              ref={canvasRef}
              tool={tool}
              color={color}
              brushSize={brushSize}
            />
          </div>
        </div>
        <div className="flex flex-col lg:w-2/5">
           <StoryDisplay description={description} story={story} isLoading={isLoading} error={error} />
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);


export default App;