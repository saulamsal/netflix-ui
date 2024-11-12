import { Stack } from 'expo-router';
import { WindowManager } from '@/components/WindowManager';

export default function VisionOSLayout() {
  return (
    <WindowManager>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
          animation: 'fade',
        }}
      />
    </WindowManager>
  );
}
