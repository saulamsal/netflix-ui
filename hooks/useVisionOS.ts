import { Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';

export const useVisionOS = () => {
  const isVisionOS = Platform.OS === 'visionOS';
  const { width, height } = useWindowDimensions();

  return {
    isVisionOS,
    windowSize: { width, height },
    // Add more visionOS-specific utilities as needed
  };
}; 