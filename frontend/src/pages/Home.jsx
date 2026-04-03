import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import StatsBar from '../components/StatsBar'
import ApplicationTable from '../components/ApplicationTable'
import ApplicationModal from '../components/ApplicationModal'

const DOMAINS = ['All','SE','DA','DE','BIE','BA']

export default function Home() {
  const [apps, setApps] = useState([])
  const [stats, setStats] = useState(null)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState('All')
  const { logout } = useAuth()
  const navigate = useNavigate()

  const load = useCallback(async () => {
    const [a, s] = await Promise.all([api.get('/applications/'), api.get('/applications/stats')])
    setApps(a.data)
    setStats(s.data)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async (form) => {
    if (editing) {
      await api.put(`/applications/${editing.id}`, form)
    } else {
      await api.post('/applications/', form)
    }
    setModal(false)
    setEditing(null)
    load()
  }

  const del = async (id) => {
    if (confirm('Delete this application?')) {
      await api.delete(`/applications/${id}`)
      load()
    }
  }

  const openEdit = (app) => { setEditing(app); setModal(true) }
  const openAdd  = () => { setEditing(null); setModal(true) }

  const filtered = filter === 'All' ? apps : apps.filter(a => a.domain === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-indigo-600">Job Tracker</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{apps.length} applications</span>
          <button onClick={() => { logout(); navigate('/login') }}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors">Logout</button>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <StatsBar stats={stats} />
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {DOMAINS.map(d => (
              <button key={d} onClick={() => setFilter(d)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === d ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}>
                {d}
              </button>
            ))}
          </div>
          <button onClick={openAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            + Add Application
          </button>
        </div>
        <ApplicationTable apps={filtered} onEdit={openEdit} onDelete={del} />
      </div>
      {modal && <ApplicationModal onClose={() => { setModal(false); setEditing(null) }} onSave={save} existing={editing} />}
    </div>
  )
}
