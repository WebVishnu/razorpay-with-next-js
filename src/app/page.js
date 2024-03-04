"use client";
import CheckoutPage from "@/components/CheckoutPage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isDomLoading, setIsDomLoading] = useState(false);

  const makePayment = async (userData) => {
    if (!userData?.name || !userData?.email || !userData?.mobile) {
      console.log("Please fill your name, email, and mobile number");
      return;
    }
    try {
      const { order } = (
        await axios.post("/api/razorpay/order", {
          amount: userData.amount,
          paymentFor: userData.email,
          userId: 123,
        })
      ).data;
      setIsDomLoading(true)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        name: userData.email,
        currency: order.currency,
        amount: parseInt(order.amount),
        order_id: order.id,
        description: "Custom checkout page",
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.mobile,
        },
        handler: async (response) => {
          const res = await axios.post("/api/razorpay/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (res?.data?.message === "success") router.push("/dashboard");
          else handleError();
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", () => handleError());
    } catch (error) {
      setIsDomLoading(false)
      console.error("Payment error:", error.message);
    }

    function handleError() {
      setIsDomLoading(false)
      console.log("Payment failed. Please try again. Contact support for help");
    }
  };
  return <>{!isDomLoading && <CheckoutPage makePayment={makePayment} />}</>;
}
