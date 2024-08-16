import { Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListeName } from '../reducers/user';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import LessFormikInput from '../composant/LessFormikInput';

//import { frontConfig } from '../modules/config';

export default function CreerListeScreen({ navigation }) {

  const user = useSelector((state) => state.user.value.userDetails);
  //const [categories, setCategories] = useState([]);
  //const [nomListe, setNomListe] = useState();
  const listeName = useSelector((state) => state.user.value.currentListeName);

  const dispacth = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      // Get categories
      //setNomListe(listeName)
      /*
      try {
        const conReq = await fetch(frontConfig.backendURL + '/produits/categories', {
          method: 'GET',
          headers: { "Content-Type": "application/json", "authorization": user.token },
        });
        if (!conReq.ok) {
          throw new Error('Connection returned a non 200 http code');
        }
        const resJson = await conReq.json();
        console.log('connection result : ', resJson);
        if (resJson.result) {
            return 0;
        } else {
          console.log('Failed to get categories list from the backend : ', resJson.error);
        }
      } catch(err) {
        console.log('Connection to the backend failed');
        console.log(err.stack);
      }
      */
    })();
  }, []);

  const initialValues = { nomListe: listeName || '' };
  const validationSchema = Yup.object({
    nomListe: Yup
      .string()
      .required("Vous devez choisir un nom pour votre liste"),
  });

  const handleValider = (values) => {
    dispacth(updateListeName(values.nomListe));
    navigation.navigate('ChoisirListeProduits');
  }

  console.log('Creer liste screen - user details : ', user);
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Button title='retour' onPress={() => navigation.goBack()} />
      <Text>{user.prenom} {user.nom}</Text>
      <Text>{user.email}</Text>
      <Text>Bonjour {user.prenom}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleValider}
       >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <Field
              component={LessFormikInput}
              name="nomListe"
              placeholder="Votre liste"
            />
          <Button
            title='Commencer'
            onPress={handleSubmit}
            disabled={!isValid}
          />
          </>
          )}
        </Formik>
      <Text></Text>
      <Text>Reprendre une liste enregistrée</Text>
    </KeyboardAvoidingView>
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
    fontSize: 70,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'right',
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    height: 40,
    margin: 10,
    padding: 'auto',
    color: 'red'
  },
});
