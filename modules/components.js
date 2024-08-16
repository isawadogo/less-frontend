import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity, RNTextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { frontConfig } from '../modules/config';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function LessButtonTouchable({label, onChange}) {
  return (
    <TouchableOpacity style={styles.btnTouchableStyle} activeOpacity={0.7} onPress={onPress} >
      <Text style={styles.btnTouchableTextStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function LessInputText(icon, otherProps) {
  const validationColor = '#223e4b';
  return (
    <View
      style={styles.inputTextStyle}
    >
      <View style={{ padding: 8 }}>
        <Entypo name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1 }}>
        <RNTextInput
          underlineColorAndroid='transparent'
          placeholderTextColor='rgba(34, 62, 75, 0.7)'
          {...otherProps}
        />
      </View>
    </View>
  );
}

function LessCheckbox({ onChange, checked }) {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}>
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}

function LessButton({onChange, pressed, texte}) {
  console.log(`in less button - Pressed = ${pressed}, categorie: ${texte}`)

  return (
    <Pressable style={[styles.buttonBase, pressed && styles.buttonPressed]}
      onPress={onChange}>
      <Text>{texte}</Text>
    </Pressable>
  );
}

function ProduitsComponent({categorie, onDecrease, onIncrease}) {
  const user = useSelector((state) => state.user.value.userDetails);
  const [listProd, setListProd] = useState([]);
  const [isReady, setIsReady] = useState(false);
  console.log('Cat loading : ', categorie);
  useEffect(() => {
    (async () => {
    fetch(frontConfig.backendURL + '/produits/categories/' + categorie, {
        method: 'GET',
        headers: { "Content-Type": "application/json", "authorization": user.token },
      }).then((response) => response.json())
      .then((data) => {
        if (data.result) {
          //console.log(' Choisir liste produit - produits par categorie - jsonres : ', data);
          if (data.produits) {
            setListProd(data.produits);
            setIsReady(true);
          } else {
            console.log(`Issue with produits fetch for categorie : ${categorie}`)
          }
        }
      });
    })();
  }, []);
  
  if (!isReady) {
    return(
      <Text>Still Loading ...</Text>
    )
  }

  const increaseNumber = (value) => {
    onIncrease(value);
  }

  const decreaseNumber = (value) => {
    onDecrease(value);
  }
  
  return(
    <View style={styles.produitContainer}>
      {listProd.map((p) => 
        { return(
          <View style={styles.produitItem} key={p._id}>
            <Image 
              style={styles.produitImage}
              source={require('../assets/fruits.png')}
            />
            <Text style={styles.itemPrix}>{p.nom}</Text>
            <Text>{p.prix}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10}}>
              <Pressable onPress={(value) => onIncrease(p)}>
                <AntDesign name='pluscircleo' size={15} color='green' />
              </Pressable>
              <Pressable onPress={(value) => onDecrease(p)}>
                <AntDesign name='minuscircleo' size={15} color='red' />
              </Pressable>
            </View>
          </View>  
        ) }
      )} 
    </View>
  )
}

function ProduitRecapComponent({categorie, onDecrease, onIncrease}) {
  const produitsSelected = useSelector((state) => state.user.value.selectedProduits);
  //const user = useSelector((state) => state.user.value.userDetails);

  const increaseNumber = (value) => {
    onIncrease(value);
  }

  const decreaseNumber = (value) => {
    onDecrease(value);
  }
  
  const produitsTodisplay = []
  produitsSelected.map((p) => {
    if (p.produit.categorieDeProduit === categorie) { 
      produitsTodisplay.push(p);
    }
  });
  if (!produitsTodisplay) {
    return (
      <Text>Prouits ...</Text>
    )
  }
  console.log('Recap liste : categorie selected: ', categorie)
  console.log('Recap liste : produit selected: ', produitsSelected);
  console.log('Recap liste : produit to display : ', produitsTodisplay );
  return(
    <View style={{flex: 1}}>
      <Text style={{fontWeight: 'bold'}}>{categorie}</Text>
      {produitsTodisplay.map((p) => 
        { return(
          <View key={p._id} >
            <Image 
              style={{ height: 40, width: 40 }}
              source={require('../assets/fruits.png')}
            />
            <Text >{p.produit.nom}</Text>
            <Text style={{padding: 5}}>{p.count}</Text>
            <Text>{p.produit.prix}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10}}>
              <Pressable onPress={(value) => onIncrease(p.produit)}>
                <AntDesign name='pluscircleo' size={15} color='green' />
              </Pressable>
              <Pressable onPress={(value) => onDecrease(p.produit)}>
                <AntDesign name='minuscircleo' size={15} color='red' />
              </Pressable>
            </View>
          </View>  
        ) }
      )} 
    </View>
  )
}
const styles = StyleSheet.create({
  inputTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    borderColor: '#223e4b',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 8
  },
  btnTouchableStyle: {
    borderRadius: 8,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e94832'
  },
  btnTouchableTextStyle: {
    fontSize: 18, 
    color: 'white', 
    textTransform: 'uppercase' 
  },
  produitContainer: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  produitItem: {
    height: 140, 
    width: 80, 
    backgroundColor: '#b7a8a8',
    margin: 2,
  },
  itemPrix: {
    fontWeight: 'bold',
  },
  produitImage: {
    width: 50,
    height: 50,
  },
  buttonBase: {
    width: 76,
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'coral',
    backgroundColor: 'transparent',
    //backgroundColor: '#fff',
    //color: '#000',
  },
  buttonPressed: {
    backgroundColor: '#00a400',
    color: '#fff',
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
});

module.exports = { 
  LessInputText,
  LessCheckbox, 
  LessButton, 
  ProduitsComponent,
  ProduitRecapComponent,
 };
