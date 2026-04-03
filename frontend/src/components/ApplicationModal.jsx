import { useState, useEffect } from 'react'

const STATUSES = ['Applied','OA Sent','OA Done','Interview Scheduled','Interviewed','Offer','Rejected','Ghosted']
const DOMAINS  = ['SE','DA','DE','BIE','BA']

export default function ApplicationModal({ onClose, onSave, existing }) {
  const [form, setForm] = useState({
    company: '', role: '', domain: 'SE', status: 'Applied', location: '', notes: ''
  })

  useEffect(() => { if (existing) setForm(existing) }, [existing])

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">{existing ? 'Edit' : 'Add'} Application</h2>
        <div className="space-y-3">
          {[['company','Company'],['role','Role Title'],['location','Location']].map(([name, label]) => (
            <div key={name}>
              <label className="text-sm text-gray-600">{label}</label>
              <input name={name} value={form[name]} onChange={handle}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Domain</label>
              <select name="domain" value={form.domain} onChange={handle}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                {DOMAINS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <select name="status" value={form.status} onChange={handle}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handle} rows={2}
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Save</button>
        </div>
      </div>
    </div>
  )
}
