import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, Pressable } from 'react-native';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit } from '../reducers/user';
import { LessButton, ProduitsComponent } from '../modules/components';

import { frontConfig } from '../modules/config';

//import des icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

export default function CreerListeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);

  const [categories, setCategories] = useState([]);
  const [nomListe, setNomListe] = useState('');
  const listeName = useSelector((state) => state.user.value.listeName);
  //const listeName = useSelector((state) => state.liste.value.listeName);
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
        console.log('Choisir produits liste - Connection to the backend failed');
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

  if (!selectedCat || selectedCat === undefined) {
    return(
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>Retrieving categories ...</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
        
        <View style={styles.topContainer}>
          <Text style={styles.title}>{nomListe}</Text>
          <Text>Nombres produits : {produitsSelected.reduce((a,v) => a = a + v.count, 0)}</Text>
          
        </View>

        <ScrollView style={styles.catContainer} horizontal={true}>
          {
            categories.map((c, i) => {
              return (
                <LessButton
                  onChange={() => setSelectedCat(c)} 
                  key={`${i}-${c.nom}`} 
                  pressed={c.nom===selectedCat.nom}
                  texte={c.nom}  
                />
              )
            })
          }      
        </ScrollView>
        <Text style={styles.title}>Ajouter des produits :</Text>
        <ScrollView style={styles.productContainer}>
          
          <ProduitsComponent 
            categorie={selectedCat.nom} 
            key={selectedCat.id} 
            onDecrease={removeProduitFromList} 
            onIncrease={addProduitToList}
          />
        </ScrollView>

        <Pressable onPress={handleContinuer}>
          <FontAwesomeIcon icon={faCircleCheck} style={styles.icon}/>
        </Pressable>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-between',
    padding: 10,
    paddingTop: StatusBar.currentHeight,
  },

  topContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  catContainer: {
    flexDirection: 'row',
    overflow: 'scroll'
  },

  productContainer: {

  },

  title: {
    fontFamily: 'Raleway-Bold',
    color: '#25000D',
    fontSize: 18,
  },

  icon:{
    fontSize: 35,
    color: 'green'
  },

});
