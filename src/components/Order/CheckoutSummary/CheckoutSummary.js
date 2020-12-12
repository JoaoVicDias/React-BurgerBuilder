import React from 'react'
import Burger from '../../Burguer/Burguer'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%',margin:"auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnTypes={'Danger'} clicked={props.clicked}>Cancel</Button>
            <Button btnTypes={'Success'} clicked={props.continued} >Continue</Button>
        </div>
    )
}

export default checkoutSummary