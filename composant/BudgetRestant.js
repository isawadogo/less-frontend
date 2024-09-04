import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BudgetRestant = ({ listes, userBudget }) => {

  const budgetConsomme = listes.reduce((a, v) => a + v.prix, 0);
  const budget = userBudget === 0 ? budgetConsomme : userBudget;
  const progresBarPercentage = budgetConsomme / budget * 100;
  const reste = budget - budgetConsomme;

  return (
    <>
      <View style={styles.contain}>
        <Text style={styles.subTilte}>Reste {reste.toFixed(2)}€ à dépenser</Text>
        <View style={styles.barContainer}>
          <Text style={[styles.progressBar, { width: `${progresBarPercentage}%`, paddingLeft: 3 }]}>{budgetConsomme.toFixed(2)}€</Text>
          <Text style={styles.budgetUser}>{userBudget}€</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  contain: {
    textAlign: 'center',
  },
  subTilte: {
    marginTop: 25,
    marginBottom: 15,
    fontFamily: 'Raleway-Bold',
    color: '#2B0D35',
    fontSize: 16,
    start: 10
  },
  barContainer: {
    width: 300,
    height: 25,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    start: 10,
    top: 5


  },
  budgetUser: {
    color: '#2B0D35',
    fontWeight: 'bold',
    paddingRight: 15,
  },
  progressBar: {

    height: 20,
    borderRadius: 15,
    fontFamily: 'Raleway-Regular',
    backgroundColor: '#2B0D35',
    color: '#fff',
  },

});

export default BudgetRestant;