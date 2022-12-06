import './App.css';
import Price_display from './price_display/price_display';
import React, {useState} from "react";
import Crypto_selection from "./crypto_selection/crypto_selection";
import Place_order from "./place_order/place_order";

function App() {
    const currency_list = ['BTC','ADA','CRO','ETH']
    const initList = []
    let [currency, updateCurrency] = useState('BTC')
    let [order_book_data, update_order_book_data] = useState({'sell':{'BTC':[],'ADA':[],'CRO':[],'ETH':[]},'buy':{'BTC':[],'ADA':[],'CRO':[],'ETH':[]},'history':{'BTC':[],'ADA':[],'CRO':[],'ETH':[]}})
    console.log(order_book_data)
  return (
    <div className="App">
      <div className="App-header">
          <div >
              <div style={{height:'25rem'}}>
                    Buyer Order Book
                    <Price_display data={order_book_data['buy']} type={'B'} currency={currency} className={'price_block_1'} style={{disaply:'None'}}/>
              </div>
              <div style={{height:'25rem'}}>
                      Seller Order Book
                    <Price_display data={order_book_data['sell']} type={'S'} currency={currency}/>
              </div>
          </div>
          <div style={{padding:'0 5rem 0 5rem', width:'30vw'}}>
              <Crypto_selection currency={currency} updateCurrency={updateCurrency}/>
              <Place_order currency={currency} update_data={(new_record,ccy,type)=>{
                  if (type === 'buy'){
                      let changed=false
                      order_book_data['sell'][ccy].map((row)=>{
                          if (row.price === new_record.price && row.quantity > 0){
                              order_book_data['history'][ccy].push({price:new_record.price,quantity:Math.min(row.quantity,new_record.quantity), total:new_record.price*(Math.min(row.quantity,new_record.quantity))})
                              row.quantity = row.quantity-new_record.quantity
                              changed=true
                          }
                          if (row.quantity < 0 || row.quantity == 0){
                              if (row.quantity < 0) {
                                  order_book_data[type][ccy].push({
                                      price: new_record.price,
                                      quantity: 0 - row.quantity,
                                      total: new_record.price * (0 - row.quantity)
                                  })
                              }
                              order_book_data['sell'][ccy] = order_book_data['sell'][ccy].filter((row)=>{
                                  return !row.price === new_record.price
                              })
                          }
                      })
                      order_book_data['buy'][ccy].map((row)=>{
                          if (row.price === new_record.price){
                              row.quantity = row.quantity+new_record.quantity
                              changed=true
                          }
                      })
                      if (!changed){
                          order_book_data[type][ccy].push(new_record)
                      }
                  }else{
                      let changed=false
                      order_book_data['buy'][ccy].map((row)=>{
                          if (row.price === new_record.price && row.quantity > 0){
                              order_book_data['history'][ccy].push({price:new_record.price,quantity:Math.min(row.quantity,new_record.quantity), total:new_record.price*(Math.min(row.quantity,new_record.quantity))})
                              row.quantity = row.quantity-new_record.quantity
                              changed=true
                          }
                          if (row.quantity < 0 || row.quantity == 0){
                              if (row.quantity < 0) {
                                  order_book_data[type][ccy].push({
                                      price: new_record.price,
                                      quantity: 0 - row.quantity,
                                      total: new_record.price * (0 - row.quantity)
                                  })
                              }
                              order_book_data['buy'][ccy] = order_book_data['buy'][ccy].filter((row)=>{
                                  return !row.price === new_record.price
                              })
                          }
                      })
                      order_book_data['sell'][ccy].map((row)=>{
                          if (row.price === new_record.price){
                              row.quantity = row.quantity+new_record.quantity
                              changed=true
                          }
                      })
                      if (!changed){
                          order_book_data[type][ccy].push(new_record)
                      }
                  }
                  update_order_book_data(JSON.parse(JSON.stringify(order_book_data)))
              }}/>
          </div>
          <div style={{height:'25rem'}}>
              Transaction History
              <Price_display data={order_book_data['history']} currency={currency}/>
          </div>
      </div>
    </div>
  );
}

export default App;