import { ScrollView, SafeAreaView, Button, StyleSheet, Text, StatusBar, View, KeyboardAvoidingView, } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEnseignesList, getProduits } from '../modules/listesFunctions';
// import Icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
      <ScrollView style={styles.scrollView}>
      <Button title='retour' onPress={() => navigation.goBack()} />
      <Text style={{color: 'green', alignSelf: 'flex-end'}}>Nombres produits : {produitsSelected.reduce((a,v) => a = a + v.count, 0)}</Text>
      <Text>{user.prenom} {user.nom}</Text>
      <Text>{user.email}</Text>
      <Text>Bonjour {user.prenom}</Text>

      <Text> Nom de la liste : {listeName}</Text>
        <Text>Meilleur résultat</Text>
        <ResultatComponent resultat={resultComparaison[0]} onSelect={() => setListeChoisie(resultComparaison[0])} key={resultComparaison[0].enseigneId}/>
        <Text>Autres résultats</Text>
        {resultComparaison.slice(1).map((r, i) => {
          return <ResultatComponent resultat={r} onSelect={() => setListeChoisie(r)} key={r.enseigneId}/>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },

  loadingText:{
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
    color: '#25000D'
  },
});
