import { FilePen, LogIn } from "lucide-react";
import { useState } from "react";
import InputItem from "./../components/InputItem";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "../assets/google.svg";

function AuthenticationPage() {
  // --- Use States ---
  const [formToggle, setFormToggle] = useState("register");

  // --- State Based Arrays ---

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const toggleKeys = [
    {
      key: "register",
      label: "Register",
    },
    {
      key: "login",
      label: "Login",
    },
  ];

  // --- Variables ---

  const navigate = useNavigate();

  // --- Handle Change Functions ---

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Form Submit ---

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formToggle === "register") {
      // --- VALIDATIONS ---
      if (
        !formData.fname ||
        !formData.lname ||
        !formData.email ||
        !formData.password
      ) {
        alert("All fields are required...");
        return;
      }
      if (formData.password.length < 11) {
        alert("Password should be of 11 characters...");
        return;
      }

      alert("Register Successful");
      console.log("Register Data: ", formData);
      localStorage.setItem("id", 1);
      setTimeout(() => {
        navigate("/chat");
      }, 2500);
      return;
    }
    // --- VALIDATIONS ---
    if (!formData.email || !formData.password) {
      alert("All fields are required...");
      return;
    }

    alert("Login Successful");
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    console.log("Login Data: ", payload);
    localStorage.setItem("id", 1);
    setTimeout(() => {
      navigate("/chat");
    }, 2500);
  };

  // --- Google Login Function ---

  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`,
        )
        .then((googleRes) => {
          const googleData = {
            firstName: googleRes.data.given_name || "",
            lastName: googleRes.data.family_name || "",
            email: googleRes.data.email || "",
            password: "dummy_google_password_encrypted_and_AAAA",
          };
          console.log("GOOGLE DATA: ", googleData);
          alert("Google Login Successful");
          localStorage.setItem("id", 1);
          setTimeout(() => {
            navigate("/chat");
          }, 2500);
        });
    },
    onError: () => alert("Google Sign-In Failed"),
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Form Container */}
      <div className="max-w-sm w-full bg-white shadow-xl rounded-2xl border border-gray-100 py-5 px-5">
        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-extrabold tracking-wide text-blue-900">
            Lorem
          </h1>
          <p className="text-xs tracking-wide text-gray-500 mt-1 font-medium transition-all duration-300">
            {formToggle === "register"
              ? "Create an account to spend time with the world"
              : "Welcome back! Log in to your account"}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="relative flex items-center justify-center mt-2 gap-1.5 rounded-xl p-1 bg-gray-200/70 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]">
          <span
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-blue-900 rounded-lg transition-all duration-300 ease-in-out
              ${formToggle === toggleKeys[0].key ? "translate-x-0" : "translate-x-full"}
            `}
          />

          {/* 2. Your Button Map */}
          {toggleKeys.map((key, i) => (
            <button
              key={key.key}
              className={`${formToggle === key.key ? "text-gray-100 font-semibold" : "text-gray-600 hover:text-gray-900"} relative z-10 flex items-center transition-colors ease-in-out duration-300 justify-center gap-2 w-full rounded-lg py-2.5 text-sm`}
              onClick={() => setFormToggle(key.key)}
            >
              {key.key === "register" ? (
                <FilePen size={18} strokeWidth={2.25} />
              ) : (
                <LogIn size={18} strokeWidth={2.25} />
              )}
              <span>{key.label}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <AnimatePresence initial={false} mode="popLayout">
            {formToggle === "register" && (
              <motion.div
                key="name-fields"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center gap-3 w-full overflow-hidden"
              >
                {/* Fname */}
                <InputItem
                  label={"First Name"}
                  name={"fname"}
                  onChange={handleInputChange}
                  value={formData.fname}
                  flex={true}
                />
                {/* Lname */}
                <InputItem
                  label={"Last Name"}
                  name={"lname"}
                  onChange={handleInputChange}
                  value={formData.lname}
                  flex={true}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <InputItem
            label={"Email Address"}
            name={"email"}
            onChange={handleInputChange}
            value={formData.email}
          />

          {/* Password */}
          <InputItem
            label={"Password"}
            name={"password"}
            onChange={handleInputChange}
            value={formData.password}
          />

          {/* Submit Button - layout prop ensures it slides up/down cleanly */}
          <motion.button
            layout
            type="submit"
            className="w-full mt-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm tracking-wide active:scale-[0.99]"
          >
            {formToggle === "register" ? "Sign Up" : "Sign In"}
          </motion.button>

          {/* Divider Line */}
          <motion.div
            layout
            className="relative flex items-center justify-center my-4"
          >
            <div className="border-t border-gray-200 w-full"></div>
            <span className="absolute bg-white px-3 text-xs text-gray-400 font-medium uppercase tracking-wider">
              or
            </span>
          </motion.div>

          {/* Google Button */}
          <motion.button
            onClick={handleGoogleSubmit}
            layout
            type="button"
            className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2.5 px-4 rounded-xl shadow-sm transition-all duration-200 text-sm active:scale-[0.99]"
          >
            <img src={GoogleIcon} alt="Google Icon" />
            <span>Continue with Google</span>
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default AuthenticationPage;
