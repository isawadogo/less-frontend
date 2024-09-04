/* IMPORTS */

//import des éléments React et React Native
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
//import des icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const MonPanier = (props) => {

    return (
    <View style={styles.container}>
        
        <Text style={styles.listName}>{props.name}</Text>

        <View style={styles.container}>
            <FontAwesomeIcon style={styles.icon} icon={faCartShopping} />
            <Text styles={styles.textItems}>{props.nbrItem}</Text>
        </View>

    </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      listName:{
        fontFamily: 'Raleway-Bold',
        fontSize: 24,
        color:'#25000D'
      },

      icon: {
        padding: 10,
        color: '#2B0D35',
        marginLeft: 30,
      },

      textItems: {
        color: "red",
        // color: 'white',
        // backgroundColor: '#7CD6C1',
        // paddingHorizontal: 5,
        // borderRadius: 20,
      },
})

export default MonPanier;