
import { useState, useEffect, RefObject, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SelectionRange {
  start: number;
  end: number;
}

enum SelectionState {
  IDLE = 'idle',
  SELECTING = 'selecting',
  SELECTED = 'selected'
}

const useTextSelection = (containerRef: RefObject<HTMLElement>) => {
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);
  const [selectionState, setSelectionState] = useState<SelectionState>(SelectionState.IDLE);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<Position>({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentMousePosition, setCurrentMousePosition] = useState<Position>({ x: 0, y: 0 });

  // Throttle function to limit position updates
  const throttle = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    return (...args: any[]) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  };

  // Calculate optimal popup position based on cursor coordinates
  const calculatePopupPosition = (mouseX: number, mouseY: number): Position => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const popupHeight = 280; // estimated popup height
    const popupWidth = 320;
    const margin = 10;
    
    // Position below cursor by default, above if near bottom
    const y = mouseY + margin + popupHeight > viewportHeight 
      ? mouseY - popupHeight - margin 
      : mouseY + margin;
    
    // Keep within viewport horizontally
    const x = Math.min(Math.max(margin, mouseX), viewportWidth - popupWidth - margin);
    
    return { x, y };
  };

  // Handle mouse down to start selection tracking
  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (containerRef.current?.contains(event.target as Node)) {
      setIsSelecting(true);
      setSelectionState(SelectionState.SELECTING);
      setCurrentMousePosition({ x: event.clientX, y: event.clientY });
    }
  }, [containerRef]);

  // Handle mouse movement to track cursor position
  const handleMouseMove = useCallback(throttle((event: MouseEvent) => {
    if (containerRef.current?.contains(event.target as Node)) {
      const newPosition = { x: event.clientX, y: event.clientY };
      setCurrentMousePosition(newPosition);
      
      // Update popup position to follow cursor closely
      const popupPos = calculatePopupPosition(event.clientX, event.clientY);
      setPopupPosition(popupPos);
      
      // If we're selecting, show preview popup with current selection
      if (isSelecting) {
        const currentSelection = window.getSelection();
        const text = currentSelection?.toString().trim() || '';
        
        if (text.length > 0) {
          setSelectedText(text);
          setShowPopup(true);
        }
      }
    }
  }, 10), [isSelecting, containerRef]); // Reduced throttle delay for more responsive following

  // Handle mouse up to end selection tracking
  const handleMouseUp = useCallback(() => {
    if (isSelecting) {
      setIsSelecting(false);
      // The final selection processing will happen in selectionchange event
    }
  }, [isSelecting]);

  // Enhanced selection change handler
  const handleSelectionChange = useCallback(() => {
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
          
          // If we're not actively selecting (mouse released), use selection bounds for positioning
          if (!isSelecting) {
            setSelectionState(SelectionState.SELECTED);
            const rect = range.getBoundingClientRect();
            const finalPosition = calculatePopupPosition(
              rect.left + rect.width / 2, 
              rect.bottom + window.scrollY
            );
            setPopupPosition(finalPosition);
            setShowPopup(true);
          }
        } else {
          // Only hide popup if we're not selecting
          if (!isSelecting) {
            setShowPopup(false);
            setSelectionState(SelectionState.IDLE);
          }
        }
      } else {
        setShowPopup(false);
        setSelectionState(SelectionState.IDLE);
      }
    } else {
      // Only hide popup if we're not selecting
      if (!isSelecting) {
        setShowPopup(false);
        setSelectionState(SelectionState.IDLE);
        setSelectedText('');
      }
    }
  }, [containerRef, isSelecting]);

  // Handle click outside to hide popup
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowPopup(false);
      setSelectionState(SelectionState.IDLE);
      setSelectedText('');
    }
  }, [containerRef]);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleSelectionChange, handleMouseDown, handleMouseMove, handleMouseUp, handleClickOutside]);

  return {
    selectedText,
    selectionRange,
    selectionState,
    isSelecting,
    showPopup,
    popupPosition
  };
};

export default useTextSelection;
