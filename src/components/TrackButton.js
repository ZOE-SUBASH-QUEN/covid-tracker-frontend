import React from 'react'
import { Button } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


function TrackButton({ obj, tracked, setUsersFavorites, handleSetUsersFavorites }) {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const handleTrackClick = async () => {
        await axios.put(`${process.env.REACT_APP_HOST_URL}/${user?.email}`, obj).then(result => {
            console.log(result)
            handleSetUsersFavorites(result.data)

        })
    }



    return (

        <Button variant={tracked ? "info" : "outline-light"} className="m-2" onClick={tracked ? handleTrackClick : null}>
            {tracked ? "Track" : "Tracked"}
        </Button>
    )
}

export default TrackButton
