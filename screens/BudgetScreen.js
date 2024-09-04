/* IMPORTS */

// import React et React Native

import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../globalStyles';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { getUserListes } from '../modules/listesFunctions';
import BudgetRestant from '../composant/BudgetRestant';
import { months } from 'moment/moment';

const screenWidth = Dimensions.get('window').width;

const graphColors = [
    '#faebd7', 
    '#7fffd4', 
    '#0000ff', 
    '#8a2be2',
    '#a52a2a',
    '#deb887',
    '#00ffff', 
    '#5f9ea0',
    '#7fff00',
    '#9932cc',
    '#483d8b',
    '#ff1493',
    '#f0f8ff', 
    '#ff4500',
    '#663399)',
    '#87ceeb',
    '#ffff00',
    '#0A1F46',
    '#9F8BE3',
    '#9DC2F5',
    '#E3A740',
]
const monthsMaps = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
]

/* FONCTION AIDE */

export default function BudgetScreen({ navigation }) {

  const user = useSelector((state) => state.user.value.userDetails);
  const [userListes, setUserListes] = useState([]);
  const [ isReady, setIsReady] = useState(false);
  const [ taskMessage, setTaskMessage] = useState('')
  
  useFocusEffect(
    React.useCallback(() => {
      if (!user.id) {
        navigation.navigate('Login');
      }

      const getListes = async () => {
        let ignore = false;
        getUserListes(user.token, user.id).then(listes => {
          if (!ignore) {
            setUserListes(listes);
            setIsReady(true);
          }
        });
      }

      getListes();

      return () => {
        ignore = true;
      }
    }, [])
  );

    if (!isReady) {
        return (
            <View></View>
        )
    }
    const prixParMois = userListes.map((e) => {return {month: new Date(e.dateCreation).getMonth(), prix: e.prix}})
        .reduce((a, v, i, arr) => {
            let tempData = {}
            if (!a.some((d) => d.month === v.month)) {
                const prixTotal = arr.filter((l) => l.month === v.month).reduce((acc, val) => acc + val.prix, 0);
                tempData = { month: v.month, spent: prixTotal.toFixed(2)}
                return a.concat([tempData]);
            } else {
                return a
            }
    }, []);

    const categoriesChart = userListes.map(a => a.listeArticles).flat().reduce((acc, val, idx, arr) => {

    let graphElm = {};
    if (!acc.some((t) => t.name === val.categorieDeProduit )) {
        //console.log('PASSAGE : ', idx);
        const amount = arr.reduce((a, v) => {
            if (v.categorieDeProduit === val.categorieDeProduit) {
                return a + v.prix;
            } else {
                return a;
            }
        }, 0);
        graphElm = {
            name: val.categorieDeProduit, 
            amount: Math.ceil(amount), 
            legendFontColor: '#7F7F7F', 
            legendFontSize: 15,
            color: graphColors[idx],
        }
        return acc.concat([graphElm]);
    } else {
        return acc;
    }
  }, []);

    const chartConfig = { //personnalisation de l'apparence des graphique
        backgroundGradientFrom: "#1E2923", // couleur de départ du dégradé
        backgroundGradientTo: "#08130D", // couleur de fin du dégradé
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // fonction qui renvoie les couleurs  rouge vert bleu et alpha  dont l'opacité variera selon le paramètre 
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,// fonction qui détermine la couleur des étiquettes du graphique avec une variation selon l'opacité en paramètre
        strokeWidth: 2, // définit l'épaisseur du graphique
        barPercentage: 0.5, // signifie que chaque barre occupera 50% de l'espae attribué,

    };

    const spentByCategory = categoriesChart.map((object) => {
        return (
            <View key={object.category} style={styles.row}>
                <View style={[styles.colorBox, { backgroundColor: object.color }]} />
                <Text>{object.name}</Text>
                <Text>{object.amount}€</Text>
            </View>
        );
    });

    // calcul du reste à dépenser
    const budget = user.budget;
    const amounts = categoriesChart.map((category) => category.amount)
    const spent = amounts.reduce((acc, curr) => acc + curr, 0)

    const leftToSpend = budget - spent;
    const percentageSpent = (100 * spent) / budget

    // calcul des dépenses du mois précédents
    const budgetData = prixParMois.map((d) => {return {month: monthsMaps[d.month], spend: d.spent}})
    
    const lastSpent = budgetData.map((object, index) => {
        return (
            <View style={styles.row} key={`${index}-${object.month}-${object.spend}`}>
                <Text>{object.month}</Text>
                <Text>{object.spend}€</Text>
            </View>
        );
    });
    console.log('GRAPH :', budgetData)
    return (
        <SafeAreaView style={styles.background}>

            <View style={styles.titleContainer}>
                <Text style={globalStyles.header}>Mon Budget</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Mois en cours</Text>
                <View style={styles.listContainer}>
                    { categoriesChart.length === 0 ?
                        <Text style={styles.noListText}>Vous n'avez pas encore de liste courses</Text>
                        :
                    <>
                        <PieChart
                            data={categoriesChart}
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
                    </>
                    }

                </View>

                <BudgetRestant listes={userListes} userBudget={user.budget} />
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
    },
    noListText: { 
        fontSize: 24, 
        color: '#2f4f4f',
    }
})
