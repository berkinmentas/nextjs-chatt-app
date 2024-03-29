import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import ContactCard from "./ContactCard";
import Modal from "./Modal";
import AddContact from "./AddContact";
import Logout from "./Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";
import { firestore } from "../firebaseconfig";
import getOtherUser from "../utlis/getOtherUser";

const SideBar = () => {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(
    collection(firestore, "chats")
  );
  console.log(user);

  const [showAddContact, setShowAddContact] = useState(false);
  const [showLogoutPop, setShowLogoutPop] = useState(false);

  const allChats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const chats = allChats?.filter((chat) => chat.users.includes(user.email));

  return (
    <aside className="bg-gray-700 relative rounded-lg flex flex-col h-full shadow-xl shadow-gray-800  w-full text-left text-lg text-white p-4">
      <div className="flex  items-center justify-between border-b-2 border-dPri pb-3">
        <div className="flex items-center gap-x-4 justify-around ">
          {/*        Profil rsmi */}
          <img
            src={user.photoURL}
            className="w-16 h-16 border-2 border-dPri rounded-full "
          />
          {/*     Kullanıcı Adı - Email */}
          <h1>{user?.email}</h1>
        </div>
        {/*     Çıkış yap */}
        <button onClick={() => setShowLogoutPop(true)}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="p-3 bg-dPri shadow-lg shadow-gray-800 rounded-lg hover:scale-105 transition-all hover:bg-lPri "
          />{" "}
        </button>

        {/*     Login Tipi */}
        <Modal showItem={showLogoutPop} setShowItem={setShowLogoutPop}>
          <Logout setShowItem={setShowLogoutPop} />
        </Modal>
      </div>
      <Button onClick={() => setShowAddContact(true)}>Yeni Konuşma</Button>
      {/*    Yeni kişi ekle alerti*/}
      <Modal showItem={showAddContact} setShowItem={setShowAddContact}>
        <AddContact user={user} setShowItem={setShowAddContact} chats={chats} />
      </Modal>
      {/*     kişiler */}
      <div className="w-full overflow-auto px-3 h-full  ">
        {chats?.map((chat, i) => {
          return (
            <ContactCard
              key={i}
              data={chat}
              email={getOtherUser(chat.users, user)}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
