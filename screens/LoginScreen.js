import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ImageBackground, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import TouchableButton from '../composant/TouchableButton';
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

  //console.log('Login sreen - user details : ', user);
  //console.log('Login sreen - Display welcome: ', displayWelcome);
  useEffect(() => {
    (async () => {
      if (user.email) {
        navigation.navigate('TabNavigator');
      }
    })();
  }, []);

  const handleConnect = async (values) => {
    try {
      loginPayload = {
        email: values.email,
        password: values.password,
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
        navigation.navigate('TabNavigator');
      } else {
        console.log('Login failed with message : ', resJson.error);
      }
    } catch (err) {
      console.log('Connection to the backend failed');
      console.log(err.stack);
    }
  }

  return (

    <View style={styles.container}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <FontAwesomeIcon icon={faCircleArrowLeft} style={styles.backButton} />
        </TouchableOpacity>

        <Text style={styles.title}>Content de vous revoir 🤩 </Text>
        <Text style={styles.text}>Accédez à votre compte ! {'\n'}Renseignez votre email et votre mot de passe.</Text>
        
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
              
              <Pressable style={styles.buttonBlue} onPress={handleSubmit}>
                <Text style={styles.textButtonBlue}>connexion</Text>
              </Pressable>
            </>
          )}
        </Formik>

        <View style={styles.separatorContainer}>
          <Text style={styles.separatorLine} />
          <Text style={styles.separatorText}>ou</Text>
          <Text style={styles.separatorLine} />
        </View>

      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccountText}>Pas encore de compte?</Text>
        <Pressable style={styles.buttonTransparent} onPress={() => navigation.navigate('Inscription')}>
          <Text style={styles.textButtonTransparent}>créer un compte</Text>
        </Pressable>
      </View>


    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },

  backButton: {
    color: '#A3A3A3',
  },

  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    color: '#2B0D35',
    marginTop: 15,
    marginBottom: 15,
  },

  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 13,
    color: '#CFCFCF',
    marginBottom: 25,
  },

  buttonBlue: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#7CD6C1',
    marginTop: 25,
  },

  textButtonBlue: {
    fontSize: 13,
    fontFamily: 'Raleway-Medium',
    color: 'white',
  },
  
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },

  separatorLine: {
    height: 1,
    backgroundColor: '#CCCCCC',
    width: 160,
  },

  separatorText: {
    fontFamily: 'Raleway-Regular',
    color: '#CFCFCF',
    fontSize: 13,
    margin: 15,
  },

  noAccountContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  },

  noAccountText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 13,
    color: '#CFCFCF',
  },

  buttonTransparent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },

  textButtonTransparent: {
    fontSize: 13,
    fontFamily: 'Raleway-SemiBold',
    color: '#2B0D35',
  },  

});