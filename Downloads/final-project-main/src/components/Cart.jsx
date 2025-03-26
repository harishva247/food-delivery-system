import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // ✅ Fetch cart items from localStorage on page load (instead of API)
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  // ✅ Update localStorage whenever cartItems state changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // ✅ Remove item from cart and update localStorage
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
  };

  // ✅ Update item quantity (state and localStorage)
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  // ✅ Calculate total price
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Checkout and place order (mocked API call)
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      // Mocked order submission. Replace with actual API call as needed
      const res = { ok: true }; // This simulates a successful order response.

      if (res.ok) {
        setOrderSuccess(true);
        setCartItems([]); // Clear cart in state
        localStorage.setItem('cartItems', JSON.stringify([])); // Clear cart in localStorage
        setTimeout(() => {
          setOrderSuccess(false);
          navigate('/menu'); // Redirect to menu page after 3 seconds
        }, 3000);
      } else {
        console.error('Failed to place the order');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  // ✅ Show order success message after checkout
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for your order. We will deliver your items soon!</p>
          <p className="text-gray-500">Redirecting to menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600 mb-4">Your cart is empty</h2>
            <Link
              to="/menu"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {cartItems.map((item) => (
                <div key={item._id} className="border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
