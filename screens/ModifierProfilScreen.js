//import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, StatusBar } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { frontConfig } from '../modules/config';
import { checkBody } from '../modules/checkBody';

export default function ModifierProfilScreen({ navigation }) {

  const user = useSelector((state) => state.user.value.userDetails);

  const [preferences, setPreferences] = useState(user.preferences);
  const [criteres, setCriteres] = useState({...user.criteres});
  //const [allergies, setAllergies] = useState(user.allergies);
  const [userAdresses, setUserAdresses] = useState({
    numeroDeRue: user.adresses.length > 0 ? user.adresses[0].numeroDeRue: '',
    nomDeRue: user.adresses.length > 0 ? user.adresses[0].nomDeRue: '',
    commune: user.adresses.length > 0 ? user.adresses[0].commune: '',
    codePostal: user.adresses.length > 0 ? user.adresses[0].codePostal: '',
  });
  const [userParams, setUserParams] = useState({
    prefixe: user.prefixe,
    nom: user.nom,
    prenom: user.prenom,
    dateDeNaissance: user.dateDeNaissance,
    telephone: user.telephone,
    profilConso: user.profilConso,
  })
  console.log('Critere budget : ', criteres.budget);
  const dispatch = useDispatch();

  console.log('Modifier profil screen - user details :', user);

  useEffect(() => {
    (() => {
      if (!user.email) {
        navigation.navigate('Login');
      }
      setUserParams({...userParams, userId: user.id })
    })();
  }, []);

  const handleInscription = async() => {
    // Manange with proper message
    const dataUpdate = {
      ...userParams,
      preferences: preferences,
      criteres: {...criteres},
      adresses: [userAdresses],
    }
    console.log('Modifier profil - Data to update : ', dataUpdate);
    //return;
    try {
      const conReq = await fetch(frontConfig.backendURL + '/utilisateur/update', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataUpdate),
      });
      if (!conReq.ok) {
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      console.log('connection result : ', resJson);
      if (resJson.result) {
        // Get User details
        const response = await fetch(frontConfig.backendURL + '/utilisateur/details/' + user.id);
        const json = await response.json();
        if (json.result) {
          console.log('Modifier profil - dispacth to reducer : ', json.user);
          dispatch(updateUser({ ...json.user, id: user.id }));
        }
        navigation.navigate('Dashboard');
      } else {
        console.log('Login failed with message : ', resJson.error);
      }
    } catch(err) {
      console.log('Connection to the backend failed');
      console.log(err.stack);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Créér votre profil consommateur</Text>
          <Text style={styles.title2}>Identité</Text>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, prefixe: value})} value={userParams.prefixe} placeholder='Civilité' />
          </View>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, nom: value})} value={userParams.nom} placeholder='Nom' />
          </View>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, prenom: value})} value={userParams.prenom} placeholder='Prénom' />
          </View>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, telephone: value})} value={userParams.telephone} placeholder='Numéro de téléphone' />
          </View>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, dateNaissance: value})} value={userParams.dateDeNaissance} placeholder='Date de naissance' />
          </View>
          <Text style={styles.title2}>Adresse</Text>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserAdresses({ ...userAdresses, numeroDeRue: value})} value={userAdresses.numeroDeRue} placeholder='Numéro de rue' />
          </View>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserAdresses({ ...userAdresses, nomDeRue: value})} value={userAdresses.nomDeRue} placeholder='Nom de rue' />
          </View>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserAdresses({ ...userAdresses, commune: value})} value={userAdresses.commune} placeholder='Ville' />
          </View>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserAdresses({ ...userAdresses, codePostal: value})} value={userAdresses.codePostal} placeholder='Code postal' />
          </View>
          <Text style={styles.title2}>Mon budget</Text>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setCriteres({ ...criteres, budget: value})} value={criteres.budget} placeholder='Budget' />
          </View>
          <Text style={styles.title2}>Mon régime de consommation</Text>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setUserParams({ ...userParams, profilConso: value})} value={userParams.profilConso} placeholder='Profil de consmmation' />
          </View>
          <Text style={styles.title2}>Mes préférences</Text>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setCriteres({ ...criteres, budget: value})} value={criteres.budget} placeholder='Budget' />
          </View>
          <Text style={styles.title2}>Allergies et tolérances</Text>
          <View >
            <TextInput style={styles.textInput} onChangeText={(value) => setCriteres({ ...criteres, budget: value})} value={criteres.budget} placeholder='Budget' />
          </View>
          
          <Button
            title="Appliquer ces critères"
            onPress={handleInscription}
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
  },
  menu: {
    backgroundColor: '#655074',
    height: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    border: 'none',
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 10,
    marginBottom: 25,
  },
  imageWrapper: {
    height: '80%',
    backgroundColor: '#655074',
    border: 'none',
  },
  imageBackground: {
    width: '100%',
    height: '50%',
    borderBottomLeftRadius: 160,
    backgroundColor: '#ffffff',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    color: '#ffffff',
    position: 'relative',
    bottom: 2,
  },
});