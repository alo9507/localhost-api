import React, { useState } from 'react';
import { BECOME_INVISIBLE_TO } from "../graphql/mutations"

function BecomeInvisibleToForm(props: any) {

    const [becomeInvisibleToState, setBecomeInvisibleToState] = useState({ from: "", to: props.recipient })
    const [becomeInvisibleToResponse, setBecomeInvisibleToResponse] = useState({})

    const handleReportChange = (e: any, key: any) => {
        setBecomeInvisibleToState({ ...becomeInvisibleToState, [key]: e.target.value });
    }

    const becomeInvisibleTo = async (e: any) => {
        e.preventDefault()
        e.stopPropagation();
        console.log(becomeInvisibleToState)
        const input = { from: becomeInvisibleToState.from, to: props.recipient }

        try {
            const result = await props.client.mutate({
                mutation: BECOME_INVISIBLE_TO,
                variables: { input },
            });
            setBecomeInvisibleToResponse(result.data.report)
        } catch (e) {
            setBecomeInvisibleToResponse(e)
        }
    }

    return (
        <div>
            <h1>Become Invisible To</h1>
            <form onSubmit={becomeInvisibleTo}>
                <label htmlFor="from">From ID:</label><br />
                <input type="text" value={becomeInvisibleToState.from} onChange={(e) => handleReportChange(e, "from")} /><br />
                <label htmlFor="to">To ID:</label><br />
                <input type="text" value={becomeInvisibleToState.to} onChange={(e) => handleReportChange(e, "to")} /><br />
                <button onClick={becomeInvisibleTo}>Become Invisible To</button>
                <br />
                <div>{JSON.stringify(becomeInvisibleToResponse)}</div>
            </form>
        </div>
    );
}

export default BecomeInvisibleToForm;
