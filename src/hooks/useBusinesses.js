import { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default function() {
  // This is a piece of state which is used to store GET requests from the Yelp API.
  const [businesses, setBusinesses] = useState([]);
  // State that is used to display error messages.
  const [errorMessage, setErrorMessage] = useState("");
  /*
   * This is an async/await pattern which requests data using GET
   * and assigns the data sent back to us in const response.
   * Notice the async and await declarations prepended to the functions.
   */
  const searchApi = async function(searchTerm) {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "chico"
        }
      });
      // Businesses state is updated using the setBusinesses function.
      setBusinesses(response.data.businesses);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  // Call searchAPI when component is first rendered.
  //searchApi("pasta"); BAD CODE!
  useEffect(() => {
    searchApi("bar");
  }, []);

  return [searchApi, businesses, errorMessage];
}
