"use client";
import { useState } from "react";
import React from "react";
import Head from "next/head";
import Button from "../../components/Button";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Login } from "../../components/Login";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      // Firebase Authentication ile kullanıcıyı kaydet
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        photoURL
      );
      const user = userCredential.user;

      // user üzerinden UID'ye erişebiliriz.
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(docRef, {
        name,
        surname,
        email,
        password,
        photoURL,
      });

      router.push("/");

      setErrors({});
    } catch (error) {
      // Hata ile karşılaşılırsa hatayı yazdır
      console.error("Error registering user:", error.message);
      setErrors({});
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Chat App | lg</title>
      </Head>
      <main className="w-full font-disp h-screen flex justify-center flex-col items-center bg-gradient-to-br from-mSec  to-dSec ">
        <div className="lg:px-20 lg:pb-12 px-10 py-8 bg-gray-700 text-white text-lg shadow-xl shadow-gray-800 rounded-3xl text-center ">
          <h1 className=" my-4 lg:text-3xl text-2xl mb-10">Chat App - Berin</h1>

          <form onSubmit={handleSubmit}>
            <div className="mt-10 text-white text-lg">
              <div className="">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="p-2 w-full bg-transparent outline-0 border-b-2 border-dPri hover:border-lPri transition-all"
                  checked={false}
                />
              </div>
              <div className="mt-6">
                <input
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Surname"
                  className="p-2 w-full bg-transparent outline-0 border-b-2 border-dPri hover:border-lPri transition-all"
                  checked={false}
                />
              </div>
              <div className="mt-6">
                <input
                  type="email"
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
              <div className="mt-6">
                <input
                  type="file"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Profil Resminizi Seçiniz"
                  className="p-2 w-full bg-transparent outline-0 border-b-2 border-dPri hover:border-lPri transition-all"
                  checked={false}
                />
              </div>
              <div>
                <Button>Kayıt Ol</Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
