import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createAppointment } from "../../services/appointmentService";
import { isAuthenticated } from "../../services/auth";
import { requestJson } from "../../services/api";
import "./PaymentPage.css";
//  this is the payment page where patient can pay for the appointment after selecting date and time. It uses Razorpay as the payment gateway and handles the payment process, including success and error scenarios.
const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: doctorIdParam } = useParams();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { selectedDate, selectedTime } = location.state || {};
  const mockFee = 1000.0;
  const mockTax = 180.0;
  const total = mockFee + mockTax;

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", {
        replace: true,
        state: { from: `/patient/book-appointment/${doctorIdParam}` },
      });
    } else if (!selectedDate || !selectedTime) {
      // If user navigates directly without passing through config flow, redirect back
      navigate(`/patient/book-appointment/${doctorIdParam}`, { replace: true });
    }
  }, [doctorIdParam, navigate, selectedDate, selectedTime]);

  const handlePayNow = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      const data = await requestJson("/payments/create-order", {
        method: "POST",
        body: JSON.stringify({ amount: total }),
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "MediConnect",
        description: "Doctor Appointment",
        order_id: data.id,
        modal: {
          ondismiss: () => {
            setErrorMessage("Payment cancelled by user.");
          },
        },
        handler: async (response) => {
          try {
            setPaymentSuccess(true);
            await createAppointment({
              doctorId: doctorIdParam,
              date: selectedDate,
              time: selectedTime,
              paymentId: response.razorpay_payment_id,
            });
            setTimeout(() => {
              navigate("/patient/my-appointments");
            }, 2000);
          } catch (err) {
            setErrorMessage(
              err.message || "Could not book appointment after payment.",
            );
          }
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        theme: {
          color: "#16a085",
        },
      };

      if (!window.Razorpay) {
        setErrorMessage("Payment gateway not loaded.");
        setIsProcessing(false);
        return;
      }

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelPayment = () => {
    navigate(-1); // Go back to the booking page
  };

  if (!selectedDate || !selectedTime) {
    return null; // Will redirect in useEffect
  }

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
                <span>₹{mockFee.toFixed(2)}</span>
              </div>
              <div className="bill-row">
                <span>Taxes & Platform Fees</span>
                <span>₹{mockTax.toFixed(2)}</span>
              </div>
              <div className="bill-total">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {errorMessage && <p className="payment-error">{errorMessage}</p>}

            <button
              className="pay-btn"
              onClick={handlePayNow}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing Payment..."
                : `Pay ₹${total.toFixed(2)}`}
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
