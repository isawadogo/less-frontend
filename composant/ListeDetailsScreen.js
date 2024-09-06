import { StyleSheet, Text, StatusBar, View, ScrollView } from 'react-native';

export default function ListeDetailScreen({ liste }) {
    const enseigneNom = liste.listeArticles[0].enseigne;
    return(
        <View style={styles.container}>
        <Text style={styles.enseigne}> Enseigne : {enseigneNom}</Text>
        <Text style={styles.ListName}>Nom: {liste.nom}</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {liste.listeArticles.map((p, j) => {
            return (
            <View style={styles.productContainer} key={p._id} >
                <View style={styles.productSubContainer}>
                <Text style={styles.productName}>{p.nom}</Text>
                <Text style={styles.productPrice}>{(p.quantite * p.prix).toFixed(2)}€</Text>
                </View>

                <Text style={styles.productQuantity}>({p.quantite} x {p.prix.toFixed(2)}€)</Text>

                <View style={styles.totalContainer}>
                {p.criteres.map((c) => <Text style={styles.criteresBool} key={`${j}-${p._id}_${c}`}>✔️ {c}</Text>)}
                </View>

            </View>
            )
        })}
      </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollView: {
  },
  enseigne: {
    paddingTop: 30,
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    color: '#25000D',
    marginBottom: 15
  },
  categorieText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    color: '#25000D',
    marginBottom: 10,
  },
  productContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10
  },
  productSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  productPrice: {
    fontFamily: 'Raleway-Bold',
    fontSize: 14,
    color: '#7CD6C1',
  },
  productQuantity: {
    fontFamily: 'Raleway-Regular',
    fontSize: 10,
    color: '#A3A3A3',
    alignSelf: 'flex-end'
  },
  criteresBool: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#4F4F4F',
  },
  icon: {
    color: '#DCA2A2',
    padding: 10
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'flex-end'
  },
  totalText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    color: '#25000D',
    marginBottom: 15
  },
  totalNumber: {
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    color: '#25000D',
    marginBottom: 15
  },
  ListName: {
    fontFamily: 'Raleway-Bold',
    fontSize: 24,
    color: '#25000D'
  },

});

module.exports = {
    ListeDetailScreen,
}