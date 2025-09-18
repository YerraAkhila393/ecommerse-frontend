import React ,{ createContext, useState, useContext } from 'react';
 
const AppContext=createContext()
export const AppProvider = ({ children }) => {
    const [activeComponent, setActiveComponent] = useState('home');
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    


    return (
        <AppContext.Provider value={{ activeComponent, setActiveComponent ,cart, setCart}}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    const context = useContext(AppContext);
  return context;

};