/* IMPORTS */

// import React et React Native
import { TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Text, StatusBar, View } from 'react-native';
import { useState, useEffect } from 'react';
// import Redux et Reducer
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedListe } from '../reducers/user';
import { frontConfig } from '../modules/config';
// import Icones

/* FONCTION CREER LISTE */

function ResultatComponent({ resultat, onSelect, isSelected }) {
  //console.log('RES DETAILS : ', resultat);
  let selectText = 'Choisir cette liste'
  let styleButton = styles.buttonBlue;

  const handleSelect = () => {
    onSelect();
  }
  if (isSelected) {
    selectText = 'Liste Selectionnée'
    styleButton = {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#191970',
  };
  }
  
  return (
    <View style={styles.resultatContainer}>

      <Text style={styles.titleEnseigne}>{resultat.nom}</Text>
      <View style={styles.critereContainer}>
        {resultat.criteresPercentage.map((c, i) => {
          return <Text style={styles.critereText} key={`${resultat.enseigneId}-${c.nom}`}>{c.nom} : {c.note.toFixed(2)} %</Text>
        })}
      </View>
      <Text>Distance : {resultat.distance.toFixed(2)} Km</Text>
      <Text style={styles.conformText}>Conforme à {resultat.conformite}%</Text>
      <View style={styles.critereContainer}>
        <Text style={styles.critereText}>Montant</Text>
        <Text style={styles.priceText}>{resultat.produits.reduce((a, v) => a + (v.produit.prix * v.quantite), 0).toFixed(2)}€</Text>
      </View>

      <TouchableOpacity style={styleButton} onPress={handleSelect}>
        <Text style={styles.textButtonBlue}>{selectText}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default function ResultatComparaisonScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);
  //const [isReady, setIsReady]= useState(false);
  const [listeChoisie, setListeChoisie] = useState({});

  const listeName = useSelector((state) => state.liste.value.listeName);
  const enseignes = useSelector((state) => state.user.value.enseignesList);
  const [resultatComp, setResultComp] = useState([])

  const [ isResultatSelected, setIsResultatSelected] = useState(true);

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
      return () => { ignore = true }
    })();
  }, []);

  const userCriteres = []
  for (const v of Object.keys(user.criteres)) {
    if (user.criteres[v] === true) {
      userCriteres.push(v)
    }
  }
  const produits = produitsSelected.map((p) => { return { ...p.produit, quantite: p.count } })
  const postData = {
    criteres: userCriteres,
    produits: produits,
    enseignes: enseignes,
    userCoordinates: user.adresses.find((a) => a.isDefault),
  }
  //console.log(JSON.stringify(postData))
  const getResultatsComparaison = async () => {
    try {
      const conReq = await fetch(frontConfig.backendURL + '/listes/calcul', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "authorization": user.token },
        body: JSON.stringify(postData)
      });
      if (!conReq.ok) {
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      if (resJson.result) {
        setResultComp(resJson.resultComparaison)
        //console.log('Resultat comp', JSON.stringify(resultatComp));
      } else {
        console.log('Failed to create liste. Response from the backend is : ', resJson.error);
      }
    } catch (err) {
      console.log('Create liste - Connection to the backend failed');
      console.log(err.stack);
    }
  }

  if (!resultatComp || resultatComp.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontWeight: 'bold' }}>Nous recherchons les meilleurs matchs ...</Text>
      </SafeAreaView>
    )
  }
  //console.log('Resultats comp - 2 : ', JSON.stringify(resultatComp));

  let resultComparaison = resultatComp;
  // Add distance to every enseigne

  const handleChoose = () => {
    if (Object.values(listeChoisie).length > 0) {
      dispatch(setSelectedListe(listeChoisie));
      navigation.navigate('ResultasDetailArticlesScreen');
    } else {
      setIsResultatSelected(false)
    }
  }
  resultComparaison.sort((a, b) => b.conformite - a.conformite);

  //setDetailedResults(resultComparaison);
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topContainer}>
        <Text style={styles.listTitle}>{listeName}</Text>
        <Text style={styles.nbrItem}>{produitsSelected.reduce((a, v) => a = a + v.count, 0)}</Text>
      </View>
      {!isResultatSelected && <Text style={{fontWeight: 'bold', color: 'red'}}>Veuillez sélectionner une liste</Text>}
      <Text style={styles.subTitle}>Meilleur résultat</Text>
      <ResultatComponent resultat={resultComparaison[0]} onSelect={() => {setIsResultatSelected(true); setListeChoisie(resultComparaison[0])}} key={resultComparaison[0].enseigneId} isSelected={listeChoisie.nom === resultComparaison[0].nom} />

      <Text style={styles.subTitle}>Autres résultats</Text>

      <ScrollView style={styles.scrollView}>
        {resultComparaison.slice(1).map((r, i) => {
          return <ResultatComponent resultat={r} onSelect={() => {setIsResultatSelected(true);setListeChoisie(r)}} key={r.enseigneId} isSelected={listeChoisie.nom === r.nom} />
        })}
      </ScrollView>

      <TouchableOpacity style={styles.buttonViolet} onPress={handleChoose}>
        <Text style={styles.textButtonBlue}>Continuer</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  loadingText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    color: '#25000D'
  },

  container: {
    flex: 1,
    padding: 15,
    paddingTop: StatusBar.currentHeight,
  },

  scrollView: {
    borderBlockColor: 'green',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 20,
    padding: 10
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  listTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 24,
    color: '#25000D'
  },

  nbrItem: {
    color: 'white',
    backgroundColor: '#7CD6C1',
    paddingHorizontal: 5,
    borderRadius: 20,
    alignSelf: 'flex-end'
  },

  subTitle: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
    color: '#25000D',
    marginBottom: 10,
  },

  resultatContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10
  },

  titleEnseigne: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    color: '#4F4F4F',
    marginBottom: 10,
  },

  critereContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  critereText: {
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    color: '#4F4F4F',
  },

  conformText: {
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
    color: '#4F4F4F',
    marginBottom: 10,
  },

  priceText: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    color: '#25000D',
    marginBottom: 10,
  },

  buttonBlue: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#7CD6C1',
  },

  buttonViolet: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#25000D',
    marginTop: 15
  },

  textButtonBlue: {
    fontSize: 13,
    fontFamily: 'Raleway-Medium',
    color: 'white',
  },

});

