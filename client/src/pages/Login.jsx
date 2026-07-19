import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", response.data.token);

    alert("Login successful");
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;