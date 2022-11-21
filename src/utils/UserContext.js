import { createContext } from "react";
import React from 'react';
//export const UserContext = createContext(null);

/*const UserContext = React.createContext({
   user = null,

    handleChangeUser: (value) => {},
    handleData: (value) => {}
  })
  */
  export const UserContext = createContext(null)
  
  export const UserProvider = UserContext.Provider;
  export const UserConsumer = UserContext.Consumer;
  //export default UserContext ;