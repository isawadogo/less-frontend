/* IMPORTS */

// import React et React Native
import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, Pressable } from 'react-native';
import { useState, useEffect, useRef } from 'react';
// import des modules
import { ProduitRecapComponent } from '../modules/components';
import { getEnseignesList } from '../modules/listesFunctions';
// import Redux et Reducer
import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit, updateListe } from '../reducers/user';
// import { updateListe } from '../reducers/liste';

/* FONCTION LISTE PRODUIT */

export default function RecapListeProduitsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);

  const nomListe = useSelector((state) => state.user.value.listeName);

  const catSelected = [...new Set(produitsSelected.map((e) => e.produit.categorie))].map((e, i) => {return {nom: e, id: i}})
  
  const nbrProduitsRef = useRef(0);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  const addProduitToList = (p) => {
    dispatch(addProduit(p));
  }

  const removeProduitFromList = (p) => {
    dispatch(removeProduit(p));
  }
  
  if (!catSelected) {
    return(
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>Retrieving produits ...</Text>
      </SafeAreaView>
    )
  }

  nbrProduitsRef.current = produitsSelected.reduce((a,v) => a = a + v.count, 0);
  if (nbrProduitsRef.current === 0 ) {
    navigation.navigate('ChoisirListeProduits');
  }

  const handleContinue = () => {
    navigation.navigate('ResultatComparaison')
  }

  return (
    <SafeAreaView style={styles.container}>
      
        
      <View style={styles.topContainer}>
        <Text style={styles.ListName}>{nomListe}</Text>
        <Text style={styles.productNbr}>{produitsSelected.reduce((a,v) => a = a + v.count, 0)}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        
        { catSelected.map((c, i) => {
            return (
              <ProduitRecapComponent 
                categorie={c.nom} 
                key={`${i}-${c.id}`} 
                onDecrease={removeProduitFromList} 
                onIncrease={addProduitToList}
              />
            )
          })
        }

      </ScrollView>
        <Pressable style={styles.buttonBlue} onPress={handleContinue}>
          <Text style={styles.textButtonBlue}>Valider et sommettre à comparaison</Text>
        </Pressable>
    </SafeAreaView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 15,
  },

  topContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  productNbr:{
    color: 'white',
    backgroundColor: '#7CD6C1',
    alignSelf: 'flex-end'
  },


  buttonBlue: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#7CD6C1',
    marginTop: 25,
  },

  textButtonBlue: {
    fontSize: 13,
    fontFamily: 'Raleway-Medium',
    color: 'white',
  },

  ListName:{
    fontFamily: 'Raleway-Bold',
    fontSize: 24,
    color:'#25000D'
  },
});
