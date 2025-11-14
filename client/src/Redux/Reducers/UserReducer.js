import {
  MEET_FAIL,
  MEET_REQUEST,
  MEET_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT_SUCCESS,
  ADD_MESSAGE,
} from "../Constants/MeetConstants";

export const signinReducer = (
  state = { user: {}, isAuthenticated: false, loading: true },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        user: {},
        isAuthenticated: false,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export const MeetReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case MEET_REQUEST:
      return {
        loading: true,
        is_answered: false,
        caller: action.payload.caller,
        caller_video: action.payload.caller_video,
      };
    case MEET_SUCCESS:
      return {
        loading: false,
        is_answered: true,
        caller: action.payload.caller,
        receiver: action.payload.receiver,
        caller_video: action.payload.caller_video,
        receiver_video: action.payload.receiver_video,
      };
    case MEET_FAIL:
      return {
        loading: false,
        is_answered: false,
        ...state,
      };
    default:
      return { ...state };
  }
};

// const initialState = {
//   messsages:[],
// }
export const MessageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        messsages: [...state.messages, action.payload.message],
      };
    }
    default:
      return { ...state };
  }
};
