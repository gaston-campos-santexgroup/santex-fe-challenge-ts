import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink, ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const commerceLink = createHttpLink({
  uri: 'https://demo.vendure.io/shop-api',
  headers: {
    authorization: localStorage.getItem('Auth-Token')
      ? `Bearer ${localStorage.getItem('Auth-Token')}`
      : '',
  },
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const authHeader = context.response.headers.get('Vendure-Auth-Token');

    if (authHeader) {
      localStorage.setItem('Auth-Token', authHeader);
    }
    return response;
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([afterwareLink, commerceLink]),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
