import { useState } from 'react';
import { UNMATCH } from "../graphql/mutations"

function UnmatchForm(props: any) {

    const [unmatchState, setUnmatchState] = useState({ from: "", to: props.recipient })
    const [unmatchResponse, setUnmatchResponse] = useState({})

    const handleReportChange = (e: any, key: any) => {
        setUnmatchState({ ...unmatchState, [key]: e.target.value });
    }

    const unmatch = async (e: any) => {
        e.preventDefault()
        e.stopPropagation();
        console.log(unmatchState)
        const input = { from: unmatchState.from, to: props.recipient }

        try {
            const result = await props.client.mutate({
                mutation: UNMATCH,
                variables: { input },
            });
            setUnmatchResponse(result.data.report)
        } catch (e) {
            setUnmatchResponse(e)
        }
    }

    return (
        <div>
            <h1>Unmatch</h1>
            <form onSubmit={unmatch}>
                <label htmlFor="from">From ID:</label><br />
                <input type="text" value={unmatchState.from} onChange={(e) => handleReportChange(e, "from")} /><br />
                <label htmlFor="to">To ID:</label><br />
                <input type="text" value={unmatchState.to} onChange={(e) => handleReportChange(e, "to")} /><br />
                <button onClick={unmatch}>Unmatch</button>
                <br />
                <div>{JSON.stringify(unmatchResponse)}</div>
            </form>
        </div>
    );
}

export default UnmatchForm;
