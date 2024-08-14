import { Pressable, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import CheckBox from 'expo-checkbox';
import Slider from '@react-native-community/slider';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { updateUserDetails } from '../modules/userFunctions';
import LessCheckbox from '../modules/LessCheckbox';

import { frontConfig } from '../modules/config';
//import { checkBody } from '../modules/checkBody';

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
  const [budget, setBudget] = useState(null)
  const [preferences, setPreferences] = useState(user.preferences);
  const [allergies, setAllergies] = useState(user.allergies);
  const [criteres, setCriteres] = useState({ ...user.criteres });
  const [userAdresses, setUserAdresses] = useState({
    numeroDeRue: user.adresses.length > 0 ? user.adresses[0].numeroDeRue : '',
    nomDeRue: user.adresses.length > 0 ? user.adresses[0].nomDeRue : '',
    commune: user.adresses.length > 0 ? user.adresses[0].commune : '',
    codePostal: user.adresses.length > 0 ? user.adresses[0].codePostal : '',
  });
  const [userParams, setUserParams] = useState({
    prefixe: user.prefixe,
    nom: user.nom,
    prenom: user.prenom,
    dateDeNaissance: user.dateDeNaissance,
    telephone: user.telephone,
    profilConso: user.profilConso,
    budget: user.budget.toString(),
    distance: user.distance,
  })

  const dispatch = useDispatch();

  //console.log('Modifier profil screen - user details :', user);

  const handleUpdateProfile = async () => {
    // Manange with proper message
    const dataUpdate = {
      ...userParams,
      budget: Number(userParams.budget),
      preferences: preferences,
      criteres: { ...criteres },
      adresses: [userAdresses],
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
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, prefixe: value })} value={userParams.prefixe} placeholder='Civilité' />
        </View>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, nom: value })} value={userParams.nom} placeholder='Nom' />
        </View>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, prenom: value })} value={userParams.prenom} placeholder='Prénom' />
        </View>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, telephone: value })} value={userParams.telephone} placeholder='Numéro de téléphone' />
        </View>
        <View >
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setUserParams({ ...userParams, dateNaissance: value })}
            value={userParams.dateDeNaissance}
            placeholder='Date de naissance'
          />
        </View>
        <Text style={styles.title2}>Adresse</Text>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setUserAdresses({ ...userAdresses, numeroDeRue: value })} value={userAdresses.numeroDeRue} placeholder='Numéro de rue' />
        </View>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setUserAdresses({ ...userAdresses, nomDeRue: value })} value={userAdresses.nomDeRue} placeholder='Nom de rue' />
        </View>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setUserAdresses({ ...userAdresses, commune: value })} value={userAdresses.commune} placeholder='Ville' />
        </View>
        <View >
          <TextInput style={styles.textInput} onChangeText={(value) => setUserAdresses({ ...userAdresses, codePostal: value })} value={userAdresses.codePostal} placeholder='Code postal' />
        </View>
        <Text style={styles.title2}>Mon budget</Text>
        <View >
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={25}
            maximumValue={1000}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(value) => setBudget(Math.round(value))}

          />
          <Text>{budget}</Text>
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
          onPress={handleUpdateProfile}
        />
        <StatusBar style="auto" />
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