import { useCallback } from 'react';
import { Platform } from 'react-native';

export const useVisionGestures = () => {
  const handleHover = useCallback((event) => {
    if (Platform.OS !== 'visionOS') return;
    // Handle hover effects
  }, []);

  const handleSelect = useCallback((event) => {
    if (Platform.OS !== 'visionOS') return;
    // Handle selection
  }, []);

  return {
    handleHover,
    handleSelect,
  };
}; 