import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { email, password, name };

      // const authToken = localStorage.getItem('authToken');
      // await axios.post(
      // 'http://localhost:5005/auth/signup',
      // requestBody,
      // { headers: { Authorization: `Bearer ${authToken}`} }
      // )

      // or with a service
      await authService.signup(requestBody);

      // If the request is successful navigate to login page
      navigate("/login");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <input
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
