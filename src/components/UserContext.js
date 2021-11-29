import { createContext } from 'react';

const UserContext = createContext({
    
    user: {
    email: "",
    password: ""},
    setUser: () => {}

})

export default UserContext;