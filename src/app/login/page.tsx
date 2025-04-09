"use client";
import { auth, googleProvider } from "@/app/utils/firebase-api";
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
          <div className="text-2xl font-extrabold">Smart <span className="text-green-500">Grocery</span></div>

          <div>
          <h1 className="text-4xl font-bold mb-1">Welcome Back!</h1>
          <h1 className="text-4xl font-bold mb-4">Keep Planning Smarter</h1>
          <p className="text-lg">
            Plan your meals and groceries smarter, faster, and cheaper.
          </p>
          </div>
      
         
          <p className="text-sm italic mt-8 text-blue-100">
            “Good food planning means less waste, more savings.” <br />– Smart Grocery Team
          </p>
        </div>
  
        {/* Right Side */}
        <div className="w-2/3 max-sm:w-full flex justify-center items-center bg-white">
    
          <div className="w-full flex flex-col justify-center text-center max-sm:flex max-sm:min-h-10/12 max-sm:flex-col max-sm:justify-start max-sm:mt-10 max-sm:px-6">
          <div className="min-sm:hidden rounded-md bg-blue-700 h-55 mb-10 flex flex-col justify-center items-center gap-6 shadow-xl">
            <h2 className="text-2xl  text-left font-semibold text-white">Smart <span className="text-green-500">Grocery</span></h2>
            <div>
            <h1 className="text-lg  text-white mb-1">Welcome Back!</h1>
            <h1 className="text-lg  text-white mb-4">Keep Planning Smarter</h1>
            </div>
           

          </div>
            <h2 className="text-2xl max-sm:text-lg font-semibold mb-6 text-black">Login to your account</h2>
            <button
              onClick={handleLogin}
              className="flex items-center cursor-pointer justify-center min-sm:w-100 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-3"
                width={20}
                height={20}
              />
              <span className="text-gray-700 max-sm:text-sm">Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    );

}