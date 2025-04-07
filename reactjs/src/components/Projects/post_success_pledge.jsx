import React, { useEffect, useState } from "react";
import AuthUser from "../Authentication/AuthUser";
import { Link } from "react-router-dom";

export default function Post_Pledge() {
  const { http, khalti } = AuthUser();
  const [transactionID, setTransactionID] = useState('');
  const [amount, setTotalAmount] = useState(0); // Set initial amount to 0
  const [loading, setLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const pidx = urlParams.get('pidx');
  const userID = urlParams.get('purchase_order_id').split('_')[1];
  const projectID = urlParams.get('purchase_order_id').split('_')[3];
  const rewardID = urlParams.get('purchase_order_id').split('_')[5];

  console.log(urlParams);

  // Fetch data from Khalti API
  useEffect(() => {
    if (!pidx) return; // Prevent API call if pidx is not available
    khalti
      .post('/epayment/lookup/', { pidx })
      .then((response) => {
        setTotalAmount(response.data.total_amount); // Set amount
        setTransactionID(response.data.transaction_id); // Set transaction ID
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [pidx]);

  // When both amount and transactionID are available, send transaction data to your server
  useEffect(() => {
    if (transactionID && amount > 0) {
      http
        .post('/transaction/add', {
          transaction_date: new Date().toISOString().split('T')[0],
          user_id: userID,
          project_id: projectID,
          amount: amount / 100, // If necessary, divide by 100 for proper currency format
          reward_id: rewardID
        })
        .then((response) => {
          console.log("Transaction added successfully:", response);
        })
        .catch((error) => {
          if (error.response) {
            console.error('Server Error:', error.response.data);
          } else if (error.request) {
            console.error('No response from server:', error.request);
          } else {
            console.error('Error:', error.message);
          }
        });
    }
  }, [transactionID, amount, userID, projectID, rewardID, http]); // Dependency array to ensure re-run when any of these change

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing your pledge...</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Pledge Successful!</h2>
              <p className="text-gray-600 mt-2">Your support makes all the difference</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Amount Pledged:</span>
                <span className="text-2xl font-bold text-blue-500">Rs. {(amount / 100).toLocaleString()}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="text-center text-gray-600 mb-6">
              <p className="mb-4">
                Thank you for backing this project! Your contribution will help bring this creative vision to life.
              </p>
              <p className="text-sm">
                You can track project updates and reward information in your "Involved Projects" page.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Return Home
              </Link>
            </div>
          </div>
        )}
        
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm text-gray-500">Transaction ID: {transactionID ? transactionID.substring(0, 8) + '...' : 'Processing'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}