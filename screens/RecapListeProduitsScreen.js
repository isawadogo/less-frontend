import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, } from 'react-native';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit } from '../reducers/user';
import { ProduitRecapComponent } from '../modules/components';
import { evaluateCritere, getEnseignesList } from '../modules/listesFunctions';

//import { addListeResultat} from '../reducers/user';
import { addListe } from '../reducers/liste';

export default function RecapListeProduitsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);

  const [ enseignes, setEnseignes ] = useState([]);

  const [nomListe, setNomListe] = useState('');
  const listeName = useSelector((state) => state.user.value.currentListeName);

  const resultatComp = useSelector((state) => state.liste.value.liste);

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
      // Get categories
    })();
  }, []);

  const addProduitToList = (p) => {
    dispatch(addProduit(p));
  }

  const removeProduitFromList = (p) => {
    dispatch(removeProduit(p));
  }
    console.log('Recap liste produit - user details : ', user);
  //console.log('Recap liste produits - selected Produits : ', produitsSelected);
  //console.log('Recap liste produits - selected categories: ', catSelected);
  if (!catSelected) {
    return(
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>Retrieving produits ...</Text>
      </SafeAreaView>
    )
  }

  const handleContinue = () => {

  let resultatComparaison = [];
  for (const critere in user.criteres) {
    if (critere === '_id' || !user.criteres[critere]) { continue ;}
    //console.log('Resultat comparaisons - managing critere : ', critere);
    const prod = produitsSelected.map((e) => e.produit);
    //console.log('result comparaisons - produits nom : ', prod);
    prod.map((p) => {
      evaluateCritere(critere, p.categorie, p.nom, user.token).then((produits) => {
        //console.log(`Resultat comparaisons - produits match for critere ${critere} : ${JSON.stringify(produits)}`);
        //for (const ens of enseignes) {
        getEnseignesList(user.token).then((ens) => {
          //const proposedLists = enseignes.map((e) => {
          //  console.log('result comparaisons - managing enseigne : ', e.nom);
          //})
          ens.map((e) => {
            const enseigneMatchProduits = produits.filter((q) => q.enseigne._id === e._id )
            //console.log(`Resultat comparaison - critere ${critere}, produit enseigne ${e.nom} : ${JSON.stringify(enseigneMatchProduits)}`)
            const produitSelect = enseigneMatchProduits.length === 0 ? '' : enseigneMatchProduits[0]._id;
            const ponderation = enseigneMatchProduits.length === 0? 0 : 1;
            const quantite = produitsSelected.find((s) => s.produit.nom === p.nom && s.produit.categorie == p.categorie).count;
            resultatComparaison = [ ...resultatComparaison, { 
                enseigneNom: e.nom, 
                enseigneId: e._id,
                categorie: p.categorie,
                nomProduit: p.nom,
                listeProduits: produitSelect,
                critere: critere,
                ponderation: ponderation,
                quantite: quantite,
              }];
          });
          //console.log('esultat comparaison : ', resultatComparaison);
          dispatch(addListe({listeName: listeName, resultat: resultatComparaison}));
          //setIsReady(true);
       })
        //}
     })
   })
    }
    navigation.navigate('ResultatComparaison')
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
          onPress={handleContinue}
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
