import { Platform, Pressable } from 'react-native';
import styled from 'styled-components/native';

export const VisionContainer = styled.View`
  ${Platform.select({
    visionOS: {
      padding: 20,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    default: {
      // regular styles
    }
  })}
`;

export const HoverableView = styled(Pressable)`
  ${Platform.select({
    visionOS: {
      transform: [{scale: 1}],
      transition: 'transform 0.2s',
      ':hover': {
        transform: [{scale: 1.05}],
      }
    },
    default: {}
  })}
`; 