



import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TouchableButton from '../composant/TouchableButton';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { chooseCategories, increment } from '../reducers/notifications';
import CheckBoxReglage from '../composant/CheckBoxReglage';


export default function ReglageNotifScreen({ navigation }) {

    const buttonPosition = {
        start: 85,
        borderRadius: 15

    }
    const dispatch = useDispatch();
    const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);

    useEffect(() => {
        // Charger les sélections sauvegardées depuis AsyncStorage
        const loadSettings = async () => {
            try {
                const savedSelections = await AsyncStorage.getItem('selectedCategoriesIds');
                if (savedSelections) {
                    setSelectedCategoriesIds(JSON.parse(savedSelections));
                }
            } catch (error) {
                console.error('Failed to load settings from AsyncStorage:', error);
            }
        };

        loadSettings();
    }, []);

    const handleCheckBoxChange = (id) => {
        setSelectedCategoriesIds((prevSelected) => {
            const alReadySelection = prevSelected.includes(id)
            const newSelection = alReadySelection
                ? prevSelected.filter(item => item !== id)
                : [...prevSelected, id];

            // Sauvegarder les sélections mises à jour dans AsyncStorage
            AsyncStorage.setItem('selectedCategoriesIds', JSON.stringify(newSelection))
                .catch(error => console.error('Failed to save settings to AsyncStorage:', error));

            if (!alReadySelection) {
                dispatch(increment())
            }
            return newSelection;
        });
    };

    const saveSettings = () => {

        dispatch(chooseCategories(selectedCategoriesIds));
        navigation.navigate('Accueil');
    };

    const data = [
        { id: 0, categorie: "Nouvelles promos", description: "Consultez les dernières promos et arrivages pour profiter des meilleures offres. Ne manquez pas ces réductions." },
        { id: 1, categorie: "Produits rares, exclusifs, en faible quantité", description: "Découvrez les produits rares et exclusifs avant qu'ils ne soient épuisés. Assurez-vous de les ajouter à votre panier maintenant !" },
        { id: 2, categorie: "Les lots en promotions", description: "Profitez de nos lots en promotion pour faire des économies sur vos achats. Découvrez les offres spéciales du moment !" },
        { id: 3, categorie: "Récupération des invendus", description: "Ne manquez pas les offres exceptionnelles sur les invendus. Faites un geste pour la planète en achetant à prix réduit !" },
        { id: 4, categorie: "Découverte des produits de saison", description: "Explorez les produits frais de saison pour des repas savoureux. Ne ratez pas nos suggestions pour une cuisine de saison !" },
        { id: 5, categorie: "Mise en avant des producteurs de votre région", description: "Découvrez les produits de votre région. Soutenez les producteurs locaux en choisissant des produits frais et de qualité." },
        { id: 6, categorie: "Primeur, traiteur et marché en collaboration", description: "Découvrez les dernières nouveautés en collaboration avec votre marché local et nos traiteurs partenaires. Ne manquez pas ces offres exclusives !" },
        { id: 7, categorie: "Faire un don aux associations", description: "Soutenez les associations locales en faisant un don lors de vos achats. Chaque geste compte !" },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map(item => (
                    <CheckBoxReglage
                        key={item.id}
                        data={item}
                        isChecked={selectedCategoriesIds.includes(item.id)}
                        onCheckBoxChange={() => handleCheckBoxChange(item.id)}
                    />
                ))}
                <TouchableButton color="#7CD6C1" onPress={saveSettings} title="SAUVEGARDER" position={buttonPosition}></TouchableButton>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    save: {
        top: 20,
        backgroundColor: "#7CD6C1",
        width: 150,
        height: 30,
        marginBottom: 50,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        marginStart: '27%',



    },
    saveText: {

        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 5,
    }

});