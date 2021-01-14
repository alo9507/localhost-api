import React, { useState } from 'react';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import SendNodForm from "./components/SendNodForm"
import ReportForm from './components/ReportForm';
import BecomeInvisibleToForm from './components/BecomeInvisibleToForm';
import BecomeVisibleToForm from './components/BecomeVisibleToForm';
import UnmatchForm from './components/UnmatchForm';
import DeleteAccountForm from "./components/DeleteAccountForm"

function App() {
  const [recipient, setRecipient] = useState("d78d7693-11bd-4692-a7b3-5023cb5daa62")

  const client = new ApolloClient({
    uri: 'http://localhost:80/api',
    cache: new InMemoryCache({
      addTypename: false
    }),
  });

  const accountClient = new ApolloClient({
    uri: 'http://localhost:80/account',
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
      <div className="formgrid">
        <SendNodForm client={client} recipient={recipient} />
        <ReportForm client={client} recipient={recipient} />
        <BecomeInvisibleToForm client={client} recipient={recipient} />
        <BecomeVisibleToForm client={client} recipient={recipient} />
        <UnmatchForm client={client} recipient={recipient} />
        <DeleteAccountForm accountClient={accountClient} />
      </div>
    </>
  );
}

export default App;
