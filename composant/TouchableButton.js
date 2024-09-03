import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';


const TouchableButton = ({ color, onPress, title, position }) => {
    const styles = StyleSheet.create({

        button: {
            width: 160,
            height: 30,
            backgroundColor: color,
            margin: 8,
            top: 1,
            ...position,

        },

        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 5,


        },

    });


    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity >
    )

}



export default TouchableButton