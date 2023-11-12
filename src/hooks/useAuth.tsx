import { useContext } from 'react';
import AuthContext from '~/contexts/UserContext';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
