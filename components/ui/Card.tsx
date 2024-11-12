import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Card = styled.View`
  ${Platform.select({
    visionOS: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 20,
      padding: 16,
      transform: [
        { translateZ: 20 }, // Adds depth in 3D space
      ],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    default: {
      // regular styles for other platforms
    }
  })}
`; 