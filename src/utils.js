import { useState, useEffect } from "react";
import axios from "axios";

export const SpotifyURL = "https://api.spotify.com/v1";

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REDIRECT_URL,
} = process.env;

const exchangeCodeForSpotifyToken = async (code) => {
  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", {
    code: code,
    redirect_uri: REACT_APP_REDIRECT_URL,
    grant_type: "authorization_code",
  },{ 
    headers: {
    Authorization:
      "Basic " +
      Buffer.from(REACT_APP_CLIENT_ID + ":" + REACT_APP_CLIENT_SECRET).toString(
        "base64"
      ),
    "Content-Type": "application/x-www-form-urlencoded",
  }
  });
  } catch (error) {
    console.error(error)
  }
}

export const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getToken() {
      try {
        // Instead of calling backend for the token

        // Check local storage for the token, if we have it return it
        let spotifyToken = localStorage.getItem('spotify_token');

        if(!spotifyToken) {
          // If it's not in local storage check the query parameter for a 'code' 
          const code = new URLSearchParams(this.props.location.search).get("code")
          console.log('got the code', code)
          // if that is there there exchange w/Spotify for a token and save it
          spotifyToken = exchangeCodeForSpotifyToken(code);
        } else {
          // What if the token is expired or close to expiring???? Figure that out later
          setToken(spotifyToken)
        }
      } catch (error) {

        return;
      }
    }

    getToken();
  }, []);

  return token;
};

export const useProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const token = useToken();

  useEffect(() => {
    function getUser() {
      try {
        axios
          .get(`${SpotifyURL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => setUserInfo(data));
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, [token]);

  return userInfo;
};
