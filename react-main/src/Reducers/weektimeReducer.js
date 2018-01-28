const initialState = {
    fetching: false,
    fetched: false,
    updating: false,
    updated: false,
    // updateWeekTime: null,
    error: false,
    contracts: [],
    weekTimes: [],
    selectedMonday: null,
    selectedWeek: null,
};

export const weektime = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_TIMESHEET_PENDING': {
            return {...state, fetching: true};
        }
        case 'FETCH_TIMESHEET_SUCCESS': {
            return {...state, 
                fetching: false, 
                fetched: true, 
                contracts: action.payload.contracts,
                weekTimes : action.payload.weekTimes
            };
        }
        case 'FETCH_TIMESHEET_FAILURE': {
            return {...state, fetching: false, error: true};
        }
        case 'UPDATE_WEEKTIME_INITIAL': {
            return {...state, updated: false};
        }
        case 'UPDATE_WEEKTIME_PENDING': {
            return {...state, updating: true};
        }
        case 'UPDATE_WEEKTIME_SUCCESS': {
            for(let i = 0; i < state.weekTimes.length; i++) {
                if(state.weekTimes[i].weekId === action.payload.weekId) {
                    state.weekTimes[i] = action.payload;
                    break;
                }
            }
            return {...state, 
                updating: false, 
                updated: true
            }
        }
        case 'UPDATE_WEEKTIME_FAILURE': {
            return {...state, updating: false, error: true};
        }
        case 'SELECT_MONDAY_INITIAL': {
            return {...state, selectedMonday: null};
        }
        case 'SELECT_MONDAY': {
            return {...state, selectedMonday: action.payload};
        }

        case 'SELECT_WEEK': {
            return {...state, selectedWeek: action.payload};
        }

        case 'UNSELECT_WEEK': {
            return {...state, selectedWeek: null};
        }

        default: return state;
    }
};