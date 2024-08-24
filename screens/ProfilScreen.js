//import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, StatusBar, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import TouchableButton from '../composant/TouchableButton';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from '../reducers/user';

import { frontConfig } from '../modules/config';
import { checkBody } from '../modules/checkBody';
import { globalStyles } from '../globalStyles';


export default function ProfilScreen({ navigation }) {
  const buttonPosition = {
    left: 55,
    margin: 10,



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
      <ImageBackground source={require('../assets/image.png')} resizeMode='' >
        <View style={styles.head}>
        </View >
      </ImageBackground>
      <View style={styles.block1}>
        <Text style={styles.ref}>Less is more for ...</Text>
        <View style={styles.infos}>
          <View style={styles.row}>
            <Text style={styles.info}> {user?.prenom || 'Jen'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.info}> {user?.nom || 'Andriamboavonjy'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.info}> {user?.email || 'Email'}</Text>
          </View>
          <View style={styles.budgets}>
            <Text style={styles.budget}> Budget mensuel</Text>
            <Text style={styles.montant}> {user?.budget || '500€'}</Text>
          </View>
        </View>
        <View style={styles.ensemble}>
          <View style={styles.toutcritere}>
            <Text style={styles.text}>Vos critères de consommation</Text>
          </View>
          <View style={styles.trois}>
            <Text style={styles.criteres}> {user?.critere || 'vegan'}</Text>
            <Text style={styles.criteres}> {user?.critere || 'faible en sucre'}</Text>
            <Text style={styles.criteres}> {user?.critere || 'local'}</Text>
          </View>
        </View>
        <TouchableButton color="#7CD6C1" onPress={() => navigation.navigate('TabNavigator', { screen: 'modifier notre Profil' })} title="MODIFIER PROFIL " position={buttonPosition}></TouchableButton>
      </View>
      <View style={styles.main}>

        <Button
          title='Reglage Notifications'
          onPress={() => navigation.navigate('Profile', { screen: 'Reglage des notifications' })}
        />

        <Button
          title='Aide'
          onPress={() => navigation.navigate('Profile', { screen: 'Aide' })}
        />
        <Button
          title='CGU'
          onPress={() => navigation.navigate('Profile', { screen: 'Conditions Générales' })}
        />
        <Button
          title='Langue'
          onPress={() => navigation.navigate('Profile', { screen: 'Langue' })}
        />

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
  block1: {
    width: 310,
    height: 390,
    bottom: 120,
    start: 40,
    backgroundColor: '#2B0D35',
    borderColor: '#2B0D35',
    borderWidth: 2,



  },
  ref: {
    fontFamily: 'AlexBrush-Regular',
    fontSize: 35,
    paddingTop: 10,
    paddingStart: 30,
    paddingBottom: 10,
    color: 'white',


  },
  text: {
    fontWeight: 'bold',
    paddingTop: 7,
    paddgingBottom: 7,
    start: 7,
    color: 'white',

  },
  infos: {
    paddingStart: 10,


  },
  row: {
    flexDirection: 'row',
  },
  budgets: {
    borderColor: 'white',

    marginTop: 5,
    marginBottom: 15,
    borderWidth: 1,
    marginStart: 3,
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
    color: 'white',
    start: 5,
    paddingBottom: 5,
  },

  toutcritere: {
    flexDirection: 'row',
    padding: 4,
    paddingStart: 17,
  },

  trois: {

    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 10,
    gap: 5,

  },

  ensemble: {
    borderColor: 'white',
    borderWidth: 1,
    margin: 7,

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
    bottom: 100,

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
