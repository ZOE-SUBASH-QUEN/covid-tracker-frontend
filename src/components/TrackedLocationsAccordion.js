import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';

export default function TrackedLocationsAccordion({ usersFavorites, setUsersFavorites }) {
    const [tracked, setTracked] = useState([])
    const [displayCards, setDisplayCards] = useState(false)
     //AUTH0 Hooks
     const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (usersFavorites.length > 0){
            console.log(usersFavorites.length)
            setTracked(usersFavorites)
            setDisplayCards(true)
        }

    }, [usersFavorites, tracked])

    const handleDelete = async (state) => {
        const updatedFavorites = tracked.filter(obj => {
            if(obj != state){
                return obj
            }
        });
        setUsersFavorites(updatedFavorites)
        setTracked(updatedFavorites)
        await axios.delete(`http://localhost:3001/delete/${user.email}/${state}`)
    }

    const renderCards = () => {
        let result = tracked.map((state, indx) => {
            console.log(state)
            return (<Card>
                <Card.Header>
                    <Accordion.Toggle as={Card.Header} eventKey={String(indx)}>
                        {state}
                    </Accordion.Toggle>

                </Card.Header>

                <Accordion.Collapse eventKey={String(indx)}>
                    <Card.Body>
                       

                        <Button variant="danger" onClick={() => handleDelete(state)}>Delete</Button>

                    </Card.Body>

                </Accordion.Collapse>

            </Card>)
        });
    return result
    }

    return (
        displayCards ?
            <Accordion>
                {renderCards()}
            </Accordion> : ""

    )
}