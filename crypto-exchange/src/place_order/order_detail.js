import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Order_detail(props) {
    let [quantity,updateQuantity] = useState(100)
    let [price,updatePrice] = useState(500)
    return (
        <div style={props.display?{display:'block'}:{display:'None'}}>
            <div>
                <div>Order Detail:</div>
                <div>Currency Pair: {props.currency}/USD</div>
                <div style={{display:'flex'}}>
                    <div style={{paddingRight:'1rem'}}>Price:</div>
                    <TextField  sx={{ input: { color: 'white' } }} id="standard-basic" variant="standard" value={price} onChange={(e)=>{
                        updatePrice(e.target.value);
                    }}/>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{paddingRight:'1rem'}}>Quantity:</div>
                    <TextField  sx={{ input: { color: 'white' } }} id="standard-basic" variant="standard" value={quantity} onChange={(e)=>{
                            updateQuantity(e.target.value);
                    }}/>
                </div>
                <div>Total:{quantity*price}</div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', paddingTop:'5rem'}}>
                <Button style={{width:'10rem'}} variant="outlined" onClick={()=>{
                    props.update_data({
                        price: price,
                        quantity: quantity,
                        total: quantity*price,},props.currency,'buy')

                }}>Buy</Button>
                <Button style={{width:'10rem'}} variant="outlined" onClick={()=>{
                    props.update_data({
                        price: price,
                        quantity: quantity,
                        total: quantity*price,},props.currency,'sell')

                }}>Sell</Button>
            </div>
        </div>
    )
}

export default Order_detail
