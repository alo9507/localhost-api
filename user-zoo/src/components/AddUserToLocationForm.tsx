import React, { useState } from 'react';
import { CREATE_USER } from "../graphql/mutations"

function AddUserToLocationForm(props: any) {
    const [addUserToLocationResponse, setAddUserToLocationResponse] = useState({})
    const cafeLocation = { latitude: 24.22244098031902, longitude: 23.125367053780863 };

    const addUserToCafe = async (e: any) => {
        e.preventDefault()
        e.stopPropagation();
        const user = {
            id: 'bill',
            sex: 'male',
            firstname: 'Bill',
            lastname: 'Lastname',
            bio: "Bill's bio",
            phoneNumber: '+1978323323',
            whatAmIDoing: 'What Bill is doing',
            isVisible: true,
            age: 20,
            latitude: cafeLocation.latitude,
            longitude: cafeLocation.longitude,
            profileImageUrl: 'https://randomuser.me/portraits/men/76.jpg'
        }

        const input = { ...user }

        try {
            const result = await props.client.mutate({
                mutation: CREATE_USER,
                variables: { input },
            });
            setAddUserToLocationResponse(result.data.report)
        } catch (e) {
            setAddUserToLocationResponse(e)
        }
    }

    return (
        <div>
            <h1>Add User To Cafe</h1>
            <form>
                <label htmlFor="from">Add User to Cafe</label><br />
                <button onClick={(e) => addUserToCafe(e)}>Add User To Cafe</button>
                <br />
                <div>{JSON.stringify(addUserToLocationResponse)}</div>
            </form>
        </div>
    );
}

export default AddUserToLocationForm;
