import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/admin');
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--glass-border)',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '1rem',
        marginTop: '5px'
    };

    const labelStyle = {
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        marginBottom: '5px',
        display: 'block'
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-color)'
        }}>
            <form onSubmit={handleLogin} className="glass-panel" style={{
                padding: '40px',
                borderRadius: '15px',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    textTransform: 'uppercase',
                    fontSize: '1.8rem'
                }}>Admin Access</h2>

                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={labelStyle}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: 'var(--accent-primary)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        fontSize: '1rem',
                        textTransform: 'uppercase'
                    }}
                >
                    {loading ? 'Authenticating...' : 'Login'}
                </button>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                        &larr; Back to Store
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
