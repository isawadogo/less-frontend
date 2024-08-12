import { ScrollView, CheckBox, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';


data = [
    {
        id: 0,
        title: "Nouvelles promos",
        Description: "Recevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 1,
        title: "Produits rare, exclusifs, en faible quantité",
        Description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 2,
        title: "Les lots en promotions",
        Description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 3,
        title: "Récupération des invendus",
        Description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 4,
        title: "Découverte des produits de saison",
        Description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 5,
        title: "Mise en avant des producteurs de votre Région",
        Description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 6,
        title: "Primeur, traiteur et marché en collaboation",
        Description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },
    {
        id: 7,
        title: "Faire un don aux associations",
        Description: "Récevoir des alertes pour les nouvelles promos et les nouveaux arrivages",
    },

]


function CheckBoxItem({ data }) {

    const [isChecked, setIsChecked] = useState(false);

    const handleClickChexBox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <View>
            <CheckBox on value={isChecked} onValueChange={handleClickChexBox} />
            <View>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.description}>{data.description}</Text>
            </View>
        </View>

    );
}

export default function ReglageNotifScreen({ navigation }) {

    return (
        <ScrollView style={styles.container}>
            <FontAwesomeIcon onPress={navigation.goBack()} icon="arrow-left" />
            {data.map(item => (
                <CheckBoxItem key={item.id} data={item} />
            ))}
        </ScrollView>

    )
}


const styles = StyleSheet.create({})
