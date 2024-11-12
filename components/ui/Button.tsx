import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Button = styled.Pressable`
  ${Platform.select({
    visionOS: {
      // visionOS specific styles
      depth: 10,
      hoverEffect: true,
    },
    default: {
      // regular styles
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#007AFF',
    }
  })}
`;

export default Button; 