import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



const parametre = [
    { title: "Aide", screen: "AideScreen", icone: "faCircleQuestion" },
    { title: "Paramètres des notifications", screen: "ReglageNotifScreen", icone: "faBell" },
    { title: "Sécurité", screen: "SecuriteScreen", icone: "faLock" },
    { title: "Langues", screen: "LanguesScreen", icone: "faLanguage" },
    { title: "Condition Générales", screen: "CGUScreen", icone: "faScaleBalanced" }
]


export default function ProfilScreen({ navigation }) {
    // Pas fini de rajouter les prenom nom, email et critères de l'utilisateur
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value.userDetails);


    return (
        <View>
            <FontAwesomeIcon onPress={navigation.goBack()} icon="arrow-left" />
            <FontAwesomeIcon onPress={navigation.navigate("ProfilScreen")} />
            <View>
                <Text>{user.prenom}{user.nom}</Text>
                <Text>{user.email}</Text>
                <Text>Mes critères</Text>
                <Text></Text>
                <View>
                    {parametre.map((item, index) => (
                        <View key={index}>
                            <FontAwesomeIcon icon={item.icone} />
                            <TouchableOpacity onPress={navigation.navigate(item.screen)}>
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        </View>))}
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({})

