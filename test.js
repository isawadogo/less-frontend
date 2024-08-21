import React from "react";
import { View, Button } from 'react-native';
import { useState } from "react";




function choiceOne() {
    const [isclick, Setisclick] = useState(0);
    const critere = {
        modeConso: ['bio', 'vegetarien', 'vegan', 'premierPrix'],
        préférence: ['local', 'faible en sucres', 'faibles en matière grasse']
    }

    if (isclick > 1) {
        break
    }
    return (
        <View>
            {critere[modeConso].map(element => (
                <Button onChange={() => Setisclick++}>
                    <Text style={styles.option}>{element}</Text>
                </Button>))}
        </View>

    )
}

