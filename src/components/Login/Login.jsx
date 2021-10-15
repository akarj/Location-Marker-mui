import "./Login.scss";
import Button from "@mui/material/Button";
import { Cancel, Room } from "@mui/icons-material";
import { useRef, useState } from "react";
import axios from "axios";

export default function Login({ setShowLogin, myStorage, setCurrentUsername }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", newUser);
      myStorage.setItem("user", res.data.data.username);

      // setCurrentUsername(res.data.data.username);

      setError(false);
      console.log(res);
    } catch (err) {
      setError(true);
      setTimeout(e => {
        setError(false);
      }, 2000);
    }
  };
  return (
    <div className="login-container">
      <div className="logo">
        <Room /> Location Marker
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          autoFocus
          autoComplete="username"
          placeholder="username"
          id="username"
          ref={usernameRef}
        />

        <input
          type="password"
          name="password"
          id="password"
          min="6"
          autoComplete="current-password"
          placeholder="password"
          ref={passwordRef}
        />
        <Button
          type="submit"
          color="success"
          //  color={success ? "success" : "error"}
          variant="contained"
          className="loginButton"
        >
          Login
        </Button>

        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
