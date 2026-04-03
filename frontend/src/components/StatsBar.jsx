export default function StatsBar({ stats }) {
  if (!stats) return null
  const items = [
    { label: 'Total',      value: stats.total,                        color: 'text-gray-800' },
    { label: 'Applied',    value: stats.by_status?.Applied || 0,      color: 'text-blue-600' },
    { label: 'Interviews', value: stats.by_status?.Interviewed || 0,  color: 'text-purple-600' },
    { label: 'Offers',     value: stats.by_status?.Offer || 0,        color: 'text-green-600' },
    { label: 'Rejected',   value: stats.by_status?.Rejected || 0,     color: 'text-red-600' },
    { label: 'Response %', value: `${stats.response_rate}%`,          color: 'text-indigo-600' },
  ]
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
      {items.map(({ label, value, color }) => (
        <div key={label} className="bg-white rounded-lg shadow p-4 text-center">
          <div className={`text-2xl font-bold ${color}`}>{value}</div>
          <div className="text-xs text-gray-500 mt-1">{label}</div>
        </div>
      ))}
    </div>
  )
}
