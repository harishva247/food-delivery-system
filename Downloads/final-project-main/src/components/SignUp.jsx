import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // ✅ Added phone here
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation to check password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    // Validate phone number format (optional)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setErrorMessage(''); // Clear previous error message

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      // Log the raw response for debugging
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Server response:', data);

      if (res.ok) {
        alert('Registration successful! Redirecting to Sign In...');
        navigate('/signin');
      } else {
        // Handle specific error messages from the server
        setErrorMessage(data.message || 'Error registering user');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Full Name Input */}
            <div>
              <input
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <input
                name="phone"
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}" // Ensures 10-digit mobile numbers
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-600 text-sm text-center mt-4">{errorMessage}</div>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/signin" className="text-indigo-600 hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
