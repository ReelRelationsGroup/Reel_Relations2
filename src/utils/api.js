import axios from "axios";

// GET request to backend to fetch degrees of separation between two casts (actors)
export const fetchDegreesOfSeparation = async (casts1Id, casts2Id) => {
  try {
    const response = await axios.get(
      `/api/degreesOfSeparation/${casts1Id}/${casts2Id}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return { degreesOfSeparation: null, path: [], moviesPath: [] };
  }
};