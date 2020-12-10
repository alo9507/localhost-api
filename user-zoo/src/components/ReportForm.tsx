import React, { useState } from 'react';
import { REPORT } from "../graphql/mutations"

function ReportForm(props: any) {

    const [reportState, setReportState] = useState({ from: "", to: "", message: "", reason: "" })
    const [reportResponse, setReportResponse] = useState({})

    const handleReportChange = (e: any, key: any) => {
        setReportState({ ...reportState, [key]: e.target.value });
    }

    const report = async (e: any) => {
        e.preventDefault()
        e.stopPropagation();
        console.log(reportState)
        const input = { from: reportState.from, to: props.recipient, message: reportState.message }

        try {
            const result = await props.client.mutate({
                mutation: REPORT,
                variables: { input },
            });
            setReportResponse(result.data.report)
        } catch (e) {
            setReportResponse(e)
        }
    }

    return (
        <>
            <h1>Report</h1>
            <form onSubmit={report}>
                <label htmlFor="from">From ID:</label><br />
                <input type="text" value={reportState.from} onChange={(e) => handleReportChange(e, "from")} /><br />
                <label htmlFor="to">To ID:</label><br />
                <input type="text" value={props.recipient} onChange={(e) => handleReportChange(e, "to")} /><br />
                <label htmlFor="message">Message:</label><br />
                <input type="text" value={reportState.message} onChange={(e) => handleReportChange(e, "message")} /><br />
                <label htmlFor="reason">Reason:</label><br />
                <input type="text" value={reportState.reason} onChange={(e) => handleReportChange(e, "reason")} /><br />
                <button onClick={report}>Report</button>
                <br />
                <div>{JSON.stringify(reportResponse)}</div>
            </form>
        </>
    );
}

export default ReportForm;
