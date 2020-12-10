import React, { useState } from 'react';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import SendNodForm from "./components/SendNodForm"
import ReportForm from './components/ReportForm';

function App() {
  const [recipient, setRecipient] = useState("433b6860-51a1-411a-ad43-ad74035541a3")

  const client = new ApolloClient({
    uri: 'http://localhost:80/api',
    cache: new InMemoryCache({
      addTypename: false
    }),
  });



  const handleSetRecipient = (e: any) => {
    setRecipient(e.target.value)
  }

  return (
    <>
      <label htmlFor="recipient">Recipient</label><br />
      <input type="text" value={recipient} onChange={(e) => handleSetRecipient(e)} /><br />
      <SendNodForm client={client} recipient={recipient} />
      <br />
      <ReportForm client={client} recipient={recipient} />
    </>
  );
}

export default App;
