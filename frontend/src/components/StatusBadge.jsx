const colors = {
  'Applied':              'bg-blue-100 text-blue-800',
  'OA Sent':              'bg-yellow-100 text-yellow-800',
  'OA Done':              'bg-yellow-200 text-yellow-900',
  'Interview Scheduled':  'bg-purple-100 text-purple-800',
  'Interviewed':          'bg-purple-200 text-purple-900',
  'Offer':                'bg-green-100 text-green-800',
  'Rejected':             'bg-red-100 text-red-800',
  'Ghosted':              'bg-gray-100 text-gray-600',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}
