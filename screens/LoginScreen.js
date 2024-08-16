import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import LessFormikInput from '../composant/LessFormikInput';

import { frontConfig } from '../modules/config';

export default function LoginScreen({ navigation }) {
  const initialValues = { email: '', password: '' };
  const validationSchema = Yup.object({
    email: Yup
      .string()
      .email("L'email n'est pas valid")
      .required("L'email est requis"),
    password: Yup
      .string()
      .required("Le mot de passe est requis")
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.userDetails);
  const displayWelcome = useSelector((state) => state.user.value.displayWelcome);

  console.log('Login sreen - user details : ', user);
  console.log('Login sreen - Display welcome: ', displayWelcome);
  useEffect(() => {
    (() => {
      if (user.email) {
        navigation.navigate('TabNavigator');
      }
    })();
  }, []);

  const handleConnect = async (values) => {
    try {
      loginPayload = {
        email: values.email,
        password: values.password
      }
      const conReq = await fetch(frontConfig.backendURL + '/utilisateur/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
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
        navigation.navigate('TabNavigator')
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
      <Text style={styles.title}>Content de vous revoir</Text>
      <Text style={styles.infosCon}>
        Accéder à votre compte en renseignant votre email et votre de mot de passe
      </Text>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleConnect}
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
          <Button
            title='Se connecter'
            onPress={handleSubmit}
            disabled={!isValid}
          />
          <Text>ou</Text>
          <Text>Pas encore de compte? <Button title="Créér un compte" onPress={() => navigation.navigate('Inscription')}/></Text>
          </>
          )}
        </Formik>
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
