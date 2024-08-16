import { Pressable, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
//import CheckBox from 'expo-checkbox';
import Slider from '@react-native-community/slider';
import { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import LessFormikInput from '../composant/LessFormikInput';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { updateUserDetails } from '../modules/userFunctions';
import LessCheckbox from '../modules/LessCheckbox';

import { frontConfig } from '../modules/config';

export default function ModifierProfilScreen({ navigation }) {
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
    const allUserParams = {...Object.assign(userParams, {
      nom: values.nom,
      prenom: values.prenom,
      budget: Number(values.budget),
      telephone: values.telephone,
    })}

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Créér votre profil consommateur</Text>
        <Text style={styles.title2}>Identité</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
          >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
        <>
        <View>
        <Picker
          selectedValue={userParams.prefixe}
          onValueChange={(itemValue, itemIndex) =>
            setUserParams({ ...userParams, prefixe: itemValue})
          }>
          <Picker.Item label="M." value="M." />
          <Picker.Item label="Mme" value="Mme" />
        </Picker>
        </View>
        <Field
          component={LessFormikInput}
          name="nom"
          placeholder="Votre nom"
        />
        <Field
          component={LessFormikInput}
          name="prenom"
          placeholder="Votre prénom"
        />
        <Field
          component={LessFormikInput}
          name="telephone"
          placeholder="Numéro de téléphone"
        />
        <View >
          <Pressable style={styles.textInput} onPress={() => setShow(true)} >
            <Text>{dateN.getDate()}/{dateN.getMonth()}/{dateN.getFullYear()}</Text>
          </Pressable>
          {show && (
            <DateTimePicker
              value={dateN}
              mode='date'
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        <Text style={styles.title2}>Adresse</Text>
        <Field
          component={LessFormikInput}
          name="numeroDeRue"
          placeholder="Numéro de rue"
        />
        <Field
          component={LessFormikInput}
          name="nomDeRue"
          placeholder="Nom de rue"
        />
        <Field
          component={LessFormikInput}
          name="commune"
          placeholder="ville"
        />
        <Field
          component={LessFormikInput}
          name="codePostal"
          placeholder="Code postal"
          keyboardType='numeric'
        />
        <Text style={styles.title2}>Mon budget</Text>
        <Field
          component={LessFormikInput}
          name="budget"
          placeholder="Budget"
          keyboardType='numeric'
        />
        <View >
        </View>
        <Text style={styles.title2}>Mon régime de consommation</Text>
        <View style={styles.checkBox}>
          <View >
            <LessCheckbox checked={criteres.bio} onChange={() => updateCritere('bio', criteres.bio)} />
            <Text>Bio</Text>
          </View>
          <View >
            <LessCheckbox checked={criteres.vegan} onChange={() => updateCritere('vegan', criteres.vegan)} />
            <Text>Végan</Text>
          </View>
          <View >
            <LessCheckbox checked={criteres.premierPrix} onChange={() => updateCritere('premierPrix', criteres.premierPrix)} />
            <Text>Premier prix</Text>
          </View>
          <View >
            <LessCheckbox checked={criteres.vegetarien} onChange={() => updateCritere('vegetarien', criteres.vegetarien)} />
            <Text>Végétarien</Text>
          </View>
        </View>
        <Text style={styles.title2}>Mes préférences</Text>
        <View style={styles.checkBox}>
          <View >
            <LessCheckbox checked={criteres.local} onChange={() => updateCritere('local', criteres.local)} />
            <Text>Local</Text>
          </View>
          <View >
            <LessCheckbox checked={criteres.faibleEnSucre} onChange={() => updateCritere('faibleEnSucre', criteres.faibleEnSucre)} />
            <Text>Faible en sucres</Text>
          </View>
          <View >
            <LessCheckbox checked={criteres.faibleEnMatiereGrasse} onChange={() => updateCritere('faibleEnMatiereGrasse', criteres.faibleEnMatiereGrasse)} />
            <Text>Faible en matière grasse</Text>
          </View>
        </View>
        <Text style={styles.title2}>Allergies et tolérances</Text>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setCriteres({ ...criteres, budget: value })} value={criteres.budget} placeholder='Budget' />
        </View>
        <Text style={styles.title2}>Divers</Text>
        <View>
          <View >
            <Text>Recevoir des notifications de bons plans</Text>
            <LessCheckbox checked={preferences.recevoirNotifications} onChange={() => updatePreference('recevoirNotifications', preferences.recevoirNotifications)} />
          </View>
          <View >
            <Text>Affichier le message d'accueil</Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'coral',
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  infosCon: {
    width: '75%'
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