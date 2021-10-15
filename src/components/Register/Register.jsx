import "./Register.scss";
import Button from "@mui/material/Button";
import { Room } from "@mui/icons-material";
import { useState } from "react";

export default function Register() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="register-container">
      <div className="logo">
        <Room /> Location Marker
      </div>
      <form action="post">
        <input
          type="text"
          name="username"
          //  autoComplete="username"
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          name="email"
          id="email"
          //  autoComplete="current-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="password"
          //  autoComplete="current-password"
          placeholder="password"
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
