import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  const UKPound = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

  useEffect(() => {
    calculateTotal(amount, days);
  }, [amount, days])

  const calculateTotal = (amount: number, days: number) => {
    let t = 0;
    for (let i = 1; i <= days; i++) {
      t += (amount * i);
    }
    setTotal(t);
  }

  return (
    <main className="app">
      <header className="app-header">
        <div className="app-icon" aria-hidden="true">💰</div>
        <h1 className="app-title">My Savings</h1>
        <p className="app-subtitle">
          Challenge yourself to save an increasing amount each day of the month.
          Save your base amount multiplied by the current day — e.g.{'\u00a0'}£1 on day{'\u00a0'}1, £2 on day{'\u00a0'}2, and so on.
        </p>
      </header>

      <section aria-labelledby="calculator-heading">
        <div className="card">
          <p className="card-title" id="calculator-heading">Configure</p>
          <div className="calculator-grid">
            <div className="field">
              <label className="field-label" htmlFor="amount">Base amount (£)</label>
              <input
                className="field-input"
                type="number"
                id="amount"
                name="amount"
                placeholder="1"
                min="0"
                step="0.01"
                autoComplete="off"
                onChange={e => setAmount(+e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="days">Days in month</label>
              <input
                className="field-input"
                type="number"
                id="days"
                name="days"
                placeholder="31"
                min="1"
                max="31"
                autoComplete="off"
                onChange={e => setDays(+e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div
        className="result-card"
        role="status"
        aria-live="polite"
        aria-label={`Total savings: ${UKPound.format(total)}`}
      >
        <div>
          <p className="result-label">Total savings</p>
          <p className="result-amount">{UKPound.format(total)}</p>
        </div>
      </div>

      <section aria-labelledby="example-heading">
        <div className="card">
          <p className="card-title" id="example-heading">Example — 30 days at £1 base</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Amount saved</th>
                  <th scope="col">Running total</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <tr key={day}>
                    <td>Day {day}</td>
                    <td>{UKPound.format(day)}</td>
                    <td>{UKPound.format(day * (day + 1) / 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
