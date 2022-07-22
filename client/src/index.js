import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import StateProvider from './utils/StateProvider';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';

import { setContext } from '@apollo/client/link/context';
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const link = createUploadLink({
  uri: 'https://mayowatodo.herokuapp.com',
  // uri: 'http://localhost:5000',
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  const refreshToken = document.cookie.split('=')[1];

  return {
    headers: {
      ...headers,
      // ['x-access-token']: accessToken ? `Bearer ${accessToken}` : "",
      ['x-refresh-token']: refreshToken ? `${refreshToken}` : "",
    }
  }
});

const cache =  new InMemoryCache({
typePolicies:{
  Query:{
    User:{
       fields:{
        posts:{
          merge(existing,incoming){
            console.log({existing});
            console.log({incoming});
            return incoming
          }
        }
      }
    }
  }
}
})

const client = new ApolloClient({
  // cache:  new InMemoryCache({}),
  cache,
  link: authLink.concat(link),
});

// console.log({client});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <StateProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>

          </StateProvider>

        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
