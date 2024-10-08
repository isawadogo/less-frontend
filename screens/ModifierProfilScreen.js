
/* IMPORTS */

// import React et React Native
import React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, Button, StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
// import Redux et Reducer
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';
// import React Native composants ext
import { SafeAreaView } from 'react-native-safe-area-context';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { RadioButton } from 'react-native-paper';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
// import des icones
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
// import composant et modules
import DateDeNaissance from '../composant/DateDeNaissance';
import LessFormikInput from '../composant/LessFormikInput';
import TouchableButton from '../composant/TouchableButton';
import { updateUserDetails, getUserCoordinates } from '../modules/userFunctions';
import { LessCheckbox } from '../modules/components';
import { frontConfig } from '../modules/config';

// import divers
import { globalStyles } from '../globalStyles';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';


/* FONCTION CREER LISTE */

const RegimeConso = [
  { dbValue: 'bio', value: 'Bio' },
  { dbValue: 'vegan', value: 'Vegan' },
  { dbValue: 'premierPrix', value: 'Premier prix' },
  { dbValue: 'vegetarien', value: 'Végétarien' }
]

const initialPreferences = [
  { dbValue: 'local', label: 'Local', checked: false },
  { dbValue: 'faibleEnSucre', label: 'Faible en sucres', checked: false },
  { dbValue: 'faibleEnMatiereGrasse', label: 'Faible en matière grasse', checked: false }
]

const data = [
  { key: '1', value: 'Arachide', disabled: false },
  { key: '2', value: 'Fruit de mer', disabled: false },
  { key: '3', value: 'Oeuf', disabled: false },
  { key: '4', value: 'Lait', disabled: false },
  { key: '5', value: 'Soja', disabled: false },
]
// Style du bouton "APPLIQUER LES CRITERES"
const buttonPosition = {
  width: 220,
  margin: 50,
  borderRadius: 15,

}
export default function ModifierProfilScreen({ route, navigation }) {

  const [selected, setSelected] = React.useState("");

  //  console.log('PARAMS : ', route)
  const origine = route.params?.origine;
  const action = origine === 'inscription' ? 'Créér' : 'Modifier'
  const [useLocation, setUseLocation] = useState(false);

  const user = useSelector((state) => state.user.value.userDetails);

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      setUserParams({ ...userParams, userId: user.id })
    })();
  }, []);

  const initialValues = {
    nom: user.nom || '',
    prenom: user.prenom || '',
    telephone: user.telephone || '',
    nomDeRue: user.adresses.length > 0 ? user.adresses[0].nomDeRue : '',
    numeroDeRue: user.adresses.length > 0 ? user.adresses[0].numeroDeRue : '',
    commune: user.adresses.length > 0 ? user.adresses[0].commune : '',
    codePostal: user.adresses.length > 0 ? user.adresses[0].codePostal : '',
  };
  const validationSchema = Yup.object({
    nom: Yup
      .string()
      .required("Veuillez saisir votre nom"),
    prenom: Yup
      .string()
      .required("Veuillez saisir votre prenom"),
    telephone: Yup
      .string()
      .required("Veuillez saisir votre numéro de téléphone"),
    nomDeRue: Yup
      .string()
      .required("Veuillez saisir le nom de votre rue"),
    numeroDeRue: Yup
      .string()
      .required("Veuillez saisir le numéro de votre rue"),
    codePostal: Yup
      .string()
      .required("Veuillez saisir votre code postal"),
    commune: Yup
      .string()
      .required("Veuillez saisir le nom de votre ville"),
  });

  const [preferences, setPreferences] = useState(user.preferences);
  const [allergies, setAllergies] = useState(user.allergies);
  const [criteres, setCriteres] = useState({ ...user.criteres });
  const [budget, setBudget] = useState(user.budget);

  const dateNais = new Date(user.dateDeNaissance);
  const [userParams, setUserParams] = useState({
    prefixe: user.prefixe,
    //nom: user.nom,
    //prenom: user.prenom,
    dateDeNaissance: user.dateDeNaissance,
    //telephone: user.telephone,
    profilConso: user.profilConso,
    //budget: user.budget.toString(),
    distance: user.distance,
  })
  const [dateN, setDateN] = useState(new Date(user.dateDeNaissance));

  const onChangeDate = (selectedDate) => {
    //console.log('selected date : ', selectedDate);
    //setShow(false);
    setDateN(selectedDate);
    setUserParams({ ...userParams, dateDeNaissance: selectedDate.toLocaleString() });
  };

  const dispatch = useDispatch();

  const handleUpdateProfile = async (values) => {
    // Manange with proper message
    const allUserParams = {
      ...Object.assign(userParams, {
        nom: values.nom,
        prenom: values.prenom,
        budget: Number(budget),
        telephone: values.telephone,
      })
    }


    let addresses = {
      numeroDeRue: values.numeroDeRue,
      nomDeRue: values.nomDeRue,
      commune: values.commune,
      codePostal: values.codePostal,
    }

    const userCoordinates = await getUserCoordinates(addresses);
    if (!userCoordinates) {
      setUseLocation(true);
    }
    addresses = {
      ...addresses,
      ...userCoordinates,
    }
    //console.log('User COORDS :', userCoordinates);
    //console.log('USE LOCATION : ', useLocation);

    const dataUpdate = {
      ...userParams,
      preferences: preferences,
      criteres: { ...criteres },
      adresses: [addresses],
      allergies: allergies,
    }
    //console.log('Modifier profil - Data to update : ', dataUpdate);

    const updateRes = await updateUserDetails(user, dataUpdate);
    if (updateRes === 0) {
      const response = await fetch(frontConfig.backendURL + '/utilisateur/details/' + user.id);
      const json = await response.json();
      if (json.result) {
        //console.log('Modifier profil - dispacth to reducer : ', json.user);
        dispatch(updateUser({ ...json.user, id: user.id }));
        navigation.navigate('TabNavigator');
      }
    }
  }

  const updateAllergie = (allergie) => {

  }

  const updateCritere = (critereName, critereValue) => {

    const criteresApplis = ['bio', 'vegan', 'premierPrix', 'vegetarien'];
    const preferencesAppli = ['local', 'faibleEnMatiereGrasse', 'faibleEnSucre'];

    if (criteres[critereName] && criteresApplis.includes(critereName)) {
      return;
    }

    const newCrit = {}
    for (const c in criteres) {
      if (c === '_id') continue;
      if (c === critereName) {
        newCrit[critereName] = true
        if (preferencesAppli.includes(c) && preferencesAppli.includes(critereName)) {
          newCrit[c] = !criteres[critereName]
        }
      } else {
        if (criteresApplis.includes(c) && criteresApplis.includes(critereName)) {
          newCrit[c] = false
        }
      }
    }
    //console.log('NEW CRITS : ', newCrit)
    setCriteres({ ...criteres, ...newCrit });
  }

  const updatePreference = (prefName, prefValue) => { // modifier preférence
    setPreferences({
      ...preferences,
      [prefName]: !prefValue
    })
  }

  return (

    < SafeAreaView style={styles.container}>
      <View style={styles.color} >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.title1}>{action} vos informations</Text>
          <Text style={[globalStyles.title, { top: 30, marginBottom: 10, right: 105 }]}>IDENTITE</Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdateProfile}
            errorTextStyle={{ bottom: 10 }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
              <>
                <View>
                  <RNPickerSelect
                    value={userParams.prefixe}
                    onValueChange={(itemValue) =>
                      setUserParams({ ...userParams, prefixe: itemValue })
                    } items={[
                      { label: 'M.', value: 'M.' },
                      { label: 'Mme.', value: 'Mme.' }
                    ]}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'Genre', value: null }}
                  />
                </View>
                <Field
                  style={globalStyles.textInput}
                  component={LessFormikInput}
                  name="nom"
                  placeholder="Votre nom"
                  errorTextStyle={{ top: 8 }}
                />
                <Field
                  style={globalStyles.textInput}
                  component={LessFormikInput}
                  name="prenom"
                  placeholder="Votre prénom"
                  errorTextStyle={{ top: 8 }}
                />
                <Field
                  style={globalStyles.textInput}
                  component={LessFormikInput}
                  name="telephone"
                  placeholder="Numéro de téléphone"
                  keyboardType='numeric'
                  errorTextStyle={{ top: 8 }}
                />
                <View >
                  <DateDeNaissance defaultDate={dateN} onSelect={onChangeDate} />
                </View>
                <Text style={[globalStyles.title, { top: 7, marginTop: 10, right: 105 }]}>ADRESSE</Text>
                <Field
                  style={globalStyles.textInput}
                  component={LessFormikInput}
                  name="numeroDeRue"
                  placeholder="Numéro de rue"
                  keyboardType='numeric'
                  errorTextStyle={{ top: 8 }}
                />
                <Field
                  style={globalStyles.textInput}
                  component={LessFormikInput}
                  name="nomDeRue"
                  placeholder="Nom de rue"
                  errorTextStyle={{ top: 8 }}
                />
                <Field
                  style={globalStyles.textInput}
                  component={LessFormikInput}
                  name="commune"
                  placeholder="Ville"
                  errorTextStyle={{ top: 8 }}
                />
                <Field
                  style={globalStyles.textInput}
                  component={LessFormikInput}
                  name="codePostal"
                  placeholder="Code postal"
                  keyboardType='numeric'
                  errorTextStyle={{ top: 8 }}
                />
                <Text style={[globalStyles.title, { marginTop: 55, right: 85 }]}>MON BUDGET</Text>
                <View style={styles.budget}>
                  <Slider
                    style={{ marginTop: 15, start: 30, width: 240, height: 40, }}
                    minimumValue={25}
                    maximumValue={1500}
                    minimumTrackTintColor="#2B0D35"
                    value={budget}
                    onValueChange={(value) => setBudget(Math.round(value))}
                    thumbTintColor="#BB8E1"
                  />
                  <Text style={{ start: '80%', color: '#2B0D35', marginTop: 25, fontWeight: 'bold' }}>{budget}€</Text>
                </View>
                <Text style={[globalStyles.title, { marginTop: 25, right: 30 }]}>MON REGIME ALIMENTAIRE</Text>
                <View style={styles.radioButton}>
                  {RegimeConso.map((element) => (
                    <View style={styles.radioContainer}>
                      <RadioButton
                        value={element.value}
                        status={criteres[element.dbValue] ? "checked" : "unchecked"}
                        onPress={() => updateCritere(element.dbValue, element.value)}
                        disabled={false}
                        color='white'
                        uncheckedColor='whitwhitee'
                      />
                      <Text style={styles.radioText}>{element.value}</Text>
                    </View>
                  ))}

                  <Text style={[globalStyles.title, { marginTop: 15, right: 60 }]} >MES PREFERENCES</Text>
                  <PaperProvider>
                    <View style={styles.checkBoxContainer}>
                      {initialPreferences.map((pref, index) => (
                        <View key={`${index}-${pref.dbValue}`} style={styles.checkBoxRow}>
                          <Checkbox
                            status={criteres[pref.dbValue] ? 'checked' : 'unchecked'}
                            onPress={() => updateCritere(pref.dbValue, pref.label)}
                            color='white' />
                          <Text style={styles.checkBoxText}>{pref.label}</Text>

                        </View>
                      ))}
                    </View>
                  </PaperProvider>

                </View>
                <Text style={[globalStyles.title, { marginTop: 13, marginBottom: 25, right: 90 }]} >ALLERGIES</Text>

                <View style={{ alignSelf: 'center' }}>
                  {<MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save='value'
                    placeholder='Ajouter une allergie'
                    boxStyles={{ backgroundColor: 'white', width: 300 }}
                    dropdownStyles={{ backgroundColor: '#2B0D35' }}
                    dropdownTextStyles={{ color: 'white' }}
                    checkBoxStyles={{ color: 'white', tintColor: 'white' }}
                  />
                  }
                </View>
                {/* <View >
            
                  <TextInput style={styles.textInput} onChangeText={(value) => setCriteres({ ...criteres, budget: value })} value={criteres.budget} placeholder='Budget' />
                </View> */}
                <Text style={[globalStyles.title, { marginTop: 35, marginBottom: 15, right: 100 }]} > DIVERS</Text>
                <View style={styles.message}>
                  <Text style={styles.option}>Afficher le message d'accueil</Text>
                  <LessCheckbox checked={preferences.afficherEcranAccueil} onChange={() => updatePreference('afficherEcranAccueil', preferences.afficherEcranAccueil)} />
                </View>
                <TouchableButton color="#7CD6C1" onPress={handleSubmit} title="APPLIQUER LES CRITERES" position={buttonPosition}></TouchableButton>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </SafeAreaView >
  )
}

/* STYLE CSS */

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 95,
    height: 30,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    paddingStart: 30,
    start: 35,
    marginTop: 40,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,

  },
  inputAndroid: {
    width: 95,
    height: 30,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 13,
    paddingStart: 30,
    start: 35,
    marginTop: 40,
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    marginTop: 0,
    borderRadius: 15

  },
  // imageBackground: {
  //   flex: 1,
  //   width: '100%',

  // },

  scrollView: {
    marginHorizontal: 20,
  },
  title1: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },


  budget: {
    flexDirection: 'row',
  },
  radioContainer: {
    flexDirection: 'row',
    backgroundColor: '#2B0D35',
    alignItems: 'center',
    top: 5,
    start: 20,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 150,
    borderRadius: 15,
  },
  radioText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    // left: 15,
  },
  checkBoxContainer: {
    margin: 5,
    marginTop: 10,
    marginBottom: 15,
    paddingTop: 5,
    start: 20,




  },
  checkBoxRow: {
    flexDirection: 'row',
    textAlign: 'center',
    backgroundColor: '#2B0D35',
    marginTop: 10,
    marginBottom: 5,
    marginRight: 120,
    borderRadius: 15,

  },
  checkBoxText: {
    flexWrap: 'wrap',
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10,
    // left: 50,
    // bottom: 20,

  },

  message: {
    flexDirection: 'row',
    marginRight: 18,
    alignItems: 'center',
  },

  option: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
    marginRight: 85,
    start: 45,
  }




});