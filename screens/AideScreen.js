/* IMPORTS */

// import React et React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import des composants 
import TouchFAQ from '../composant/TouchFAQ';
// import expo
import { useFonts } from 'expo-font';

/* FONCTION AIDE */

const faqDatas = {
  row: [
    {
      id: 0,
      show: false,
      questionText: "comment fonctionne LE$$ ?",
      reponseText:
        `
        1. Création de vos critères
        Vous avez le droit à la sélection de 3 critères lors de votre inscription et par la suite modifiable dans "Editer profil".Le premier critère se choisit dans la section 'Mon régime de consommation'.
        Les deux autres critères se choisissent dans la section "Mes préférences". Il est possible facultativement d'ajouter autant d'allergie & intolérance que vous avez.

        2. Sélection de Produit
        Vous pouvez choisir des produits répartis en 10 catégories listées ci-dessous. Quant à LESS, nous nous portons garant (pour chaque produit que vous ajoutez) de sélectionner l'article de l'enseigne le plus intéressant selon vos critères. Ainsi, vous vous déchargez du temps interminable de recherches et de comparaison pour tous les articles de votre liste.

        CATEGORIES
        Fromages & Produits Laitiers, Viandes & Charcuterie, Féculent, Poissons & crustacés, Epices & condiment, Boissons, Epicerie sucrée, épicerie salée.

        3. Création & Enregistrement de votre liste de courses
        Une fois créée, la liste se rajoute dans votre panier (icône). Dès lors, vous avez la possibilité d'enregistrer cette liste qui sera réutilisable autant de fois que vous le souhaitez, car celle-ci est récupérable sur votre Dashboard ou sur la création d'une nouvelle liste.

        4. Les matchs
        Quand vous avez terminé d'ajouter vos produits, LESS ,en se référant à vos critères établis, vous génèrera les meilleurs choix sur le marché parmi tous nos partenaires. LESS vous communiquera le ou les enseigne   classées selon leur taux de confomité a vos critères et à votre budget.`,
    },
    {
      id: 1,
      show: false,
      questionText: "Quel est l'intérêt de l'application?",
      reponseText:
        `Nous sommes engagées pour un monde plus responsable. Note but est de pouvoir liée l'utile à l'agréable. le temps est précieux, notre environnement est fragile. Pour inciter le plus de monde à changer ses habitudes de consommation nous pensons que cette application est un bon intermédiaire, un premier pas dans la préservation de notre planète tout en trouvant personnellement notre compte. Nous voulons sensibiliser chaque utilisateur et essayons de lui montrer les différentes alternatives qui s'offrent à eux  via les critères. Nous tentons de préconiser un style de vie plus sain que ce soit dans nos assiettes, dans nos finances et pour notre écosystème. A savoir enfin que l'application a été conçu de sorte que vous laissiez vos portables de côté. Toute l'interface cherche dans son ergonomie à vous faciliter les choses pour vous enlever la tâche de faire votre course.  `
    },
    {
      id: 2,
      show: false,
      questionText: "Comment fonctionne la comparaison?",
      reponseText:
        `Nous avons pensé et conçu un algorithme que l'on ne ne peut pas divulguer du fait d'une présence concurrentielle importante `,
    },
    {
      id: 3,
      show: false,
      questionText: "Peut on créer plusieurs 'profil consommateur'?",
      reponseText:
        `Il est recommandé pour chaque foyer un seul garant du budget. Cela ne vous empêche pas de faire un compte individuel qui recensera vos achats eux aussi  individuel. Le but est de vous garantir un  suivi le plus juste possible. `,
    },
    {
      id: 4,
      show: false,
      questionText: "L'application est- elle payante ? ",
      reponseText:
        `Non, l'application n'est pas payante, si vous sélectionnez une liste dans la section" Résultat de comparaison" et que vous la commandez  vous serez redirigez sur l'enseigne en question avec cette liste  présente automatiquement dans le panier de cette enseigne. `,
    },
    {
      id: 5,
      show: false,
      questionText: "Avec quelle enseigne travaillez vous? ",
      reponseText:
        `Monoprix, Leclerc, Naturalia et Leader Price. Nous tenterons dans l'avenir de vous  proposer  plus d'enseigne`
    },
    {
      id: 6,
      show: false,
      questionText: "Quel est minimum et le maximum autorisés pour une course?",
      reponseText:
        `Le minimum d'achat est de 25euro, pour le maximum il n'y a pas de plafond. Tout dépendra du budget en question.`,
    }]
}

export default function AideScreen({ navigation }) {
  const [loaded, error] = useFonts({
    'Raleway-SemiBold': require('../assets/fonts/Raleway-SemiBold.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{faqDatas.titre}</Text>
        {faqDatas.row.map((faqData) => (
          <TouchFAQ
            key={faqData.id}
            questionText={faqData.questionText}
            reponseText={faqData.reponseText}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLE CSS */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    margin: 16
  },
  faqItem: {
    marginBottom: 16,
  },

  questionButton: {
    padding: 16,
    backgroundColor: 'black'
  },
  questionText: {

  },
  responseContainer: {

  },
  responseText: {
    fontFamily: 'Raleway-SemiBold',
    color: "#2B0D35",
  },
})