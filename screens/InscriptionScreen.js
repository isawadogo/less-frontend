import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import LessFormikInput from '../composant/LessFormikInput';

import { frontConfig } from '../modules/config';

export default function InscriptionScreen({ navigation }) {
  
  const initialValues = { email: '', password: '', confirmPassword: '' };
  const validationSchema = Yup.object({
  email: Yup
    .string()
    .email("L'email n'est pas valid")
    .required('Le mot de passe est requis'),
  password: Yup
    .string()
    .matches(/\w*[a-z]\w*/,  "Le mot de passe doit contenir au moins une lettre minuscule ")
    .matches(/\w*[A-Z]\w*/,  "e mot de passe doit contenir au moins une lettre majuscule")
    .matches(/\d/, "e mot de passe doit contenir au moins un chiffre")
    .matches(/[!@#$%^&*()\-_=+{}; :,<.>]/, "e mot de passe doit contenir au moins un caractère spécial parmis : !@#$%^&*()\-_=+{}; :,<.>")
    .min(8, ({ min }) => `Le doit avoir au moins ${min} characters`)
    .required('Le mot de passe est requis'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Les mots de passes ne correspondent pas')
    .required('Confirmez votre de passe'),
  })

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.userDetails);
  console.log('Inscription screen - user details :', user);
  useEffect(() => {
    (() => {
      if (user.id) {
        navigation.navigate('Profile', {screen :'Accueil'});
      }
    })();
  }, []);

  const handleInscription = async(values) => {
    // Manange with proper message
    try {
      signinPayload = {
        email: values.email,
        password: values.password
      }
      const conReq = await fetch(frontConfig.backendURL + '/utilisateur/signin', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinPayload),
      });
      if (!conReq.ok) {
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      console.log('connection result : ', resJson);
      if (resJson.result) {
        // Get User details
        const response = await fetch(frontConfig.backendURL + '/utilisateur/details/' + resJson.id);
        const json = await response.json();
        if (json.result) {
          dispatch(updateUser({ ...json.user, id: resJson.id }));
        }
        navigation.navigate('Profile', {screen: 'ModifierProfil'});
      } else {
        console.log('Login failed with message : ', resJson.error);
      }
    } catch(err) {
      console.log('Connection to the backend failed');
      console.log(err.stack);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>S'enregistrer maintenant</Text>
      <Text style={styles.infosCon}>
       Enregistrez-vous avec votre adresse email et un mot de passe pour continuer. 
      </Text>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleInscription}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <>
              <Field
                component={LessFormikInput}
                name="email"
                placeholder="email"
                keyboardType='email-address'
              />
              <Field
                component={LessFormikInput}
                name="password"
                placeholder='Mot de passe' 
                secureTextEntry={true} 
              />
              <Field
                component={LessFormikInput}
                name="confirmPassword"
                placeholder='Confirmer votre mot de passe' 
                secureTextEntry={true} 
              />
            <Button
              title="S'enregistrer"
              onPress={handleSubmit}
              disabled={!isValid}
            />
            </>
            )}
        </Formik>
      <Text>ou</Text>
      <Text>Vous avez déjà un compte? <Button title="Se connecter" onPress={() => navigation.navigate('Login')}/></Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  infosCon: {
    width: '75%'
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    height: 40,
    margin: 10,
    padding: 'auto',
  },
});
