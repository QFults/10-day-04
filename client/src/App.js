import { useState, useEffect } from 'react'
import ReactTable from 'react-table-v6'
import axios from 'axios'

const App = () => {
  const [transactionState, setTransactionState] = useState({
    label: '',
    amount: '',
    type: 'deposit',
    transactions: []
  })

  const columns = [
    {
      Header: 'Label',
      accessor: 'label',
      filterable: true,
      searchable: true
    },
    {
      Header: 'Amount',
      accessor: 'amount'
    },
    {
      Header: 'Type',
      accessor: 'type'
    }
  ]

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
        const transactions = [...transactionState.transactions]
        transactions.push(transaction)
        setTransactionState({ ...transactionState, transactions, label: '', amount: '' })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get('/api/transactions')
      .then(({ data: transactions }) => {
        setTransactionState({ ...transactionState, transactions })
      })
      .catch(err => console.error(err))
  }, [])
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
      <ReactTable
        data={transactionState.transactions}
        columns={columns}
      />
    </>
  )
}

export default App
