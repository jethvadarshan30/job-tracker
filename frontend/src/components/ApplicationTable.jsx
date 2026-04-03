import StatusBadge from './StatusBadge'

export default function ApplicationTable({ apps, onEdit, onDelete }) {
  if (!apps.length) return (
    <div className="text-center py-16 text-gray-400">No applications yet. Add your first one!</div>
  )
  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="w-full text-sm bg-white">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            {['Company','Role','Domain','Status','Location','Date','Actions'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {apps.map(app => (
            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-800">{app.company}</td>
              <td className="px-4 py-3 text-gray-600">{app.role}</td>
              <td className="px-4 py-3">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">{app.domain}</span>
              </td>
              <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
              <td className="px-4 py-3 text-gray-500">{app.location || '—'}</td>
              <td className="px-4 py-3 text-gray-400">{new Date(app.applied_date).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button onClick={() => onEdit(app)} className="text-indigo-600 hover:underline text-xs">Edit</button>
                  <button onClick={() => onDelete(app.id)} className="text-red-500 hover:underline text-xs">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
