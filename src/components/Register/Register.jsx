import "./Register.scss";
import Button from "@mui/material/Button";
import { Room } from "@mui/icons-material";
import { useRef, useState } from "react";
import axios from "axios";

export default function Register() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register-container">
      <div className="logo">
        <Room /> Location Marker
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          //  autoComplete="username"
          placeholder="username"
          id="username"
          ref={usernameRef}
        />
        <input
          type="email"
          name="email"
          id="email"
          //  autoComplete="current-email"
          placeholder="email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          id="password"
          min="6"
          //  autoComplete="current-password"
          placeholder="password"
          ref={passwordRef}
        />
        <Button
          type="submit"
          color="success"
          //  color={success ? "success" : "error"}
          className="submitButton"
        >
          Submit
        </Button>
        {success && (
          <span className="success">Successful!! You can login now...</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
    </div>
  );
}
