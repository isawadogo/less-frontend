import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { frontConfig } from '../modules/config';
import { checkBody } from '../modules/checkBody';

export default function InscriptionScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [errMsg, setErrMsg] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.userDetails);
  console.log('Inscription screen - user details :', user);
  useEffect(() => {
    (() => {
      if (user.email) {
        navigation.navigate('Dashboard');
      }
    })();
  }, []);

  const handleInscription = async() => {
    // Manange with proper message
    if (email.length === 0 || password1.length === 0 || password2.length === 0) {
      return
    }
    // Manange with proper message
    if ( password1 !== password2 ) {
      return
    }
    try {
      signinPayload = {
        email: email,
        password: password1
      }
      const conReq = await fetch(frontConfig.backendURL + '/utilisateur/signin', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinPayload),
      });
      if (!conReq.ok) {
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      console.log('connection result : ', resJson);
      if (resJson.result) {
        // Get User details
        const response = await fetch(frontConfig.backendURL + '/utilisateur/details/' + resJson.id);
        const json = await response.json();
        if (json.result) {
          dispatch(updateUser({ ...json.user, id: resJson.id }));
        }
        setEmail('');
        setPassword1('');
        setPassword2('');
        navigation.navigate('ModifierProfil');
      } else {
        console.log('Login failed with message : ', resJson.error);
      }
    } catch(err) {
      console.log('Connection to the backend failed');
      console.log(err.stack);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>S'enregistrer maintenant</Text>
      <Text style={styles.infosCon}>
       Enregistrez-vous avec votre adresse email et un mot de passe pour continuer. 
      </Text>

      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setEmail(value)} value={email} placeholder='Email' inputMode='email' />
      </View>
      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setPassword1(value)} value={password1} placeholder='Mot de passe' secureTextEntry={true} />
      </View>
      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setPassword2(value)} value={password2} placeholder='Confirmer mot de passe' secureTextEntry={true} />
      </View>
      
      <Button
        title="S'enregistrer"
        onPress={handleInscription}
      />
      <Text>ou</Text>
      <Text>Vous avez déjà un compte? <Button title="Se connecter" onPress={() => navigation.navigate('Login')}/></Text>
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
