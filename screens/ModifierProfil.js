import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { frontConfig } from '../modules/config';
import { checkBody } from '../modules/checkBody';

export default function ModifierProfilScreen({ navigation }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [ville, setVille] = useState('');
  const [nomNumeroRue, setNomNumeroRue] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [Budget, setBudget] = useState(0);
  const [regimeConso, setRegimeConso] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [allergies, setAllergies] = useState([]);


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.userDetails);

  const [body, setBody] = useState({userID: user.id});

  useEffect(() => {
    (() => {
      if (!user.email) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  const handleInscription = async() => {
    // Manange with proper message
    try {
      const conReq = await fetch(frontConfig.backendURL + '/utilisateur/update', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!conReq.ok) {
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      console.log('connection result : ', resJson);
      if (resJson.result) {
        dispatch(updateUser({ email: email, id: resJson.id, token: resJson.token}));
        navigation.navigate('Inscription')
        setNom('');
        setPrenom('');
        setVille('');
        setNomNumeroRue('');
        setCodePostal('');
        setBudget('');
        setRegimeConso([]);
        setPreferences([]);
        setAllergies([]);
      } else {
        console.log('Login failed with message : ', resJson.error);
      }
    } catch(err) {
      console.log('Connection to the backend failed');
      console.log(err.stack);
    }
  }

  const handleUpdateBody = (key, value) => {
    setBody({
      ...body,
      [key]: value,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créér votre profil consommateur</Text>
      <Text style={styles.title2}>Identité</Text>
      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setNom(value)} value={nom} placeholder='Nom' />
      </View>
      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setPrenom(value)} value={prenom} placeholder='Prénom' />
      </View>
      <Text style={styles.title2}>Adresse</Text>
      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setNomNumeroRue(value)} value={nomNumeroRue} placeholder='Numéro et nom de rue' />
      </View>
      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setVille(value)} value={ville} placeholder='Ville' />
      </View>
      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setCodePostal(value)} value={codePostal} placeholder='Code postal' />
      </View>
      <Text style={styles.title2}>Mon budget</Text>
      
      <Button
        title="Appliquer ces critères"
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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