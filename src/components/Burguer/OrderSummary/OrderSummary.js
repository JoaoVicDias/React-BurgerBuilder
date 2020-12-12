import React from 'react'
import Button from '../../../components/UI/Button/Button'
import Auxiliary from '../../../hoc/auxiliary'

const orderSummary = (props)=>{

    const ingredientsSummary = Object.keys(props.ingredients).map((igKey,i)=>{

        return <li key={igKey+i}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]} </li>
    })
    return(
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong> Total Price: {props.totalPrice} </strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.clickedCancel} btnTypes={'Danger'}>CANCEL</Button>
            <Button clicked={props.continue}  btnTypes={'Success'} >CONTINUE</Button>
        </Auxiliary>
    )
}



export default orderSummary