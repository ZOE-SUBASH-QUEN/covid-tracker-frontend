import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Accordion, Card, Button, CardGroup, Alert, Jumbotron, OverlayTrigger, Popover, Container } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react';

export default function TrackedLocationsAccordion({ usersFavorites, setUsersFavorites, data }) {
    const [tracked, setTracked] = useState([])
    const [displayCards, setDisplayCards] = useState(false)
    const [trackedData, setTrackedData] = useState([])
    //AUTH0 Hooks
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        console.log("data IN TRACKED LOCATIONS", data)
        if (usersFavorites.length > 0) {
            console.log(usersFavorites.length)
            setTracked(usersFavorites)
            setTrackedData(data)
            setDisplayCards(true)
        }
        filterTrackedData()

    }, [usersFavorites, tracked])

    const handleDelete = async (state) => {
        const updatedFavorites = tracked.filter(obj => {
            if (obj != state) {
                return obj
            }
        });
        setUsersFavorites(updatedFavorites)
        setTracked(updatedFavorites)
        await axios.delete(`http://localhost:3001/delete/${user.email}/${state}`)
    }

    const getBackgrounColor = (int) => {
        switch (int) {
            case 0:
                return "#005f73"
            case 1:
                return "#94d2bd"
            case 2:
                return "#e9d8a6"
            case 3:
                return "#ee9b00"
            case 4:
                return "#ae2012"
            case 5:
                return "#9b2226"
        }
    }

    const filterTrackedData = () => {
        let result = trackedData.map((obj, indx) => {
            if (tracked.includes(obj.state)) {
                console.log(obj)
                return (<Card>
                    <Card.Header >
                        <Accordion.Toggle style={{ backgroundColor: "#6c757d" }} as={Card.Header} eventKey={String(indx)}>
                            <span style={{ color: "#f8f9fa" }}>{obj.state}</span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={String(indx)}>
                        <Card.Body style={{ backgroundColor: "#f0efeb" }}>
                            <Card className="shadow p-3 mb-2 m-2 rounded" style={{ backgroundColor: getBackgrounColor(obj.riskLevels.overall) }}><span style={{ fontSize: "2em" }}>{obj.riskLevels.overall} </span><br /> Overall</Card>
                            <CardGroup>
                                <Card className="shadow p-3 mb-3 m-2 rounded" style={{ backgroundColor: getBackgrounColor(obj.riskLevels.caseDensity) }}>{obj.riskLevels.caseDensity}<br />Case Density</Card>
                                <Card className="shadow p-3 mb-3 m-2 rounded" style={{ backgroundColor: getBackgrounColor(obj.riskLevels.testPositivityRatio) }}>{obj.riskLevels.testPositivityRatio}<br />Test Positivity Ratio</Card>
                                <Card className="shadow p-3 mb-3 m-2 rounded" style={{ backgroundColor: getBackgrounColor(obj.riskLevels.infectionRate) }}>{obj.riskLevels.infectionRate}<br />Infection Rate</Card>
                            </CardGroup>

                            <Button variant="outline-warning" block onClick={() => handleDelete(obj.state)} className="mt-3">Untrack</Button>

                        </Card.Body>

                    </Accordion.Collapse>

                </Card>)
            }
        })
        return result
    }


    return (
        displayCards ?
            <>
                <Jumbotron className="p-10">
                    <h1 className="mb-4">Understanding Risk</h1>
                    <Container style={{ display: "inline-flex" }}>
                        <OverlayTrigger
                            trigger="hover"
                            key="1"
                            placement="top"
                            overlay={
                                <Popover id="1a">
                                    <Popover.Title as="h3">Overall</Popover.Title>
                                    <Popover.Content>
                                        Overall COVID-19 of selected location
                                    </Popover.Content>
                                </Popover>
                            }>
                            <h4 className="mr-2">Overall</h4>
                        </OverlayTrigger>
                        <OverlayTrigger
                            trigger="hover"
                            key="2"
                            placement="top"
                            overlay={
                                <Popover id="2a">
                                    <Popover.Title as="h3">Case Density</Popover.Title>
                                    <Popover.Content>
                                    The number of cases per 100k population calculated using a 7-day rolling average
                                    </Popover.Content>
                                </Popover>
                            }>
                            <h4>Case Density</h4>
                        </OverlayTrigger>
                        <OverlayTrigger
                            trigger="hover"
                            key="3"
                            placement="top"
                            overlay={
                                <Popover id="3a">
                                    <Popover.Title as="h3">Test Positivity Ratio</Popover.Title>
                                    <Popover.Content>
                                        Ratio of people who test positive calculated using a 7-day rolling average
                                    </Popover.Content>
                                </Popover>
                            }>
                            <h4 className="mr-2">Test Positivity Ratio</h4>
                        </OverlayTrigger>
                        <OverlayTrigger
                            trigger="hover"
                            key="4"
                            placement="top"
                            overlay={
                                <Popover id="4a">
                                    <Popover.Title as="h3">Infection Rate</Popover.Title>
                                    <Popover.Content>
                                        Estimated number of infections arising from a typical case
                                    </Popover.Content>
                                </Popover>
                            }>
                            <h4>Infection Rate</h4>
                        </OverlayTrigger>
                        
                    </Container>
                    <Alert className="mt-2 mb-0" variant="primary">Risk is a scale from 0 (lowest) - 5 (highest)</Alert>

                </Jumbotron>
                <Accordion>
                    {filterTrackedData()}
                </Accordion>
            </> : ""

    )
}