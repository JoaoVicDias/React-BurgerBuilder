import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) =>{
    
    const controls = [
        {label:'Salad',type:'salad'},
        {label:'Bacon',type:'bacon'},
        {label:'Meat',type:'meat'},
        {label:'Cheese',type:'cheese'}
    ]

    


    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.totalPrice}</strong></p>
            {controls.map((obj)=>{
        return <BuildControl  disabled={props.disabled[obj.type]} removed={props.ingredientRemove.bind(this,obj.type)} added={props.ingredientAdded.bind(this,obj.type)} key={obj.label} label={obj.label} />})}
            <button className={classes.OrderButton} onClick={props.ordered} disabled={!props.purchasable}>{props.isAuth?"ORDER NOW":"SIGN UP TO ORDER"}</button>
        </div>
    )
}

export default buildControls