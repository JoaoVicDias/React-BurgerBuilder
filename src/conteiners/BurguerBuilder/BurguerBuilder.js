import React,{Component} from 'react'
import Auxiliary from '../../hoc/auxiliary'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import axios from '../../axios-orders'
import * as actionsTypes from '../../store/actions/index'



export class BurguerBuilder extends Component{
    state = {
        purchasable:false,
        purchasingModal:false
    }

    componentDidMount(){
        this.props.OnInitIngredients()
    }

    updatePurchaseState = ()=>{
        const sum = Object.keys(this.props.ings).map(igKey => {
            return this.props.ings[igKey]
        }).reduce((sum,el)=>{
            return sum+el
        } ,0)

        return sum > 0  
    }

    purchaseHandler = ()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasingModal:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
       
    }

    backdropHandler = ()=>{
        this.setState({purchasingModal:false})
    }

    purchaseContinueHandler = ()=>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    
    render(){
        const disabledInfo = {...this.props.ings}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> :<Spinner/>

         
        if(this.props.ings){
            burger = <Auxiliary>
            <Burguer ingredients={this.props.ings}/>
            <BuildControls isAuth={this.props.isAuthenticated} ordered={this.purchaseHandler} purchasable={this.updatePurchaseState()} totalPrice={this.props.totalPrice.toFixed(2)} disabled={disabledInfo} ingredientRemove={this.props.OnRemoveIngredients} ingredientAdded={this.props.OnAddIngredients}/>
        </Auxiliary> 
        orderSummary =  <OrderSummary continue={this.purchaseContinueHandler} totalPrice={this.props.totalPrice.toFixed(2)} clickedCancel={this.backdropHandler} ingredients={this.props.ings}/>    
    }
        
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
      
        return (
            <Auxiliary>
                    <Backdrop clicked={this.backdropHandler} show={this.state.purchasingModal} />
                    <Modal show={this.state.purchasingModal}>
                      {orderSummary}
                    </Modal>
                    {burger}
                    
            </Auxiliary>
        )
    }
}


const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !==null
    }
}

const mapDispathToProps = dispath =>{
    return{
        OnAddIngredients:(ingName)=>dispath(actionsTypes.addIngredient(ingName)),
        OnRemoveIngredients:(ingName)=>dispath(actionsTypes.removeIngredient(ingName)),
        OnInitIngredients:()=> dispath(actionsTypes.initIngredients()),
        onInitPurchase:()=> dispath(actionsTypes.purchaseInit()),
        onSetAuthRedirectPath:(path)=> dispath(actionsTypes.setAuthRedirectPath(path))
    }
}





export default connect(mapStateToProps,mapDispathToProps)(withErrorHandler(BurguerBuilder,axios))