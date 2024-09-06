/* IMPORTS */

// import React et React Native
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, Pressable, TouchableOpacity, Image, StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../globalStyles';
// import Redux et Reducer
import { useSelector } from 'react-redux';
// import Icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBlog, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo, faGlobe, faFileContract, faGears, faLock } from '@fortawesome/free-solid-svg-icons';

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
      <Text style={globalStyles.header}>Gestion du Compte</Text>
      <View style={styles.purple}>
      </View>
      <View style={styles.block}>
        <View style={styles.profil}>
          <ImageBackground source={require('../assets/profil.jpg')} style={styles.background}>
            <View style={styles.slogan}>

            </View >
          </ImageBackground>
          <Text style={styles.userProfil}> PROFIL</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { screen: 'ModifierProfil' })} >
            <FontAwesomeIcon icon={faPenToSquare} style={styles.icone} />
          </TouchableOpacity>
          <View style={styles.infos}>
            <View style={styles.row}>
              {/* <Text style={styles.type}>prenom : </Text> */}
              <Text style={styles.info}> {user?.prenom || 'Jen'}  {user?.nom.toUpperCase() || 'Andriamboavonjy'}</Text>
            </View>
            <View style={styles.row}>
              {/* <Text style={styles.type}>email: </Text> */}
              <Text style={styles.info}> {user?.email || 'Email'}</Text>
            </View>
            <View style={styles.budgets}>
              <Text style={styles.budget}> Budget mensuel</Text>
              <Text style={styles.montant}> {user?.budget || '500'} €</Text>
            </View>
          </View>
          <View style={styles.ensemble}>
            <View style={styles.toutcritere}>
              <Text style={styles.text}>Critères de consommation</Text>
            </View>
            <View style={styles.trois}>
              {criteresMapping.map((c, i) =>
                <CritereElement isPresent={user.criteres[c.dbName]} critere={c.dbName} key={`${i}-${c.dbName}`} />
              )}
            </View>
          </View>
        </View>
        <View style={styles.paramètre}>
          <Text style={styles.userProfil}>     PARAMÈTRES</Text>
          <View style={styles.option1}>
            <View>
              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Profile', { screen: 'Aide' })}>
                <FontAwesomeIcon icon={faCircleInfo} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.buttonOption}>Aide</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Profile', { screen: 'Langue' })}>
                <FontAwesomeIcon icon={faGlobe} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.buttonOption}>Langue</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Profile', { screen: 'Conditions Générales' })}>
                <FontAwesomeIcon icon={faFileContract} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.buttonOption}>CGU</Text>
            </View>
          </View>

          <View style={styles.option2}>
            <View style={styles.param} >
              <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Profile', { screen: 'Reglage des notifications' })}>
                <FontAwesomeIcon icon={faGears} style={styles.iconStyle} />
              </TouchableOpacity>

              <Text style={styles.buttonOption}>Réglage {'\n'} notifications</Text>
            </View>
            <View stlye={styles.param}>
              <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Profile', { screen: 'ModifierMotDePasse' })}>
                <FontAwesomeIcon icon={faLock} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text style={styles.buttonOption}>Changer {'\n'} mot de passe</Text>
            </View>

          </View>
        </View>

      </View>

    </SafeAreaView >

  )
}

/* STYLE CSS */

const styles = StyleSheet.create({

  back: {

    backgroundColor: '#2B0D35',
    flex: 1,

  },
  titleContainer: {

  },
  slogan: {
    height: '30%',

  },

  purple: {
    width: '100%',
    height: '95%',
    borderRadius: 25,
    backgroundColor: '#F2F2F2',
    marginBottom: 150,
    marginTop: 48,
    bottom: 37,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },


  profil: {
    marginTop: 25,
    borderColor: '#2B0D35',
    borderWidth: 1,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
  },

  title: {
    color: 'black',
    textAlign: 'center',
    top: 12,
    fontSize: 35,
    fontWeight: 'bold',
  },
  block: {
    top: 100,
    flex: 1,
    width: 350,
    height: 500,
    position: 'absolute',
    start: 30,
    padding: 5,
    opacity: 0.9,


  },
  paramètre: {
    backgroundColor: 'white',
    flexDirection: 'column',
    marginTop: 5,
    padding: 3,
    borderRadius: 15,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1

  },
  option1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center'
  },
  option2: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 25
  },

  button1: {
    padding: 15,
    backgroundColor: '#7CD6C1',
    borderRadius: 10


  },
  button2: {
    padding: 15,
    backgroundColor: '#7CD6C1',
    borderRadius: 10,
    width: 50,
    marginStart: 15



  },
  iconStyle: {
    color: 'white',
    textAlign: 'center',

  },
  buttonOption: {
    textAlign: 'center'
  },

  userProfil: {
    textAlign: 'center',
    right: 10,
    fontWeight: 'bold',
    fontSize: 15,
    padding: 4
  },

  icone: {
    height: 15,
    bottom: 20,
    start: 280,
  },
  ref: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingStart: 75,
    paddingBottom: 10,
    color: 'black',
  },

  text: {
    fontWeight: 'bold',
    paddingTop: 7,
    paddgingBottom: 7,
    paddingStart: 54,
    color: 'white',
  },


  infos: {
    top: 5,
    paddingStart: 10,
  },


  row: {
    flexDirection: 'row',
  },
  budgets: {
    borderColor: 'black',
    backgroundColor: '#2B0D35',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 5,
    marginBottom: 15,
    marginStart: 3,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    end: 6,
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
    padding: 4,
    fontWeight: 'bold',
    color: 'black',
    start: 5,
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
    borderWidth: 1,
    margin: 7,
    backgroundColor: '#2B0D35',
    borderRadius: 15,
    gap: 2,
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
    // backgroundColor: '#',
    borderBottomEndRadius: 15,
  },

})