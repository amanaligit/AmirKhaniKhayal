import { useState, useEffect } from 'react';
import {useAuth0} from '@auth0/auth0-react'

function useAdminStatus() {

  const [isAdmin, setIsAdmin] = useState(false);
  const {user, isAuthenticated} = useAuth0();
  
  useEffect(() => {
      setIsAdmin(isAuthenticated&&(user["http://amirkhanikhayal.com/roles"].indexOf("admin")!==-1));
  }, [user, isAuthenticated])

  return isAdmin;
}

export default useAdminStatus