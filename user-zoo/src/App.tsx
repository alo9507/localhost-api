import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SEND_NOD } from "./graphql/mutations"

function App() {

  const [sendNodState, setSendNodState] = useState({ from: "", to: "", message: "" })
  const [sendNodResponse, setSendNodResponse] = useState({})

  const client = new ApolloClient({
    uri: 'http://localhost:80/api',
    cache: new InMemoryCache({
      addTypename: false
    }),
  });

  const handleSendNodChange = (e: any, key: any) => {
    setSendNodState({ ...sendNodState, [key]: e.target.value });
  }

  const sendNod = async (e: any) => {
    e.preventDefault()
    e.stopPropagation();
    console.log(JSON.stringify(sendNodState))

    const input = { from: sendNodState.from, to: sendNodState.to, message: sendNodState.message, latitude: 26.0, longitude: 26.0 }

    try {
      const result = await client.mutate({
        mutation: SEND_NOD,
        variables: { input },
      });
      setSendNodResponse(result.data.sendNod)
    } catch (e) {
      setSendNodResponse(e)
    }
  }

  return (
    <>
      <h1>Send Nod</h1>
      <form onSubmit={sendNod}>
        <label htmlFor="from">From ID:</label><br />
        <input type="text" value={sendNodState.from} onChange={(e) => handleSendNodChange(e, "from")} /><br />
        <label htmlFor="to">To ID:</label><br />
        <input type="text" value={sendNodState.to} onChange={(e) => handleSendNodChange(e, "to")} /><br />
        <label htmlFor="message">Message:</label><br />
        <input type="text" value={sendNodState.message} onChange={(e) => handleSendNodChange(e, "message")} /><br />
        <button onClick={sendNod}>Send Nod</button>
        <div>{JSON.stringify(sendNodResponse)}</div>
      </form>
    </>
  );
}

export default App;
