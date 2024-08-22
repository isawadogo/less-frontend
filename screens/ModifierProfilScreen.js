import React from 'react';
import { ImageBackground, Pressable, Button, StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import DateDeNaissance from '../composant/DateDeNaissance';
import { RadioButton } from 'react-native-paper';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper';
import { globalStyles } from '../globalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import LessFormikInput from '../composant/LessFormikInput';



import { Picker } from '@react-native-picker/picker';
//import CheckBox from 'expo-checkbox';

import { useState, useEffect } from 'react';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';


import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { updateUserDetails } from '../modules/userFunctions';
import { LessCheckbox } from '../modules/components';
import { frontConfig } from '../modules/config';
import TouchableButton from '../composant/TouchableButton';


const RegimeConso = [{ value: 'Bio' }, { value: 'Vegan' }, { value: 'Premier prix' }, { value: 'Végétarien' }]
const initialPreferences = [{ label: 'Local', checked: false }, { label: 'Faible en sucres', checked: false }, { label: 'Faible en matière grasse', checked: false }]
const data = [
  { key: '1', value: 'Arachide', disabled: false },
  { key: '2', value: 'Fruit de mer', disabled: false },
  { key: '3', value: 'Oeuf', disabled: false },
  { key: '4', value: 'Lait', disabled: false },
  { key: '5', value: 'Soja', disabled: false },
]

export default function ModifierProfilScreen({ navigation }) {
  // Style du bouton "APPLIQUER LES CRITERES"
  const buttonPosition = {
    width: 220,
    start: 13,
    margin: 50,
    paddingStart: 5,

  }

  const [checked, setChecked] = React.useState('Premier prix')
  const [prefs, setPrefs] = useState(initialPreferences)
  const [selected, setSelected] = React.useState("");

  const handleCheckBox = (index) => {
    setPrefs(beforePrefs => beforePrefs.map((pref, i) =>
      i === index ? { ...pref, checked: !pref.checked } : pref));

  }
  const user = useSelector((state) => state.user.value.userDetails);

  useEffect(() => {
    (() => {
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
    budget: user.budget.toString() || '0',
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
    budget: Yup
      .number()
      .required("Veuillez votre budget"),
  });

  const [budget, setBudget] = useState(null)


  const [preferences, setPreferences] = useState(user.preferences);
  const [allergies, setAllergies] = useState(user.allergies);
  const [criteres, setCriteres] = useState({ ...user.criteres });

  /*const [userAdresses, setUserAdresses] = useState({
    numeroDeRue: user.adresses.length > 0 ? user.adresses[0].numeroDeRue : '',
    nomDeRue: user.adresses.length > 0 ? user.adresses[0].nomDeRue : '',
    commune: user.adresses.length > 0 ? user.adresses[0].commune : '',
    codePostal: user.adresses.length > 0 ? user.adresses[0].codePostal : '',
  });*/
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
  const [show, setShow] = useState(false);

  //const [selectedLanguage, setSelectedLanguage] = useState();

  const onChange = (event, selectedDate) => {
    console.log('selected date : ', selectedDate);
    setShow(false);
    setDateN(selectedDate);
    setUserParams({ ...userParams, dateDeNaissance: selectedDate.toLocaleString() });
  };

  const dispatch = useDispatch();

  //console.log('Modifier profil screen - user details :', user);

  const handleUpdateProfile = async (values) => {
    // Manange with proper message
    const allUserParams = {
      ...Object.assign(userParams, {
        nom: values.nom,
        prenom: values.prenom,
        budget: Number(values.budget),
        telephone: values.telephone,
      })
    }

    const addresses = {
      numeroDeRue: values.numeroDeRue,
      nomDeRue: values.nomDeRue,
      commune: values.commune,
      codePostal: values.codePostal,
    }
    const dataUpdate = {
      ...userParams,
      preferences: preferences,
      criteres: { ...criteres },
      adresses: [addresses],
      allergies: allergies,
    }
    console.log('Modifier profil - Data to update : ', dataUpdate);

    const updateRes = await updateUserDetails(user, dataUpdate);
    if (updateRes === 0) {
      const response = await fetch(frontConfig.backendURL + '/utilisateur/details/' + user.id);
      const json = await response.json();
      if (json.result) {
        console.log('Modifier profil - dispacth to reducer : ', json.user);
        dispatch(updateUser({ ...json.user, id: user.id }));
        navigation.navigate('TabNavigator');
      }
    }
  }

  const updateAllergie = (allergie) => {

  }

  const updateCritere = (critereName, critereValue) => {
    setCriteres({
      ...criteres,
      [critereName]: !critereValue
    })
  }

  const updatePreference = (prefName, prefValue) => {
    setPreferences({
      ...preferences,
      [prefName]: !prefValue
    })
  }

  return (

    < SafeAreaView style={styles.container}>
      <View style={styles.color} >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.title1}>Créér votre profil consommateur</Text>
          <Text style={[globalStyles.title, { right: 105 }]}>IDENTITE</Text>
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
                  <DateDeNaissance />


                </View>
                <Text style={[globalStyles.title, { top: 15, right: 105 }]}>ADRESSE</Text>
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
                <Text style={[globalStyles.title, { marginTop: 65, right: 85 }]}>MON BUDGET</Text>
                <View style={styles.budget}>
                  <Slider
                    style={{ marginTop: 15, start: 30, width: 248, height: 40, }}
                    minimumValue={25}
                    maximumValue={1500}
                    minimumTrackTintColor="#FFFFFF"
                    onValueChange={(value) => setBudget(Math.round(value))}
                    thumbTintColor="#BB8E1"
                  />
                  <Text style={{ start: '55%', color: 'white', marginTop: 25, fontWeight: 'bold' }}>{budget}€</Text>
                </View>
                <Text style={[globalStyles.title, { marginTop: 25, right: 30 }]}>MON REGIME ALIMENTAIRE</Text>
                <View style={styles.radioButton}>

                  {RegimeConso.map((element) => (
                    <View style={styles.radioContainer}>
                      <RadioButton
                        value={element.value}
                        status={checked === element.value ? "checked" : "unchecked"}
                        onPress={() => setChecked(element.value)}
                        disabled={false}
                        color='white'
                        uncheckedColor='yellow'
                      />
                      <Text style={styles.radioText}>{element.value}</Text>
                    </View>
                  ))}

                  {/* <View >
                    <LessCheckbox checked={criteres.bio} onChange={() => updateCritere('bio', criteres.bio)} />
                    <Text style={styles.option}>Bio</Text>
                  </View>
                  <View >
                    <LessCheckbox checked={criteres.vegan} onChange={() => updateCritere('vegan', criteres.vegan)} />
                    <Text style={styles.option}>Végan</Text>
                  </View>
                  <View >
                    <LessCheckbox checked={criteres.premierPrix} onChange={() => updateCritere('premierPrix', criteres.premierPrix)} />
                    <Text style={styles.option}>Premier prix</Text>
                  </View>
                  <View >
                    <LessCheckbox checked={criteres.vegetarien} onChange={() => updateCritere('vegetarien', criteres.vegetarien)} />
                    <Text style={styles.option}>Végétarien</Text>
                  </View> */}
                  {/* </View> */}
                  <Text style={[globalStyles.title, { marginTop: 15, bottom: 10, right: 60 }]} >MES PREFERENCES</Text>
                  <PaperProvider>
                    <View style={styles.checkBoxContainer}>
                      {prefs.map((pref, index) => (
                        <View key={index} style={styles.checkBoxRow}>
                          <Checkbox
                            status={pref.checked ? 'checked' : 'unchecked'}
                            onPress={() => handleCheckBox(index)}
                            color='white' />
                          <Text style={styles.checkBoxText}>{pref.label}</Text>

                        </View>
                      ))}
                    </View>
                  </PaperProvider>

                  {/* <View >
                    <LessCheckbox checked={criteres.local} onChange={() => updateCritere('local', criteres.local)} />
                    <Text style={styles.option}>Local</Text>
                  </View>
                  <View >
                    <LessCheckbox checked={criteres.faibleEnSucre} onChange={() => updateCritere('faibleEnSucre', criteres.faibleEnSucre)} />
                    <Text style={styles.option}>Faible en sucres</Text>
                  </View>
                  <View >
                    <LessCheckbox checked={criteres.faibleEnMatiereGrasse} onChange={() => updateCritere('faibleEnMatiereGrasse', criteres.faibleEnMatiereGrasse)} />
                    <Text style={styles.option}>Faible en matière grasse</Text>
                  </View> */}
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
                <TouchableButton color="#7CD6C1" onPress={() => navigation.navigate('Accueil')} title="APPLIQUER LES CRITERES" position={buttonPosition}></TouchableButton>




              </>
            )}
          </Formik>

        </ScrollView>
      </View>
    </SafeAreaView >
  )
}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  checkBox: {

  },
  scrollView: {
    marginHorizontal: 20,
  },
  title1: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    textAlign: 'center',
  },
  // title2: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   marginBottom: 10,
  //   textAlign: 'right',
  // },
  option: {
    color: 'white',
  },
  budget: {
    flexDirection: 'row',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 5,
    padding: 5,
    marginBottom: 10
  },
  radioText: {
    color: 'white',
    fontWeight: 'bold',
    left: 15,
  },
  checkBoxText: {
    color: 'white',
    fontWeight: 'bold',
    left: 60,
    bottom: 27,
  },
  checkBoxContainer: {

    margin: 5,

  },
  message: {
    flexDirection: 'row',
    marginRight: 18,
    alignItems: 'center',




  },
  option: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 85,
    start: 25,
  }




});