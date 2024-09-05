/* IMPORTS */

// import React et React Native
import React from 'react';
import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ImageBackground, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Redux et Reducer
import { useDispatch, useSelector } from 'react-redux';
//import des modules et composants
import TouchableButton from '../composant/TouchableButton';
import { updateUser, updateEnseignesList } from '../reducers/user';
import { getEnseignesList } from '../modules/listesFunctions'

import LessFormikInput from '../composant/LessFormikInput';
import { frontConfig } from '../modules/config';
//import ext
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
//import des icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function LoginScreen({ navigation }) {

  const buttonPosition = {
    top: 20,
    start: 95,
    borderRadius: 15,

  }
  useFocusEffect(
    React.useCallback(() => {
      if (!user.id) {
        navigation.navigate('Login');
      }
    }, [])
  );

  const initialValues = { email: '', password: '' }
  const validationSchema = Yup.object({
    email: Yup
      .string()
      .email("L'email n'est pas valid")
      .required("L'email est requis"),
    password: Yup
      .string()
      .required("Le mot de passe est requis")
  });

  const handleReset = (resetFn) => {
    resetFn();
  }
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.userDetails);
  const displayWelcome = useSelector((state) => state.user.value.displayWelcome);

  //console.log('Login sreen - user details : ', user);
  //console.log('Login sreen - Display welcome: ', displayWelcome);
  const [taskMessage, setTaskMessage] = useState('');
  const handleConnect = async (values, resetForm) => {
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
        setTaskMessage('Un problème est survenu lors de la connexion. Veuillez réessayer plus tard.')
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      //console.log('connection result : ', resJson);
      if (resJson.result) {
        // Get User details
        const response = await fetch(frontConfig.backendURL + '/utilisateur/details/' + resJson.id);
        const json = await response.json();
        if (json.result) {
          dispatch(updateUser({ ...json.user, id: resJson.id }));
          getEnseignesList(user.token).then((ens) => {
            dispatch(updateEnseignesList(ens));

            resetForm();
            navigation.navigate('TabNavigator');
          })
        }
      } else {
        console.log('Login failed with message : ', resJson.error);
        setTaskMessage('Email ou mot de passe incorrect')
      }
    } catch (err) {
      console.log('Connection to the backend failed');
      console.log(err.stack);
      setTaskMessage('Un problème est survenu lors de la connexion. Veuillez réessayer plus tard.')
    }
  }

  return (

    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
        <FontAwesomeIcon icon={faArrowLeft} style={styles.backButton} />
      </TouchableOpacity>
      <View style={styles.formikContainer}>

        <Text style={styles.title}>Content de vous revoir 🤩 </Text>
        <Text style={styles.text}>                 Accédez à votre compte ! {'\n'}Renseignez votre emaila et votre mot de passe.</Text>
        <Text style={styles.errorMessage} >{taskMessage}</Text>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleConnect(values, resetForm).then(() => resetForm())
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <>
              <Field
                component={LessFormikInput}
                name="email"
                placeholder="email"
                keyboardType='email-address'
                errorTextStyle={styles.textError}
              />
              <Field
                component={LessFormikInput}
                name="password"
                placeholder='mot de passe'
                secureTextEntry={true}
                errorTextStyle={styles.textError}
              />

              <TouchableButton color="#7CD6C1" onPress={handleSubmit} title="CONNEXION" position={buttonPosition}></TouchableButton>
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
      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B0D35",
    padding: 20,
  },
  formikContainer: {
    top: 130,
  },
  backButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 15,
    color: '#2B0D35',
  },
  errorMessage: {
    fontWeight: 'bold',
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'Raleway-Bold',
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    color: 'white',
    marginTop: 15,
    marginBottom: 15,
    left: 80,
  },
  textError: {
    paddingLeft: 40,
    fontSize: 14,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 13,
    color: '#CFCFCF',
    marginBottom: 25,
    left: 60,

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
    height: 2,
    backgroundColor: 'grey',
    width: "35%",
  },

  separatorText: {
    fontFamily: 'Raleway-Regular',
    color: '#CFCFCF',
    fontSize: 13,
    margin: 15,
  },

  noAccountContainer: {
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
    color: 'white',
    fontWeight: 'bold',
  },

});