import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Actions/Action";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      toast.success('Admin logged in');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Login failed');
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Login</h1>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email address
          </label>
          <input
            type="email"
            id="email"
            style={styles.input}
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            style={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={styles.checkboxGroup}>
          <input type="checkbox" id="rememberMe" style={styles.checkbox} />
          <label htmlFor="rememberMe" style={styles.checkboxLabel}>
            Remember me
          </label>
        </div>

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2em",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1em",
  },
  inputGroup: {
    marginBottom: "1em",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "0.5em",
  },
  input: {
    width: "100%",
    padding: "0.5em",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
    textAlign: "left",
  },
  checkbox: {
    marginRight: "0.5em",
  },
  checkboxLabel: {
    display: "block",
  },
  button: {
    width: "100%",
    padding: "0.5em",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Login;
