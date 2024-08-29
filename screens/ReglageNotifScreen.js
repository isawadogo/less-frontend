/* IMPORTS */

// import React et React Native
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import composants et modules
import CheckBoxReglage from '../composant/CheckBoxReglage';

/* FONCTION CREER LISTE */

const data = [
    {
        id: 0,
        title: "Nouvelles promos",
        description: "Recevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 1,
        title: "Produits rare, exclusifs, en faible quantité",
        description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 2,
        title: "Les lots en promotions",
        description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 3,
        title: "Récupération des invendus",
        description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 4,
        title: "Découverte des produits de saison",
        description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 5,
        title: "Mise en avant des producteurs de votre Région",
        description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 6,
        title: "Primeur, traiteur et marché en collaboation",
        description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 7,
        title: "Faire un don aux associations",
        description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
]

export default function ReglageNotifScreen({ navigation }) {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    {data.map(element => (
                        <CheckBoxReglage key={element.id} data={element} />
                    ))}
                </View>
            </ScrollView >
        </SafeAreaView>

    )
}

/* STYLE CSS */

const styles = StyleSheet.create({
    container: {

    },
})
