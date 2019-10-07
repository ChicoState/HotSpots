import { useState, useEffect } from 'react';
import ticketMaster from '../api/ticketMaster'

export default () => {
    const [events, setEvents] = useState([]);


    //Function to make request
    const eventApi = (searchTerm) => {
        //searchTerm === "Event to search for: string"
        const response = ticketMaster.get("/events", {
            params: {
                keyword: searchTerm,

            }
        })
        console.log(response);
    }

    return [eventApi, events, setEvents, ];
};