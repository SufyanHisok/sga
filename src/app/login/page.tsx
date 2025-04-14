"use client";
import { auth, googleProvider } from "@/app/utils/firebase-api";
import CustomButton from "@/components/shared/custom-btn";
import CustomInput from "@/components/shared/custom-Input";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user) {
        router.push('/modules/main');
      }
    }, []);
  
    const handleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/modules/main');
      } catch (error) {
        console.error('Google login failed', error);
      }
    };
  
    return (
      <div className="flex h-screen">
        {/* Left Side */}
        <div className="w-1/3 max-sm:hidden bg-blue-700 text-white flex flex-col gap-40 justify-center items-start px-16">
          <div className="text-2xl font-extrabold">
            Smart <span className="text-green-500">Grocery</span>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-1">Welcome Back!</h1>
            <h1 className="text-4xl font-bold mb-4">Keep Planning Smarter</h1>
            <p className="text-lg">
              Plan your meals and groceries smarter, faster, and cheaper.
            </p>
          </div>

          <p className="text-sm italic mt-8 text-blue-100">
            “Good food planning means less waste, more savings.” <br />– Smart
            Grocery Team
          </p>
        </div>

        {/* Right Side */}
        <div className="w-2/3 max-sm:w-full flex justify-center items-center bg-white">
          <div className="flex flex-col min-sm:gap-6 max-sm:gap-6 justify-center text-center max-sm:flex max-sm:min-h-10/12 max-sm:min-w-11/12 max-sm:flex-col max-sm:justify-start max-sm:mt-3 max-sm:px-2">
            <div className="min-sm:hidden flex flex-col justify-center items-center mb-3 gap-6">
              <h2 className="text-2xl  text-left font-semibold text-black">
                Smart <span className="text-green-500">Grocery</span>
              </h2>
              {/* <div>
                <h1 className="text-lg  text-white mb-1">Welcome Back!</h1>
                <h1 className="text-lg  text-white mb-4">
                  Keep Planning Smarter
                </h1>
              </div> */}
            </div>
            <h2 className="text-2xl max-sm:text-lg font-semibold mb-6 max-sm:mb-2 text-black max-sm:font-medium max-sm:text-sm">
              Login to your account
            </h2>

            <div className="min-sm:w-100 gap-4 flex flex-col max-sm:px-3">
              <div className="flex flex-col justify-start gap-2">
                <p className="text-base text-gray-600 text-left">Email</p>
                <CustomInput
                  width="100%"
                  type="email"
                  placeholder="Enter your email"
                  className="text-black"
                />
              </div>
              <div className="flex flex-col justify-start gap-2">
                <p className="text-base text-gray-600 text-left">Password</p>
                <CustomInput
                  width="100%"
                  type="password"
                  placeholder="Enter your password"
                  className="text-black"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-gray-500">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>

                <a
                  href="/forgot-password"
                  className="text-black font-medium hover:underline"
                >
                  Forgot password
                </a>
              </div>
            </div>

            <CustomButton 
            className="bg-blue-700 text-white w-100 flex justify-center items-center p-2.5 max-sm:w-auto max-sm:mt-3"
            label="Sign In"  
            onClick={() => router.push("/modules/main")}
            />

            <div className="flex items-center w-full">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
                Or login with
              </span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              onClick={handleLogin}
              className="flex items-center cursor-pointer justify-center min-sm:w-100 px-10 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-3"
                width={20}
                height={20}
              />
              <span className="text-gray-700 max-sm:text-sm">
                Continue with Google
              </span>
            </button>
            <button
              onClick={handleLogin}
              className="flex items-center cursor-pointer justify-center min-sm:w-100 px-10 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Image
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                alt="Google"
                className="w-5 h-5 mr-3"
                width={20}
                height={20}
              />
              <span className="text-gray-700 max-sm:text-sm">
                Continue with Facebook
              </span>
            </button>
          </div>
        </div>
      </div>
    );

}