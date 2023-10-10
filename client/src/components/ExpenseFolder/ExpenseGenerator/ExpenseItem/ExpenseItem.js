import React, { Fragment, Suspense, lazy } from 'react'
const  DeleteButton =  lazy(()=> import('./DeleteButton')) 
const EditButton = lazy(()=> import('./EditButton'))


function ExpenseItem(props) {
  
    return (
        <Fragment>
            <tr>
            <td>{props.date}</td>
                <td>{props.title}</td>
                <td>₹{props.amount}</td>
                <td>{props.category}</td>
                <td>{props.debitOrCredit}</td>
                <td><Suspense fallback={<p>loading...</p>}><EditButton expenseObj={props} serverId={props.serverId}  /></Suspense></td>
                <td><Suspense fallback={<p>loading...</p>}><DeleteButton id={props.id}   /></Suspense></td>
            </tr>
        </Fragment>
    )
}

export default ExpenseItem