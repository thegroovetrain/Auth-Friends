import React, { useState, useEffect } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendsList = props => {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState({
        name: '',
        age: '',
        email: ''
    });

    useEffect(() => {
        getData();
    });

    const getData = () => {
        axiosWithAuth()
            .get('/friends')
            .then(response => {
                console.log("get response", response);
                setFriends(response.data);
            })
            .catch(error => console.log("error", error));
    };

    const postData = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/friends', newFriend)
            .then(response => {
                console.log("post response", response);
                setNewFriend({
                    name: '',
                    age: '',
                    email: ''
                });
            })
            .catch(error => console.log("error", error));
    }

    const handleChange = event => {
        setNewFriend({
            ...newFriend,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <ul>
                {friends.map(f => {
                    return (
                        <li>{f.name} - {f.age} - {f.email}</li>
                    );
                })}
            </ul>
            <form onSubmit={postData}>
                <input 
                    type="text"
                    name="name"
                    value={newFriend.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="age"
                    value={newFriend.age}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    value={newFriend.email}
                    onChange={handleChange}
                />
                <button>Add Friend</button>
            </form>
        </>
    );
}

export default FriendsList;