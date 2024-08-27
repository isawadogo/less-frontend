/* IMPORT */
//imports React & React Native
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
//import Redux & Reducer
import { useDispatch, useSelector } from 'react-redux';
import { updateListeName } from '../reducers/user';
// import ??
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../styles/colors';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import LessFormikInput from '../composant/LessFormikInput';
//import Modules
import {LessHeader} from '../modules/components';
import { getUserListes } from '../modules/listesFunctions';
//import { frontConfig } from '../modules/config';

/* FONCTION CREER LISTE*/

export default function CreerListeScreen({ navigation }) {

  const user = useSelector((state) => state.user.value.userDetails);
  
  const listeName = useSelector((state) => state.user.value.listeName);
  //const listeName = useSelector((state) => state.liste.value.listeName);

  const [userListes, setUserListes] = useState([]);
  const [ isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      };
      let ignore = false;
      getUserListes(user.token, user.id).then(listes => {
        console.log('Listes : ', userListes)
        if (!ignore) {
          setUserListes(listes);
          setIsReady(true)
        }
      });
      return () => {
        ignore = true;
      }

    })();
  }, []);

  if (!isReady) {
    return (
      <Text></Text>
    )
  }
  const initialValues = { nomListe: listeName || '' };
  const validationSchema = Yup.object({
    nomListe: Yup
      .string()
      .required("Vous devez choisir un nom pour votre liste"),
  });

  const handleValider = (values) => {
    console.log('save liste name : ', values.nomListe)
    dispatch(updateListeName(values.nomListe));
    navigation.navigate('ChoisirListeProduits');
  }

  //console.log('Creer liste screen - user details : ', user);
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
 
      <View style={styles.listeContainer}>
        <Text style={styles.textTitre}>Nommer ma liste</Text>
        <View style={styles.content}>
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
            <Pressable 
              onPress={handleSubmit}
              disabled={!isValid}
              width={50}
              backgroundColor='green'
              borderRadius={30}
            >
              <AntDesign name='checkcircleo' size={50} color='#ffffff' width={50} />
            </Pressable>
            </>
            )}
          </Formik>
        </View>
        <Text></Text>
        <Text>Mes listes passées</Text>
          {userListes ? userListes.map((l) => {
            return(
              <View key={l._id}>
                <Text>Nom : {l.nom}</Text>
              </View>
            )
          }) :  <View></View> }

      </View>
    </KeyboardAvoidingView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listeContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '80%',
    borderRadius: 20,
    paddingTop: 100,

  },
  content: {
    width: '90%',
    alignItems: 'center'
    //flexDirection: 'row',
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'right',
  },
  textTitre: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 70,
    alignItems: 'center',
    width: '90%',
  },
  inputText: {
    paddingTop: 5,
  },
});
