import React, {useContext} from 'react';
import { AlertContext } from '../context/AlertContext';

export default function Alert(props) {
   
    const {alert} = useContext(AlertContext)
    const capitaliza = (word) =>{
        if(word === "danger")
            word = "error: ";
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <>
        {alert &&
        <div style={{height: '52px'}} className="my-3">
         <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitaliza(alert.type)}</strong> {alert.msg}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
        </div>
        

        </div>}
        </>
    )
}
