import React from "react";
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

function MyCarousel({ data }) {
    return (
        <Carousel
            loop
            width={width}
            height={400}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => {}}
            renderItem={({ item }) => (
                <View style={styles.carouselItem}>
                    <Image style={styles.image} source={item.image} />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B0D35',
    },
    image: {
        width: undefined,
        height: '100%',
        aspectRatio: 1,
    },
});

export default MyCarousel;
