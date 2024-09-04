/* IMPORTS */

//import des éléments React et React Native
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
//import des icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { text } from '@fortawesome/fontawesome-svg-core';

const MonPanier = (props) => {

    return (
    <View style={styles.container}>
        
        <Text style={styles.listName}>{props.name}</Text>

        <View style={styles.container}>
            <FontAwesomeIcon style={styles.icon} icon={faCartShopping} />
            <Text style={styles.text}>{props.nbrItem}</Text>
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
        padding: 15,
        color: '#2B0D35',
        marginTop: 20,
      },

      text: {
        color: 'white',
        backgroundColor: '#7CD6C1',
        paddingHorizontal: 5,
        borderRadius: 20,
        marginLeft: -10,
        marginTop: -10
      },

})

export default MonPanier;