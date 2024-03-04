"use client";
import React, { useState } from "react";
import Plan from "@/components/Plan";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CheckoutPage = ({ makePayment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({amount:3000});
  return (
    <div className="max-w-[1200px] mx-auto my-12">
      <div className="w-full text-center">
        <h1 className=" text-center font-bold text-3xl">
          Complete your Payment
        </h1>
        <p className=" text-center mt-2">
          Select the best type of matching for your business needs!
        </p>
      </div>
      <div className="flex flex-wrap mt-12 justify-center">
        <div>
          <Plan
            border="before:border-[#112340]"
            title="Small Scale business"
            price="3000"
            features={[
              "Unlimited access",
              "24/7 customer support",
              "Basic analytics",
              "Personalized Guidance",
              "Seamless Integration",
              "Enhanced Security.",
            ]}
          />
        </div>
        <div className="ms-8">
          <RadioGroup
            className="flex"
            onValueChange={(selected) => {
              setUserData({ ...userData, amount: selected });
            }}
          >
            <div className="flex justify-center items-center border-2 hover:border-black w-fit px-5 py-3 cursor-pointer">
              <RadioGroupItem value={2000} id="r1" />
              <Label htmlFor="r1" className="ms-2 cursor-pointer text-xs">
                Bill Monthly
                <p className="text-lg">
                  {" "}
                  ₹ 2,000
                  <span className="text-sm">/ mon</span>
                </p>
              </Label>
            </div>
            <div className="flex justify-center items-center border-2 hover:border-black w-fit px-5 py-3 cursor-pointer">
              <RadioGroupItem value={5000 * 12} id="r2" />
              <Label htmlFor="r2" className="ms-2 cursor-pointer text-xs">
                Bill Annually
                <p className="text-lg">
                  {" "}
                  ₹ 5,000
                  <span className="text-sm">/ year</span>
                </p>
              </Label>
            </div>
          </RadioGroup>
          <div>
            <h1 className=" font-bold text-xl my-5">Payment Details</h1>
            <div>
              <div className="my-5">
                <Input
                  title="Full Name"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="my-5">
                <Input
                  title="Email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="my-5">
                <Input
                  title="Mobile Number"
                  placeholder="Enter mobile number"
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      mobile: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex items-center">
              <Image
                src={
                  "https://cdn.razorpay.com/static/assets/pay_methods_branding.png"
                }
                height={50}
                width={200}
                className="w-full mx-5"
              />
              <Button
                variant={isLoading ? "outline" : "default"}
                onClick={() => {
                  makePayment(userData);
                }}
              >
                {isLoading ? "Loading..." : "Complete purchase"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
