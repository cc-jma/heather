import { useState } from 'react'

export function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('')
  const [age, setAge] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const calculateAge = async () => {
    if (!birthdate) {
      setError('Please enter a birthdate')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
      const response = await fetch(`${apiBaseUrl}/api/age?birthdate=${birthdate}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to calculate age')
        setAge(null)
      } else {
        setAge(data.age)
        setError(null)
      }
    } catch {
      setError('Failed to connect to backend')
      setAge(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="age-calculator" data-testid="age-calculator">
      <h2>Age Calculator</h2>
      <div className="form-group">
        <label htmlFor="birthdate">Enter your birthdate:</label>
        <input
          id="birthdate"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <button onClick={calculateAge} disabled={loading || !birthdate}>
        {loading ? 'Calculating...' : 'Calculate Age'}
      </button>

      {age !== null && (
        <div className="result success">
          <p>
            Your age is: <strong>{age} years</strong>
          </p>
        </div>
      )}

      {error && (
        <div className="result error">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  )
}
