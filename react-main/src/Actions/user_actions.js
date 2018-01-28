import axios from "axios";
import { checkSession } from "./auth_actions";

const host = "http://localhost:8080";
const user_url = host + "/api/user";
const fetchUrl = host + "/api/user/fetchAllUsers";
const submitUrl = host + "/api/user/modify";
const updateUrl = host + "/api/user/modifyFromAdmin";

export function updateProfile(user, dispatch) {
  if (!checkSession(dispatch)) {
    return;
  }
  dispatch({
    type: "UPDATE_PROFILE_PENDING"
  });
  let accessToken = localStorage.getItem("accessToken");
  axios
    .post(submitUrl, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
      }
    })
    .then(res => {
      let user = { ...res.data };
      console.log("update myProfile successfully", user);
      dispatch({
        type: "UPDATE_PROFILE_SUCCESS",
        payload: user
      });
    })
    .catch(e => {
      console.log("failed in updating user", e.message);
      dispatch({
        type: "UPDATE_PROFILE_FAILURE"
      });
    });
}

export function updateUser(user, dispatch) {
  if (!checkSession(dispatch)) {
    return;
  }
  dispatch({
    type: "UPDATE_USER_PENDING"
  });
  let accessToken = localStorage.getItem("accessToken");
  axios
    .post(updateUrl, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken
      }
    })
    .then(res => {
      let updatedUser = { ...res.data };
      console.log("update user successfully", updatedUser);
      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: updatedUser
      });
    })
    .catch(e => {
      console.log("failed in updating user", e.message);
      dispatch({
        type: "UPDATE_USER_FAILURE"
      });
    });
}

const fetchRequest = () => {
  return {
    type: "FETCH_USER_PENDING"
  };
};

const fetchSuccess = userList => {
  return {
    type: "FETCH_USER_SUCCESS",
    payload: userList
  };
};

const fetchFailure = () => {
  return {
    type: "FETCH_USER_FAILURE"
  };
};

export function fetchUser(dispatch) {
  dispatch(fetchRequest());
  if (!checkSession(dispatch)) {
    dispatch(fetchFailure());
  }
  let accessToken = localStorage.getItem("accessToken");
  axios
    .get(fetchUrl, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then(res => {
      let userList = res.data;
      console.log(res.data);
      console.log("Fetched the user info successfully!", userList);
      dispatch(fetchSuccess(userList));
    })
    .catch(e => {
      console.error("Failed in fetching user data", e.message);
      dispatch(fetchFailure());
    });
}

export function forgetPassword(email, dispatch) {
  var Email = new Object();

  console.log(email);
  Email.email = email;

  axios
    .post("http://localhost:8080/api/user/forgetPassword", Email, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      alert("Please check email, thank you");
    })
    .catch(e => {
      alert("submit wrong email");
    });
}

