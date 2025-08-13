import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "../App";
import EmptyChat from "../components/EmptyChat";
import Chat from "../components/Chat";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Unauth from "../components/Unauth";

const Router = () => {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("accessToken", user.accessToken);
      } else {
        localStorage.removeItem("accessToken");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Unauth>Login</Unauth>} />
        <Route path="/:userId" element={<App />}>
          <Route index element={<EmptyChat />} />
          <Route path="/:userId/:chatId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
