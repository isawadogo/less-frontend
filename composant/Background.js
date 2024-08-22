import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View, Text, Button, ImageBackground } from "react-native";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";


const Background = (navigation) => {
    return (
        <View>
            <ImageBackground source={require('../assets/back.png')} style={styles.imageBackground} >
                <View style={styles.titleContainer}>
                    <FontAwesomeIcon icon={faCircleArrowLeft} onPress={() => navigation.goBack()} />
                    <Text style={styles.screenTitle}>Titre</Text>
                </View>

                <View style={styles.mainContainer}>
                    <Text>item 1</Text>
                    <Text>item 2</Text>
                </View>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({

    imageBackground: {
    },

    titleContainer: {
        flexDirection: "row",
    },

    mainContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 25,
    },

    backButton: {
        color: '#7CD7C1',
        background: '#fff',
        borderRadius: 100,
        height: 50,
        width: 50,
    },

    screenTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 25,
    },


})

export default Background;