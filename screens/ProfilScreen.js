/* IMPORTS */

// import React et React Native
import { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, Pressable, Image, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
// import Redux et Reducer
import { useSelector } from 'react-redux';
// import { updateUser } from '../reducers/user';
// import des modules et composants
import TouchableButton from '../composant/TouchableButton';
import { frontConfig } from '../modules/config';
import { checkBody } from '../modules/checkBody';
import LessFormikInput from '../composant/LessFormikInput';
// import Icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { icon } from '@fortawesome/fontawesome-svg-core';
// import expo
//import { StatusBar } from 'expo-status-bar';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

function CritereElement({isPresent, critere}) {
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
  
  const initialValues = { currentPassword: '', password: '', confirmPassword: '' };
  const validationSchema = Yup.object({
    currentPassword: Yup
      .string()
      .required('Veuillez saisir votre mot de passe actuel'),
    password: Yup
      .string()
      .matches(/\w*[a-z]\w*/, "Le mot de passe doit contenir au moins une lettre minuscule ")
      .matches(/\w*[A-Z]\w*/, "Le mot de passe doit contenir au moins une lettre majuscule")
      .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
      .matches(/[!@#$%^&*()\-_=+{}; :,<.>]/, "e mot de passe doit contenir au moins un caractère spécial parmis : !@#$%^&*()\-_=+{}; :,<.>")
      .min(8, ({ min }) => `Le mot de passe doit avoir au moins ${min} characters`)
      .required('Le mot de passe est requis'),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password')], 'Les mots de passes ne correspondent pas')
      .required('Confirmez votre de passe'),
  })

  if (!user.criteres) {
    return (
      <View></View>
    )
  }
  const handleUpdatePassword = () => {
    postData = {
      userId: user.userId,
      password
    }
    const updatePassword = async () => {
      try {
        const conReq = await fetch(frontConfig.backendURL + '/updatePassword', {
          method: 'POST',
          headers: { "Content-Type": "application/json", "authorization": user.token},
          body: JSON.stringify(postData)
        });
        if (!conReq.ok) {
          throw new Error('Connection returned a non 200 http code');
        }
        const resJson = await conReq.json();
        if (resJson.result) {
          //setResultComp(resJson.resultComparaison)
          //console.log('Resultat comp', JSON.stringify(resultatComp));
          console.log('Password updated');
        } else {
          console.log('Failed update password. The response from the backend is : ', resJson.error);
        }
      } catch(err) {
        console.log('Update password - Connection to the backend failed');
        console.log(err.stack);
      }
    }
  }
  
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
            { criteresMapping.map((c, i) => 
              <CritereElement isPresent={user.criteres[c.dbName]} critere={c.dbName} key={`${i}-${c.dbName}`}/>
            )}
            </View>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Aide' })}><Text>Aide</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Langue' })}><Text>Langue</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Conditions Générales' })}><Text>Conditions Générales</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'Reglage des notifications' })}><Text>Reglage des notifications</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', { screen: 'ModifierMotDePasse', name: 'Modifier mon mot de passe' })}><Text>Changer mon mot de passe</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
      </View>
    </SafeAreaView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({

  back: {
    flex: 1,
    backgroundColor: 'white',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
    backgroundColor: 'white',
    borderBottomEndRadius: 15,
  },
  button: {
    color: "black",
    margin: 8,
  }
})