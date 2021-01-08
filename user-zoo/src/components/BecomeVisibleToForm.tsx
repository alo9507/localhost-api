import { useState } from 'react';
import { BECOME_VISIBLE_TO } from "../graphql/mutations"

function BecomeVisibleToForm(props: any) {

    const [becomeVisibleToState, setBecomeVisibleToState] = useState({ from: "", to: props.recipient })
    const [becomeVisibleToResponse, setBecomeVisibleToResponse] = useState({})

    const handleReportChange = (e: any, key: any) => {
        setBecomeVisibleToState({ ...becomeVisibleToState, [key]: e.target.value });
    }

    const becomeVisibleTo = async (e: any) => {
        e.preventDefault()
        e.stopPropagation();
        console.log(becomeVisibleToState)
        const input = { from: becomeVisibleToState.from, to: props.recipient }

        try {
            const result = await props.client.mutate({
                mutation: BECOME_VISIBLE_TO,
                variables: { input },
            });
            setBecomeVisibleToResponse(result.data.report)
        } catch (e) {
            setBecomeVisibleToResponse(e)
        }
    }

    return (
        <div>
            <h1>Become Visible To</h1>
            <form onSubmit={becomeVisibleTo}>
                <label htmlFor="from">From ID:</label><br />
                <input type="text" value={becomeVisibleToState.from} onChange={(e) => handleReportChange(e, "from")} /><br />
                <label htmlFor="to">To ID:</label><br />
                <input type="text" value={becomeVisibleToState.to} onChange={(e) => handleReportChange(e, "to")} /><br />
                <button onClick={becomeVisibleTo}>Become Visible To</button>
                <br />
                <div>{JSON.stringify(becomeVisibleToResponse)}</div>
            </form>
        </div>
    );
}

export default BecomeVisibleToForm;
