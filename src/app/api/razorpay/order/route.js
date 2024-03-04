import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

export async function POST(req) {
  try {
    const { amount, paymentFor, userId } = await req.json();
    const payment_capture = 1;
    const amt = parseInt(amount) * 100; // amount in paisa. In our case it's INR 1
    const currency = "INR";
    const options = {
      amount: amt.toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
      notes: {
        paymentFor,
        userId,
      },
    };
    const order = await instance.orders.create(options);
    return NextResponse.json({ msg: "success", order });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "fail", error: e });
  }
}
