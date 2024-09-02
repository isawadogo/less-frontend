/* IMPORTS */

// import React et React Native
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { object } from 'yup';
import { globalStyles } from '../globalStyles';
import { PieChart } from 'react-native-chart-kit';


const screenWidth = Dimensions.get('window').width;

/* FONCTION AIDE */

export default function BudgetScreen({ navigation }) {
    // calcul des dépenses du mois en cours
    const categorySpent = [
        {
            name: "Epricerie",
            amount: 75,
            color: '#14B8A6',
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Légumes",
            amount: 15,
            color: "#FACC15",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Fruits",
            amount: 25,
            color: "#F59E0B",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Crémerie",
            amount: 15,
            color: "#EC4899",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Boucherie",
            amount: 35,
            color: "#6366F1",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Divers",
            amount: 15,
            color: "#3B82F6",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },

    ];

    const chartConfig = { //personnalisation de l'apparence des graphique
        backgroundGradientFrom: "#1E2923", // couleur de départ du dégradé
        backgroundGradientTo: "#08130D", // couleur de fin du dégradé
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // fonction qui renvoie les couleurs  rouge vert bleu et alpha  dont l'opacité variera selon le paramètre 
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,// fonction qui détermine la couleur des étiquettes du graphique avec une variation selon l'opacité en paramètre
        strokeWidth: 2, // définit l'épaisseur du graphique
        barPercentage: 0.5, // signifie que chaque barre occupera 50% de l'espae attribué,

    };

    const spentByCategory = categorySpent.map((object) => {
        return (
            <View key={object.category} style={styles.row}>
                <View style={[styles.colorBox, { backgroundColor: object.color }]} />
                <Text>{object.name}</Text>
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
                <Text style={globalStyles.header}>Mon Budget</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Mois en cours</Text>
                <View style={styles.listContainer}>
                    <PieChart
                        data={categorySpent}
                        width={screenWidth}
                        height={210}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        backgroundColor='transparent'
                        // paddingLeft={15}
                        // center={[10, 50]}
                        hasLegend={false}
                        style={styles.donuts}
                        borderColor={1}
                        borderWidth
                    />

                    <View style={styles.labels}>
                        {spentByCategory}
                    </View>
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

/* STYLE CSS */

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
        padding: 4,

    },
    colorBox: {
        width: 10,
        height: 10,
        marginRight: 10,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
    },
    donuts: {
        start: 40,

    },
    labels: {
        end: 50,
        top: 35,
    }

})