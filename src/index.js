import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import store from './app/store';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

client
    .query({
        query: gql`
      query {
        categories {
            name
        }
      }
    `,
    })
    .then((result) => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     {/*<Provider store={store}>*/}
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
     {/*</Provider>*/}
  </React.StrictMode>
);

reportWebVitals();