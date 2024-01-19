"use client";
import { useState } from "react";
import React from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Button from "../components/Button";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleSubmit = () => {
    signInWithGoogle();
  };

  const handleLoginSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      // Firebase Authentication ile kayıt olma
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        router.push("/");
      }

      setErrors({});
    } catch (error) {
      console.error("Error logging in user:", error.message);
      setErrors({});
    }
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Chat App | Login</title>
      </Head>
      <main className="w-full font-disp h-screen flex justify-center flex-col items-center bg-gradient-to-br from-mSec  to-dSec ">
        <div className="lg:px-20 lg:pb-12 px-10 py-8 bg-gray-700 text-white text-lg shadow-xl shadow-gray-800 rounded-3xl text-center ">
          <h1 className=" my-4 lg:text-3xl text-2xl mb-10">Chat App - Berin</h1>
          {/*     FORM   */}
          <form onSubmit={handleLoginSubmit}>
            <div className="mt-10 text-white text-lg">
              <div className="">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="p-2 w-full bg-transparent outline-0 border-b-2 border-dPri hover:border-lPri transition-all"
                  checked={false}
                />
              </div>
              <div className="mt-6">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-2 w-full bg-transparent outline-0 border-b-2 border-dPri hover:border-lPri transition-all"
                  checked={false}
                />
              </div>
            </div>
            <div>
              <Button>Giriş Yap</Button>
            </div>
          </form>

          {/* <span className="px-8 pt-12 pb-6 bg-dPri rounded-2xl hover:bg-lPri transition-all">
            <FontAwesomeIcon icon={faMessage} className="text-6xl " />
          </span> */}
          <div className="mt-20 ">
            <h1 className="text-xl ">Giriş yapmak için kullan </h1>
            <Button onClick={() => handleSubmit()}>
              <FontAwesomeIcon icon={faGoogle} />
            </Button>
          </div>
          <span>
            Yeni hesap oluşturmak için -{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Üye Ol
            </Link>
          </span>
        </div>
      </main>
    </>
  );
};

export default Login;
