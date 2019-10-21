import { useState, useEffect } from "react";
import ticketMaster from "../api/ticketMaster";

export default () => {
  const [events, setEvents] = useState([]);
  const apiKey = "dxiyvALL8mwvOHP3o50IbBfIn28jGMe6";

  //Function to make request
  const eventsApi = async searchTerm => {
    //searchTerm === "Event to search for: string"
    try {
      console.log(searchTerm);
      const response = await ticketMaster.get("events.json", {
        params: {
          keyword: searchTerm,
          size: 20,
          apikey: apiKey
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
