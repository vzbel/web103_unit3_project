export async function getAllLocations(){
    const res = await fetch("/api/locations");
    const data = await res.json();
    return data;
}

export async function getLocationByID(id){
    const res = await fetch(`/api/locations/${id}`);
    const data = await res.json();
    return data;
}

// getAllLocations();

export default {
    getAllLocations,
    getLocationByID
};