import React from "react";

const Plan = (props) => {
  return (
    <div className="m-6 relative">
      <div
        className={`plan transition-all hover-style border-2 border-[#112340] rounded-md ${props.class} flex flex-col items-center max-w-[310px] w-[310px] p-7`}
      >
        <h3 className="text-center text-xl mb-4">{props.title}</h3>
        <h1 className="text-6xl">
          {" "}
          ₹ {new Intl.NumberFormat("en-IN").format(props.price)}
        </h1>
        <ul className="w-[100%] mb-5">
          <hr className={`h-[2px] my-2 border-0 `} />
          {props.features.map((feature, key) => {
            return (
              <li className="flex my-2" key={key}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  className="me-3"
                >
                  <ellipse cx="9.5" cy="10" rx="9.5" ry="10" fill="#000" />
                  <path
                    d="M5 9.66667L8.2 13L14.5 7"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {feature}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Plan;
