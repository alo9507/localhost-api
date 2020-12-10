import React, { useState } from 'react';
import { SEND_NOD, CLEAR_ALL_NODS } from "../graphql/mutations"

function SendNodForm(props: any) {

    const [sendNodState, setSendNodState] = useState({ from: "", to: "", message: "" })
    const [sendNodResponse, setSendNodResponse] = useState({})

    const handleSendNodChange = (e: any, key: any) => {
        setSendNodState({ ...sendNodState, [key]: e.target.value });
    }

    const sendNod = async (e: any) => {
        e.preventDefault()
        e.stopPropagation();
        console.log(JSON.stringify(sendNodState))

        const input = { from: sendNodState.from, to: props.recipient, message: sendNodState.message, latitude: 26.0, longitude: 26.0 }

        try {
            const result = await props.client.mutate({
                mutation: SEND_NOD,
                variables: { input },
            });
            setSendNodResponse(result.data.sendNod)
        } catch (e) {
            setSendNodResponse(e)
        }
    }

    const clearAllNods = async (e: any) => {
        e.preventDefault()
        e.stopPropagation();

        try {
            const result = await props.client.mutate({
                mutation: CLEAR_ALL_NODS
            });
            console.log(result.data.clearAllNods)
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
                <input type="text" value={props.recipient} /><br />
                <label htmlFor="message">Message:</label><br />
                <input type="text" value={sendNodState.message} onChange={(e) => handleSendNodChange(e, "message")} /><br />
                <button onClick={sendNod}>Send Nod</button>
                <br />
                <button onClick={clearAllNods}>Delete All Nods</button>
                <div>{JSON.stringify(sendNodResponse)}</div>
            </form>
        </>
    );
}

export default SendNodForm;
