import React, {useState} from "react";
import Button from "@mui/material/Button";
import Order_detail from "./order_detail";

function Place_order(props) {
    let [display,updateDisplay] = useState(false)
    return (
        <div>
            <Button variant="outlined" onClick={()=>{updateDisplay(!display)}}>Place an Order</Button>
            <div>
                <Order_detail display={display} currency={props.currency} update_data={props.update_data}/>
            </div>
        </div>
    )
}

export default Place_order
