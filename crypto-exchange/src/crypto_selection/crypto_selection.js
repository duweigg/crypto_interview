import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React from "react";
import './crypto_selection.css'



function Crypto_selection(props) {
    const _onSelect = (data)=>{
        props.updateCurrency(data.label)
    }
    const options = [
        { value: 'BTC', label: 'BTC', className: 'Dropdown_options' },
        { value: 'ADA', label: 'ADA', className: 'Dropdown_options' },
        { value: 'CRO', label: 'CRO', className: 'Dropdown_options' },
        { value: 'ETH', label: 'ETH', className: 'Dropdown_options' },
    ];
    const defaultOption = props.currency;

    return (
        <div>
            <div style={{padding:'0 0 2rem 0'}}>
                <span>please select crypto</span>
            </div>
            <Dropdown
                controlClassName='Dropdown'
                options={options}
                onChange={_onSelect}
                value={defaultOption}
                placeholder="Select an option"
            />
        </div>
    )
}

export default Crypto_selection