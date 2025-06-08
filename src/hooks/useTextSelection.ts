
import { useState, useEffect, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SelectionRange {
  start: number;
  end: number;
}

const useTextSelection = (containerRef: RefObject<HTMLElement>) => {
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const text = selection.toString().trim();
        
        // Check if selection is within our container
        if (containerRef.current && 
            containerRef.current.contains(range.commonAncestorContainer)) {
          
          if (text.length > 0) {
            setSelectedText(text);
            setSelectionRange({
              start: range.startOffset,
              end: range.endOffset
            });
            
            // Calculate popup position relative to cursor/selection end
            const rect = range.getBoundingClientRect();
            setPopupPosition({
              x: rect.right + 10, // Position to the right of selection
              y: rect.top + window.scrollY - 10 // Slightly above selection
            });
            
            setShowPopup(true);
          } else {
            setShowPopup(false);
          }
        } else {
          setShowPopup(false);
        }
      } else {
        setShowPopup(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  return {
    selectedText,
    selectionRange,
    showPopup,
    popupPosition
  };
};

export default useTextSelection;
