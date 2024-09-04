import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BudgetRestant = ({listes, userBudget}) => {

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
        <Text style={styles.subTilte}>Reste {reste.toFixed(2)}€ à dépenser</Text>
        <View style={styles.barContainer}>
        <Text style={[styles.progressBar, {width:`${progresBarPercentage}%`, paddingLeft: 3}]}>{budgetConsomme.toFixed(2)}€</Text>
        <Text style={styles.budgetUser}>{userBudget}€</Text>
        </View>
    </>
  )
}

const budgetPos = screenWidth - 70;
const styles = StyleSheet.create({
  subTilte: {
    marginTop: 25,
    marginBottom: 15,
    fontFamily: 'Raleway-Bold',
    color: '#2B0D35',
    fontSize: 16,
  },
  barContainer: {
    height: 20,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetUser: {
    color: 'green',
    fontWeight: 'bold',
    position: 'absolute',
    left: budgetPos
  },
  progressBar: {
    height: 20,
    borderRadius: 20,
    fontFamily: 'Raleway-Regular',
    backgroundColor: '#2B0D35',
    color: '#fff',
  },

});

export default BudgetRestant;