export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1rem' }}>Total Produk</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            Lihat di Menu
          </p>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1rem' }}>Status Sistem</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>
            Online
          </p>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1rem' }}>Integrasi API</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
            Aktif
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Selamat Datang!</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
          Ini adalah panel administrasi. Anda dapat mengelola data produk melalui menu di sebelah kiri.
          Aplikasi ini telah terhubung ke database dan menyediakan REST API secara seamless untuk web ini maupun untuk aplikasi Android nantinya.
        </p>
      </div>
    </div>
  );
}
