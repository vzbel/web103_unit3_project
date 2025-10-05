export async function getAllEvents(){
    const res = await fetch("/api/events");
    const data = await res.json();
    return data;
}

// getAllEvents();
export async function getEventsByLocation(locationID){
    const res = await fetch(`/api/locations/${locationID}/events`);
    const data = await res.json();
    return data;
}

export async function getEventsById(id){
    const res = await fetch(`/api/events/${id}`);
    const data = await res.json();
    return data;   
}

export default {
    getAllEvents,
    getEventsByLocation,
    getEventsById
};