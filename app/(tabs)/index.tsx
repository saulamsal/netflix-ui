import React, { useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import { styles } from '@/styles';
import { AnimatedHeader } from '@/components/Header/AnimatedHeader';
import { FeaturedContent } from '@/components/FeaturedContent/FeaturedContent';
import { MovieList } from '@/components/MovieList/MovieList';
import { useDeviceMotion } from '@/hooks/useDeviceMotion';
import movieData from '../../data/movies.json';
import { MoviesData } from '@/types/movie';
import { TabScreenWrapper } from '@/components/TabScreenWrapper';
import { usePathname } from 'expo-router';
import { TAB_SCREENS } from '@/app/(tabs)/_layout';
import { GameList } from '@/components/GameList/GameList';
import { useScrollToTop } from '@react-navigation/native';
import { useVisionOS } from '@/hooks/useVisionOS';
import { VisionContainer, HoverableView } from '@/components/ui/VisionContainer';

// const FEATURED_MOVIE = {
//   id: 'dont-move',
//   title: "Don't Move",
//   thumbnail: 'https://i.redd.it/q53e4iwud0971.jpg',
//   categories: ['Violent', 'Gritty', 'Thriller', 'Drug Lord']
// };
const FEATURED_MOVIE = {
  id: 'dont-move',
  title: "Don't Move",
  thumbnail: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABWsjI5VID3ChnY1bGlkeXfdS0qY19EszZmC9vOQjb72s7hyKAfD-5Yy1OAceR9CfLqyxRMWPu15X6_zAf5ELM4gLbXcJL_2B2e8E.jpg?r=bb0',
  categories: ['Soapy', 'Suspensful', 'Sci-Fi Mystery'],
  logo: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABeTZx41tm9x0TT2G_c3gmJOoK_1n9hhvRhzE76D5f3vwwNaWOEBJDLRl5mU1R3BVXhYYU_okqrGzn_qM-3nUJNqUK8QAETNIh4RZy2M7V7726S4tlW3gvd6KtIF_utcjO714L4rQ7ib3sM2ZhnDLF111_nkdewygq9av5vHduwqf1MgPoP5NIQ.png?r=867'
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen() {
  const { movies } = movieData as MoviesData;
  const insets = useSafeAreaInsets();
  const { tiltX, tiltY } = useDeviceMotion();
  const { isVisionOS } = useVisionOS();

  const SCROLL_THRESHOLD = 4;
  const SLIDE_ACTIVATION_POINT = 90; // Point at which sliding can start
  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const scrollDirection = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const scrollDelta = currentScrollY - lastScrollY.value;

      // Only trigger direction change if we've scrolled past SLIDE_ACTIVATION_POINT
      if (currentScrollY >= SLIDE_ACTIVATION_POINT) {
        if (scrollDelta > SCROLL_THRESHOLD) {
          // Scrolling down - hide tabs
          scrollDirection.value = withTiming(1, { duration: 400 });
        } else if (scrollDelta < -SCROLL_THRESHOLD) {
          // Scrolling up - show tabs
          scrollDirection.value = withTiming(0, { duration: 400 });
        }
      } else {
        // Before SLIDE_ACTIVATION_POINT, always show tabs
        scrollDirection.value = withTiming(0, { duration: 400 });
      }

      lastScrollY.value = currentScrollY;
      scrollY.value = currentScrollY;
    },
  });

  const headerAnimatedProps = useAnimatedProps(() => {
    return {
      intensity: interpolate(
        scrollY.value,
        [0, 90],
        [0, 85],
        'clamp'
      )
    };
  });

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * 0.7 },
      { translateY: tiltY.value * 0.7 },
      { scale: 1.05 },
    ],
  }));

  const categoriesStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * -0.35 },
      { translateY: tiltY.value * -0.35 },
    ],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tiltX.value * -0.45 },
      { translateY: tiltY.value * -0.45 },
    ],
  }));

  const pathname = usePathname();
  const isActive = pathname === '/' || pathname === '/index';

  const currentTabIndex = TAB_SCREENS.findIndex(screen =>
    screen.name === 'index'
  );
  const activeTabIndex = TAB_SCREENS.findIndex(screen =>
    pathname === `/${screen.name}` || (screen.name === 'index' && pathname === '/')
  );

  const slideDirection = activeTabIndex > currentTabIndex ? 'right' : 'left';

  const scrollViewRef = useRef(null);

  useScrollToTop(scrollViewRef);

  return (
    <TabScreenWrapper isActive={isActive} slideDirection={slideDirection}>
      <VisionContainer style={styles.container}>
        <StatusBar style="light" />
        <AnimatedHeader
          headerAnimatedProps={headerAnimatedProps}
          title="For Saúl"
          scrollDirection={scrollDirection}
        />

        <Animated.ScrollView
          ref={scrollViewRef}
          style={[
            styles.scrollView,
            isVisionOS && { paddingHorizontal: 20 }
          ]}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <LinearGradient
            colors={['#202036', '#11111d', '#07070c']}
            locations={[0, 0.4, 0.8]}
            style={[styles.gradient, { height: SCREEN_HEIGHT * 0.8 }]}
          />

          <FeaturedContent
            movie={FEATURED_MOVIE}
            imageStyle={imageStyle}
            categoriesStyle={categoriesStyle}
            buttonsStyle={buttonsStyle}
            topMargin={insets.top + 90}
          />

          {movies.map(row => (
            row.rowTitle === 'Mobile Games' ? <GameList key={row.rowTitle} {...row} /> : <MovieList key={row.rowTitle} {...row} />
          ))}
        </Animated.ScrollView>
      </VisionContainer>
    </TabScreenWrapper>
  );
}


