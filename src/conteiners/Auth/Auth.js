import  React,{Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actionsTypes from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'



class Auth extends Component{
    state = {
        controls:{
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
            password:{
                elementType:"input",
                elementConfig:{
                    type:'password',
                    placeholder:'******'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/"){
            this.props.setAuthRedirectPath()
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

    inputChangedHandler=(controlName,event)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidationHandler(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls:updatedControls})
    }

    submitHandler = (event)=>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }

    switchAuthModeHandler = ()=>{
        this.setState(prevState=> {
            return{
                isSignup:!prevState.isSignup
            }
        })
    }

    render(){

        let errorMessage = null
        let formElementsArray = []
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        const form  =this.props.loading ? <Spinner/> : formElementsArray.map(formElement=>{
           return <Input key={formElement.id} touched={formElement.config.touched} shouldValidate={formElement.config.validation} invalid={!formElement.config.valid} label={formElement.id.toUpperCase()} changed={ this.inputChangedHandler.bind(this,formElement.id)}  elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value}/>

        })
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.setAuthRedirectPath}/>
        }
      
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnTypes="Success">SUBMIT</Button>
                </form>
                    <Button clicked={this.switchAuthModeHandler} btnTypes='Danger'>SWITCH TO {this.state.isSignup ? "SIGNIN":"SIGNUP"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}


const mapDispatchToProps = dispacth =>{
    return{
        onAuth:(email,password,isSignup)=>dispacth(actionsTypes.auth(email,password,isSignup)),
        onSetRedirectPath:()=>dispacth(actionsTypes.setAuthRedirectPath('/'))
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(Auth)