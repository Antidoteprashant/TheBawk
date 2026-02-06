import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '80px 20px 40px',
            fontFamily: 'sans-serif',
            borderTop: '1px solid #222'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '40px',
                marginBottom: '80px'
            }}>
                {/* Column 1: Shop */}
                <div>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        letterSpacing: '1px',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        color: '#fff'
                    }}>Shop</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li>
                            <a href="#" style={{
                                color: '#888',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                transition: 'color 0.2s'
                            }} onMouseEnter={(e) => e.target.style.color = '#fff'}
                                onMouseLeave={(e) => e.target.style.color = '#888'}>
                                BAWK
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Legal */}
                <div>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        letterSpacing: '1px',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        color: '#fff'
                    }}>Legal</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {['Refund Policy', 'Privacy Policy', 'Contact Information'].map(item => (
                            <li key={item}>
                                <a href="#" style={{
                                    color: '#888',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    transition: 'color 0.2s'
                                }} onMouseEnter={(e) => e.target.style.color = '#fff'}
                                    onMouseLeave={(e) => e.target.style.color = '#888'}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Headquarters */}
                <div>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        letterSpacing: '1px',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        color: '#fff'
                    }}>Headquarters</h4>
                    <div style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <p style={{ margin: 0 }}>vinay nagar sec-2</p>
                        <p style={{ margin: '5px 0' }}>rogerprashant72@gmail.com</p>
                        <p style={{ margin: 0 }}>+91 8446692339</p>
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    marginBottom: '20px',
                    color: '#fff'
                }}>Subscribe to our emails</h3>
                <div style={{
                    position: 'relative',
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 15px',
                            backgroundColor: 'transparent',
                            border: '1px solid #333',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '0.9rem',
                            outline: 'none',
                        }}
                    />
                    <button style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                    }}>
                        →
                    </button>
                </div>
            </div>

            {/* Footer Bottom */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                borderTop: '1px solid #111',
                paddingTop: '40px'
            }}>
                {/* Instagram Icon */}
                <a href="#" style={{ color: '#fff', fontSize: '1.5rem', textDecoration: 'none' }}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>

                <p style={{ color: '#444', fontSize: '0.8rem', margin: 0 }}>
                    © {new Date().getFullYear()}, BAWK
                </p>
            </div>
        </footer>
    );
};

export default Footer;
