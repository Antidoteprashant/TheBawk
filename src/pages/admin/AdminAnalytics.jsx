import React from 'react';
import { useAdmin } from '../../context/AdminContext';

const AdminAnalytics = () => {
    const { getStats } = useAdmin();
    const stats = getStats();

    // Mock data for charts visualization (could be implemented with Recharts later)
    const monthlyData = [400, 300, 600, 800, 500, 900, 1200];

    return (
        <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', textTransform: 'uppercase' }}>Analytics</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Revenue Chart Placeholder */}
                <div className="glass-panel" style={{ padding: '30px', borderRadius: '15px' }}>
                    <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Revenue Overview</h3>
                    <div style={{
                        height: '300px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '10px'
                    }}>
                        {monthlyData.map((val, i) => (
                            <div key={i} style={{
                                flex: 1,
                                height: `${(val / 1200) * 100}%`,
                                background: 'linear-gradient(to top, var(--accent-primary), transparent)',
                                borderRadius: '5px 5px 0 0',
                                opacity: 0.8
                            }}></div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: 'var(--text-muted)' }}>
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="glass-panel" style={{ padding: '30px', borderRadius: '15px' }}>
                    <h3 style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Performance Metrics</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <span>Conversion Rate</span>
                            <span style={{ color: '#00ff64', fontWeight: 'bold' }}>3.2%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <span>Avg. Order Value</span>
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>$116.25</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <span>Total Visitors</span>
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>12,450</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Bounce Rate</span>
                            <span style={{ color: '#ff4d4d', fontWeight: 'bold' }}>42%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
