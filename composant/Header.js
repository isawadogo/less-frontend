import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//importation des icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useFonts } from 'expo-font';


export default function Header({ navigation, route }) {
    const { top } = useSafeAreaInsets();
    const [loaded, error] = useFonts({
        'Raleway': require('../assets/fonts/Raleway-Regular.ttf'),
        'AlexBrush': require('../assets/fonts/AlexBrush-Regular.ttf')
    });

    if (!loaded && !error) {
        return null;
    }

    const titre = route.params?.titre || 'Titre';
    const modificationProfil = route.name === 'ModifierProfil'

    return (
        <View style={{ ...styles.container, top }}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()} >
                <FontAwesomeIcon icon={faCircleArrowLeft} size={20} style={styles.icone} />
                <Text style={styles.title}>{titre}</Text>
            </TouchableOpacity>
            <View style={modificationProfil ? styles.whiteContainer : styles.greyContainer}></View>
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
        //paddingLeft: 145,
        paddingLeft: 40,
        fontFamily: 'Raleway-SemiBold',
    }
    ,
    whiteContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20
    },
    greyContainer: {
        backgroundColor: '#F2F2F2',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20

    }
});