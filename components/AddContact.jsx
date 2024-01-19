import React, { useState } from "react";
import Button from "./Button";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebaseconfig";
import getOtherUser from "../utlis/getOtherUser";

const AddContact = ({ user, setShowItem, chats }) => {
  const [email, setEmail] = useState("");

  const chatExist = () => {
    let notExist = true;
    chats.forEach((chat) => {
      const otherUser = getOtherUser(chat.users, user);
      if (otherUser == email) {
        notExist = false;
      }
    });
    return notExist;
  };

  const handleAdd = () => {
    if (email.length > 0 && chatExist() && email != user.email) {
      addDoc(collection(firestore, "chats"), { users: [email, user.email] });
      setEmail("");
      setShowItem(false);
    }
  };

  return (
    <div className="text-center ">
      <h1 className="mb-6 mt-3 text-2xl">Yeni Kişi Ekle</h1>
      <input
        type="text"
        placeholder="Email"
        className="rounded-md p-2 w-full shadow-md shadow-gray-800 outline-0 bg-lSec border-2 border-dSec "
        spellCheck={false}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex">
        <Button onClick={() => handleAdd()}>Ekle</Button>
      </div>
    </div>
  );
};

export default AddContact;
