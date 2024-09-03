import { frontConfig } from '../modules/config';

// Updates the user details,
async function updateUserDetails(user, data) {
  //const user = useSelector((state) => state.user.value.userDetails);
  //console.log('Function updateUserDetails  - user details :', user);

  if ( !user.id ) {
    return 
  }
  //const dispatch = useDispatch();
  try {
    const conReq = await fetch(frontConfig.backendURL + '/utilisateur/update', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!conReq.ok) {
      throw new Error('Connection returned a non 200 http code');
    }
    const resJson = await conReq.json();
    //console.log('connection result : ', resJson);
    if (resJson.result) {
        return 0;
    } else {
      console.log('Login failed with message : ', resJson.error);
    }
  } catch(err) {
    console.log('Connection to the backend failed');
    console.log(err.stack);
  }
}

async function getUserCoordinates(address) {
  // Search from https://api-adresse.data.gouv.fr
  const { commune, codePostal, nomDeRue, numeroDeRue } = address;
  const getQuery = `https://api-adresse.data.gouv.fr/search/?q=${numeroDeRue}+${nomDeRue}+${commune}+${codePostal}&limit=1`;

  try {
    const reqRes = await fetch(getQuery);
    //console.log('REQ RES : ', reqRes);
    if (!reqRes.ok) {
      console.log('The request failed with error : ');
      console.log(`Status code : ${reqRes.status}, error : ${reqRes.statusText}`);
    } else {
      const addressJson = await reqRes.json();
      //console.log('ADDD : ', addressJson);
      if (addressJson.features && addressJson.features.length > 0 ) {
        const pointData = addressJson.features.find((geodata) => geodata.type === 'Feature' && geodata.geometry.type === 'Point');
        //console.log('pointData : ', pointData);
        if (pointData.geometry) {
        const longitude = pointData.geometry.coordinates[0];
        const latitude = pointData.geometry.coordinates[1];
        return { latitude: latitude, longitude: longitude };
        }
      }
    }
  } catch(err) {
    console.log(`Api call to ${getQuery} failed `);
    console.log(err.stack);
  }
}

module.exports = { 
  updateUserDetails,
  getUserCoordinates,
};
