import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Shield } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password
      });

      localStorage.setItem('kormyx_admin_token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid ID or Password. Access Denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-sans selection:bg-white selection:text-black px-6">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 p-8 shadow-2xl">
        <div className="text-center mb-10">
          <Shield className="w-12 h-12 mx-auto mb-4 text-white opacity-80" />
          <h1 className="text-3xl font-light tracking-tight">Kormyx Command.</h1>
          <p className="text-sm text-white/50 uppercase tracking-widest mt-2">Restricted Access</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Admin ID</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Secure Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Establish Connection'}
          </button>
          
          {error && <p className="text-red-500 text-sm font-medium text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
