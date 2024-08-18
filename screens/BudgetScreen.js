import { Button, StyleSheet, Text, View } from 'react-native';

export default function BudgetScreen({ navigation }) {
    return (
        <View>
            <Text>Mon Budget</Text>
            <View>
                <Text>Mois en cours</Text>
                <Text>Reste 75€ à dépenser</Text>
                <Text>Dépenses des mois précédents</Text>
                <Button
                    title="Retourner à l'acceuil"
                    onPress={() => navigation.navigate('TabNavigator')}
                />
            </View>

        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 16,
//       backgroundColor: '#fff',
//     },

//     sectionTitle: {
//         color: '#25000B',
//         fontSize: 24,
//         fontWeight: 'bold',
//       },

//     bouton: {
//         color: '#7CD7C1',
//         background: '#7CD7C1',
//         border: none,
//     }
//   })