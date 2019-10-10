import axios from "axios";

export default axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/"
});
