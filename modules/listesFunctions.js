import { frontConfig } from '../modules/config';

// takes a critere, it's type, an arry of produits and returns an array of produits matching the critere
async function evaluateCritere(critereNom, categorie, nomProduit, token) {
  //const user = useSelector((state) => state.user.value.userDetails);
  //console.log('Function evaluate criteres  - details 1 :', critereNom);
  //console.log('Function evaluate criteres  - details 2 :', categorie);
  //console.log('Function evaluate criteres  - details 3 :', nomProduit);
  let produits = [];
  // Get all the produits for the categorie
     try { ///produit/categories/Boissons?nomProduit=Limonade
        const conReq = await fetch(frontConfig.backendURL + '/produits/categories/' + categorie + '?nomProduit=' + nomProduit, {
          method: 'GET',
          headers: { "Content-Type": "application/json", "authorization": token},
        });
        if (!conReq.ok) {
          throw new Error('Connection returned a non 200 http code');
        }
        const resJson = await conReq.json();
        //console.log(`evaluate criteres : returned produits for categorie ${categorie} , critere ${critereNom} : ${resJson}`);
        if (resJson.result) {
            if (resJson.produits.length > 0) {
              produits = resJson.produits.toSorted((a, b) => a.prix - b.prix);
              console.log('evaluate criteres - sorted produits : ', produits);
              //produits.map((e) => console.log(`evaluate critere - matched produit detail, critere ${critereNom} : ${JSON.stringify(e)}`));
            }
        } else {
          console.log('Failed to get produuits list from the backend : ', resJson.error);
        }
      } catch(err) {
        console.log('Choisir porduits liste - Connection to the backend failed');
        console.log(err.stack);
      }
  let produitsMatch = [];

  switch (critereNom) {
    case 'bio':
    case 'faibleEmpreinte':
    case 'premierPrix':
      produitsMatch = produits.filter((e) => e[critereNom] === true )
      break;
    case 'faibleEnMatiereGrasse':
      produitsMatch = produits.filter((e) => e.tauxDeMatiereGrasse <= 10 )
      break;
    case 'faibleEnSucre':
      produitsMatch = produits.filter((e) => e.tauxDeSucre <= 10 )
      break;
    case 'distance':
      // get distance from user address to evry enseigne

      // get the produits of enseignes that satify the conditions

      console.log('critere distance');
    break;
  }

  //console.log(`evaluate critere  - matched produits for crit ${critereNom}: ${produitsMatch}`)
  return produitsMatch;
}

async function getEnseignesList(token) {
  var enseignes = []
  //const getEnseignes = async () => {
    try { 
      const conReq = await fetch(frontConfig.backendURL + '/produits/enseignes', {
        method: 'GET',
        headers: { "Content-Type": "application/json", "authorization": token},
      });
      if (!conReq.ok) {
        throw new Error('Connection returned a non 200 http code');
      }
      const resJson = await conReq.json();
      //console.log('connection result - enseignes lists - resJson: ', resJson);
      if (resJson.result) {
          if (resJson.enseignes.length > 0) {
            enseignes = resJson.enseignes;
            //return enseignes;
          }
      } else {
        console.log('Failed to get enseigne list from the backend : ', resJson.error);
      }
    } catch(err) {
      console.log('Choisir porduits liste - Connection to the backend failed');
      console.log(err.stack);
    }
  //}
  //getEnseignes();
  //console.log('connection result - enseignes lists : ', enseignes);
  return enseignes;
}

module.exports = { evaluateCritere, getEnseignesList };
