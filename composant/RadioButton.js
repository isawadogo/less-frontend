import * as React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';



const MyRadioButton = ({ value, checked, onPress }) => {
    <View>
        <RadioButton
            value={value}
            status={checked === value ? "checked" : "unchecked"}
            onPress={onPress}
            disabled={false}
        />
    </View>
}




export default MyRadioButton
