import { AUTH } from "../action/action.type";


const userInfo1 = localStorage.getItem("userinfo");
const userToken = localStorage.getItem("Token");

let userInfo = null;
if (userInfo1) {
  userInfo = userInfo1.user;
}

let token = null;
if (userToken){
  token = userToken;
}



const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  token:token,
  userinfo: userInfo,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH.UPDATE_EMAIL:
      return { ...state, email: payload };

    case AUTH.UPDATE_PASSWORD:
      return { ...state, password: payload };

    case AUTH.UPDATE_FIRST_NAME:
      return { ...state, firstName: payload };

    case AUTH.UPDATE_LAST_NAME:
      return { ...state, lastName: payload };

    case AUTH.UPDATE_TOKEN:
      return { ...state, token: payload };

    case AUTH.UPDATE_USER_INFO:
      return { ...state, userinfo: payload };

      default:
      return state;
  }
};

export default authReducer;
