import { AUTH } from "./action.type"

export const updateEmail=(email)=>{
    return{
        type:AUTH.UPDATE_EMAIL,
        payload:email
    }
}

export const updatePassword=(password)=>{
    return{
        type:AUTH.UPDATE_PASSWORD,
        payload:password
    }
}

export const updateFirstName=(firstName)=>{
    return{
        type:AUTH.UPDATE_FIRST_NAME,
        payload:firstName
    }
}

export const updateLastName=(lastName)=>{
    return{
        type:AUTH.UPDATE_LAST_NAME,
        payload:lastName
    }
}

export const updateUserInfo =(userinfo)=>{
    return{
        type:AUTH.UPDATE_USER_INFO,
        payload:userinfo
    }
}

export const updateUserToken = (token) => {
    return{
        type:AUTH.UPDATE_TOKEN,
        payload:token
    }
}