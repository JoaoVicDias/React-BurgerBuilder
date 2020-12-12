import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../../conteiners/Checkout/ContactData/ContactData'
import {connect} from 'react-redux'


class Checkout extends Component{


    clickedCancelHandler = () => {
        this.props.history.goBack()
    }

    continue=()=>{
        this.props.history.replace("/checkout/contact-data")
    }

    render(){
        let summary = <Redirect to="/" />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased? <Redirect to="/"/>:null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings} clicked={this.clickedCancelHandler} continued={this.continue}/>
                    <Route path={this.props.match.path+"/contact-data"} component={ ContactData}/>
                </div>
            )
        }
        return summary
    }   
}




const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
        
    }
}



export default connect(mapStateToProps) (Checkout)