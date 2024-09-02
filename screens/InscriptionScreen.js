/* IMPORTS */

// import des éléments React et React Native
import { useState, useEffect } from 'react';
import { ImageBackground, Button, StyleSheet, Text, View, TextInput } from 'react-native';
// import Redux et Reducer
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';
// import des modules et composants
import TouchableButton from '../composant/TouchableButton';
import LessFormikInput from '../composant/LessFormikInput';
import { frontConfig } from '../modules/config';
// import ext
import { StatusBar } from 'expo-status-bar';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

/* FONCTION CREER LISTE */

export default function InscriptionScreen({ navigation }) {

  const buttonPosition1 = {
    bottom: 55,
  }

  const buttonPosition2 = {
    right: 0,
    top: 25,
  }


  const initialValues = { email: '', password: '', confirmPassword: '' };
  const validationSchema = Yup.object({
    email: Yup
      .string()
      .email("L'email n'est pas valid")
      .required('Le mot de passe est requis'),
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

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.userDetails);
  console.log('Inscription screen - user details :', user);
  useEffect(() => {
    (() => {
      if (user.id) {
        navigation.navigate('Profile', { screen: 'Accueil' });
      }
    })();
  }, []);

  const handleInscription = async (values) => {
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
        navigation.navigate('Profile', { screen: 'ModifierProfil', origin: 'inscription' });
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
      <View style={styles.color}>
        <Text style={styles.title}>S'enregistrer maintenant ! 🏁</Text>
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

              <TouchableButton color="#7CD6C1" onPress={handleSubmit} title="S'ENREGISTRER" position={buttonPosition1}></TouchableButton>
            </>
          )}
        </Formik>
        <View style={styles.row}>
          <Text style={styles.ligne} />
          <Text style={styles.ou}>ou</Text>
          <Text style={styles.ligne} />
        </View>
        <Text style={styles.inscription}>Vous avez déjà un compte? </Text>
        <TouchableButton color="#7CD6C1" onPress={() => navigation.navigate('Login')} title="SE CONNECTER" position={buttonPosition2}></TouchableButton>

        <StatusBar style="auto" />
      </View>
    </View>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  color: {
    heigth: '100%',
    flex: 1,
    backgroundColor: "#2B0D35",
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    bottom: 100,
    paddingStart: 40,
    marginTop: 130,

  },
  infosCon: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    padding: 15,
    bottom: 90,

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
    fontWeight: 'bold',
    top: 9,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inscription: {
    color: 'white',
    left: 100,
    top: 20,
    fontWeight: 'bold',

  }
})