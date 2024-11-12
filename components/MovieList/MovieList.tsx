import React from 'react';
import { View, Text, Pressable, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles';
import { Movie, MovieRow } from '@/types/movie';
import Svg, { Path } from 'react-native-svg';
import { useVisionOS } from '@/hooks/useVisionOS';
import { HoverableView } from '@/components/ui/VisionContainer';

const NumberBackground = ({ number }: { number: number }) => {
    const num = (number).toString().padStart(2, '0');

    return (
        <View style={styles.numberContainer}>
            <Text style={[styles.numberText, {
                color: 'white',
                opacity: 0.15,
                fontSize: 200,
                fontFamily: 'arialic',
            }]}>{num}</Text>
        </View>
    );
};

const MovieItem = ({ item, router, index, isTop10 }: {
    item: Movie;
    router: any;
    index: number;
    isTop10: boolean;
}) => (
    <Pressable
        onPress={() => router.push({
            pathname: '/movie/[id]',
            params: { id: item.id }
        })}
        style={[
            styles.contentItem,
            isTop10 && styles.top10Item
        ]}
    >
        {isTop10 && <NumberBackground number={index + 1} />}
        <Image
            source={{ uri: item.imageUrl }}
            style={[
                styles.thumbnail,
                isTop10 && styles.top10Thumbnail
            ]}
        />
    </Pressable>
);

export function MovieList({ rowTitle, movies, type }: MovieRow) {
    const router = useRouter();
    const isTop10 = type === 'top_10';
    const { isVisionOS } = useVisionOS();

    const renderItem = ({ item, index }) => (
        <HoverableView key={`${item.id}-${index}`}>
            <MovieItem
                item={item}
                router={router}
                index={index}
                isTop10={isTop10}
            />
        </HoverableView>
    );

    return (
        <View style={isVisionOS ? styles.visionContainer : styles.container}>
            <Text style={styles.sectionTitle}>{rowTitle}</Text>
            <FlatList
                horizontal
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    styles.contentList,
                    isTop10 && styles.top10List
                ]}
            />
        </View>
    );
} 