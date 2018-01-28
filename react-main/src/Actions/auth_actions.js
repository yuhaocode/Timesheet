import axios from "axios";
import jwtDecode from "jwt-decode";
import { store } from "../store";

const host = "http://localhost:8080";
const login_url = host + "/api/auth/login";
const user_url = host + "/api/user";
const refresh_url = host + "/api/auth/token";
var timer = null;
function loginRequest() {
  return {
    type: "LOGIN_PENDING"
  };
}

function loginSucesss(user) {
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      user: user
    }
  };
}

function loginFailure() {
  return {
    type: "LOGIN_FAILURE"
  };
}

function loadToken(user) {
  return {
    type: "LOAD_TOKEN",
    payload: {
      user: user
    }
  };
}

function authFailure() {
  return {
    type: "LOGOUT"
  };
}

export const refresh = (refreshToken, dispatch) => {
  console.log("Try to refresh token...");
  axios
    .post(
      refresh_url,
      {},
      {
        headers: {
          Authorization: "Bearer " + refreshToken
        }
      }
    )
    .then(res => {
      console.log("Refresh token successfully");
      let accessToken = res.data.token;
      let refreshToken = res.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (store.getState().user.user == null) {
        fetchUserInfo(accessToken, dispatch);
      }
      let { exp } = jwtDecode(accessToken);
      let now = new Date();
      console.log(
        "Token will be refreshed in %d ms.",
        exp * 1000 - now.getTime()
      );
      timer = setTimeout(() => {
        refresh(refreshToken, dispatch);
      }, exp * 1000 - now.getTime());
    })
    .catch(e => {
      console.log("Failed in refreshing token!", e.message);
      logout(dispatch);
      return false;
    });
};

export function login(username, password, dispatch) {
  dispatch(loginRequest());
  axios
    .post(
      login_url,
      {
        username: username,
        password: password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => {
      console.log("Logged in successfully");
      let accessToken = res.data.token;
      let refreshToken = res.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      fetchUserInfo(accessToken, dispatch);
      // console.log(jwtDecode(accessToken));
      // console.log(Math.floor(Date.now() / 1000));
      let { exp } = jwtDecode(accessToken);
      let now = new Date();
      console.log(
        "Token will be refreshed in %d ms.",
        exp * 1000 - now.getTime()
      );
      timer = setTimeout(() => {
        refresh(refreshToken, dispatch);
      }, exp * 1000 - now.getTime());
    })
    .catch(e => {
      console.log("Failed in login!", e.message);
      dispatch(loginFailure());
    });
}

export function checkSession(dispatch) {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");
  if (accessToken == null || refreshToken == null) {
    console.log("No available tokens");
    logout(dispatch);
    return false;
  }
  let now = new Date();
  let refreshTokenExp = jwtDecode(refreshToken).exp;
  if (refreshTokenExp < Math.floor(now.getTime() / 1000)) {
    console.log("Refresh token has expired.");
    logout(dispatch);
    return false;
  }
  if (store.getState().user.user == null) {
    let accessTokenExp = jwtDecode(accessToken).exp;
    if (accessTokenExp < Math.floor(now.getTime() / 1000)) {
      refresh(refreshToken, dispatch);
    } else {
      fetchUserInfo(accessToken, dispatch);
      console.log(
        "Token will be refreshed in %d ms.",
        accessTokenExp * 1000 - now.getTime()
      );
      timer = setTimeout(() => {
        refresh(refreshToken, dispatch);
      }, accessTokenExp * 1000 - now.getTime());
    }
  }
  return true;
}

export function logout(dispatch) {
  console.log("Logging out");
  clearTimeout(timer);
  dispatch(authFailure());
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // window.location.reload();
}

export function fetchUserInfo(accessToken, dispatch) {
  dispatch(loginRequest());
  axios
    .get(user_url, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then(res => {
      let user = res.data;
      console.log("fetched user info\n", user);
      if (
        localStorage.getItem("accessToken") != null ||
        localStorage.getItem("refreshToken") != null
      ) {
        dispatch(loadToken(user));
      } else {
        dispatch(loginSucesss(user));
      }
    })
    .catch(e => {
      console.log("Failed in fetching user info!", e.message);
      dispatch(loginFailure());
    });
}
