import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const items = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const settings = await prisma.settings.findUnique({ where: { id: 1 } });
  
  // Default values if settings not found
  const sellerInfo = settings || {
    name: 'Bapak Rijal',
    wa: '+62 812-3456-7890',
    email: 'halo@ternakhub.com',
    address: 'Jl. Alam Asri No. 42, Desa Sukamaju, \nKecamatan Agrobisnis, Kabupaten Makmur'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', background: 'var(--bg-color)', overflowX: 'hidden' }}>
      
      {/* Hero Section */}
      <header style={{ width: '100%', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '4rem 2rem', borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, rgba(15,23,42,1) 100%)', zIndex: 0 }}></div>
        
        <div className="glass-panel animate-fade-in" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center', background: 'rgba(20, 30, 40, 0.6)', border: '1px solid rgba(217, 119, 6, 0.3)', boxShadow: '0 10px 40px rgba(16, 185, 129, 0.15)' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #10b981, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 2px 10px rgba(16, 185, 129, 0.2)' }}>
            TernakHub
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 2.5rem auto', fontWeight: '300' }}>
            Perpaduan sempurna antara <span style={{ color: '#10b981', fontWeight: '500' }}>teknologi masa depan</span> dan <span style={{ color: '#d97706', fontWeight: '500' }}>kearifan alam</span>. Temukan sapi, kambing, dan unggas berkualitas unggul yang dirawat dengan penuh dedikasi.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#marketplace" className="btn" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '30px', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Eksplorasi Ternak
            </a>
            <a href="#contact" className="btn" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '30px', border: '1px solid rgba(217, 119, 6, 0.4)', transition: 'all 0.3s' }}>
              Hubungi Kami
            </a>
          </div>
        </div>
      </header>

      {/* Marketplace Section */}
      <section id="marketplace" style={{ maxWidth: '1200px', width: '100%', padding: '5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#f8fafc', marginBottom: '0.5rem' }}>Katalog Ternak</h2>
            <p style={{ color: '#94a3b8' }}>Pilihan hewan ternak premium dengan jaminan kesehatan.</p>
          </div>
          <span style={{ padding: '0.5rem 1.5rem', background: 'rgba(217, 119, 6, 0.1)', color: '#d97706', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
            {items.length} Tersedia
          </span>
        </div>

        {items.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '5rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '1.25rem', fontWeight: '400' }}>Saat ini belum ada koleksi ternak yang dipublikasikan.</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {items.map(item => (
              <div key={item.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', cursor: 'pointer', background: 'linear-gradient(180deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.9) 100%)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {item.imageUrl ? (
                  <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="card-img" />
                  </div>
                ) : (
                  <div style={{ width: '100%', height: '240px', background: 'rgba(16, 185, 129, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <span>Visual Tidak Tersedia</span>
                  </div>
                )}
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', color: '#f8fafc' }}>{item.name}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', flex: 1 }}>
                    {item.description || 'Deskripsi spesifik belum ditambahkan oleh peternak.'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '0.25rem' }}>Estimasi Harga</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Info Section */}
      <section id="contact" style={{ width: '100%', padding: '5rem 2rem', background: 'rgba(15, 23, 42, 0.8)', borderTop: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#f8fafc' }}>Hubungi Penjual</h2>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '2rem' }}>
              Tertarik dengan koleksi ternak kami? Silakan hubungi kami untuk informasi lebih detail, negosiasi, atau mengatur jadwal kunjungan ke peternakan.
            </p>
          </div>

          <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nama Peternak</span>
              <span style={{ fontSize: '1.25rem', color: '#f8fafc', marginTop: '0.25rem' }}>{sellerInfo.name}</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WhatsApp / Telepon</span>
              <span style={{ fontSize: '1.25rem', color: '#f8fafc', marginTop: '0.25rem' }}>{sellerInfo.wa}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</span>
              <span style={{ fontSize: '1.25rem', color: '#f8fafc', marginTop: '0.25rem' }}>{sellerInfo.email}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alamat Peternakan</span>
              <span style={{ fontSize: '1rem', color: '#94a3b8', marginTop: '0.25rem', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                {sellerInfo.address}
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
