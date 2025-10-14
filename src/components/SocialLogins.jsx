import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../provider/AuthContext";

const SocialLogins = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      toast.success(`Welcome ${user.displayName || "User"}!`);
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-row mx-auto items-center mb-5">
      <h2 className="text-sm font-semibold mx-3">or login with</h2>
      <button onClick={handleGoogleLogin} className="btn bg-[#432818] border-none shadow-none text-[#ede0d4]  flex items-center gap-2">
        <FaGoogle /> Login with Google
      </button>
    </div>
  );
};

export default SocialLogins;
