// This Context is used To keep track whenever location changes across the App

/* When you have state that needs to be accessed or updated by multiple components at 
different levels of the component tree, you can store it in a context. This allows you to 
avoid "prop drilling," where you'd have to pass props down through every intermediate component.
For example, instead of passing location and setLocation through every component manually, 
you can use the context to provide these values to any component that needs them. */

// We wrap our component where contextdata is needed like so: 
// <UserLocationContext.Provider value={{ location, setLocation }}> in index.js

import { createContext, useState } from "react";

export const UserLocationContext = createContext(null);

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);