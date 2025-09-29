import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface StoryDisplayProps {
  description: string;
  story: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    <div className="h-4 bg-slate-700 rounded w-1/2 mt-4"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-4/5"></div>
  </div>
);

const InitialState: React.FC = () => {
    const { t } = useTranslations();
    return (
        <div className="text-center text-slate-400 flex flex-col items-center justify-center h-full gap-4 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.747-6.918l11.494 0M4.187 19.013a9 9 0 10-2.28-14.025 9 9 0 0015.187 11.742" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.747-6.918l11.494 0M19.813 4.987a9 9 0 10-11.742 15.187 9 9 0 0014.025-2.28" />
            </svg>
            <h3 className="text-xl font-bold text-slate-300">{t('initialStateTitle')}</h3>
            <p>{t('initialStatePrompt')}</p>
        </div>
    );
};

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ description, story, isLoading, error }) => {
  const { t } = useTranslations();
  const [isStoryVisible, setIsStoryVisible] = useState(false);

  useEffect(() => {
    // When a new description arrives, hide the story of the previous drawing
    if (description) {
      setIsStoryVisible(false);
    }
  }, [description]);


  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl p-6 flex-grow flex flex-col border border-slate-700">
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {isLoading && <LoadingSkeleton />}
        {error && (
            <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">
                <p className="font-bold">{t('errorTitle')}</p>
                <p>{error}</p>
            </div>
        )}
        {!isLoading && !error && description && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-indigo-400 border-b border-slate-700 pb-2 mb-4">{t('storyDescriptionTitle')}</h2>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{description}</p>
            </div>

            {!isStoryVisible && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setIsStoryVisible(true)}
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-200"
                >
                  {t('showStoryButton')}
                </button>
              </div>
            )}
            
            {isStoryVisible && story && (
                 <div>
                    <h2 className="text-2xl font-bold text-indigo-400 border-b border-slate-700 pb-2 mb-4 mt-6">{t('storyTitle')}</h2>
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{story}</p>
                 </div>
            )}
          </div>
        )}
        {!isLoading && !error && !description && <InitialState />}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b; /* slate-800 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4f46e5; /* indigo-600 */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6366f1; /* indigo-500 */
        }
      `}</style>
    </div>
  );
};