import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, } from 'react-native';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit } from '../reducers/user';
import { ProduitRecapComponent } from '../modules/components';


export default function RecapListeProduitsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);

  const [nomListe, setNomListe] = useState('');
  const listeName = useSelector((state) => state.user.value.currentListeName);

  const catSelected = [...new Set(produitsSelected.map((e) => e.produit.categorieDeProduit))].map((e, i) => {return {nom: e, id: i}})
  
  const dispacth = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      setNomListe(listeName);
      // Get categories
    })();
  }, []);

  const addProduitToList = (p) => {
    dispacth(addProduit(p));
  }

  const removeProduitFromList = (p) => {
    dispacth(removeProduit(p));
  }

  console.log('Recap liste produit - user details : ', user);
  console.log('Recap liste produits - selected Produits : ', produitsSelected);
  console.log('Recap liste produits - selected categories: ', catSelected);
  if (!catSelected) {
    return(
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>Retrieving produits ...</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Button title='retour' onPress={() => navigation.goBack()} />
      <Text style={{color: 'green', alignSelf: 'flex-end'}}>Nombres produits : {produitsSelected.reduce((a,v) => a = a + v.count, 0)}</Text>
      <Text>{user.prenom} {user.nom}</Text>
      <Text>{user.email}</Text>
      <Text>Bonjour {user.prenom}</Text>

      <Text> Nom de la liste : {nomListe}</Text>

      <Text>Produits : </Text>
      { catSelected.map((c) => {
          return (
            <ProduitRecapComponent 
              categorie={c.nom} 
              key={c.id} 
              onDecrease={removeProduitFromList} 
              onIncrease={addProduitToList}
            />
          )
        })
      }
        <Button 
          title='Valider et sommettre à comparaison'
          onPress={() => navigation.navigate('ResultatComparaison')}
        />
        <Text>Reprendre une liste enregistrée</Text>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
