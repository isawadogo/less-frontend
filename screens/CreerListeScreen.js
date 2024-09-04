/* IMPORT */

//imports React & React Native
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
//import Redux & Reducer
import { useDispatch, useSelector } from 'react-redux';
import { updateListeName } from '../reducers/user';
// import modules ext
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
//import Modules et Composants
import { getUserListes, deleteListe } from '../modules/listesFunctions';
import LessFormikInput from '../composant/LessFormikInput';
import BudgetRestant from '../composant/BudgetRestant';
import { ExistingListesComponents } from '../modules/components';
/* FONCTION CREER LISTE*/

export default function CreerListeScreen({ navigation }) {

  const user = useSelector((state) => state.user.value.userDetails);
  
  const listeName = useSelector((state) => state.user.value.listeName);

  const [userListes, setUserListes] = useState([]);
  const [ isReady, setIsReady] = useState(false);
  const [isListeExists, setIsListeExists] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      };
      let ignore = false;
      getUserListes(user.token, user.id).then(listes => {
        //console.log('Listes : ', userListes)
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
    if (userListes.some((l) => l.nom.toLowerCase() === values.nomListe.toLowerCase())) {
      setIsListeExists(true);
      return
    }
    dispatch(updateListeName(values.nomListe));
    setIsListeExists(false);
    navigation.navigate('ChoisirListeProduits');
  }
  const handleDeleteListe = (id) => {
    deleteListe(user.token, id)
      .then(res => {
        if (res) {
          setIsReady(false);
          getUserListes(user.token, user.id).then(listes => {
            setUserListes(listes);
            setIsReady(true);
          });
        }
      })
  }

  return (
    <KeyboardAvoidingView style={styles.containerG} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, {paddingBottom: 25}]}>Nommer ma liste</Text>
        {isListeExists && 
          <View style={{alignItems: 'center', fontSize: 14, color: '#800000'}}>
          <Text style={styles.textDoubleListe}>Une liste ayant le même nom existe.</Text>
          <Text style={styles.textDoubleListe}>Veuillez choisir un autre nom.</Text>
          </View>
        }
        <View style={{ flexDirection: 'row'}}>
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
                  style={{width: '85%'}}
                  errorTextStyle={styles.errorTextStyle}
                  customStyle={{ backgroundColor: '#000000' }}
                />
              <TouchableOpacity 
                onPress={handleSubmit}
                disabled={!isValid}
                width={50}
              >
                <FontAwesomeIcon icon={faCircleCheck} style={styles.icon}/>
              </TouchableOpacity>
              </>
              )}
          </Formik>
        </View>
          <BudgetRestant listes={userListes} userBudget={user.budget} />

          <View style={styles.separatorContainer}>
            <Text style={styles.separatorLine} />
            <Text style={styles.separatorText}>ou</Text>
            <Text style={styles.separatorLine} />
          </View>

          <Text style={[styles.title, {paddingBottom: 25}]}>Mes listes passées</Text>
          <ExistingListesComponents currentListes={userListes} deleteAction={handleDeleteListe} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  containerG: {
    flex: 1,
  },
  textDoubleListe: {
    fontSize: 14, 
    color: '#800000',
    fontWeight: 'bold', 
  },
  errorTextStyle: { 
    position: 'absolute', 
    left: 40, 
    top: -15, 
    fontSize: 14 
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
   icon:{
    fontSize: 35,
    color: '#7CD6C1',
    padding: 30,
    marginTop: 5,
    alignSelf: 'flex-start'
  },

});
