
import { ImageBackground, Pressable, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import DateDeNaissance from '../composant/DateDeNaissance';
import { RadioButton } from 'react-native-paper';
import { globalStyles } from '../globalStyles';
import LessFormikInput from '../composant/LessFormikInput';
import React from 'react';



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


const RegimeConso = [{ value: 'Bio' }, { value: 'Vegan' }, { value: 'Premier prix' }, { value: 'Végétarien' }]

export default function ModifierProfilScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const [checked, setChecked] = React.useState('')
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
    <View style={styles.container}>
      <ImageBackground source={require('../assets/back.png')} style={styles.imageBackground} >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.title1}>Créér votre profil consommateur</Text>
          <Text style={[globalStyles.title, { top: 25, right: 110 }]}>Identité</Text>
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
                  errorTextStyle={{ top: 8 }}
                />
                <View >
                  <DateDeNaissance />


                </View>
                <Text style={[globalStyles.title, { top: 15, right: 110 }]}>Adresse</Text>
                <Field
                  style={globalStyles.textInput}
                  component={LessFormikInput}
                  name="numeroDeRue"
                  placeholder="Numéro de rue"
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
                  placeholder="ville"
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
                <Text style={[globalStyles.title, { top: 18, right: 90 }]}>Mon budget</Text>
                <View style={styles.budget}>
                  <Slider
                    style={{ marginTop: 25, start: 30, width: 235, height: 40, }}
                    minimumValue={25}
                    maximumValue={1500}
                    minimumTrackTintColor="#FFFFFF"
                    onValueChange={(value) => setBudget(Math.round(value))}
                    thumbTintColor="#BB8E1"
                  />
                  <Text style={{ start: '55%', color: 'white', marginTop: 35, fontWeight: 'bold' }}>{budget}€</Text>
                </View>
                <Text style={globalStyles.title} >Mon régime de consommation</Text>
                <View>

                  {RegimeConso.map((element) => (

                    <RadioButton
                      key={element.value}
                      value={element.value}
                      status={checked === element.value ? "checked" : "unchecked"}
                      onPress={() => setChecked(element.value)}
                      disabled={false}

                    />))}

                </View>


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
                <Text style={globalStyles.title}>Mes préférences</Text>
                <View style={styles.checkBox}>
                  <View >
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
                  </View>
                </View>
                <Text style={globalStyles.title}>Allergies et tolérances</Text>
                <View >
                  <TextInput style={styles.textInput} onChangeText={(value) => setCriteres({ ...criteres, budget: value })} value={criteres.budget} placeholder='Budget' />
                </View>
                <Text style={globalStyles.title}>Divers</Text>
                <View>
                  <View >
                    <Text style={styles.option}>Afficher le message d'accueil</Text>
                    <LessCheckbox checked={preferences.afficherEcranAccueil} onChange={() => updatePreference('afficherEcranAccueil', preferences.afficherEcranAccueil)} />
                  </View>
                </View>
                <Button
                  title="Appliquer ces critères"
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </ImageBackground>
    </View >
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
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'right',
  },
  option: {
    color: 'white',
  },
  budget: {
    flexDirection: 'row',
  }



});