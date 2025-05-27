import React from 'react'
import {PayPalButtons,PayPalScriptProvider} from '@paypal/react-paypal-js'
import { data } from 'react-router-dom'

const Payment = ({amount,onSuccess,onError}) => {
  return <PayPalScriptProvider options={{"client-id":
  "AXrDWzYUjk5JMavnA-DE0AuDl21StoQA_vzsHYFhj8a1EDeyfAPtET_kUixDvNGI56acxK46RUy_0or6"}}>
    <PayPalButtons style={{layout:"vertical"}}
    createOrder={(data,actions) => {
        return actions.order.create({
        purchase_units:[{amount:{value:amount}}]
        })
    }}
    onApprove ={(data,actions) => {
        return actions.order.capture().then(onSuccess)
    }
    }
    onError={onError}

    />
  </PayPalScriptProvider>
}

export default Payment
