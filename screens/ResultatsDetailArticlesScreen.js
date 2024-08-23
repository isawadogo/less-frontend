import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { evaluateCritere, getEnseignesList } from '../modules/listesFunctions';

import { addListeResultat} from '../reducers/user';
import { addListe } from '../reducers/liste';

export default function ResultasDetailArticles({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const resultatComp = useSelector((state) => state.liste.value.liste);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);
  const [isReady, setIsReady]= useState(false);

  const listeName = useSelector((state) => state.user.value.currentListeName);
  const [ enseignes, setEnseignes ] = useState([]);
  const [ resultats, setResultats ] = useState([]);
  //const resRef = useRef(null);

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

//  console.log(('Resultat comparaison - enseigne list : ', enseignes));
  console.log('Resultat comparaison - user details : ', user);
  //console.log('Resultat comporation - selected Produits : ', produitsSelected);
    /*if (!isReady) {
      return(
        <SafeAreaView style={styles.container}>
          <Text style={{fontWeight: 'bold'}}>Retrieving produits ...</Text>
        </SafeAreaView>
      )
    }*/
      //let resultComparaison = []
      const criteresUtilisateur = [ ...new Set(resultatComp.resultat.filter((f) => f.critere !== '_id' && user.criteres[f.critere] ).map((c) => c.critere)) ]
      const resultComparaison = resultatComp.resultat.reduce((a, v, i, res) => {
        console.log('acc - 0: ', a);
        //console.log('enseigneId : ', v.enseigneId)
        let cle = v.enseigneId;
        //console.log('Cle : ', cle);
        const isKeyPresent = a.some((k) => k.enseigneId == v.enseigneId);
        if (!isKeyPresent) {
          //a[cle] = {}
          let tmp = { 
            enseigneId: v.enseigneId,
            nom: v.enseigneNom,
            criteresPercentage: [],
          }
          //console.log('added key : ', a)
          //console.log('acc : ', a);
          //a[cle]['nom'] = v.enseigneNom
          //console.log('acc -2: ', a);
          criteresUtilisateur.map((c) => {
            const nbCrit = res.filter((r) => r.critere === c && v.enseigneId === r.enseigneId)
            const poids = nbCrit.reduce((acc, val) => acc + val.ponderation, 0)
            const totalCrit = produitsSelected.length;
            const moyenne = totalCrit !== 0 ? (poids/nbCrit.length)*100: 0;
            tmp['criteresPercentage'].push({nom: c, note: moyenne})
          });
          console.log('crit len', criteresUtilisateur.length)
          tmp['conformite'] = (tmp.criteresPercentage.reduce((acc, val) => acc + val.note, 0)/criteresUtilisateur.length).toFixed(2)

          //console.log('acc - 3: ', a);
          return a.concat(tmp)
        } else { return a}
      }, [])
     //console.log('resultComparaison : ', resultComparaison);
  //console.log('Comparaison result = from reducer : ', JSON.stringify(resultatComp));
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
        {resultComparaison.map((r) => {
          return (
            <View style={{ flex: 1, width: '85%', borderRadius: 10, backgroundColor: '#efefef', paddingBottom: 5, margin: 5}}>
              <Text style={{ textTransform: 'uppercase', paddingLeft: 10, paddingTop: 10}}>Enseigne : {r.nom}</Text>
              {r.criteresPercentage.map((c) => {
                return <Text style={{ paddingLeft: 20}}>{c.nom} : {c.note} %</Text>
              })}
              <Text>Conformité : {r.conformite}%</Text>
            </View>
          )
        })}
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
