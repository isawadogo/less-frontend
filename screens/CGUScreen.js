import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CGUScreen({ navigation }) {

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <FontAwesomeIcon icon={faArrowLeft} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Conditions Générales</Text>

        <View>
          <Text style={styles.intro} >La commission consultative des pratiques commerciales recommande que les fournisseurs de produits ou de prestations de services se dotent de conditions générales de vente établies selon les besoin de chacun, à partir du modèle proposé ci-après :`</Text>

          <Text style={styles.sectionTitle}>1 - Conclusion du contrat</Text>

          <Text style={styles.paragraphe}> Toute commande de produits implique l'adhésion sans réserve aux présentes conditions générales de vente, complétées ou aménagées par nos conditions particulières,qui annulent toute clause contraire pouvant figurer dans les conditions d'achat, bons de commande, ou autres documents commerciaux</Text>

          <Text style={styles.sectionTitle}>2 - Prix</Text>

          <Text style={styles.paragraphe}>Les marchandises sont facturées au tarif en vigueur au jour de la passation de la commande. Le tarif général est annexé aux présentes conditions. Les prix peuvent être révisés sous réserve d'une information préalable de 30 jours.</Text>

          <Text style={styles.sectionTitle}>3 - Livraison</Text>

          <Text style={styles.paragraphe}>La livraison est effectuée soit par la remise directe du produit à l'acquéreur, soit par avis de mise à disposition, soit par délivrance à un expéditeur ou à un transporteur dans les locaux du vendeur ou dans tous autres locaux désignés. La vérification des marchandises par l'acheteur doit être effectuée au moment de leur prise en charge. En cas d'avarie ou de manquant, de réclamations sur les vices apparents ou sur la non-conformité du produit livré, l'acheteur émettra des réserves claires et précises qu'il notifiera dans un délai de trois jours, suivant la date de livraison par écrit auprès du vendeur ou du transporteur. Il appartiendra à l'acheteur de fournir toute justification quant à la réalité des anomalies constatées. 4 - Délais de livraison Les délais de livraison sont indiqués en fonction des disponibilités d'approvisionnement. Sauf cas de force majeure (guerre, émeute, incendie, grève totale ou partielle.), en cas de retard de livraison d'une durée supérieure à .... après la date indicative de livraison, l'acheteur aura l'option d'annuler sa commande, sans pouvoir prétendre à quelque indemnité que ce soit.</Text>

          <Text style={styles.sectionTitle}>4 - Retours</Text>

          <Text style={styles.paragraphe}>Tout retour de produit doit faire l'objet d'un accord formel entre le vendeur et l'acquéreur.</Text>

          <Text style={styles.sectionTitle}>5 - Garantie</Text>

          <Text style={styles.paragraphe} >Le vendeur apportera le plus grand soin à l'exécution de la commande et à la qualité des produits. En cas de défectuosité reconnue par le vendeur, l'obligation de ce dernier sera limitée au remplacement ou au remboursement des quantités défectueuses, sans autre indemnité. Sont exclus de la garantie les défauts et dommages résultant d'un stockage, de manutention, de transport ou d'utilisation dans des conditions anormales ou non conformes avec la nature, les prescriptions, l'aptitude à l'emploi du produit.</Text>

          <Text style={styles.sectionTitle}>6-Paiement</Text>

          <Text style={styles.paragraphe}>Sauf conditions particulières, les factures sont payables à .... à compter de la date de livraison. En cas de retard de paiement, le vendeur pourra suspendre toutes les commandes en cours. Toute somme non payée à l'échéance figurant sur la facture entraîne de plein droit l'application de pénalités d'un montant égal à une fois et demie1  l'intérêt légal. Ces pénalités seront exigibles sur simple demande du vendeur. Aucun escompte n'est accepté pour paiement anticipé. Un escompte de .... est accordé pour tout paiement au comptant.</Text>

          <Text style={styles.sectionTitle}>7-Clause resolutoire</Text>

          <Text style={styles.paragraphe}>En cas de défaut de paiement, quarante huit heures après une mise en demeure restée infructueuse, la vente sera résiliée de plein droit par le vendeur qui pourra demander en référé la restitution des produits sans préjudice de tous autres dommages et intérêts. Les sommes restant dues pour d'autres livraisons deviendront immédiatement exigibles si le vendeur n'opte pas pour la résolution des commandes correspondantes</Text>

          <Text style={styles.sectionTitle}>8-Réserve de propriété</Text>

          <Text style={styles.paragraphe}>Les marchandises vendues restent la propriété du vendeur jusqu'au complet règlement de leur prix. Toutefois les risques afférents aux marchandises seront transférés à l'acheteur ou au transporteur, dès la remise physique des produits.</Text>

          <Text style={styles.sectionTitle}>9-Attribution de juridiction</Text>

          <Text style={styles.paragraphe}>Les présentes conditions annulent et remplacent les conditions précédemment applicables. Tout litige relatif aux présentes sera de la compétence du tribunal mixte de commerce</Text>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',


    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    intro: {
      fontSize: 16,
      marginBottom: 16,
    },
    paragraphe: {
      fontSize: 16,
      marginBottom: 12,
    },
  }
})
