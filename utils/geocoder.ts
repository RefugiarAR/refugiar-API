import NodeGeocoder from "node-geocoder";

const options: NodeGeocoder.Options = {
  provider: "mapquest",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

export const geocoder = NodeGeocoder(options);
