import React from 'react'
import classes from './Input.module.css'

const input = (props)=>{

    let inputElement = null
    let errorMsg = null
    const inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate  && props.touched){
        inputClasses.push(classes.Invalid)
        errorMsg = <p style={{color:'red',margin:'5px 0'}}>Please enter a valid value!</p>
    }


    switch( props.elementType ){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} autoComplete="on" onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} autoComplete="on"  onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
            
        case('select'):
            inputElement =(
                <select className={inputClasses.join(' ')}  onChange={props.changed} value={props.value}>
                   {props.elementConfig.options.map(option=>{
                       return(
                       <option key={option.value} value={option.value}>{option.displayValue}</option>
                       )
                   })}
                </select>) 
            break
        default:
            inputElement = <input className={inputClasses.join(' ')} autoComplete="on"  onChange={props.changed} {...props.elementConfig} value={props.value}/>
    }



    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {errorMsg}
            {inputElement}
        </div>
        
    )
}


export default input