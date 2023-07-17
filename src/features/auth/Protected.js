import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


function Protected({children}) {

    const user = useSelector((state)=> state.auth.user);

    

    if(!user){
      return <Navigate to='/login'></Navigate>
    }

  return( children );
}

export default Protected