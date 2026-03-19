import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // redirect to home
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <br /><br />

      <button type="submit">Register</button>

      <br /><br />

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;