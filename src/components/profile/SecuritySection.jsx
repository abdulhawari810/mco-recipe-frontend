import { useState } from "react";

export default function SecuritySection() {
  const [buttonStep, setButtonStep] = useState(false);
  console.log(buttonStep);
  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full bg-white p-6 rounded-2xl">
        <div className="flex items-center mb-5">
          <h1 className="font-bold text-xl">Security</h1>
        </div>
        <div className="grid grid-cols-2 border-b py-5 border-slate-300">
          <div className="flex flex-col w-full gap-2">
            <h1 className="text-lg font-semibold">Password</h1>
            <span className="text-md text-slate-500">
              Set a unique password to protect your account
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button className="p-2.5 rounded-full outline outline-slate-500 flex items-center justify-center text-md cursor-pointer text-slate-600">
              Change Password
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b py-5 border-slate-300">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-lg font-semibold">2-Step Verification</h1>
            <span className="text-md text-slate-500">
              Make your account extra secure, Along with your password, you'll
              need to enter a code
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className={`p-2 w-15 rounded-full outline ${buttonStep ? "outline-orange-500" : "outline-slate-500"} flex items-center justify-center text-md cursor-pointer text-slate-600`}
              onClick={() => setButtonStep(!buttonStep)}
            >
              <div
                className={`w-5 h-5 rounded-full transform ${buttonStep ? "bg-orange-500 translate-x-3" : "-translate-x-3 bg-slate-500"} transition-transform! duration-300`}
              ></div>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b py-5 border-slate-300">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-lg font-semibold">Restrict Member</h1>
            <span className="text-md text-slate-500">
              This will shut down your account, Your account will be reactive
              when you sign in again
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className={`p-2 flex items-center justify-center transition-all duration-300 text-md cursor-pointer text-slate-600`}
            >
              <span>None</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b py-5 border-slate-300">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-lg font-semibold">Deactive my account</h1>
            <span className="text-md text-slate-500">
              This will shut down your account, Your account will be reactive
              when you sign in again
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className={`p-2 flex items-center justify-center transition-all duration-300 text-md cursor-pointer text-slate-600`}
            >
              <span>Deactive</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-lg font-semibold">Delete Account</h1>
            <span className="text-md text-slate-500">
              This will delete your account, Your account will be permanently
              deleted from MCO
            </span>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className={`p-2 flex items-center justify-center transition-all duration-300 text-md cursor-pointer text-red-500`}
            >
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
