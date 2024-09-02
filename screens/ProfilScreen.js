/* IMPORTS */

// import React et React Native
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, Pressable,TouchableOpacity, Image, StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
// import Redux et Reducer
import { useSelector } from 'react-redux';
// import Icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function CritereElement({ isPresent, critere }) {
  return (
    <>
      {isPresent &&
        <Text style={styles.criteres}>{critere}</Text>
      }
    </>
  )
}
/* FONCTIONS PROFIL */

export default function ProfilScreen({ navigation }) {

  const user = useSelector((state) => state.user.value.userDetails);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (() => {
      if (!user.email) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  const criteresMapping = [
    { dbName: 'bio', name: 'Bio' },
    { dbName: 'local', name: 'Local' },
    { dbName: 'faibleEnSucre', name: 'Faible en sucre' },
    { dbName: 'vegan', name: 'Vegan' },
    { dbName: 'premierPrix', name: 'Premier prix' },
    { dbName: 'vegetarien', name: 'Végétarien' },
    { dbName: 'faibleEnMatiereGrasse', name: 'Faible en matière grasse' },
    { dbName: 'faibleEmpreinte', name: 'Faible empriente' }
  ]

  if (!user.criteres) {
    return (
      <View></View>
    )
  }



  return (
    <SafeAreaView style={styles.back}>
      <Image source={require('../assets/profil.jpg')} style={styles.image} />
      <View style={styles.block1}>
        <Text style={styles.userProfil}> PROFIL</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { screen: 'ModifierProfil' })} >
          <FontAwesomeIcon icon={faPenToSquare} style={styles.icone} />
        </TouchableOpacity>
        <View style={styles.infos}>
          <View style={styles.row}>
            {/* <Text style={styles.type}>prenom : </Text> */}
            <Text style={styles.info}> {user?.prenom || 'Jen'} {user?.nom.toUpperCase() || 'Andriamboavonjy'}</Text>
          </View>
          <View style={styles.row}>
            {/* <Text style={styles.type}>email: </Text> */}
            <Text style={styles.info}> {user?.email || 'Email'}</Text>
          </View>
          <View style={styles.budgets}>
            <Text style={styles.budget}> Budget mensuel</Text>
            <Text style={styles.montant}> {user?.budget || '500€'}</Text>
          </View>
        </View>
        <View style={styles.ensemble}>
            <Text style={styles.text}>Critères de consommation</Text>
          <View style={styles.trois}>
            {criteresMapping.map((c, i) =>
              <CritereElement isPresent={user.criteres[c.dbName]} critere={c.dbName} key={`${i}-${c.dbName}`} />
            )}
          </View>
        </View>
        <ScrollView>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Aide' })}>
            <Text>Aide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Langue' })}><Text>Langue</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Conditions Générales' })}><Text>Conditions Générales</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Reglage des notifications' })}><Text>Reglage des notifications</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'ModifierMotDePasse', name: 'Modifier mon mot de passe' })}><Text>Changer mon mot de passe</Text></TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({

  back: {
    flex: 1,
    padding: 15,
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    width: 500,
    height: 250,
    resizeMode: 'cover'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
    width: '90%',
    marginLeft: 10,
    marginBottom: 5,
   // elevation: 2,
  },
  profil: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 25,
    textAlign: 'center',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    top: 12,
    fontSize: 35,
    fontWeight: 'bold',
  },
  block1: {
    width: '90%',
    marginTop: 20,
    height: 490,
    marginHorizontal: 'auto',
    //flex: 1,
    //width: 320,
    //height: 490,
    //bottom: 50,
    //position: 'absolute',
    //zIndex: 10,
    //top: 255,
    //start: 35,
    //backgroundColor: 'white',
    borderColor: '#2B0D35',
    borderWidth: 2,
    //padding: 15,
    opacity: 0.9,
  },
  userProfil: {
    textAlign: 'center',
    right: 10,
    fontWeight: 'bold',
    fontSize: 19,
  },

  icone: {
    height: 15,
    bottom: 20,
    start: 260,
  },
  text: {
    fontWeight: 'bold',
    paddingTop: 7,
    paddgingBottom: 7,
    //start: 24,
    color: 'white',
  },
  infos: {
    //top: 5,
    paddingStart: 10,
  },
  budgets: {
    borderColor: 'black',
    backgroundColor: '#2B0D35',
    borderWidth: 1,
    borderRadius: 15,
    width: '95%'
  },
  budget: {
    margin: 3,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  montant: {
    margin: 1,
    textAlign: 'center',
    color: 'white',
    paddingBottom: 3,
  },
  info: {
    //padding: 4,
    fontWeight: 'bold',
    color: 'black',
   // start: 5,
    paddingBottom: 5,
  },
  toutcritere: {
    flexDirection: 'row',
    padding: 10,
    paddingStart: 17,
  },
  trois: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 7,
    flexWrap: 'wrap',
  },
  ensemble: {
    borderColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    margin: 7,
    backgroundColor: '#2B0D35',
    borderRadius: 15,
    width: '95%',
    //gap: 2,
  },
  criteres: {
    margin: 6,
    padding: 4,
    fontWeight: 'bold',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomEndRadius: 15,
  },
})