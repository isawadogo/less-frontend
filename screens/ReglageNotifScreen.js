import React from 'react';

import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CheckBoxReglage from '../modules/CheckBoxReglage'




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
        <ScrollView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </TouchableOpacity>

                {data.map(element => (
                    <CheckBoxReglage key={element.id} data={element} />
                ))}
            </View>
        </ScrollView >

    )
}


const styles = StyleSheet.create({})
