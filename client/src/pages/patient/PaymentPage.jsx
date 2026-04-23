import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createAppointment } from "../../services/appointmentService";
import { isAuthenticated } from "../../services/auth";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: doctorIdParam } = useParams();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { selectedDate, selectedTime } = location.state || {};

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true, state: { from: `/patient/book-appointment/${doctorIdParam}` } });
    } else if (!selectedDate || !selectedTime) {
      // If user navigates directly without passing through config flow, redirect back
      navigate(`/patient/book-appointment/${doctorIdParam}`, { replace: true });
    }
  }, [doctorIdParam, navigate, selectedDate, selectedTime]);

  const handlePayNow = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      // 1. Simulate a payment delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPaymentSuccess(true);

      // 2. Actually create the appointment in the backend
      await createAppointment({
        doctorId: doctorIdParam,
        date: selectedDate,
        time: selectedTime,
      });

      // 3. Redirect to appointments
      setTimeout(() => {
        navigate("/patient/my-appointments");
      }, 1500);
    } catch (err) {
      setErrorMessage(err.message || "Could not book appointment after payment.");
      setPaymentSuccess(false);
      setIsProcessing(false);
    }
  };

  const handleCancelPayment = () => {
    navigate(-1); // Go back to the booking page
  };

  if (!selectedDate || !selectedTime) {
    return null; // Will redirect in useEffect
  }

  // Mocking the doctor's fee completely
  const mockFee = 150.0;
  const mockTax = 12.5;
  const total = mockFee + mockTax;

  return (
    <div className="payment-page">
      <div className="payment-card">
        <p className="payment-tag">Checkout</p>
        <h2>Complete your Payment</h2>
        
        {!paymentSuccess ? (
          <>
            <div className="bill-summary">
              <div className="bill-row">
                <span>Consultation Fee</span>
                <span>${mockFee.toFixed(2)}</span>
              </div>
              <div className="bill-row">
                <span>Taxes & Platform Fees</span>
                <span>${mockTax.toFixed(2)}</span>
              </div>
              <div className="bill-total">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {errorMessage && <p className="payment-error">{errorMessage}</p>}

            <button 
              className="pay-btn" 
              onClick={handlePayNow} 
              disabled={isProcessing}
            >
              {isProcessing ? "Processing Payment..." : `Pay $${total.toFixed(2)}`}
            </button>
            <button 
              className="cancel-btn" 
              onClick={handleCancelPayment}
              disabled={isProcessing}
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="payment-success">
            <h3>🎉 Payment Successful!</h3>
            <p>Your appointment is confirmed. Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
