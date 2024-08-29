import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedListe } from '../reducers/user';
import { frontConfig } from '../modules/config';

function ResultatComponent({ resultat, onSelect }) {
  return (
      <View style={{ flex: 1, width: '85%', borderRadius: 10, backgroundColor: '#efefef', paddingBottom: 5, margin: 5}}>
        <Text style={{ textTransform: 'uppercase', paddingLeft: 10, paddingTop: 10}}>Enseigne : {resultat.nom}</Text>
        {resultat.criteresPercentage.map((c, i) => {
          return <Text style={{ paddingLeft: 20}} key={`${resultat.enseigneId}-${c.nom}`}>{c.nom} : {c.note.toFixed(2)} %</Text>
        })}
        <Text>Prix : {resultat.produits.reduce((a,v) => a + (v.produit.prix * v.quantite), 0).toFixed(2)}</Text>
        <Text>Conformité : {resultat.conformite}%</Text>
        <Button 
          title='Choisir'
          onPress={onSelect}
        />
      </View>
    )
}

export default function ResultatComparaisonScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);
  const [isReady, setIsReady]= useState(false);
  const [ listeChoisie, setListeChoisie ] = useState({});

  const listeName = useSelector((state) => state.liste.value.listeName);
  const enseignes = useSelector((state) => state.user.value.enseignesList);
  const nbrProduitsRef = useRef(0);
  const [ resultatComp, setResultComp] = useState([])

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      let ignore = false;
      if (!ignore) {
        getResultatsComparaison();
      }
      return () => {ignore = true}
    })();
  }, []);

  const userCriteres = []
  for (const v of Object.keys(user.criteres)) {
    if (user.criteres[v] === true) {
      userCriteres.push(v)
    }
  }
  const produits = produitsSelected.map((p) => {return {...p.produit, quantite: p.count}})
  const postData = {
    criteres: userCriteres,
    produits: produits,
    enseignes: enseignes,
  }
  const getResultatsComparaison = async () => {
    try {
      const conReq = await fetch(frontConfig.backendURL + '/listes/calcul', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "authorization": user.token},
        body: JSON.stringify(postData)
      });
      if (!conReq.ok) {
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      if (resJson.result) {
        setResultComp(resJson.resultComparaison)
        console.log('Resultat comp', JSON.stringify(resultatComp));
      } else {
        console.log('Failed to create liste. Response from the backend is : ', resJson.error);
      }
    } catch(err) {
      console.log('Create liste - Connection to the backend failed');
      console.log(err.stack);
    }
  }

  if (!resultatComp || resultatComp.length === 0 ) {
    return(
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>Nous recherchons les meilleurs matchs ...</Text>
      </SafeAreaView>
    )
  }
  console.log('Resultats comp - 2 : ', JSON.stringify(resultatComp));
  
  nbrProduitsRef.current = produitsSelected.reduce((a,v) => a = a + v.count, 0);
  let resultComparaison = resultatComp;
  
  const handleChoose = () => {
    dispatch(setSelectedListe(listeChoisie));
    navigation.navigate('ResultasDetailArticlesScreen');
  }
  resultComparaison.sort((a,b) => b.conformite - a.conformite);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Button title='retour' onPress={() => navigation.goBack()} />
      <Text style={{color: 'green', alignSelf: 'flex-end'}}>Nombres produits : {nbrProduitsRef.current}</Text>
      <Text>{user.prenom} {user.nom}</Text>
      <Text>{user.email}</Text>
      <Text>Bonjour {user.prenom}</Text>
      <Text> Nom de la liste : {listeName}</Text>
        {resultComparaison.map((r, i) => {
          if (i === 0) {
            return(
              <>
              <Text>Meilleur résultat</Text>
              <ResultatComponent resultat={r} onSelect={() => setListeChoisie(r)} key={`${i}-${r.enseigneId}`}/>
              <Text>Autres résultats</Text>
              </>
            )
          } else {
            return <ResultatComponent resultat={r} onSelect={() => setListeChoisie(r)} key={`${i}-${r.enseigneId}`}/>
          }
        })}
        <Button 
          title='Continuer'
          onPress={handleChoose}
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
