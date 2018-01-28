const initialState = {
    user: null,
    loggedIn: false,
    loggingIn: false,
    loginError: false,

    updating: false,
    updated: false,
    fetching: false,
    fetched: false,
    userList: [],
    updatedUser: null,
};

export const user = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_PENDING': {
            return {...state, 
                loggingIn: true,
                loggedIn: false,
                loginError: false
            };
        }
        case 'LOGIN_SUCCESS': {
            return {...state, 
                loggingIn: false, 
                loggedIn: true,
                loginError: false,
                user: action.payload.user
            };
        }
        case 'LOGIN_FAILURE': {
            return {...state, loggingIn: false, loginError: true};
        }
        case 'LOAD_TOKEN': {
            return {...state,
                loggingIn: false,
                loggedIn: true,
                loginError: false,
                user: action.payload.user
            }
        }
        case 'LOGOUT':{
            return initialState;
        }

        // case 'UPDATE_USER_INITIAL': {
        //     return {...state, updated: false};
        // }
        case 'UPDATE_PROFILE_PENDING': {
            return {...state, updating: true};
        }
        case 'UPDATE_PROFILE_SUCCESS': {
            state.user = action.payload;
            
            return {...state, 
                updating: false, 
                updated: true
            }
        }
        case 'UPDATE_PROFILE_FAILURE': {
            return {...state, updating: false, error: true};
        }

        case 'FETCH_USER_PENDING': {
            return {...state, fetching: true};
        }
        case 'FETCH_USER_SUCCESS': {
            return {...state, 
                fetching: false, 
                fetched: true, 
                userList: action.payload,
            };
        }
        case 'FETCH_USER_FAILURE': {
            return {...state, fetching: false, error: true};
        }

        case 'UPDATE_USER_PENDING': {
            return {...state, updating: true};
        }
        case 'UPDATE_USER_SUCCESS': {
            state.updatedUser = action.payload;
            
            return {...state, 
                updating: false, 
                updated: true
            }
        }
        case 'UPDATE_USER_FAILURE': {
            return {...state, updating: false, error: true};
        }

        default: return state;
    }
};