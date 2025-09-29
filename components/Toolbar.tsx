import React from 'react';
import { Tool } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface ToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const ToolButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    aria-label={label}
    title={label}
    onClick={onClick}
    className={`p-2 rounded-lg transition-all duration-200 ${
      isActive ? 'bg-indigo-500 text-white shadow-lg' : 'bg-slate-700 hover:bg-slate-600'
    }`}
  >
    {icon}
  </button>
);

export const Toolbar: React.FC<ToolbarProps> = ({
  tool, setTool, color, setColor, brushSize, setBrushSize,
  onUndo, onRedo, onClear, onGenerate, isGenerating,
}) => {
  const { t } = useTranslations();

  return (
    <div className="bg-slate-800 p-3 rounded-lg shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-slate-700">
      <div className="flex items-center gap-2">
        <ToolButton
          label={t('pencil')}
          isActive={tool === Tool.PENCIL}
          onClick={() => setTool(Tool.PENCIL)}
          icon={<PencilIcon />}
        />
        <ToolButton
          label={t('eraser')}
          isActive={tool === Tool.ERASER}
          onClick={() => setTool(Tool.ERASER)}
          icon={<EraserIcon />}
        />
        <div className="h-8 w-px bg-slate-600 mx-2"></div>
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 p-0 border-none bg-transparent appearance-none cursor-pointer"
            style={{'--color-value': color} as React.CSSProperties}
          />
        </div>
        <div className="flex items-center gap-2 ml-4">
            <BrushIcon />
            <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
                className="w-32 accent-indigo-500"
            />
            <span className="w-8 text-center text-sm">{brushSize}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ToolButton label={t('undo')} isActive={false} onClick={onUndo} icon={<UndoIcon />} />
        <ToolButton label={t('redo')} isActive={false} onClick={onRedo} icon={<RedoIcon />} />
        <ToolButton label={t('clear')} isActive={false} onClick={onClear} icon={<TrashIcon />} />
        <div className="h-8 w-px bg-slate-600 mx-2"></div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
        >
          {isGenerating ? <Spinner /> : <SparklesIcon />}
          {isGenerating ? t('generating') : t('generateStory')}
        </button>
      </div>
    </div>
  );
};

// SVG Icons
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

const EraserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const BrushIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.62-3.385m-5.043-.025a15.998 15.998 0 01-3.388-1.621m7.543 8.342a15.998 15.998 0 00-3.388-1.621m-4.5 15.042a15.998 15.998 0 01-3.388-1.621m16.5 0a15.998 15.998 0 00-3.388-1.621m-1.62 3.385a15.998 15.998 0 01-1.622-3.385" />
    </svg>
);

const UndoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" transform="rotate(180 12 12)" />
  </svg>
);

const RedoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.343 17.657l-2.828-2.828m11.314 0l-2.828 2.828m-2.828-11.314l2.828-2.828m0 11.314l2.828 2.828M12 21v-4M21 12h-4M12 3v4M3 12h4m5.657-6.343l-2.828 2.828m0 11.314l-2.828-2.828" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);