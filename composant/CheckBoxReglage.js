import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';



const CheckBoxReglage = ({ data }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleClickCheckBox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <View>
            <CheckBox checked={isChecked} onPress={handleClickCheckBox} containerStyle={styles.checkbox} />
            <View>
                <Text style={styles.title}>{data.title}</Text>
                <Text
                    style={styles.description}>{data.description}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

})
export default CheckBoxReglage;

