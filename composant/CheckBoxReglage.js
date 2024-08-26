import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useFonts } from 'expo-font';



const CheckBoxReglage = ({ data }) => {

    //gestion du cochage de checkbox
    const [isChecked, setIsChecked] = useState(false);
    const handleClickCheckBox = () => {
        setIsChecked(!isChecked);
    };

    //import des polices
    const [loaded, error] = useFonts({
        'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
        'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
    });
    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.checkboxContainer}>
            <CheckBox checked={isChecked} onPress={handleClickCheckBox} containerStyle={styles.checkbox} />
            <View>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.description}>{data.description}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    
    checkboxContainer: {
        flexDirection: "row",
    },

    title: {
        fontFamily: "Raleway-Bold",
        color: "#2B0D35",
    },

    description: {
        fontFamily: "Raleway-Regular",
        color: "#555555",        
    },

})
export default CheckBoxReglage;

