import React,{Component} from 'react'
import classes from './Modal.module.css'


class Modal extends Component{
   
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render(){
        return (
            <div className={classes.Modal} style={{transform:this.props.show ? "translateX(0)": "translateX(-100vw)",opacity:this.props.show ? "1" : "0"}}>
                {this.props.children}
            </div>
        )
    }
    
}

 

export default Modal