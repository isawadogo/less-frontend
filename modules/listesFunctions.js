import { frontConfig } from '../modules/config';

function getUserCoordinates(token, address) {
  // Search from https://api-adresse.data.gouv.fr
  const { commune, codePostal, nomDeRue, numeroDeRue } = address;
  const getQuery = `https://api-adresse.data.gouv.fr/search/?q=${numeroDeRue}+${nomDeRue}+${commune}+${codePostal}&limit=1`;

  const getAddress = async function() {
    try {
      const reqRes = await fetch(getQuery);
      //console.log('REQ RES : ', reqRes);
      if (!reqRes.ok) {
        console.log('The request failed with error : ');
        console.log(`Status code : ${reqRes.status}, error : ${reqRes.statusText}`);
      } else {
        const addressJson = reqRes.json();
        if (addressJson.features && addressJson.features.length > 0 ) {
          const latitude = addressJson.features[0].coordinates[0];
          const longitude = addressJson.features[0].coordinates[1];
          return { latitude: latitude, longitude: longitude };
        }
      }
    } catch(err) {
      console.log(`Api call to ${getQuery} failed `);
      console.log(err.stack);
    }
  }
}

async function deleteListe(token, listeId) {
    try {
      // delete a liste
      //console.log('LISTE ID', listeId)
      const deleteReq = await fetch(frontConfig.backendURL + '/listes/delete/' + listeId,
        {
          method: 'DELETE',
          headers: { "Content-Type": "application/json", "authorization": token},
        }
      );
      //console.log('DELETE REQ : ', deleteReq);
      if (!deleteReq.ok) {
        console.log('The delete request failed with error : ')
        console.log(`Status code : ${deleteReq.status}, error : ${deleteReq.statusText}`)
      } else {
        const listeJson = await deleteReq.json();
        if (listeJson.result) {
          return true;
        }
      }
    } catch (err) {
      console.log('Failed to delete the liste ');
      console.log(err.stack);
    }
    return false;
}

async function getUserListes(token, userId) {
    try {
      // Get User's listes
      const listes = await fetch(frontConfig.backendURL + '/listes/getListes/' + userId,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json", "authorization": token},
        }
      );
      if (!listes.ok) {
        throw new Error('getUserListes - Connection returned a non 200 http code');
      }
      const listesJson = await listes.json();
      if (listesJson.result) {
        return listesJson.listes;
      }
    } catch (err) {
      console.log('getUserListes - Failed to get user listes ');
      console.log(err.stack);
    }
}

async function getProduits(token,categorie, nomProduit, pageNumber=1, limit=1) {
  try { ///produit/categories/Boissons?nomProduit=Limonade
    const conReq = await fetch(frontConfig.backendURL + '/produits/categories/' + categorie + '?nomProduit=' + nomProduit 
      + '&limit=' + limit + '&pageNumber=' + pageNumber, {
      method: 'GET',
      headers: { "Content-Type": "application/json", "authorization": token},
    });
    if (!conReq.ok) {
      throw new Error('Connection returned a non 200 http code');
    }
      const resJson = await conReq.json();
      if (resJson.result) {
        if (resJson.produits.length > 0) {
          return resJson.produits;
        }
      } else {
        console.log('Failed to get produuits list from the backend : ', resJson.error);
        return [];
      }
    } catch(err) {
      console.log('Evaluate criteres - An error occured. See below for the stack trace');
      console.log(err.stack);
    }
}

// takes a critere, it's type, an arry of produits and returns an array of produits matching the critere
async function evaluateCritere(critereNom, categorie, nomProduit, token) {
  //const user = useSelector((state) => state.user.value.userDetails);
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
        //console.log(`evaluate criteres : returned produits for categorie ${categorie} , critere ${critereNom} : ${JSON.stringify(resJson)}`);
        if (resJson.result) {
            if (resJson.produits.length > 0) {
              produits = resJson.produits;
              //produits = resJson.produits.toSorted((a, b) => a.prix - b.prix);
              //console.log('evaluate criteres - sorted produits : ', produits);
              //produits.map((e) => console.log(`evaluate critere - matched produit detail, critere ${critereNom} : ${JSON.stringify(e)}`));
            }
        } else {
          console.log('Failed to get produuits list from the backend : ', resJson.error);
        }
      } catch(err) {
        console.log('Evaluate criteres - An error occured. See below for the stack trace');
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
      // get distance from user address to every enseigne

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
        throw new Error('getEnseignesList - Connection returned a non 200 http code');
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
      console.log('getEnseignesList - Connection to the backend failed');
      console.log(err.stack);
    }
  //}
  //getEnseignes();
  //console.log('connection result - enseignes lists : ', enseignes);
  return enseignes;
}

module.exports = { 
  evaluateCritere, 
  getEnseignesList,
  getProduits,
  getUserListes,
  deleteListe,
};
