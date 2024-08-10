import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { frontConfig } from '../modules/config';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.userDetails);

  useEffect(() => {
    (() => {
      if (user.email) {
        navigation.navigate('Dashboard');
      }
    })();
  }, []);

  const handleConnect = async () => {
    if (email.length === 0 || password.length === 0) {
      return
    }
    try {
      loginPayload = {
        email,
        password
      }
      const conReq = await fetch(frontConfig.backendURL + '/utilisateur/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
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
        setPassword('');
        navigation.navigate('Dashboard')
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
      <Text style={styles.title}>Content de vous revoir</Text>
      <Text style={styles.infosCon}>
        Accéder à votre compte en renseignant votre email et votre de mot de passe
      </Text>

      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setEmail(value)} value={email} placeholder='Email' inputMode='email' />
      </View>
      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setPassword(value)} value={password} placeholder='Mot de passe' secureTextEntry={true} />
      </View>
      
      <Button
        title='Se connecter'
        onPress={handleConnect}
      />
      <Text>ou</Text>
      <Text>Pas encore de compte? <Button title="Créér un compte" onPress={() => navigation.navigate('Inscription')}/></Text>
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
