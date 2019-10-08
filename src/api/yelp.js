import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses/",
  headers: {
    Authorization:
      "Bearer 40tF3_B00WXgXnID53HFaAfoNsDp2IAdEjj00dSUcV5u502WDAIMyofdYAS0gZyH88knztZujv3qhOhiXeAkW3dQSqrHChsN2027glGHu7Vm8M1fv24lWQ4lPS-FXXYx"
  }
});
