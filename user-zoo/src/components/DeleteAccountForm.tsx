import { useState } from 'react';
import { DELETE_ACCOUNT } from "../graphql/mutations"

function DeleteAccountForm(props: any) {

    const [deleteAccountState, setDeleteAccountState] = useState({ username: "+19782694479" })
    const [deleteAccountResponse, setDeleteAccountResponse] = useState({})

    const handleDeleteAccountChange = (e: any, key: any) => {
        setDeleteAccountState({ ...deleteAccountState, [key]: e.target.value });
    }

    const deleteAccount = async (e: any) => {
        e.preventDefault()
        e.stopPropagation();
        const input = { username: deleteAccountState.username }

        try {
            const result = await props.accountClient.mutate({
                mutation: DELETE_ACCOUNT,
                variables: { input },
            });
            setDeleteAccountResponse(result.data.report)
        } catch (e) {
            setDeleteAccountResponse(e)
        }
    }

    return (
        <div>
            <h1>Delete Account</h1>
            <form onSubmit={deleteAccount}>
                <label htmlFor="to">To ID:</label><br />
                <input type="text" value={deleteAccountState.username} onChange={(e) => handleDeleteAccountChange(e, "username")} /><br />
                <button onClick={deleteAccount}>Delete Account</button>
                <br />
                <div>{JSON.stringify(deleteAccountResponse)}</div>
            </form>
        </div>
    );
}

export default DeleteAccountForm;
