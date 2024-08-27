import { StyleSheet, Text, TouchableOpacity, View, fon } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

const Langues = [
    { langue: "Français", on: true },
    { langue: "English", on: false },
    { langue: "Español", on: false },
    { langue: "Deutsch", on: false },
    { langue: "Italiano", on: false },
    { langue: "Português", on: false },
    { langue: "Русский", on: false },
    { langue: "中文", on: false },
    { langue: "日本語", on: false },
    { langue: "العربية", on: false },

]

export default function LangueScreen({ navigation }) {
    const [loaded, error] = useFonts({
        'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
    });

    if (!loaded && !error) {
        return null;
    }

    return (
        <SafeAreaView>
            <View>
                {Langues.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.textContainer}>
                        <Text style={item.on ? styles.langueOn : styles.langue}>{item.langue}</Text>
                    </TouchableOpacity>
                ))}

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    langueOn: {
        textAlign: 'center',
        fontFamily: 'Raleway-Regular',
        color: '#2B0D35',
        paddingTop: 15,
    },
    langue: {
        textAlign: 'center',
        fontFamily: 'Raleway-Regular',
        color: '#2B0D35',
        paddingTop: 15,
    },
    textContainer: {
    }

})