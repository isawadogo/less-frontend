/* IMPORTS */

// import React et React Native
import { TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Text, StatusBar, View, Pressable } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { removeListe } from '../reducers/user';
// import modules et composants
import { getEnseignesList } from '../modules/listesFunctions';
import { frontConfig } from '../modules/config';
import { getUserListes } from '../modules/listesFunctions';
// import icones
//import { TouchableOpacity } from 'react-native-gesture-handler';

/* FONCTION CREER LISTE */

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
  const [userListes, setUserListes] = useState([]);
  const [isAlreadySaved, setIsAlreadySaved] = useState(false);
  const [saveMessage, setSaveMessage ] = useState('');

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
      getUserListes(user.token, user.id).then(listes => {
        setUserListes(listes);
        //setIsReady(true)
      });
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
    if (userListes.some((l) => l.nom.toLowerCase() === listeName)) {
      setIsAlreadySaved(true);
      setSaveMessage('Votre liste a déjà  été sauvegardée')
      return;
    };
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
        setSaveMessage('Votre liste a été sauvegardée')
        setIsListeSaved(true);
        setIsAlreadySaved(true);
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
      <View style={styles.topContainer}>
        <Text style={styles.ListName}>{listeName}</Text>
        <Text style={styles.productNbr}>{produitsSelected.reduce((a,v) => a = a + v.count, 0)}</Text>
      </View>
      
      <Text style={styles.enseigne}>{listeChoisie.nom} :</Text>

      <ScrollView style={styles.scrollView}>
        <View>
            {articlesDetails.map((a,i) => {
              return (
                <View key={`${i}`}>
                  <Text style={styles.categorieText}>{a.categorie}</Text>
                  {a.produits.map((p,j) => {
                    return (
                      <View style={styles.productContainer} key={p.produit._id} >
                        <View style={styles.productSubContainer}>
                          <Text style={styles.productName}>{p.produit.nom}</Text>
                          <Text style={styles.productPrice}>{p.quantite * p.produit.prix}€</Text>
                        </View>

                        <Text style={styles.productQuantity}>({p.quantite} x {p.produit.prix}€)</Text>

                        <View style={styles.totalContainer}>
                          {p.criteres.map((c) => <Text style={styles.criteresBool} key={`${j}-${p.produit._id}_${c}`}>✔️ {c}</Text>)}
                        </View>

                      </View>
                    )
                  })}
                </View>
              )
            })}
        </View>
      </ScrollView>
      
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Prix total pour cette liste : </Text>
        <Text style={styles.totalNumber}>{listeChoisie.produits.reduce((a, v) => a + (v.produit.prix * v.quantite), 0).toFixed(2)}€</Text>
      </View>

      <TouchableOpacity style={styles.buttonBlue} onPress={handleValider} disabled={isAlreadySaved}>
          <Text style={styles.textButtonBlue}>Valider cette liste</Text>
      </TouchableOpacity>    
          
      <Text style={styles.textRetour}>{saveMessage}</Text>

      {isListeSave && 
        <>
          <TouchableOpacity style={styles.buttonBlue} onPress={handleRetour}>
            <Text style={styles.textButtonBlue}>Retourner à l'accueil</Text>
          </TouchableOpacity>
        </>
      }

   
    </SafeAreaView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
  },
  topContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  ListName:{
    fontFamily: 'Raleway-Bold',
    fontSize: 24,
    color:'#25000D'
  },
  productNbr:{
    color: 'white',
    backgroundColor: '#7CD6C1',
    alignSelf: 'flex-end',
  },
  enseigne:{
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    color:'#25000D',
    marginBottom: 15
  },
  categorieText:{
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    color: '#25000D',
    marginBottom: 10,
  },
  productContainer:{
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10
  },
  productSubContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName:{
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#4F4F4F',
  },
  productPrice:{
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    color: '#7CD6C1',
  },
  productQuantity:{
    fontFamily: 'Raleway-Regular',
    fontSize: 10,
    color: '#A3A3A3',
    alignSelf: 'flex-end'
  },
  criteresBool:{
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#4F4F4F',
  },
  icon:{
    color: '#DCA2A2',
    padding: 10
  },
  totalContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'flex-end'
  },
  totalText:{
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    color:'#25000D',
    marginBottom: 15
  },
  totalNumber:{
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    color:'#25000D',
    marginBottom: 15
  },
  buttonBlue: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#7CD6C1',
  },
  textButtonBlue: {
    fontSize: 13,
    fontFamily: 'Raleway-Medium',
    color: 'white',
  },
  textRetour: {
    paddingTop: 10, 
    paddingBottom: 10, 
    fontWeight: 'bold', 
    alignSelf: 'center',
    color: '#800000'
  },


});
