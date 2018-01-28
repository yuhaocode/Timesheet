// this file contain reducer for test data

import {combineReducers} from 'redux';
import weeklyHoursReducer from './reducer-weeklyhours';
import contractReducer from './reducer-contract'
import ActiveWeeklyhour from './reducer-active-weeklyhour';
import HistoryWeeklyhours from './reducer-history-weeklyhours';
import SaveWeeklyhours from './save-weeklyhour';
import SubmitWeeklyhours from './submit-weeklyhour';
import Login from './login';


export const allReducers = combineReducers({
    weeklyHours: weeklyHoursReducer,
    contract: contractReducer,
    activeWeeklyhour: ActiveWeeklyhour,
    historyWeeklyhours: HistoryWeeklyhours,
    saveWeeklyhours: SaveWeeklyhours,
    submitWeeklyhours: SubmitWeeklyhours,
    login: Login,
});

// export default allReducers;