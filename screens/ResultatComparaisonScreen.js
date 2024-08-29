/* IMPORTS */

// import React et React Native
import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, Pressable} from 'react-native';
import { useState, useEffect } from 'react';
// import Redux et Reducer
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedListe } from '../reducers/user';
// import Icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import des modules et composants
import { frontConfig } from '../modules/config';
import { getEnseignesList, getProduits } from '../modules/listesFunctions';

/* FONCTION CREER LISTE */

function ResultatComponent({ resultat, onSelect }) {
  return (
      <View style={styles.resultatContainer}>

        <Text style={styles.titleEnseigne}>{resultat.nom}</Text>
        <View style={styles.critereContainer}>
          {resultat.criteresPercentage.map((c, i) => {
            return <Text style={styles.critereText} key={`${resultat.enseigneId}-${c.nom}`}>{c.nom} : {c.note.toFixed(2)} %</Text>
          })}
        </View>
        
        <Text style={styles.conformText}>Conforme à {resultat.conformite}%</Text>
        <View style={styles.critereContainer}>
          <Text style={styles.critereText}>Montant</Text>
          <Text style={styles.priceText}>{resultat.produits.reduce((a,v) => a + (v.produit.prix * v.quantite), 0).toFixed(2)}€</Text>
        </View>

        <Pressable style={styles.buttonBlue} onPress={onSelect}>
          <Text style={styles.textButtonBlue}>Choisir cette liste</Text>
        </Pressable>

      </View>
    )
}

export default function ResultatComparaisonScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const resultatComp = useSelector((state) => state.user.value.liste);
  //const resultatComp = useSelector((state) => state.liste.value.liste);
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);
  const [isReady, setIsReady]= useState(false);
  const [ listeChoisie, setListeChoisie ] = useState({});
  const [ detailedResults, setDetailedResults] = useState([]);

  const listeName = useSelector((state) => state.user.value.listeName);
  //const listeName = useSelector((state) => state.liste.value.listeName);
  const [ enseignes, setEnseignes ] = useState([]);
  const [ resultats, setResultats ] = useState([]);

  const dispatch = useDispatch();
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

  if (!resultatComp.resultat ) {
    return(
      <SafeAreaView style={styles.container}>
        <FontAwesomeIcon icon={faSpinner}/>
        <Text style={styles.loadingText}>nous sommes en train de rechercher les meilleurs matchs</Text>
      </SafeAreaView>
    )
  }
  const catSelected = [...new Set(produitsSelected.map((e) => e.produit.categorie))].map((e, i) => {return {nom: e, id: i}})
  const criteresUtilisateur = [ ...new Set(resultatComp.resultat.filter((f) => f.critere !== '_id' && user.criteres[f.critere] ).map((c) => c.critere)) ]
  const resultComparaison = resultatComp.resultat.reduce((a, v, i, res) => {
    const isKeyPresent = a.some((k) => k.enseigneId == v.enseigneId);
    if (!isKeyPresent) {
      let tmp = { 
        enseigneId: v.enseigneId,
        nom: v.enseigneNom,
        criteresPercentage: [],
        produits: [],
      }
      criteresUtilisateur.map((c) => {
        const nbCrit = res.filter((r) => r.critere === c && v.enseigneId === r.enseigneId);
        const poids = nbCrit.reduce((acc, val) => acc + val.ponderation, 0);
        const totalCrit = produitsSelected.length;
        const moyenne = totalCrit !== 0 ? (poids/nbCrit.length)*100: 0;
        tmp['criteresPercentage'].push({nom: c, note: moyenne});
      });
      catSelected.map((d) => {
        res.filter((b) => b.enseigneId === v.enseigneId && v.categorie === d.nom).map((f) => {
          if (!tmp['produits'].some((x) => x.nomProduit === f.nomProduit )) {
            let crits = [];
            if (Object.keys(f.produit).length > 0) {
              criteresUtilisateur.map((c) => {
                if (f.produit[c]) {
                  crits.push(c);
                }
              })
              tmp['produits'].push({categorie: f.categorie, nomProduit: f.nomProduit, produit: f.produit, criteres: crits, quantite: f.quantite});
            } else {
                // Si aucun produit ne match aucun des criteres de l'utilisateur, recuperer le produit le moins cher
                const url = frontConfig.backendURL + '/produits/categories/' + f.categorie + '?nomProduit=' + f.nomProduit + '&page=1&limit=1' 
                async function fetchData() {
                    const response = await fetch(url,
                    {
                      method: 'GET',
                      headers: { "Content-Type": "application/json", "authorization": user.token},
                    }
                  );
                  const data = await response.json();
                  return data.produits;
                }

                async function getData() {
                  const produitDetails = await fetchData();
                  
                  if (produitDetails && produitDetails.length > 0) {
                    if (!tmp['produits'].some((x) => x.nomProduit === produitDetails[0].nom )) { 
                      tmp['produits'].push({categorie: f.categorie, nomProduit: f.nomProduit, produit: produitDetails[0], criteres: crits, quantite: f.quantite});
                    }
                  } else {
                    tmp['produits'].push({categorie: f.categorie, nomProduit: f.nomProduit, produit: {}, criteres: crits, quantite: f.quantite});
                  }
                }
                getData();
            }
        }
        });
          if (tmp['produits']) {
            tmp['produits'].sort((c, d) => d.criteres.length - c.criteres.length);
          }
      });
      
      tmp['conformite'] = (tmp.criteresPercentage.reduce((acc, val) => acc + val.note, 0)/criteresUtilisateur.length).toFixed(2);
      return a.concat(tmp)
    } else { return a}
  }, [])
  const handleChoose = () => {
    dispatch(setSelectedListe(listeChoisie));
    navigation.navigate('ResultasDetailArticlesScreen');
  }
  resultComparaison.sort((a,b) => b.conformite - a.conformite);

if (!resultComparaison) {
    return(
      <SafeAreaView style={styles.container}>
        
        <Text style={{fontWeight: 'bold'}}>Nous recherchons les meilleurs matchs ...</Text>
      </SafeAreaView>
    )
  }

  //setDetailedResults(resultComparaison);
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topContainer}>
        <Text style={styles.listTitle}>{listeName}</Text>
        <Text style={styles.nbrItem}>{produitsSelected.reduce((a,v) => a = a + v.count, 0)}</Text>
      </View>
        
      <Text style={styles.subTitle}>Meilleur résultat</Text>
      <ResultatComponent resultat={resultComparaison[0]} onSelect={() => setListeChoisie(resultComparaison[0])} key={resultComparaison[0].enseigneId}/>
      
      <Text style={styles.subTitle}>Autres résultats</Text>

      <ScrollView style={styles.scrollView}>
        {resultComparaison.slice(1).map((r, i) => {
          return <ResultatComponent resultat={r} onSelect={() => setListeChoisie(r)} key={r.enseigneId}/>
        })}
      </ScrollView>

      <Pressable style={styles.buttonViolet} onPress={handleChoose}>
          <Text style={styles.textButtonBlue}>Continuer</Text>
      </Pressable>

    </SafeAreaView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  loadingText:{
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
  
  topContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  listTitle:{
    fontFamily: 'Raleway-Bold',
    fontSize: 24,
    color: '#25000D'
  },

  nbrItem:{
    color: 'white',
    backgroundColor: '#7CD6C1',
    paddingHorizontal: 5,
    borderRadius: 20,
    alignSelf: 'flex-end'
  },

  subTitle:{
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

  critereContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  critereText:{
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    color: '#4F4F4F',
  },

  conformText:{
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
    color: '#4F4F4F',
    marginBottom: 10,
  },

  priceText:{
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
