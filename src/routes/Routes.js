import { useContext } from 'react';
import RoutesPrivate from './RoutesPrivate';
import RoutesPublic from './routesPublic';
import { AuthContext } from '../context/auth';

function Routes() {

    const { user } = useContext(AuthContext)
    console.log(user);
    
    return <>
        {
            user.ID_USUARIO ? <RoutesPrivate /> : <RoutesPublic />
        }
    </>
}

export default Routes