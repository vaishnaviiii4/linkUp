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

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    dispatch({ type: LOGIN_SUCCESS, payload: userData });
  } catch {
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

export const getMeetSuccess =
  (caller, receiver, caller_video, receiver_video) => async (dispatch) => {
    try {
      dispatch({ type: MEET_REQUEST });
      await dispatch({
        type: MEET_SUCCESS,
        payload: {
          caller,
          receiver,
          caller_video,
          receiver_video,
        },
      });
    } catch {
      dispatch({ type: MEET_FAIL });
    }
  };
// export const addMessage = (msg) => {
//   console.log("message added");
//   dispatch({ type: ADD_MESSAGE, payload: { message: msg } });
// };
export const addMessage = (msg) => async (dispatch) => {
  await dispatch({ type: ADD_MESSAGE, payload: { message: msg } });
};
