import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {RootScaleProvider} from '@/contexts/RootScaleContext';
import {useRootScale} from '@/contexts/RootScaleContext';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {OverlayProvider} from '@/components/Overlay/OverlayProvider';
import {useRouter} from 'expo-router';
import {BlurView} from 'expo-blur';
import {WhoIsWatching} from '@/components/WhoIsWatching';
import {UserProvider} from '@/contexts/UserContext';
import {useUser} from '@/contexts/UserContext';
import {Image} from 'expo-image';
import useCachedResources from '@/hooks/useCachedResources';
import { useVisionOS } from '@/hooks/useVisionOS';

function AnimatedStack() {
    const {scale} = useRootScale();
    const router = useRouter();
    const [isModalActive, setIsModalActive] = useState(false);
    const [canBlur, setCanBlur] = useState(false);
    const {selectedProfile, selectProfile} = useUser();
    const colorScheme = useColorScheme();
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: scale.value},
                {
                    translateY: (1 - scale.value) * -150,
                },
            ],
        };
    });
    const { isVisionOS } = useVisionOS();

    // return <WhoIsWatching onProfileSelect={selectProfile} />;


    if (!selectedProfile) {
        return <WhoIsWatching onProfileSelect={selectProfile}/>;
    }

    return (
        <View style={[
            styles.container,
            isVisionOS && { backgroundColor: 'transparent' }
        ]}>


            {(isModalActive && canBlur) && (
                <BlurView
                    intensity={50}
                    style={[
                        StyleSheet.absoluteFill,
                        {zIndex: 1}
                    ]}
                    tint={colorScheme === 'dark' ? 'dark' : 'light'}
                />
            )}
            <Animated.View style={[styles.stackContainer, animatedStyle]}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen
                        name="movie/[id]"
                        options={{
                            presentation: 'transparentModal',
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: 'transparent',
                            },
                        }}
                        listeners={{
                            focus: () => {
                                setIsModalActive(true);
                                setCanBlur(true);
                            },
                            beforeRemove: () => {
                                setIsModalActive(false);
                                setCanBlur(false);
                            },
                        }}
                    />
                    <Stack.Screen
                        name="switch-profile"
                        options={{
                            presentation: 'transparentModal',
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: 'transparent',
                            },
                        }}
                        listeners={{
                            focus: () => {
                                setIsModalActive(true);
                                setCanBlur(false);
                            },
                            beforeRemove: () => {
                                setIsModalActive(false);
                                setCanBlur(false);
                            },
                        }}
                    />
                    <Stack.Screen
                        name="search"
                        options={{
                            // presentation: 'card',
                            // animation: 'none',
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: 'transparent',
                            },
                        }}

                    />

                    <Stack.Screen
                        name="downloads"
                        options={{
                            // presentation: 'card',
                            // animation: 'none',
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: 'transparent',
                            },
                        }}

                    />

                    <Stack.Screen name="+not-found"/>
                </Stack>

            </Animated.View>

            {/* {!selectedProfile && (
        <WhoIsWatching onProfileSelect={selectProfile} />
      )} */}


        </View>
    );
}

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const isLoaded = useCachedResources();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        Image.prefetch([
            // Add your common image URLs here
            'path-to-netflix-icon.png',
            'path-to-netflix-outline.png',
        ]);
    }, []);

    if (!isLoaded) {
        return null; // Early return after all hooks are called
    }


    return (
        <UserProvider>
            <GestureHandlerRootView style={styles.container}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <RootScaleProvider>
                        <OverlayProvider>
                            <AnimatedStack/>
                        </OverlayProvider>
                    </RootScaleProvider>
                </ThemeProvider>
            </GestureHandlerRootView>
        </UserProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    stackContainer: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 5,
    },
});

