import { useState, useEffect, useRef } from "react";
import "./Login.css";
import {
  auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  facebookProvider,
} from "../../firebase";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const navigate = useNavigate();
  const loginRef = useRef(null); // Reference for login container

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        navigate("/"); // Redirect to home when clicking outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navigate]);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error during login:", error.message);
      });
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error during sign up:", error.message);
      });
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error sending password reset email:", error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Google login successful:", user);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error during Google login:", error.message);
      });
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log("Facebook login successful:", user);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error during Facebook login:", error.message);
      });
  };

  return (
    <div>
      {/* Background with blur */}
      <div className="background-blur"></div>

      <div className="login-container">
        <div className="container-login" ref={loginRef}>
          {/* Close button
          <button
            className="close-button"
            onClick={() => navigate("/")}
          >
            &times;
          </button> */}
          <div className="form-box-login">
            <h2 className="header-form-login">
              {isSignUp ? "Sign Up" : "Login"}
            </h2>
            <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailLogin}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
                </span>
              </div>
              <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
            </form>

            <div className="auth-buttons login">
              <button
                onClick={handleGoogleLogin}
                style={{ backgroundColor: "#4285F4", color: "white" }}
              >
                Login with Google
              </button>
              <button
                onClick={handleFacebookLogin}
                style={{ backgroundColor: "#3b5998", color: "white" }}
              >
                Login with Facebook
              </button>
            </div>

            <div className="message login">
              {isSignUp ? (
                <>
                  <span>Already have an account? </span>
                  <span
                    onClick={() => setIsSignUp(false)}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  <span
                    onClick={handleForgotPassword}
                    style={{ cursor: "pointer" }}
                  >
                    Forgot Password?
                  </span>
                  <span> | </span>
                  <span
                    onClick={() => setIsSignUp(true)}
                    style={{ cursor: "pointer" }}
                  >
                    Sign Up
                  </span>
                </>
              )}
            </div>

            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
