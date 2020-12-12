import * as actionsTypes from '../../store/actions/actionsTypes'
import axios from '../../axios-orders'



export const purchaseBurgerSuccess = (id,orderData)=>{
        return{
            type:actionsTypes.PURCHASE_BURGER_SUCCESS,
            orderId:id,
            orderData:orderData
        }
}

export const purchaseBurgerFailed = (error)=>{
    return{
        type:actionsTypes.PURCHASE_BURGER_FAILED,
        error:error
        
    }
}

export const purchaseBurgerStart = ()=>{
    return{
        type:actionsTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token,userId)=>{
    return dispath=>{
         dispath(purchaseBurgerStart())
        axios.post("/orders.json?auth="+token,orderData).then(res=>{
            dispath(purchaseBurgerSuccess(res.data.name,orderData))
        }).catch(err=>{
            dispath(purchaseBurgerFailed(err))
        })
    }
}

export const purchaseInit = ()=>{
    return{
        type:actionsTypes.PURCHASE_INIT
    }
}

export const fecthOrdersSuccess = (orders)=>{
    return{
        type:actionsTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}


export const fecthOrdersFailed = (error)=>{
    return{
        type:actionsTypes.FETCH_ORDERS_FAILED,
        error:error
    }
}


export const fecthOrdersStart = ()=>{
    return{
        type:actionsTypes.FETCH_ORDERS_START
    }
}

export const fecthOrders = (token,userId)=>{
    return dispatch =>{
        const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="'+ userId +'"'
        dispatch(fecthOrdersStart())
        axios.get('orders.json'+queryParams).then(res=>{
            const fetchedorders = []
            for(let key in res.data){
                fetchedorders.push({...res.data[key],id:key})
            }
            dispatch(fecthOrdersSuccess(fetchedorders))
            
        }).catch(err=>{
            dispatch(fecthOrdersFailed(err))
        })
    }
}