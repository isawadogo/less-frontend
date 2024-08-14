import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';

const TouchFAQ = ({ questionText, reponseText }) => {
    const [show, setShow] = useState(false);

    const clickShow = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShow(!show);
    };

    return (
        <View style={styles.faqItem}>
            <TouchableOpacity onPress={clickShow} style={styles.questionButton}>
                <Text style={styles.questionText}>{questionText}</Text>
            </TouchableOpacity>
            {show && (
                <View style={styles.responseContainer}>
                    <Text style={styles.responseText}>{reponseText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    faqItem: {
        marginBottom: 16,
    },
    questionButton: {
        padding: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    questionText: {
        fontSize: 16,
        color: '#333',
    },
    responseContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 8,
    },
    responseText: {
        fontSize: 14,
        color: '#666',
    },
});

export default TouchFAQ;
