import React from "react";
import MainNavigation from "./navigation/MainNavigation";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {RootReducer} from "./redux/RootReducer";

export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainNavigation />
                {/* <Home /> */}
            </BrowserRouter>
        </Provider>
    );
};

export default App;
