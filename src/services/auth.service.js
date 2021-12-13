import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = async (requestBody) => {
    // return axios.post("http://localhost:5005/auth/login");
    return this.api.post("/auth/login", requestBody); // http://localhost:5005 /auth/login
  };

  signup = async (requestBody) => {
    // return axios.post("http://localhost:5005/auth/singup");
    return this.api.post("/auth/signup", requestBody);
  };

  verify = async () => {
    // return axios.post("http://localhost:5005/auth/verify");
    return this.api.get("/auth/verify");
  };

  journeys = async () => {
    return this.api.get("/journey");
  };

  userJourneys = async () => {
    return this.api.get("/api/users/subscriptions");
  };

  journeyObj = async (journeyId) => {
    return this.api.get(`/journey/${journeyId}`);
  };

  oneEpisode = async (episodeId) => {
    return this.api.get(`/episode/${episodeId}`);
  };

  postNote = async (requestBody) => {
    return this.api.post("/note", requestBody);
  };

  allNotes = async (episodeId) => {
    return this.api.get(`/episode/${episodeId}/notes`)
  }

  allUserInfo = async () => {
    return this.api.get("/api/users/allinfo")
  }
}

// Create one instance of the service
const authService = new AuthService();

export default authService;
