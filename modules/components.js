import { useState } from 'react';
import { StatusBar, Modal, Button, Pressable, StyleSheet, Text, View, Image, TouchableOpacity, RNTextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { frontConfig } from '../modules/config';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import colors from '../styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowRight, faColumns } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';

function LessButtonTouchable({ label, onChange }) {
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
      {checked && <Ionicons name="checkmark" size={20} color={'black'} />}
    </Pressable>
  );
}

function LessButton({ onChange, pressed, texte }) {
  //console.log(`in less button - Pressed = ${pressed}, categorie: ${texte}`)
  return (
    <Pressable style={[styles.buttonBase, pressed && styles.buttonPressed]}
      onPress={onChange}>
      <Text style={[styles.textButtonBase, pressed && styles.textButtonPressed]}>{texte}</Text>
    </Pressable>
  );
}

function ProduitsComponent({ categorie, onDecrease, onIncrease }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const [listProd, setListProd] = useState([]);
  const [isReady, setIsReady] = useState(false);
  //console.log('Cat loading : ', categorie);
  useEffect(() => {
    (async () => {
      //fetch(frontConfig.backendURL + '/produits/produitsNom/' + categorie, {
      fetch(frontConfig.backendURL + '/produits/categories/produitsNom/' + categorie, {
        method: 'GET',
        headers: { "Content-Type": "application/json", "authorization": user.token },
      }).then((response) => response.json())
        .then((data) => {
          if (data.result) {
            //console.log(' Choisir liste produit - produits par categorie - jsonres : ', data);
            if (data.produits) {
              //console.log('data produits : ', data.produits);
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
    return (
      <Text>Chargement ...</Text>
    )
  }

  const increaseNumber = (value) => {
    onIncrease(value);
  }

  const decreaseNumber = (value) => {
    onDecrease(value);
  }

  return (
    <View style={styles.produitContainer}>
      {listProd.map((p) => {
        return (
          <View style={styles.itemContainer} key={p.nom}>
            <Image
              style={styles.produitImage}
              source={require('../assets/fruit_orange.png')}
            />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemName}>{p.nom}</Text>
              <View style={styles.itemAddRemove}>
                <Pressable onPress={(value) => onIncrease(p)}>
                  <AntDesign name='pluscircleo' size={25} color='#7CD6C1' />
                </Pressable>
                <Text style={styles.itemNumber}>0</Text>
                <Pressable onPress={(value) => onDecrease(p)}>
                  <AntDesign name='minuscircleo' size={25} color='#DCA2A2' />
                </Pressable>
              </View>
            </View>

          </View>
        )
      }
      )}
    </View>
  )
}

function ProduitRecapComponent({ categorie, onDecrease, onIncrease }) {
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
    if (p.produit.categorie === categorie) {
      produitsTodisplay.push(p);
    }
  });
  if (!produitsTodisplay) {
    return (
      <Text>Prouits ...</Text>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.RecapProductCatTitle}>{categorie}</Text>
      {produitsTodisplay.map((p, i) => {
        return (
          <View key={`${categorie}-${p.nom}-${i}`} style={styles.RecapProductContainer}>
            <Text style={styles.RecapProductText}>{p.produit.nom}</Text>

            <Text>{p.produit.prix}</Text>
            <View style={styles.RecapProductContainerAddRemove}>
              <Pressable onPress={(value) => onIncrease(p.produit)}>
                <AntDesign name='pluscircleo' size={25} color='#7CD6C1' />
              </Pressable>
              <Text style={styles.RecapProductText}>{p.count}</Text>
              <Pressable onPress={(value) => onDecrease(p.produit)}>
                <AntDesign name='minuscircleo' size={25} color='#DCA2A2' />
              </Pressable>
            </View>

          </View>

        )
      }
      )}
    </View>
  )
}

// compoents = [components, component, ...]
// props = {backLink, titre, components}
function LessHeader(props) {
  return (
    <TouchableOpacity style={styles.lessHeader}>
      <View style={styles.lessHeaderLeft}>
        <Pressable onPress={props.backAction}>
          <Entypo name='arrow-with-circle-left' color='#ffffff' size={26} />
        </Pressable>
        <Text style={styles.lessHeaderTitle}>
          {props.titre}
        </Text>
      </View>
      <View style={styles.lessHeaderRight}>

      </View>
    </TouchableOpacity>
  )
}

function ListeDetailsComponent({ liste }) {
  return (
    <SafeAreaView key={`${liste._id}-${liste.nom}`} style={styles.modalView}>
      <Text style={styles.nom}> {liste.nom} </Text>
      <Text style={styles.date} >Date de création : {moment(liste.dateCreation).format('DD MMMM à HH:mm')} </Text>
      <Text style={styles.article}>Articles de la liste :</Text>
      {liste.listeArticles.map((a, i) => {
        return (
          <View key={`${i}-${liste._id}-${a._id}`} style={styles.liste}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{a.nom.toUpperCase()}</Text>
            <View>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Quantité:  {a.quantite}</Text>
              <Text style={styles.prix}>{a.prix} €</Text>
            </View>
          </View>
        )
      })
      }
    </SafeAreaView>
  )
}

function ExistingListesComponents({ currentListes, deleteAction }) {

  const [isVisible, setIsVisible] = useState(false);
  const [modalListe, setModalListe] = useState('')

  const listes = currentListes;
  let modalsState = listes.map((l) => {
    return { nom: l.nom, isVisible: false }
  });

  const handModalState = (nom) => {
    setModalListe(listes.find((e) => e.nom === nom));
    setIsVisible(!isVisible);
  }
  return (
    <View>
      {listes ? listes.map((l, i) => {
        //modalVisible = modalsState.find((e) => e.nom === l.nom);
        return (
          < View key={`${i}-${l._id}`} >
            <View style={styles.listContainer}>
              <View>
                <Text style={styles.listText}>{l.nom}</Text>
                <Text style={styles.listDate}>Créer le {moment(l.dateCreation).format('DD MMMM à HH:mm')}</Text>
              </View>
              <TouchableOpacity onPress={() => handModalState(l.nom)}>

                <FontAwesomeIcon icon={faCircleArrowRight} style={styles.listArrow} />
              </TouchableOpacity>
            </View>

          </View>
        )
      }) : <View></View>}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={() => handModalState(l.nom)}
      >
        <ListeDetailsComponent liste={modalListe} key={modalListe._id} />
        <Button
          title='Supprimer cette liste'
          color={"#7CD6C1"}
          onPress={() => deleteAction(modalListe._id)}
        />
        <Button
          title='Fermer'
          color={"#7CD6C1"}
          onPress={() => setIsVisible(!isVisible)}
        />
      </Modal>

    </View >
  )
}

const styles = StyleSheet.create({
  modalView: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    paddingStart: 15
  },
  nom: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    marginBottom: 15,

  },
  date: {
    paddingStart: 30,
    fontSize: 16,
    fontStyle: 'italic',

  },
  article: {
    paddingStart: 30,
    fontSize: 16,
    fontStyle: 'italic',

  },
  liste: {
    height: 80,
    width: 300,
    padding: 20,
    backgroundColor: "#2B0D35",
    color: 'white',
    marginBottom: 10,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    start: 15,
  },
  prix: {
    color: 'white',
    textAlign: 'right',
    bottom: 20,



  },
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
  itemContainer: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemName: {
    fontFamily: 'Raleway-Bold',
    fontSize: 12,
    color: "#25000D",
    margin: 10,
  },
  produitImage: {
    objectFit: 'contain',
    aspectRatio: '1/1',
    borderRadius: 20
  },
  itemNumber: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: "#4F4F4F",
    marginLeft: 5,
    marginRight: 5
  },
  itemAddRemove: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  listContainer: {

    width: 300,
    height: 55,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
    paddingStart: 5
  },
  listText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#25000D',
    paddingStart: 15,
  },
  listDate: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#7F7F7F',
    paddingStart: 15,
  },
  listArrow: {
    color: '#7CD7C1',
    padding: 17,
  },



  RecapProductContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    paddingTop: 10, flexDirection: 'row',
    justifyContent: 'space-between'
  },
  RecapProductContainerAddRemove: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  RecapProductCatTitle: {
    fontFamily: 'Raleway-Bold',
    color: '#25000D',
    fontSize: 14,
    marginBottom: 15
  },
  RecapProductText: {
    fontFamily: 'Raleway-Regular',
    color: '#4F4F4F',
    fontSize: 14,
    paddingHorizontal: 10
  },

  buttonBase: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: "#F7F7F7",
    padding: 10,
    marginLeft: 15,
    marginBottom: 10,
    height: 40,
  },

  buttonPressed: {
    backgroundColor: '#2B0D35',
    color: '#fff',
  },

  textButtonBase: {
    color: '#2B0D35',
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
  },

  textButtonPressed: {
    color: 'white',
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
  },

  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
    top: 5,
  },

  checkBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  lessHeader: {
    width: '100%',
    minHeight: 40,
    color: colors.primary,
  },

  lessHeaderLeft: {
    color: '#ffffff',
    paddingLeft: 20,
    flexDirection: 'row',
  },
  lessHeaderTitle: {
    color: '#ffffff',
    fontSize: 20,
    paddingLeft: 15,
  },
  lessHeaderRight: {
    flexDirection: 'row',

  },
});

module.exports = {
  LessInputText,
  LessCheckbox,
  LessButton,
  ProduitsComponent,
  ProduitRecapComponent,
  LessHeader,
  ExistingListesComponents,
  ListeDetailsComponent,
};
