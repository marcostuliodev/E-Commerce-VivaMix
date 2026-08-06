// frontend/src/pages/LoginPage.tsx

import { useState, type FormEvent } from 'react';
import apiClient from '../api/axiosConfig';
import { useAuth } from '../hooks/use-auth';
import { TextField, Button } from '@mui/material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // 2. Use o hook para pegar a função login

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token } = response.data;
      login(token); // 3. Chame a função login do contexto
    } catch (err) {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div>
      <h2>Login do Administrador</h2>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto', marginBlock: '0 auto'}}>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <TextField
          type="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Senha" 
          required 
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Entrar
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
