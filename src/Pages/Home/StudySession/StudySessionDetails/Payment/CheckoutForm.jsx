/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const CheckoutForm = ({ fee }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const { data } = await axiosSecure.post('/create-payment-intent', { fee });
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
                setError('Failed to initialize payment.');
            }
        };

        createPaymentIntent();
    }, [axiosSecure, fee]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
            return;
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // Confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            console.log('[confirmError]', confirmError);
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded:', paymentIntent);
            // Handle successful payment here (e.g., navigate to dashboard, show success message)
        } else {
            console.log('Payment not successful:', paymentIntent);
            setError('Payment not successful. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4 p-2 border border-gray-300 rounded-md">
                <CardElement
                    className="w-full py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <p className="text-red-500 pb-2">{error}</p>
            <button
                type="submit"
                disabled={!stripe}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;
