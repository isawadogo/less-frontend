import { StyleSheet, Text, TouchableOpacity, View, fon } from 'react-native';


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

    return (
        <View>
            {Langues.map((item, index) => (
                <TouchableOpacity key={index}>
                    <Text style={item.on ? styles.langueOn : styles.langue}>{item.langue}</Text>
                </TouchableOpacity>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    langueOn: {
    },
    langue: {
    },
})