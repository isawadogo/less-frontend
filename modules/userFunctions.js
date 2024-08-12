import { frontConfig } from '../modules/config';

// Updates the user details,
async function updateUserDetails(user, data) {
  //const user = useSelector((state) => state.user.value.userDetails);
  console.log('Function updateUserDetails  - user details :', user);

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
    console.log('connection result : ', resJson);
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

module.exports = { updateUserDetails };
