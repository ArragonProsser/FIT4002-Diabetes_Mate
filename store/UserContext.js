import React from 'react';

export const userStore = {
    user: null,
    biomarkers: null
}

export const UserContext = React.createContext(userStore)