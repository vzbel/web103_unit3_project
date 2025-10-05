import React, {useState, useEffect} from 'react';
import Event from '../components/Event';
import EventsAPI from '../services/EventsAPI';


const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() =>{
        async function getData(){
            const eventsData = await EventsAPI.getAllEvents();
            setEvents(eventsData);
        }
        getData();
    }, []);

    return (
        <main>
            {
                events && events.length > 0 ?
                    events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            remaining={event.remaining}
                            image={event.image}
                        />
                    )

                :
                <>No events to display...</>
            }
        </main>
    );
};

export default Events; 