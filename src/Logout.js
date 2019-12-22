import React from "react";
import firebase from 'firebase'

function Logout() {
    return firebase.auth().signOut().then(() => {
        window.localStorage.clear();
        window.location.href = '/login';
    }).catch((err) => {
    })
}


export default Logout