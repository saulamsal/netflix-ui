import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export const useEyeTracking = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (Platform.OS === 'visionOS') {
      // Subscribe to eye tracking events
      // Note: This is conceptual as the actual API might differ
      const subscription = eyeTrackingManager.subscribe((position) => {
        setEyePosition(position);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  return eyePosition;
}; 