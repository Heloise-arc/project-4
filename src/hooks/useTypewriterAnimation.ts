import { useState, useEffect, useCallback } from 'react';

interface TypewriterOptions {
  typeSpeed: number;
  deleteSpeed: number;
  pauseDuration: number;
}

export function useTypewriterAnimation(
  words: string[],
  options: TypewriterOptions
) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const animate = useCallback(() => {
    const currentWord = words[currentIndex];
    
    if (isDeleting) {
      setCurrentText(prev => prev.slice(0, -1));
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      setCurrentText(currentWord.slice(0, currentText.length + 1));
      if (currentText === currentWord) {
        setIsTyping(false);
        setTimeout(() => {
          setIsDeleting(true);
          setIsTyping(true);
        }, options.pauseDuration);
      }
    }
  }, [currentText, isDeleting, currentIndex, words, options.pauseDuration]);

  useEffect(() => {
    const timeout = setTimeout(
      animate,
      isDeleting ? options.deleteSpeed : options.typeSpeed
    );
    return () => clearTimeout(timeout);
  }, [animate, isDeleting, options.deleteSpeed, options.typeSpeed]);

  return { currentText, isTyping };
}