import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { AuthContextProvider } from './context/AuthContext';
// import { SearchContextProvider } from './context/SearchContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <SearchContextProvider>
    //     <AuthContextProvider>
    <Provider store={store}>
        <App />
    </Provider>
    //     </AuthContextProvider>
    // </SearchContextProvider>
);
