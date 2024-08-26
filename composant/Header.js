import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//importation des icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';


export default function Header({ navigation }) {
    const [loaded, error] = useFonts({
        'Raleway': require('../assets/fonts/Raleway-Regular.ttf'),
        'AlexBrush': require('../assets/fonts/AlexBrush-Regular.ttf')
    });

    if (!loaded && !error) {
        return null;
    }
    const { top } = useSafeAreaInsets();

    return (
        <View style={{ ...styles.container, top }}>
            <TouchableOpacity style={styles.touche} onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faCircleArrowLeft} style={styles.icone} />
                <Text style={styles.title}>Titre</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container:
    {

        paddingLeft: 18,
        backgroundColor: "#2B0D35",
    },
    touche: {
        flexDirection: 'row',
        margin: 30,
    },
    icone: {
        color: 'white'

    },
    title: {
        color: 'white',
        paddingLeft: 145,
        fontFamily: 'Raleway',
    }


});