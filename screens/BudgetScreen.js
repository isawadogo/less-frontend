import { Button, StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { object } from 'yup';
import { globalStyles } from '../globalStyles';

export default function BudgetScreen({ navigation }) {
    // calcul des dépenses du mois en cours
    const categorySpent = [
        {
            category: "Epricerie",
            amount: 75,
        },
        {
            category: "Légumes",
            amount: 15,
        },
        {
            category: "Fruits",
            amount: 25,
        },
        {
            category: "Crémerie",
            amount: 15,
        },
        {
            category: "Boucherie",
            amount: 35,
        },
        {
            category: "Divers",
            amount: 15,
        },

    ];
    const spentByCategory = categorySpent.map((object) => {
        return (
            <View style={styles.row}>
                <Text>{object.category}</Text>
                <Text>{object.amount}€</Text>
            </View>
        );
    });

    // calcul du reste à dépenser
    const budget = 300;
    const amounts = categorySpent.map((category) => category.amount)
    const spent = amounts.reduce((acc, curr) => acc + curr)

    const leftToSpend = budget - spent;
    const percentageSpent = `${(100 * spent) / budget}%`

    // calcul des dépenses du mois précédents
    const budgetData = [
        {
            month: "juillet",
            spend: 175,
        },
        {
            month: "juin",
            spend: 175,
        },
        {
            month: "aout",
            spend: 175,
        },
        {
            month: "septembre",
            spend: 175,
        },

    ];
    const lastSpent = budgetData.map((object) => {
        return (
            <View style={styles.row}>
                <Text>{object.month}</Text>
                <Text>{object.spend}€</Text>
            </View>
        );
    });

    return (
        <SafeAreaView style={styles.background}>

            <View style={styles.titleContainer}>
                {/* <Button
                    style={styles.returnButton}
                    title="<-"
                    onPress={() => navigation.navigate('TabNavigator')}
                /> */}
                <Text style={globalStyles.header}>Mon Budget</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Mois en cours</Text>
                <View style={styles.listContainer}>
                    <CircularProgress value={spent} />
                    <View>{spentByCategory}</View>
                </View>

                <Text style={styles.sectionTitle}>Reste {leftToSpend}€ à dépenser</Text>
                <View style={styles.barContainer}>
                    <Text style={[styles.progressBar, { width: '75%' }]}>{percentageSpent}</Text>
                </View>
                <Text style={styles.sectionTitle}>Dépenses des mois précédents</Text>
                <View style={styles.lastMounthContainer}>
                    {lastSpent}
                </View>

            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#2B0D35',

    },

    test: {
        flex: 1,
        backgroundColor: 'red',
    },
    titleContainer: {
        flexDirection: "row",
    },

    returnButton: {
        color: '#fff',
        background: '#7CD7C1',
        borderRadius: 100,
        height: 50,
        width: 50,

    },
    container: {
    sflex: 1,
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 25,
    },

    sectionTitle: {
        color: '#25000B',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 25,
    },

    listContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },

    barContainer: {
        height: 20,
        borderRadius: 20,
        backgroundColor: '#F8F8F8',
    },

    progressBar: {
        height: 20,
        borderRadius: 20,
        backgroundColor: '#25000B',
        color: '#fff',
    },

    lastMounthContainer: {
        padding: 16,
        backgroundColor: '#F8F8F8',
        borderRadius: 25,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
})