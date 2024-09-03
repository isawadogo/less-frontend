/* IMPORTS */

// import React et React Native
import { useState, useEffect } from 'react';
import { TouchableButton, TouchableOpacity, Pressable, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, } from 'react-native';
// import Redux et Reducer
import { useSelector } from 'react-redux';
import { frontConfig } from '../modules/config';
import LessFormikInput from '../composant/LessFormikInput';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { icon } from '@fortawesome/fontawesome-svg-core';
// import expo
//import { StatusBar } from 'expo-status-bar';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

export default function ModifierPasswordScreen({ navigation, route }) {

  const user = useSelector((state) => state.user.value.userDetails);
  const [taskMessage, setTaskMessage] = useState(''); 

  useEffect(() => {
    (() => {
      if (!user.email) {
        navigation.navigate('Login');
      }
    })();
  }, []);
    //console.log('PARAMS FROM MODIFIER PWD: ', route)
  
  const initialValues = { currentPassword: '', password: '', confirmPassword: '' };
  const validationSchema = Yup.object({
    currentPassword: Yup
      .string()
      .required('Veuillez saisir votre mot de passe actuel'),
    password: Yup
      .string()
 //     .matches(/\w*[a-z]\w*/, "Le mot de passe doit contenir au moins une lettre minuscule ")
 //     .matches(/\w*[A-Z]\w*/, "Le mot de passe doit contenir au moins une lettre majuscule")
 //     .matches(/\d/, "Le mot de passe doit contenir au moins un chiffre")
 //     .matches(/[!@#$%^&*()\-_=+{}; :,<.>]/, "e mot de passe doit contenir au moins un caractère spécial parmis : !@#$%^&*()\-_=+{}; :,<.>")
 //     .min(8, ({ min }) => `Le mot de passe doit avoir au moins ${min} characters`)
      .required('Le mot de passe est requis'),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password')], 'Les mots de passes ne correspondent pas')
      .required('Confirmez votre de passe'),
  })

  const handleUpdatePassword = (values) => {
   
    const updatePassword = async () => {
      postData = {
        userId: user.id,
        password: values.password,
      }
      try {
        const conReq = await fetch(frontConfig.backendURL + '/utilisateur/updatePassword', {
          method: 'POST',
          headers: { "Content-Type": "application/json", "authorization": user.token},
          body: JSON.stringify(postData)
        });
        if (!conReq.ok) {
          setTaskMessage('Une erreur est survenue. Veuillez réessayer plus tard')
          throw new Error('Connection returned a non 200 http code');
        }
        const resJson = await conReq.json();
        if (resJson.result) {
          //setResultComp(resJson.resultComparaison)
          //console.log('Resultat comp', JSON.stringify(resultatComp));
          //console.log('Password updated');
          setTaskMessage('Votre mot de passe a été modifié');
        } else {
          setTaskMessage('Une erreur est survenue. ')
          console.log('Failed update password. The response from the backend is : ', resJson.error);
        }
      } catch(err) {
        setTaskMessage('Une erreur est survenue. Veuillez réessayer plus tard');
        console.log('Update password - Connection to the backend failed');
        console.log(err.stack);
      }
    }
    updatePassword();
  }
  
  return (
    <SafeAreaView style={styles.back}>
      <View>
        <Text style={styles.error}>{taskMessage}</Text>
      <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdatePassword}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
              <>
                <Field
                  component={LessFormikInput}
                  name="currentPassword"
                  placeholder='Mot de passe actuel'
                  secureTextEntry={true}
                />
                <Field
                  component={LessFormikInput}
                  name="password"
                  placeholder='Nouveau mot de passe'
                  secureTextEntry={true}
                />
                <Field
                  component={LessFormikInput}
                  name="confirmPassword"
                  placeholder='Confirmez votre de mot de passe'
                  secureTextEntry={true}
                />
              <Pressable disabled={!isValid} style={styles.buttonBlue} onPress={handleSubmit}>
                <Text style={styles.textButtonBlue}>Valider</Text>
              </Pressable>
              </>
            )}
          </Formik>
      </View>
    </SafeAreaView>
  )
}

/* STYLE CSS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomEndRadius: 15,
  },
  button: {
    color: "green",
    borderRadius: 20,
    width: '70%',
    margin: 8,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },  
  buttonBlue: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#7CD6C1',
    marginTop: 25,
  },
  textButtonBlue: {
    fontSize: 13,
    fontFamily: 'Raleway-Medium',
    color: 'white',
  },
})