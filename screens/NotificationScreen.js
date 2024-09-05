import React from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector, useState } from 'react-redux';


export default function Notifications({ navigation }) {

    const dispatch = useDispatch();

    const selectedCategories = useSelector(state => state.notifications.selectedCategories); // Accéder aux catégories depuis Redux
    const data = [
        { id: 0, titre: "🎉 Découvrez les dernières promos !", p: " Profitez des réductions exceptionnelles sur une sélection d'articles. Ne passez pas à côté de ces offres incroyables !", lien: "Cliquez ici pour en savoir plus" },
        { id: 1, titre: "🔥 Produits rares en stock !", p: "Saisissez cette opportunité unique avant que ces articles exclusifs ne disparaissent.", lien: " Cliquez ici pour voir les détails et acheter maintenant" },
        { id: 2, titre: "💰 Économisez gros avec nos lots en promo !", p: " Découvrez les offres spéciales du moment et faites des achats malins.", lien: " Cliquez pour plus d'informations" },
        { id: 3, titre: "♻️ Offres sur les invendus !", p: "Faites un geste pour la planète et profitez de réductions sur nos invendus. C'est gagnant-gagnant !", lien: " Cliquez ici pour voir les offres" },
        { id: 4, titre: "🌱 Découvrez les produits frais de saison !", p: " Régalez-vous avec des ingrédients de qualité et suivez nos suggestions pour une cuisine savoureuse.", lien: " Cliquez ici pour découvrir les produits de saison." },
        { id: 5, titre: "🏡 Soutenez les producteurs locaux !", p: " Choisissez des produits frais et de qualité de votre région et participez au soutien de l'économie locale.", lien: " Cliquez ici pour en savoir plus" },
        { id: 6, titre: "🍽️ Nouveautés de votre marché local !", p: " Découvrez les dernières collaborations avec nos traiteurs partenaires et profitez d'offres exclusives.", lien: " Cliquez ici pour explorer les offres." },
        { id: 7, titre: "❤️ Faites un geste solidaire !", p: " Soutenez les associations locales en faisant un don lors de vos achats. Chaque contribution compte !", lien: " Cliquez ici pour en savoir plus." },
    ];


    const notifToShow = data.filter(element => selectedCategories.includes(element.id));


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Pressable onPress={() => navigation.goBack()} style={styles.fleche}>
                    <FontAwesomeIcon icon={faCircleArrowLeft} size={24} />
                </Pressable>
                <View>
                    {notifToShow.length > 0 ? (
                        notifToShow.map(element => (
                            <View key={element.id} style={styles.notificationContainer}>
                                <Text style={styles.notificationTitre}>{element.titre}</Text>
                                <Text>{element.p}</Text>
                                <TouchableOpacity >
                                    <Text style={styles.notificationLien}>{element.lien}</Text>
                                </TouchableOpacity>
                            </View>
                        ))) : (
                        <View>
                            <Text style={styles.nothingText}>Aucune notification à afficher !  {'\n'}  Veuillez chocher vos choix d'actualité et de promotion dans "Réglages notifications"   </Text>
                        </View>
                    )}


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fleche: {
        paddingTop: 30,
        paddingLeft: 15,
    },
    nothingText: {
        textAlign: 'center',
        fontFamily: 'Raleway-Regular',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 15,

    },
    container: {
        flex: 1,
        padding: 16,
    },
    notificationContainer: {
        margin: 10,
        padding: 5,
        textAlign: 'justify'
    },
    notificationTitre: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingTop: 6,
    },
    notificationLien: {
        fontStyle: 'italic'

    },

});
