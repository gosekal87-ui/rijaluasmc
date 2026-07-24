'use client';
import { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  createdAt: string;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ id: '', name: '', description: '', price: '', imageFile: null as File | null });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/items');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `/api/items/${formData.id}` : '/api/items';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      let imageUrl = '';
      
      // Convert file to base64 if provided
      if (formData.imageFile) {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.imageFile!);
        });
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          imageUrl: imageUrl || undefined
        })
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ id: '', name: '', description: '', price: '', imageFile: null });
        setSearchQuery('');
        fetchItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: Product) => {
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      imageFile: null
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini?')) return;
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Manajemen Produk</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => { setShowForm(!showForm); setIsEditing(false); setFormData({ id: '', name: '', description: '', price: '', imageFile: null }); }}
        >
          {showForm ? 'Batal' : '+ Tambah Produk'}
        </button>
      </div>

      {showForm && (
        <div className="glass-panel animate-fade-in" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>{isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nama Produk</label>
                <input required type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Harga (Rp)</label>
                <input required type="number" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Deskripsi</label>
              <textarea className="input-field" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Gambar Produk (Opsional)</label>
              <input 
                type="file" 
                className="input-field" 
                accept="image/*"
                onChange={e => setFormData({...formData, imageFile: e.target.files?.[0] || null})} 
              />
              {formData.imageFile && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>File terpilih: {formData.imageFile.name}</p>}
            </div>
            <div style={{ alignSelf: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">Simpan Data</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <input 
          type="text"
          className="input-field"
          placeholder="Cari produk berdasarkan nama atau deskripsi..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ maxWidth: '100%' }}
        />
      </div>

      <div className="glass-panel table-container">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Memuat data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>{searchQuery ? 'Tidak ada produk yang sesuai dengan pencarian.' : 'Belum ada data produk.'}</td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '500' }}>{item.name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{item.description || '-'}</td>
                    <td>Rp {item.price.toLocaleString('id-ID')}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', marginRight: '0.5rem', padding: '0.5rem 1rem' }} onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn btn-danger" style={{ padding: '0.5rem 1rem' }} onClick={() => handleDelete(item.id)}>Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
