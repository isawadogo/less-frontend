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
            onSnapToItem={(index) => console.log('current index:', index)}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 35,
    },
    image: {
        width: '80%',
        height: '100%',

    },
});

export default MyCarousel;
