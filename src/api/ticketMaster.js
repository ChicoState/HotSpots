import axios from "axios";

export default axios.create({
  baseUrl: "https://app.ticketmaster.com/discovery/v2/events",
  headers: {
    Authorization: "Bearer dxiyvALL8mwvOHP3o50IbBfIn28jGMe6"
  }
});
