import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, } from 'react-native';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit } from '../reducers/user';
import { LessButton, ProduitsComponent } from '../modules/components';

import { frontConfig } from '../modules/config';

export default function CreerListeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);

  const [categories, setCategories] = useState([]);
  const [nomListe, setNomListe] = useState('');
  const listeName = useSelector((state) => state.user.value.currentListeName);
  const [selectedCat, setSelectedCat] = useState({})

  const dispacth = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      setNomListe(listeName);
      // Get categories
      try {
        const conReq = await fetch(frontConfig.backendURL + '/produits/categories', {
          method: 'GET',
          headers: { "Content-Type": "application/json", "authorization": user.token},
        });
        if (!conReq.ok) {
          throw new Error('Connection returned a non 200 http code');
        }
        const resJson = await conReq.json();
        //console.log('connection result : ', resJson);
        if (resJson.result) {
            //console.log(' Choisir liste produit - categories - jsonres : ', resJson);
            //setCategories(resJson.categories);
            setCategories(resJson.categories.map((c,i) => {
              return {nom: c, id: i}
            }));
            if (resJson.categories.length > 0) {
              //setSelectedCat(categories[0]);
              setSelectedCat({nom: resJson.categories[0], id: 0});
            }
        } else {
          console.log('Failed to get categories list from the backend : ', resJson.error);
        }
      } catch(err) {
        console.log('Choisir porduits liste - Connection to the backend failed');
        console.log(err.stack);
      }
    })();
  }, []);

  const addProduitToList = (p) => {
    dispacth(addProduit(p));
  }

  const removeProduitFromList = (p) => {
    dispacth(removeProduit(p));
  }

  const handleContinuer = () => {
    if (produitsSelected.length > 0) {
      navigation.navigate('RecapListeProduits')
    }
  }

  //console.log(' Choisir liste produit - user details : ', user);
  //console.log('Choisir liste produits - categories : ', categories);
  //console.log('Choisir liste produits - selected categorie : ', selectedCat);
  //console.log('Choisir liste produits - selected Produits : ', produitsSelected);
  if (!selectedCat || selectedCat === undefined) {
    return(
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>Retrieving categories ...</Text>
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

      <View style={styles.catContainer}>
      {
        categories.map((c, i) => {
          return (
            <LessButton 
              onChange={() => setSelectedCat(c)} 
              key={i} 
              pressed={c.nom===selectedCat.nom}
              texte={c.nom}  
            />
          )
        })
      }      
      </View>
      <Text>Produits : </Text>
        <ProduitsComponent 
          categorie={selectedCat.nom} 
          key={selectedCat.id} 
          onDecrease={removeProduitFromList} 
          onIncrease={addProduitToList}
        />
        <Button 
          title='Continuer'
          onPress={handleContinuer}
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
  catContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'right',
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    height: 40,
    margin: 10,
    padding: 'auto',
    color: 'red'
  },
});
