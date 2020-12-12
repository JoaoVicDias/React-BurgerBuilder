import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess= (token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const authFailed = (error)=>{
    return{
        type:actionTypes.AUTH_FAILED,
        error:error
    }
}

export const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime*1000)
    }
} 

export const auth = (email,password,isSignup)=>{
    return dispacth =>{
        dispacth(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAKCzUmF39cniisc5wfbRIjEywi67Mf8c"
       if(!isSignup){
            url =   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAKCzUmF39cniisc5wfbRIjEywi67Mf8c"
        }
        axios.post(url,authData).then(res=>{
            const expirationDate = new Date(new Date().getTime()+res.data.expiresIn*1000)
            localStorage.setItem('token',res.data.idToken)
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',res.data.localId)
            dispacth(authSuccess(res.data.idToken,res.data.localId))
            dispacth(checkAuthTimeout(res.data.expiresIn))
        }).catch(err=>{
            dispacth(authFailed(err))
        })
    }
}

export const setAuthRedirectPath = (path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000))
            }
        }
    }
}