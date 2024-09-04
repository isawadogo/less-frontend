import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BudgetRestant = ({ listes, userBudget }) => {

  let budgetConsomme = listes.reduce((a, v) => a + v.prix,0);
  budgetConsomme = budgetConsomme >= userBudget? userBudget: budgetConsomme;
  const budget = userBudget === 0 ? budgetConsomme : userBudget;
  let progresBarPercentage = budgetConsomme/budget*100;
  let reste = budget - budgetConsomme;
  reste = reste <=0 ? 0: reste;

  if (budgetConsomme === 0) {
    progresBarPercentage = 15;
  }
  
  return (
    <>
      <View style={styles.contain}>
        <Text style={styles.subTilte}>Reste {reste.toFixed(2)}€ à dépenser</Text>
        <View style={styles.barContainer}>
          <Text style={styles.progressBar}>{budgetConsomme.toFixed(2)}€</Text>
          <Text style={styles.budgetUser}>{userBudget}€</Text>
        </View>
      </View>
    </>
  )
}

const budgetPos = screenWidth - 70;
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
  },
  barContainer: {
    height: 25,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  budgetUser: {
    color: '#2B0D35',
    fontFamily:'Raleway-Medium',
  },
  progressBar: {
    height: 25,
    borderRadius: 15,
    fontFamily: 'Raleway-Regular',
    backgroundColor: '#2B0D35',
    color: '#fff',
  },

});

export default BudgetRestant;