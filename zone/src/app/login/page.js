import Image from "next/image";
import Link from "next/link";
import Config from "../core/config";
import { CustomInput } from "../components/CustomInput";
import { FieldBottom } from "../components/FieldBottom";
import { BiLogInCircle } from "react-icons/bi";


export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex h-screen bg-white">
      <form className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6 p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
        <Link href="/" className="flex items-center gap-2 mb-4">
          <Image
            src="/login-orang.png"
            alt="login"
            width={50}
            height={50}
            className="animate-bounce"
          />
          <span className="text-2xl font-bold animate-pulse font-sofia">
            {Config.appName()}
          </span>
        </Link>
        <h1 className="text-7xl w-2/3 font-semibold mb-4 font-rubik flex items-center justify-center">
          LOGIN
        </h1>
        <CustomInput
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email "
          required={true}
          className="w-2/3
                "
        />
        <CustomInput
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required={true}
          className="w-2/3"
        />

        <FieldBottom type="submit" className="w-1/3">
          <BiLogInCircle className="text-2xl items-center absolute justify-center " />
          LOGIN
        </FieldBottom>
        <Link
          href="/register"
          className="text-blue-500 hover:text-gray-900  text-center jus"
        >
          Don't have an account? Register
        </Link>
      </form>
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-blue-500 animate-slideIn">
        <Image
          src="/orang-login.png"
          alt="login"
          width={1800}
          height={1000}
          className="w-full h-full shadow-lg grayscale hover:grayscale-0 duration-700"
        />
      </div>
    </div>
  );
}
