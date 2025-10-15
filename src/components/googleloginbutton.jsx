import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    } catch (err) {
      console.error("Login error:", err);
      alert("Error signing in with Google");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        background: "#4285F4",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Sign in with Google
    </button>
  );
}
