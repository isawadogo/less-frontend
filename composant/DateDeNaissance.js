import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { globalStyles } from '../globalStyles';
import moment from 'moment/moment';
import 'moment/locale/fr';




const DateDeNaissance = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarVisible, setCalendarVisible] = useState(false);

    moment.locale('fr');


    const showDatePicker = () => {
        setCalendarVisible(true);
    };

    const hideDatePicker = () => {
        setCalendarVisible(false);
    };
    const handleConfirm = (date) => {
        console.log("Date selectionné: e", date)
        setSelectedDate(date);
        hideDatePicker();
    }


    const correctDate = (date) => {
        return date ? moment(date).format('LL') : 'Date de Naissance'
    }
    return (
        <View>
            <TouchableOpacity onPress={showDatePicker}>
                <Text style={globalStyles.textInput}>{correctDate(selectedDate)}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                date={selectedDate || new Date()}
                isVisible={calendarVisible}
                locale="fr_FR"
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}


export default DateDeNaissance

