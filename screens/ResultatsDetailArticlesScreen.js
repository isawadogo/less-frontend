import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { evaluateCritere, getEnseignesList } from '../modules/listesFunctions';

//import { removeListe } from '../reducers/liste';
import { cleanListeDetails, removeListe } from '../reducers/user';

import { frontConfig } from '../modules/config';

export default function ResultasDetailArticlesScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const resultatComp = useSelector((state) => state.user.value.liste);
  //const resultatComp = useSelector((state) => state.liste.value.liste);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);
  const [isReady, setIsReady]= useState(false);
  const listeChoisie = useSelector((state) => state.user.value.selectedListe);
  //const listeChoisie = useSelector((state) => state.liste.value.selectedListe);

  const listeName = useSelector((state) => state.user.value.listeName);
  //const listeName = useSelector((state) => state.liste.value.listeName);
  const [ enseignes, setEnseignes ] = useState([]);
  const [ resultats, setResultats ] = useState([]);
  const [isListeSave, setIsListeSaved] = useState(false);

  const dispatch = useDispatch();
  //const catSelected = [...new Set(produitsSelected.map((e) => e.produit.categorie))].map((e, i) => {return {nom: e, id: i}})
  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      getEnseignesList(user.token).then((ens) => { 
        setEnseignes([...enseignes, ...ens]);
      })
      if (resultatComp.resultat) {
          setIsReady(true);
      }
    })();
  }, []);

  let articlesDetails = []
  const catListe = [ ...new Set(listeChoisie.produits.map((a) =>  a.categorie )) ];
  catListe.map((a, i, array) => {
    const prod = listeChoisie.produits.filter((e) => e.categorie === a && e.produit)
    if (prod) {
      articlesDetails.push({ categorie: a, produits: prod})
    }
  })

  const handleValider = async () => {
    const postData = {
      nom: listeName,
      utilisateur: user.id,
      adresseLivraison: user.adresses[0],
      prix: listeChoisie.produits.reduce((a, v) => a + (v.produit.prix * v.quantite), 0),
      listeArticles: listeChoisie.produits.map((a) => {return {
        id: a.produit._id,
        nom: a.produit.nom,
        categorieDeProduit: a.produit.categorieDeProduit,
        prix: a.produit.prix,
        quantite: a.quantite,
        enseignes: a.produit.enseigne.nom,
        criteres: a.criteres.map(a => a)
      }
      }),
    }
    try {
      const conReq = await fetch(frontConfig.backendURL + '/listes/create', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "authorization": user.token},
        body: JSON.stringify(postData)
      });
      if (!conReq.ok) {
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      //console.log('connection result : ', resJson);
      if (resJson.result) {
        setIsListeSaved(true);
      } else {
        console.log('Failed to create liste. Response from the backend is : ', resJson.error);
      }
    } catch(err) {
      console.log('Create liste - Connection to the backend failed');
      console.log(err.stack);
    }
  }
   const handleRetour = () => {
    dispatch(removeListe());
    navigation.navigate('TabNavigator', {screen: 'Accueil'});
   }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Button title='retour' onPress={() => navigation.goBack()} />
      <Text style={{color: 'green', alignSelf: 'flex-end'}}>Nombres produits : {produitsSelected.reduce((a,v) => a = a + v.count, 0)}</Text>
      <Text>{user.prenom} {user.nom}</Text>
      <Text>{user.email}</Text>
      <Text>Bonjour {user.prenom}</Text>

      <Text> detail de la liste : {listeName}</Text>
          <View style={{backgroundColor: '#f6f6f6', paddingTop: 10}}>
            <Text>Enseigne : {listeChoisie.nom}</Text>
            {articlesDetails.map((a,i) => {
              return (
                <View key={`${i}`}>
                  <Text>categorie : {a.categorie}</Text>
                  {a.produits.map((p,j) => {
                    return (
                      <View key={p.produit._id}>
                        <Text>Produit : {p.produit.nom}</Text>
                        <Text>Prix unitaire: {p.produit.prix}</Text>
                        <Text>Quantite: {p.quantite}</Text>
                        <Text>Prix total article : {p.quantite * p.produit.prix}</Text>
                        {p.criteres.map((c) => <Text key={`${j}-${p.produit._id}_${c}`}>{c}</Text>)}
                        <Text></Text>
                      </View>
                    )
                  })}
                </View>
              )
            })}
            <Text></Text>
            <Text>Prix total pour cette liste : {listeChoisie.produits.reduce((a, v) => a + (v.produit.prix * v.quantite), 0).toFixed(2)}</Text>
            <Text></Text>
          </View>
      <Button 
        title='Valider cette liste'
        onPress={handleValider}
      />
      {isListeSave && 
        <View>
          <Text>Votre liste a été suavegardée</Text>
          <Button title="Retourner à l'accueil" onPress={handleRetour} />
        </View>
      }

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
