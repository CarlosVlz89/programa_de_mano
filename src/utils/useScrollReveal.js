import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Check if the browser supports IntersectionObserver (Widely available Baseline)
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target); // Only trigger once!
      }
    }, { 
      threshold: 0.08 // Trigger slightly after entering viewport
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return [elementRef, isVisible];
}
