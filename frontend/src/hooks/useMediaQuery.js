import { useState, useEffect, useCallback } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  const handleChange = useCallback((e) => {
    setMatches(e.matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query, handleChange]);

  return matches;
};