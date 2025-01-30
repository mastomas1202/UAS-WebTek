'use client'

import { useState } from 'react'
import Layout from '../dashboard/components/Layout'
import { pengguna as dataPengguna } from '../../lib/contohData'

export default function Pengguna() {
  const [pengguna, setPengguna] = useState(dataPengguna)
  const [formData, setFormData] = useState({ id: 0, nama: '', email: '' })
  const [editMode, setEditMode] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editMode) {
      setPengguna(prev => prev.map(p => p.id === formData.id ? formData : p))
    } else {
      setPengguna(prev => [...prev, { ...formData, id: Date.now() }])
    }
    setFormData({ id: 0, nama: '', email: '' })
    setEditMode(false)
  }

  const handleEdit = (user: typeof formData) => {
    setFormData(user)
    setEditMode(true)
  }

  const handleDelete = (id: number) => {
    setPengguna(prev => prev.filter(p => p.id !== id))
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Manajemen Pengguna</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            placeholder="Nama Pengguna"
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editMode ? 'Update Pengguna' : 'Tambah Pengguna'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pengguna.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{user.nama}</h2>
            <p className="mb-2">{user.email}</p>
            <div className="mt-4">
              <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

