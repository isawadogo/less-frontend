/* IMPORTS */

// import React et React Native
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

/* FONCTION AIDE */

export default function CGUScreen({ navigation }) {
  const [loaded, error] = useFonts({
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-SemiBold': require('../assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.intro}>
            <Text>Bienvenur sur notre service gratuit de comparateur de prix pour vos listes de courses. Avant d'utiliser notre plateforme, nous vous invitpns à lire attentivement les présentes Conditions sGénérales d'Utilisation.</Text>
          </Text>
          <Text style={styles.sectionTitle}>1 - Acceptation des conditions</Text>
          <Text style={styles.paragraphe}>
            En accédant à notre service gratuit de comparateur de prix pour une liste de courses, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation (CGU). Ces conditions peuvent être modifiées à tout moment et sans préavis par notre équipe. Il vous appartient de les consulter régulièrement.
          </Text>

          <Text style={styles.sectionTitle}>2 - Description du service</Text>
          <Text style={styles.paragraphe}>
            Notre service de comparateur de prix vous permet de créer une liste de courses et de comparer les prix de ces produits parmi plusieurs détaillants partenaires. Les prix affichés sont fournis à titre indicatif et peuvent varier en fonction de divers facteurs, y compris les promotions, la disponibilité des produits, et les politiques tarifaires des détaillants.
          </Text>

          <Text style={styles.sectionTitle}>3 - Fonctionnement du service</Text>
          <Text style={styles.paragraphe}>
            L'utilisateur saisit ou sélectionne des produits pour constituer une liste de courses. Notre service se charge alors de comparer les prix disponibles chez nos partenaires et de proposer les meilleures offres disponibles. Le service est entièrement gratuit pour l'utilisateur, et aucune obligation d'achat n'est imposée.
          </Text>

          <Text style={styles.sectionTitle}>4 - Limitation de responsabilité</Text>
          <Text style={styles.paragraphe}>
            Nous nous efforçons de fournir des informations précises et à jour. Toutefois, nous ne pouvons garantir l'exactitude, la complétude, ou la disponibilité des prix et des produits référencés. Les utilisateurs sont invités à vérifier les prix et la disponibilité directement sur les sites des détaillants avant tout achat. Nous déclinons toute responsabilité en cas de différences de prix ou de rupture de stock.
          </Text>

          <Text style={styles.sectionTitle}>5 - Protection des données personnelles</Text>
          <Text style={styles.paragraphe}>
            Nous respectons votre vie privée et nous engageons à protéger vos données personnelles conformément à la réglementation en vigueur. Les informations que vous fournissez pour utiliser le service seront utilisées uniquement pour améliorer votre expérience utilisateur. Aucune donnée personnelle n'est partagée avec des tiers sans votre consentement explicite.
          </Text>

          <Text style={styles.sectionTitle}>6 - Propriété intellectuelle</Text>
          <Text style={styles.paragraphe}>
            Tous les éléments de notre service, y compris les textes, images, logos, et autres contenus, sont protégés par le droit d'auteur. Vous n'êtes pas autorisé à copier, reproduire, ou distribuer ces éléments sans notre accord préalable écrit.
          </Text>

          <Text style={styles.sectionTitle}>7 - Modification du service</Text>
          <Text style={styles.paragraphe}>
            Nous nous réservons le droit de modifier, suspendre ou interrompre temporairement ou définitivement le service, en tout ou en partie, à tout moment, avec ou sans préavis. Nous ne serons pas responsables envers vous ou tout tiers pour toute modification, suspension ou interruption du service.
          </Text>

          <Text style={styles.sectionTitle}>8 - Droit applicable et juridiction</Text>
          <Text style={styles.paragraphe}>
            Les présentes CGU sont soumises au droit français. En cas de litige relatif à l'utilisation de notre service, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire. À défaut d'accord, le litige sera porté devant les tribunaux compétents.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLE CSS */

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  intro: {
    fontWeight: 'bold'

  },
  sectionTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 13,
    color: "#2B0D35",
    paddingTop: 25,
    paddingBottom: 15,
  },

  intro: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 13,
    color: "#2B0D35",
  },

  paragraphe: {
    fontSize: 13,
    fontFamily: "Raleway-Regular",
    color: "#555555"
  },
});
