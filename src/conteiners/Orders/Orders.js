import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import {connect} from 'react-redux'
import * as actionsTypes from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends Component{

    componentDidMount(){
    this.props.onFecthOrders(this.props.token,this.props.userId)
    }

    render(){
        let orders = <Spinner/>
        if(!this.props.loading){
            orders = this.props.orders.map(order =>{
                return <Order key={order.id} ingredients={order.ingredients} totalPrice={+order.totalPrice}/>
            })
        }
    
        return (
            <div>
                   {orders} 
            </div>
        )
        
    }
}

const mapStateToProps = state =>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispathToProps = dispath =>{
    return{
        onFecthOrders:(token,userId)=>dispath(actionsTypes.fecthOrders(token,userId))
    }
}



export default connect(mapStateToProps,mapDispathToProps)(Orders)