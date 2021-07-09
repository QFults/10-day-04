import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [transactionState, setTransactionState] = useState({
    label: '',
    amount: '',
    type: 'deposit'
  })

  const handleInputChange = ({ target }) => {
    setTransactionState({ ...transactionState, [target.name]: target.value })
  }

  const handleSaveTransaction = event => {
    event.preventDefault()
    axios.post('/api/transactions', {
      label: transactionState.label,
      amount: transactionState.amount,
      type: transactionState.type
    })
      .then(({ data: transaction }) => {
        console.log(transaction)
      })
      .catch(err => console.error(err))
  }
  return (
    <>
      <h1>Budget App</h1>
      <form>
        <p>
          <label htmlFor='label'>label</label>
          <input
            type='text'
            name='label'
            value={transactionState.label}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor='amount'>amount</label>
          <input
            type='number'
            name='amount'
            value={transactionState.amount}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor='type'>type</label>
          <select
            name='type'
            value={transactionState.type}
            onChange={handleInputChange}
          >
            <option value='deposit'>deposit</option>
            <option value='withdrawal'>withdrawal</option>
          </select>
        </p>
        <button onClick={handleSaveTransaction}>Add Transaction</button>
      </form>
    </>
  )
}

export default App
