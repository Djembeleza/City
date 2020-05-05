import React, { useState, createContext } from 'react'

export const CityContext = createContext();

export const CityProvider = props => {

    const [cities, setCities] = useState([]);

    return (
        <CityContext.Provider value={[cities, setCities]}>
            {props.children}
        </CityContext.Provider>

    );
}