import React,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actionsTypes from '../../../store/actions/index'

class ContactData extends Component{
    state = {
        formIsValid:false,
        orderForm:{
            name:{
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
                
            },
            zipcode:{
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:"input",
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:"input",
                elementConfig:{
                    type:'email',
                    placeholder:'Your email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:"select",
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:"Fastest"},
                        {value:'cheapest',displayValue:"Cheapest"}
                    ]
                },
                value:'fastest',
                validation:false,
                valid:true
            }
        }
    }

    checkValidationHandler = (value,rules)=>{
        let isValid = true
         
        if(rules.required){
            isValid = value.trim() !== "" && isValid
        }

        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }


        return isValid
    }


    inputChangedHandler=(inputIndentifier,event)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        
        const updatedFormElement = {
            ...updatedOrderForm[inputIndentifier]
        }   
        
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidationHandler(updatedFormElement.value,updatedFormElement.validation)
        updatedOrderForm[inputIndentifier] = updatedFormElement
        

        let formIsValid = true
        for(let inputIndentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid
        }

        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
    }

    orderhandler =(event)=>{
        event.preventDefault()
        const formData = {}
        for(let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value
        }
        const order = {
            ingredients:this.props.ings,
            totalPrice:this.props.totalPrice,
            orderForm:formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token)
      
    }
    
    render(){
        let formElementsArray = []
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderhandler}>
                {formElementsArray.map(formElement=>{
                    return <Input touched={formElement.config.touched} shouldValidate={formElement.config.validation} invalid={!formElement.config.valid} label={formElement.id.toUpperCase()} changed={ this.inputChangedHandler.bind(this,formElement.id)} key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} />
                })}
                <Button disabled={!this.state.formIsValid} btnTypes="Success"> ORDER </Button>
        </form>
        )
     if(this.props.loading){
         form = <Spinner/>
     }

        return(
            <div className={classes.Contactdata}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispathToProps = dispath=>{
    return {
        onOrderBurger: (orderData,token) => dispath(actionsTypes.purchaseBurger(orderData,token))
    }
}




export default connect(mapStateToProps,mapDispathToProps)(ContactData)