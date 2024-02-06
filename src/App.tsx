import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  let UKPound = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

  useEffect(() => {
    calculateTotal(amount, days);

  }, [amount, days])

  const calculateTotal = (amount: number, days: number) => {
    let t = 0;

    for (let i = 1; i <= days; i++) {
      t += (amount*i);
    }

    setTotal(t);
  }



  return (
    <>
      <h1 className='title'>My Savings</h1>
      <p>Challenge yourself to save an amount times the number of days in a month.</p>
      <p>So, if it's £1, multiply it by the current date and save that. e.g. £1 on the 1st, total=£1. £1 on the 2nd, £2 but total = £3.</p>

      <div>
        <div className='input'>
          <label className='input-label' htmlFor="amount">Amount (Base saving amount)</label>
          <input className='input-text' type="number" id="amount" placeholder="£1" onChange={e => setAmount(+e.target.value)} />
        </div>
        <div className='input'>
          <label className='input-label' htmlFor="days">Days (Days in a month)</label>
          <input className='input-text' type="number" id="days" placeholder='31' onChange={e => setDays(+e.target.value)} />
        </div>
      </div>
      <h2>Total {UKPound.format(total)}</h2>


      <>
      <h2>Example</h2>
      <p> 30 days with a £1 base saving</p>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({length: 30}, (_, i) => i+1).map((day, index) => (
            <tr key={index}>
              <td>{day}</td>
              <td>{UKPound.format(1*day)}</td>
              <td>{UKPound.format(1*(day*(day+1)/2))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    </>
  )
}

export default App
