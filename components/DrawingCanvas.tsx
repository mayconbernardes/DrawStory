
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Tool } from '../types';

interface DrawingCanvasProps {
  tool: Tool;
  color: string;
  brushSize: number;
}

export interface DrawingCanvasRef {
  getImageAsBase64: () => string | null;
  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  ({ tool, color, brushSize }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    const setCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        redrawCanvas();
      }
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const context = canvas.getContext('2d');
      if(context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
        contextRef.current = context;
      }

      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);
      return () => {
        window.removeEventListener('resize', setCanvasSize);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const redrawCanvas = () => {
        if(contextRef.current && history.length > 0 && historyIndex >= 0) {
            contextRef.current.putImageData(history[historyIndex], 0, 0);
        } else if (contextRef.current) {
            contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
        }
    };

    const saveState = () => {
      if(!contextRef.current) return;
      const canvas = contextRef.current.canvas;
      const newHistory = history.slice(0, historyIndex + 1);
      const newImageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([...newHistory, newImageData]);
      setHistoryIndex(newHistory.length);
    };

    const getCoords = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        if ('touches' in e.nativeEvent) {
            return {
                x: e.nativeEvent.touches[0].clientX - rect.left,
                y: e.nativeEvent.touches[0].clientY - rect.top,
            };
        }
        return {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      const context = contextRef.current;
      if (!context) return;
      
      const { x, y } = getCoords(e);
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing || !contextRef.current) return;
      
      const context = contextRef.current;
      const { x, y } = getCoords(e);

      context.lineWidth = brushSize;
      context.strokeStyle = color;
      context.globalCompositeOperation = tool === Tool.ERASER ? 'destination-out' : 'source-over';
      
      context.lineTo(x, y);
      context.stroke();
    };

    const stopDrawing = () => {
      if (!contextRef.current || !isDrawing) return;
      contextRef.current.closePath();
      setIsDrawing(false);
      saveState();
    };

    useImperativeHandle(ref, () => ({
      getImageAsBase64: () => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        // Check if canvas is blank
        const context = canvas.getContext('2d');
        if (!context) return null;
        const pixelBuffer = new Uint32Array(context.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
        const isBlank = !pixelBuffer.some(color => color !== 0);
        if (isBlank) return null;
        
        return canvas.toDataURL('image/png').split(',')[1];
      },
      undo: () => {
        if (historyIndex > 0) {
          setHistoryIndex(prev => prev - 1);
        } else if (historyIndex === 0) { // first action
          setHistoryIndex(-1);
          clearCanvasInternal();
        }
      },
      redo: () => {
        if (historyIndex < history.length - 1) {
          setHistoryIndex(prev => prev + 1);
        }
      },
      clearCanvas: () => {
        clearCanvasInternal();
        saveState();
      },
    }));

    useEffect(() => {
        if (historyIndex >= 0 && history[historyIndex]) {
            contextRef.current?.putImageData(history[historyIndex], 0, 0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historyIndex]);

    const clearCanvasInternal = () => {
        const context = contextRef.current;
        const canvas = canvasRef.current;
        if (context && canvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };


    return (
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full cursor-crosshair"
      />
    );
  }
);
