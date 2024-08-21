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



export default function LoginScreen({ navigation }) {

  const buttonPosition1 = {
    right: 0,
    bottom: 25,
  }

  const buttonPosition2 = {
    right: 100,
    top: 70,

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
      <ImageBackground source={require('../assets/back.png')} style={styles.imageBackground} >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <FontAwesomeIcon icon={faCircleArrowLeft} style={styles.backButton} />
        </TouchableOpacity>

        <Text style={styles.title}>Content de vous revoir 😍 </Text>
        <Text style={styles.infosCon}>
          Accédez à votre compte ! {'\n'} Renseignez votre email et votre mot de passe.
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
              <TouchableButton color="#7CD6C1" onPress={handleSubmit} title="SE CONNECTER" disabled={!isValid} position={buttonPosition1} />
            </>
          )}
        </Formik>
        <View style={styles.row}>
          <Text style={styles.ligne} />
          <Text style={styles.ou}>ou</Text>
          <Text style={styles.ligne} />
        </View>
        <Text style={styles.inscription}>Pas encore de compte? </Text>
        <TouchableButton color="#7CD6C1" onPress={() => navigation.navigate('Inscription')} title="S'INSCRIRE" position={buttonPosition2}></TouchableButton>
      </ImageBackground >
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
    marginTop: 130,
    bottom: 100,

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
    fontWeight: 'bold',
    top: 360,
    paddingStart: 230,

  },
  textInput: {
    backgroundColor: '#F3F3F3',
    width: '85%',
    margin: 10,
    padding: 15,
    bottom: 67,
    left: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ligne: {
    height: 3,
    width: 160,
    margin: 20,
    backgroundColor: 'white',
  },
  ou: {
    color: 'white',
    fontSize: 17,
    top: 9,
    fontWeight: 'bold'
  },
  inscription: {
    color: 'white',
    left: 120,
    top: 50,
    fontWeight: 'bold',
  },
});