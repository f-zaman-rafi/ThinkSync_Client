import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Payment = () => {
    const location = useLocation();
    const { fee, sessionId } = location.state || {}; // Retrieve fee and sessionId from state

    return (
        <div className="py-20 mx-10">
            <h1>Pay here...</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm fee={fee} sessionId={sessionId} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
