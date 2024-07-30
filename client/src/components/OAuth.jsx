import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGooglClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // SignIn popup
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google, ", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGooglClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase flex items-center justify-center hover:opacity-95"
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </button>
  );
}
