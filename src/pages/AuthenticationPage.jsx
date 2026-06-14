import { FilePen, LogIn } from "lucide-react";
import { useState } from "react";
import InputItem from "./../components/InputItem";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AuthenticationPage() {
  // --- States ---
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

  const [formToggle, setFormToggle] = useState("register");

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
            layout
            type="button"
            className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2.5 px-4 rounded-xl shadow-sm transition-all duration-200 text-sm active:scale-[0.99]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default AuthenticationPage;
