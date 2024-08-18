import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import TouchableButton from '../composant/TouchableButton';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import LessFormikInput from '../composant/LessFormikInput';

import { frontConfig } from '../modules/config';

const Ligne = () => {
  return <View style={styles.ligne} />
}


export default function LoginScreen({ navigation }) {

  const buttonPosition = {
    right: 20,
    bottom: 20,
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleConnect = async () => {
    if (email.length === 0 || password.length === 0) {
      return
    }
    try {
      loginPayload = {
        email: email,
        password: password,
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
    } catch (err) {
      console.log('Connection to the backend failed');
      console.log(err.stack);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/back.png')} style={styles.imageBackground}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <FontAwesomeIcon icon={faCircleArrowLeft} style={styles.backButton} />
        </TouchableOpacity>

        <Text style={styles.title}>Content de vous revoir 😍 </Text>
        <Text style={styles.infosCon}>
          Accédez à votre compte ! {'\n'} Renseignez votre email et votre de mot de passe.
        </Text>

        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setEmail(value)} value={email} placeholder='✉️ Email' inputMode='email' />
        </View>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setPassword(value)} value={password} placeholder=' 🔒 Mot de passe' secureTextEntry={true} />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Text style={styles.oublie}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableButton color="#7CD6C1" onPress={() => navigation.navigate('Inscription')} title="SE CONNECTER" position={buttonPosition} />
        <View style={styles.row}>
          <Ligne />
          <Text>ou</Text>
          <Ligne />
        </View>

        <Text>Pas encore de compte? <TouchableOpacity onPress={() => navigation.navigate('Inscription')}></TouchableOpacity></Text>
      </ImageBackground>
    </View >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center'
  },
  backButtonContainer: {
    position: 'absolute',
    top: 100,

  },
  backButton: {
    paddingBottom: 25,
    paddingStart: 80,
    color: 'white',

  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    bottom: 130,
    paddingStart: 60,
    marginTop: 80,

  },
  infosCon: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    padding: 15,
    bottom: 90,
  },
  oublie: {
    color: 'white',
    top: 380,
    paddingStart: 230
  },
  textInput: {
    backgroundColor: '#F3F3F3',
    margin: 13,
    padding: 17,
    bottom: 80,
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button1: {
    width: 160,
    height: 35,
    backgroundColor: '#7CD6C1',
    left: 113,
    marginBottom: 12,
    borderRadius: 15,
  },
  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },

  ligne: {
    height: 3,
    width: 180,
    margin: 20,
    backgroundColor: 'white',

  }
})