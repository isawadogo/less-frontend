import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useFonts } from 'expo-font';

const CheckBoxReglage = React.memo(({ data, onCheckBoxChange, isChecked }) => {
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
        'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                checked={isChecked}
                onPress={() => onCheckBoxChange(data.id)}
                containerStyle={styles.checkbox}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.categorie}</Text>
                <Text style={styles.description}>{data.description}</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkbox: {
        margin: 0,
    },
    textContainer: {
        marginLeft: 10,
    },
    title: {
        fontFamily: 'Raleway-Bold',
        fontSize: 16,
        color: '#2B0D35',
    },
    description: {
        fontFamily: 'Raleway-Regular',
        fontSize: 14,
        color: '#555555',
    },
});

export default CheckBoxReglage;