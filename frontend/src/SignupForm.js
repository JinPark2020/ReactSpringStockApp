import React, { useState } from 'react';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setSubmitted(true);
  };

  // Reset form and submission state
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setSubmitted(false);
  };

  return (
    <div style={{ marginTop: '20px', maxWidth: '400px' }}>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h2>Registration Confirmed</h2>
          <button
            onClick={handleReset}
            style={{ padding: '10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default SignupForm;
