//import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Image, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import TouchableButton from '../composant/TouchableButton';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../reducers/user';

import { frontConfig } from '../modules/config';
import { checkBody } from '../modules/checkBody';
import { globalStyles } from '../globalStyles';
import { icon } from '@fortawesome/fontawesome-svg-core';



export default function ProfilScreen({ navigation }) {
  const buttonPosition = {
    left: 55,
    margin: 10,
    borderColor: "black",
    // borderWidth: 1,
    // color: "black",
  },
    buttonPosition2 = {
      width: 270,
      marginStart: 4,
      start: 0,



    }
  const [loaded, error] = useFonts({
    'Raleway': require('../assets/fonts/Raleway-Regular.ttf'),
    'AlexBrush': require('../assets/fonts/AlexBrush-Regular.ttf')
  });


  const user = useSelector((state) => state.user.value.userDetails);

  useEffect(() => {
    (() => {
      if (!user.email) {
        navigation.navigate('Login');
      }
      //setUserParams({...userParams, userId: user.id })
    })();
  }, []);

  return (
    <SafeAreaView style={styles.back}>
      <ImageBackground source={require('../assets/profil.jpg')}  >
        <View style={styles.head}>
        </View >
      </ImageBackground>
      <View style={styles.block1}>
        <Text style={styles.userProfil}> PROFIL</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { screen: 'ModifierProfil' })} >
          <FontAwesomeIcon icon={faPenToSquare} style={styles.icone} />
        </TouchableOpacity>
        <View style={styles.infos}>
          <View style={styles.row}>
            {/* <Text style={styles.type}>prenom : </Text> */}
            <Text style={styles.info}> {user?.prenom || 'Jen'}</Text>
          </View>
          <View style={styles.row}>
            {/* <Text style={styles.type}>nom : </Text> */}
            <Text style={styles.info}> {user?.nom || 'Andriamboavonjy'}</Text>
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
          <View style={styles.toutcritere}>
            <Text style={styles.text}>Critères de consommation</Text>
          </View>
          <View style={styles.trois}>
            <Text style={styles.criteres}> {user?.critere || 'vegan'}</Text>
            <Text style={styles.criteres}> {user?.critere || 'faible en sucre'}</Text>
            <Text style={styles.criteres}> {user?.critere || 'local'}</Text>
          </View>
        </View>
        <View>
          {/* <TouchableButton color="#7CD6C1" onPress={() => navigation.navigate('Profile', { screen: 'ModifierProfil' })} title="MODIFIER PROFIL " position={buttonPosition} /> */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Aide' })}><Text>Aide</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Langue' })}><Text>Langue</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Conditions Générales' })}><Text>Conditions Générales</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Reglage des notifications' })}><Text>Reglage des notifications</Text></TouchableOpacity>

          {/* <TouchableButton color="white" onPress={() => navigation.navigate('Profile', { screen: 'Aide' })} title="Aide " position={buttonPosition} />
        <TouchableButton color="white" onPress={() => navigation.navigate('Profile', { screen: 'Langue' })} title="Langues " position={buttonPosition} />
        <TouchableButton color="white" onPress={() => navigation.navigate('Profile', { screen: 'Conditions Générales' })} title="Conditions Générales" position={buttonPosition} />
        <TouchableButton color="white" onPress={() => navigation.navigate('Profile', { screen: 'Reglage des notifications' })} title="Reglage des notifications " position={buttonPosition2} /> */}
        </View>
      </View>
      <View style={styles.main}>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  back: {
    flex: 1,
    backgroundColor: 'white',
  },
  profil: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 25,
    textAlign: 'center',

  },
  head: {
    height: 250,

  },
  title: {
    color: 'black',
    textAlign: 'center',
    top: 12,
    fontSize: 35,
    fontWeight: 'bold',


  },
  block1: {
    flex: 1,
    width: 320,
    height: 490,
    bottom: 50,
    position: 'absolute',
    zIndex: 10,
    top: 255,
    start: 35,
    backgroundColor: 'white',
    borderColor: '#2B0D35',
    borderWidth: 2,
    padding: 15,
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
    start: 24,
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
    backgroundColor: 'white',
    borderBottomEndRadius: 15,

  },
  button: {
    color: "black",
    margin: 8,

  }


  // infosCon: {
  //   width: '75%'
  // },
  // textInput: {
  //   borderWidth: 1,
  //   width: 300,
  //   height: 40,
  //   margin: 10,
  //   padding: 'auto',
  // }
})
//   menu: {
//     backgroundColor: '#655074',
//     height: '20%',
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//     paddingRight: 20,
//     border: 'none',
//   },
//   menuText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginRight: 10,
//     marginBottom: 25,
//   },
//   imageWrapper: {
//     height: '80%',
//     backgroundColor: '#655074',
//     border: 'none',
//   },
//   imageBackground: {
//     width: '100%',
//     height: '50%',
//     borderBottomLeftRadius: 160,
//     backgroundColor: '#ffffff',
//   },
//   iconWrapper: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   icon: {
//     color: '#ffffff',
//     position: 'relative',
//     bottom: 2,
//   },
// })
