import "./Register.scss";
import Button from "@mui/material/Button";
import { Room } from "@mui/icons-material";

export default function Register() {
  return (
    <div className="register-container">
      <div className="logo">
        <Room /> Location Marker
      </div>
      <form action="post">
        <input
          type="text"
          name="username"
          autoComplete="username"
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="current-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="password"
        />
        <Button type="submit" color="success" className="submitButton">
          Submit
        </Button>
        <span className="success">Successfull. You can login now!</span>
        <span className="failure">Something went wrong!</span>
      </form>
    </div>
  );
}
