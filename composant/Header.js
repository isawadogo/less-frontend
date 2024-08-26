import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//importation des icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';


export default function Header({ navigation }) {
    const [loaded, error] = useFonts({
        'Raleway-SemiBold': require('../assets/fonts/Raleway-SemiBold.ttf'),
    });

    if (!loaded && !error) {
        return null;
    }

    const { top } = useSafeAreaInsets();

    return (
        <View style={{ ...styles.container, top }}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()} >
                <FontAwesomeIcon icon={faCircleArrowLeft} style={styles.icone} />
                <Text style={styles.title}>Titre</Text>
            </TouchableOpacity>
            <View style={styles.whiteContainer}></View>
        </View>
    );

};

const styles = StyleSheet.create({
    container:
    {
        backgroundColor: "#2B0D35",
    },
    titleContainer: {
        flexDirection: 'row',
        margin: 30,
    },
    icone: {
        color: 'white'

    },
    title: {
        color: 'white',
        paddingLeft: 145,
        fontFamily: 'Raleway-SemiBold',
    }
    ,
    whiteContainer: {
        backgroundColor: '#F2F2F2',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    }


});