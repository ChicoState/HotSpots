import { useState, useEffect } from "react";
import ticketMaster from "../api/ticketMaster";

export default () => {
  const [events, setEvents] = useState([]);
  const apiKey = "dxiyvALL8mwvOHP3o50IbBfIn28jGMe6";

  //Function to make request
  const eventsApi = params => {
    //searchTerm === "Event to search for: string"{
    /*const params = {
      size: 20,
      apikey: apiKey,
      keyword: "Borgore"
    };*/
    params.apikey = apiKey;
    params.size = 1;
    console.log("In Events API");
    ticketMaster
      .get("events.json", { params })
      .then(response => {
        setEvents(response.data._embedded.events);
      })
      .catch(err => console.log(err));
    return events;
  };

  return [eventsApi, events, setEvents];
};
