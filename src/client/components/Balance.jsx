import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    hasAccount: state.account !== null
  };
};

const Balance = props => {
   if (!props.hasAccount) {
       return (
           <div className="pt-2 pb-3">
               <div className="d-flex flex-row text-uppercase px-3 pb-1 text-secondary">
                   <span className="bg-secondary">TOKEN</span>
                   <span className="ml-auto bg-secondary">AMOUNT</span>
               </div>
               <hr className="my-0 mx-2 border-secondary" />

               <div className="d-flex flex-row px-3 py-2 text-secondary">
                   <span className="bg-secondary">TOKEN NAME GOES HERE</span>
                   <span className="ml-auto bg-secondary">000,000.00</span>
               </div>
               <hr className="my-0 mx-2 border-secondary" />
           </div>
       )
   } else if (props.currencies.length > 0) {
       return (
           <div className="pt-2 pb-3">
               <div className="d-flex flex-row text-uppercase px-3">
                   <span>TOKEN</span>
                   <span className="ml-auto">AMOUNT</span>
               </div>
               <hr className="my-1 mx-2 border-secondary" />
               {props.currencies.map((currency) =>
                   <div key={currency.id}>
                       <div className="d-flex flex-row px-3 py-2">
                           <span>{currency.currency}</span>
                           <span className="ml-auto">
                               {(currency.balance).toLocaleString("en", {minimumFractionDigits: 3})} {currency.symbol}
                           </span>
                       </div>
                       <hr className="my-0 mx-2 border-secondary" />
                   </div>
               )}
           </div>
       )
   } else {
       return (
           <div className="text-center p-4">
               No balances found for this wallet
           </div>
       )
   }
};

export default connect(mapStateToProps)(Balance);
