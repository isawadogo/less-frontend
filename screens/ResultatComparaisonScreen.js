import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function ResultatComparaisonScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);
  const [isReady, setIsReady]= useState(true);

  const listeName = useSelector((state) => state.user.value.currentListeName);

  const dispacth = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  console.log('Resultat comparaison - user details : ', user);
  console.log('Resultat comporation - selected Produits : ', produitsSelected);
  if (!isReady) {
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

      <Text> Nom de la liste : {listeName}</Text>
        <Text>Meilleur résultat</Text>
        <Button 
          title='Continuer'
        />
        <Text>Autres résultats</Text>
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
