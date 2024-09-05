/* IMPORT */

//imports React & React Native
import { StyleSheet, ScrollView,Text, View, StatusBar, TouchableOpacity } from 'react-native';
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
import { ErrorMessage } from '../composant/ErrorMessage';
/* FONCTION CREER LISTE*/

export default function CreerListeScreen({ navigation }) {

  const user = useSelector((state) => state.user.value.userDetails);
  
  const listeName = useSelector((state) => state.user.value.listeName);

  const [userListes, setUserListes] = useState([]);
  const [ isReady, setIsReady] = useState(false);
  const [isListeExists, setIsListeExists] = useState(false);
  const [taskMessage, setTaskMessage] = useState({result: true, message: '', desc: ''});

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      };
      let ignore = false;
      getUserListes(user.token, user.id).then(listes => {
        if (!ignore) {
          setUserListes(listes);
          setIsReady(true)
        }
      }).catch((err) => {
        setTaskMessage({ ...taskMessage, 
          result: false, 
          message: 'Une erreur est survenue.',
          desc: "L'initialisation des listes a échoué. Il s'agit sans doute d'un problème temporaire"
        })
        console.log('Choisir produits liste - Connection to the backend failed');
        console.log(err.stack);
      });
      return () => {
        ignore = true;
      }

    })();
  }, []);

  if (!taskMessage.result) {
    return <ErrorMessage message={taskMessage.message} desc={taskMessage.desc} />
  }

  if (!isReady) {
    return (
      <Text></Text>
    )
  }

  const initialValues = { nomListe: listeName || '' };
  const validationSchema = Yup.object({
    nomListe: Yup
      .string()
      .min(3, 'Le nom de la liste doit faire au moins 3 caractères')
      .max(160, 'Le nom de la liste ne doit pas dépasser 160 caractères')
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
    <ScrollView style={styles.containerG} >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, {paddingBottom: 25}]}>Nommer ma liste</Text>
        {isListeExists && 
          <View style={{alignItems: 'center', fontSize: 14, color: '#800000'}}>
            <Text style={styles.textDoubleListe}>Une liste ayant le même nom existe.</Text>
            <Text style={styles.textDoubleListe}>Veuillez choisir un autre nom.</Text>
          </View>
        }
        <View style={{ flexDirection: 'row', width: '100%'}}>
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
                  customStyle={styles.customStyle}
                  errorTextStyle={styles.errorTextStyle}
                />
              <TouchableOpacity 
                onPress={handleSubmit}
                disabled={!isValid}
                width={50}
                style={styles.iconButon}
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
    </ScrollView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  containerG: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  iconButon:{
    fontSize: 35,
    color: '#7CD6C1',
    //marginTop: 5,
    //alignSelf: 'flex-end',
    right: 60,
  },
  icon:{
    fontSize: 35,
    color: '#7CD6C1',
    padding: 30,
    marginTop: 5,
    //alignSelf: 'flex-end',
    left: 0,
  },
  customStyle: {
    borderRadius: 40,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    height: 60,
    marginTop: 5,
    paddingLeft: 20,
    fontSize: 16,
    start: 0,
  },
  textDoubleListe: {
    fontSize: 14, 
    color: '#800000',
    fontWeight: 'bold', 
  },
  errorTextStyle: { 
    position: 'absolute', 
    left: 0, 
    top: -20, 
    fontSize: 14 ,
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


});
