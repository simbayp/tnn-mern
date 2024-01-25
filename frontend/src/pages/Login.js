import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email:</label>
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
