import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'

import {useParams} from "react-router-dom"
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'

const LocationEvents = ({index}) => {
    const {locationID} = useParams();
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() =>{
        async function getData(){
            const locationData = await LocationsAPI.getLocationByID(locationID);
            setLocation(locationData);

            const eventData = await EventsAPI.getEventsByLocation(locationID);
            setEvents(eventData);
        }
        getData();
    }, [locationID]);

    return (
        <div className='location-events'>
            {location.length > 0  ?
            <header>
                <div className='location-image'>
                    <img src={location[0].image} />
                </div>

                <div className='location-info'>
                    <h2>{location[0].name}</h2>
                    <p>{location[0].address}, {location[0].city}, {location[0].state} {location[0].zip}</p>
                </div>
            </header>
            :
            <></>
            }

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            remaining={event.remaining}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents