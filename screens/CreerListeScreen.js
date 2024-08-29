/* IMPORT */

//imports React & React Native
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
//import Redux & Reducer
import { useDispatch, useSelector } from 'react-redux';
import { updateListeName } from '../reducers/user';
// import modules ext
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../styles/colors';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useFonts } from 'expo-font';
//import Modules et Composants
import {LessHeader} from '../modules/components';
import { getUserListes } from '../modules/listesFunctions';
import LessFormikInput from '../composant/LessFormikInput';
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
    <KeyboardAvoidingView style={styles.containerG} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Nommer ma liste</Text>
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
                  placeholder='"Ma super liste"'
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

          <Text style={styles.subTilte}>Reste 35€ à dépenser</Text>
          <View style={styles.barContainer}>
              <Text style={[styles.progressBar, {width:'75%'}]}>120€</Text>
          </View>

          <View style={styles.separatorContainer}>
            <Text style={styles.separatorLine} />
            <Text style={styles.separatorText}>ou</Text>
            <Text style={styles.separatorLine} />
          </View>

          <Text style={styles.title}>Reprendre une liste</Text>
            {userListes ? userListes.map((l) => {
              return(
                <View key={l._id} style={styles.listContainer}>
                  <Text style={styles.listText}>Nom : {l.nom}</Text>
                </View>
              )
            }) :  <View></View> }
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  containerG: {
    flex: 1,
  },

  container: {
    flex: 1,
    margin: 10,
  },

  title: {
    fontFamily: 'Raleway-Bold',
    color: '#25000D',
    fontSize: 24
  },

  barContainer: {
    height: 20,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
  },

  progressBar: {
    height: 20,
    borderRadius: 20,
    fontFamily: 'Raleway-Regular',
    backgroundColor: '#2B0D35',
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

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 20,
    paddingEnd: 10,
    marginBottom: 15,
    borderRadius: 40,
  },

  listText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#25000D',
  },
 

});
