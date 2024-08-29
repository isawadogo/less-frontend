/* IMPORTS */

// import React et React Native
import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
// import des modules
import { ProduitRecapComponent } from '../modules/components';
import { evaluateCritere, getEnseignesList } from '../modules/listesFunctions';
// import Redux et Reducer
import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit, updateListe } from '../reducers/user';
// import { updateListe } from '../reducers/liste';

/* FONCTION LISTE PRODUIT */

export default function RecapListeProduitsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);

  const [ enseignes, setEnseignes ] = useState([]);

  const [nomListe, setNomListe] = useState('');
  const listeName = useSelector((state) => state.user.value.listeName);
  //const listeName = useSelector((state) => state.liste.value.listeName);
  const resultatComp = useSelector((state) => state.user.value.liste);
  //const resultatComp = useSelector((state) => state.liste.value.liste);

  const catSelected = [...new Set(produitsSelected.map((e) => e.produit.categorie))].map((e, i) => {return {nom: e, id: i}})
  
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      setNomListe(listeName);
      getEnseignesList(user.token).then((ens) => { 
        setEnseignes([...enseignes, ...ens]);
      })
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

  const handleContinue = () => {
  let resultatComparaison = [];
  //const criteres = user.criteres.filter((e) => e !== '_id' && user.criteres[e])
  for (const critere in user.criteres) {
    if (critere === '_id' || !user.criteres[critere]) { continue ;}
    //console.log('Resultat comparaisons - managing critere : ', critere);
    const prod = produitsSelected.map((e) => e.produit);
    //console.log('result comparaisons - produits nom : ', prod);
    prod.map((p) => {
      //console.log(`CRIT PARAMS : ${critere} - ${p.categorie} - ${p.nom} - ${user.token}`)
      evaluateCritere(critere, p.categorie, p.nom, user.token).then((produits) => {
          enseignes.map((e) => {
            let enseigneMatchProduits = produits.filter((q) => q.enseigne._id === e._id );
            enseigneMatchProduits.sort((a, b) => a.prix - b.prix);
            const produitSelectList = enseigneMatchProduits.filter((value, index, self) => 
              index === self.findIndex((t) => (
                t._id === value._id
              ))  );
            const produitSelect = produitSelectList.length === 0 ? {} : produitSelectList[0];
            const ponderation = enseigneMatchProduits.length === 0? 0 : 1;
            const quantite = produitsSelected.find((s) => s.produit.nom === p.nom && s.produit.categorie == p.categorie).count;
            resultatComparaison = [ ...resultatComparaison, { 
                enseigneNom: e.nom, 
                enseigneId: e._id,
                categorie: p.categorie,
                nomProduit: p.nom,
                produit: produitSelect,
                critere: critere,
                ponderation: ponderation,
                quantite: quantite,
              }];
          });
          dispatch(updateListe({listeName: listeName, resultat: resultatComparaison}));
     })
   })
    }
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
