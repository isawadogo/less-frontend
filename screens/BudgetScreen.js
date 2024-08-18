import { Button, StyleSheet, Text, View } from 'react-native';
import { object } from 'yup';

export default function BudgetScreen({ navigation }) {
    // calcul des dépenses du mois en cours
    const categorySpent = [
        {
            category: "Epricerie",
            amount: 175,
        },
        {
            category: "Légumes",
            amount: 175,
        },
        {
            category: "Fruits",
            amount: 175,
        },
        {
            category: "Crémerie",
            amount: 175,
        },
        {
            category: "Boucherie",
            amount: 175,
        },
        {
            category: "Divers",
            amount: 175,
        },
    
    ];
    const spentByCategory = categorySpent.map( (object) => {
        return (
            <View style={styles.row}>
                        <Text>{object.category}</Text>
                        <Text>{object.amount}€</Text>
            </View>
        );
    });

    // calcul du reste à dépenser
    const Budget = 100;
    const Spent = 75;
    const leftToSpend = Budget - Spent;
    const percentageSpent = `${(100 * Spent)/Budget}%`

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
    const lastSpent = budgetData.map( (object) => {
        return (
            <View style={styles.row}>
                        <Text>{object.month}</Text>
                        <Text>{object.spend}€</Text>
            </View>
        );
    });

    return (
        <View style={styles.background}>
            <View style={styles.titleContainer}>
                <Button
                    style={styles.returnButton}
                    title="<-"
                    onPress={() => navigation.navigate('TabNavigator')}
                />
                <Text style={styles.mainTitle}>Mon Budget</Text>
            </View>
            
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Mois en cours</Text>
                    <View>
                        <Text>Progress Bar</Text>
                        {spentByCategory}
                    </View>
                    
                <Text style={styles.sectionTitle}>Reste {leftToSpend}€ à dépenser</Text>
                <View style={styles.barContainer}>
                    <Text style={[styles.progressBar, {width:'75%'}]}>{percentageSpent}</Text>
                </View>
                <Text style={styles.sectionTitle}>Dépenses des mois précédents</Text>
                <View style={styles.lastMounthContainer}>
                    {lastSpent}
                </View>
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#25000B',
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

    mainTitle : {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 25,
    },
    
    container: {
    flex: 1,
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