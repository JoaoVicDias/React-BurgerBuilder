import React from 'react'
import classes from './Button.module.css'

const button = (props)=>{
    return(
    <button  onClick={props.clicked} disabled={props.disabled} className={[classes.Button,classes[props.btnTypes]].join(' ')}>{props.children}</button>
    )
}  

export default button