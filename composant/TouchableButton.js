import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';


const TouchableButton = ({ color, page, onPress, title, position }) => {
    const styles = StyleSheet.create({

        button: {
            width: 160,
            height: 30,
            backgroundColor: color,
            left: 106,
            bottom: 10,
            borderRadius: 15,
            margin: 8,
            bottom: 1,
            ...position,

        },

        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 6.5,
            paddingStart: 0,

        },

    });


    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity >
    )

}



export default TouchableButton