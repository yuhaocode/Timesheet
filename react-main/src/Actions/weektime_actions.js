import axios from "axios";
import { checkSession } from "./auth_actions";

const host = "http://localhost:8080";
const fetchUrl = host + "/api/timesheet/fetchTimesheetInfo";
const updateUrl = host + "/api/timesheet/update";
const submitUrl = host + "/api/timesheet/submit";
const fetchTeamMember = host + "/api/user/fetchAllWeektimeAndContract/";
const approveUrl = host + "/api/weektime/approve";
const rejectUrl = host + "/api/weektime/reject";

const fetchRequest = () => {
  return {
    type: "FETCH_TIMESHEET_PENDING"
  };
};

const fetchSuccess = (contracts, weekTimes) => {
  return {
    type: "FETCH_TIMESHEET_SUCCESS",
    payload: {
      contracts: contracts,
      weekTimes: weekTimes
    }
  };
};

const fetchFailure = () => {
  return {
    type: "FETCH_TIMESHEET_FAILURE"
  };
};

export function fetchContracts(dispatch) {
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
      let { contracts, weekTimes } = res.data;
      // console.log(res.data);
      let fixedContracts = contracts.map(contract => ({
        ...contract,
        startDate: new Date(Date.parse(contract.startDate)),
        endDate:
          contract.endDate == null
            ? null
            : new Date(Date.parse(contract.endDate))
      }));
      let fixedWeektimes = weekTimes.map(weektime => ({
        ...weektime,
        mondayDate: new Date(Date.parse(weektime.mondayDate))
      }));
      console.log(
        "Fetched the timesheet info successfully!",
        contracts,
        weekTimes
      );
      dispatch(fetchSuccess(fixedContracts, fixedWeektimes));
    })
    .catch(e => {
      console.error("Failed in fetching data", e.message);
      dispatch(fetchFailure());
    });
}

export function updateInitial(dispatch) {
  dispatch({
    type: "UPDATE_WEEKTIME_INITIAL"
  });
}

export function update(weektime, dispatch, submit = false) {
  let url = submit ? submitUrl : updateUrl;
  if (!checkSession(dispatch)) {
    return;
  }
  dispatch({
    type: "UPDATE_WEEKTIME_PENDING"
  });
  let accessToken = localStorage.getItem("accessToken");
  axios
    .post(url, weektime, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then(res => {
      let weektime = { ...res.data, mondayDate: new Date(res.data.mondayDate) };
      console.log("update weektime successfully", weektime);
      dispatch({
        type: "UPDATE_WEEKTIME_SUCCESS",
        payload: weektime
      });
    })
    .catch(e => {
      console.log("failed in updating weektime", e.message);
      dispatch({
        type: "UPDATE_WEEKTIME_FAILURE"
      });
    });
}

export function fetchAllWeektimeAndContract(id, dispatch) {
  dispatch(fetchRequest());
  if (!checkSession(dispatch)) {
    dispatch(fetchFailure());
  }
  let accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  console.log(fetchTeamMember + id);
  axios
    .post(
      fetchTeamMember + id,
      {},
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    )
    .then(res => {
      console.log(2);
      let { contracts, weekTimes } = res.data;
      console.log(res.data);
      let fixedContracts = contracts.map(contract => ({
        ...contract,
        startDate: new Date(Date.parse(contract.startDate)),
        endDate:
          contract.endDate == null
            ? null
            : new Date(Date.parse(contract.endDate))
      }));
      let fixedWeektimes = weekTimes.map(weektime => ({
        ...weektime,
        mondayDate: new Date(Date.parse(weektime.mondayDate))
      }));
      console.log(
        "Fetched the timesheet info successfully!",
        contracts,
        weekTimes
      );
      dispatch(fetchSuccess(fixedContracts, fixedWeektimes));
    })
    .catch(e => {
      console.error("Failed in fetching data", e.message);
      dispatch(fetchFailure());
    });
}

export function approveWeektime(weektime, dispatch) {
  let accessToken = localStorage.getItem("accessToken");
  console.log("1" + weektime);
  axios
    .post(approveUrl, weektime, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then(res => {
      console.log("success");
    })
    .catch(e => {
      console.log(e);
    });
}

export function rejectWeektime(weektime, dispatch) {
  console.log(weektime);
  let accessToken = localStorage.getItem("accessToken");
  console.log("1" + weektime);
  axios
    .post(rejectUrl, weektime, {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then(res => {
      console.log("success");
    })
    .catch(e => {
      console.log(e);
    });
}

export function selectInitial(dispatch) {
  dispatch({
    type: "SELECT_MONDAY_INITIAL"
  });
}

export function select(dispatch, mondayDate) {
  dispatch({
    type: "SELECT_MONDAY",
    payload: mondayDate
  });
}

export function selectWeek(dispatch, weektime) {
  dispatch({
    type: "SELECT_WEEK",
    payload: weektime
  });
}

export function unSelectedWeek(dispatch) {
  dispatch({
    type: "UNSELECT_WEEK"
  });
}
