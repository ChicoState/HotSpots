import { useState, useEffect } from "react";
import ticketMaster from "../api/ticketMaster";

export default () => {
  const [events, setEvents] = useState([]);

  //Function to make request
  const eventsApi = async searchTerm => {
    //searchTerm === "Event to search for: string"
    try {
      const response = await ticketMaster.get("events.json", {
        params: {
          keyword: searchTerm
        }
      });
      //setEvents(response.data.)
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return [eventsApi, events, setEvents];
};
