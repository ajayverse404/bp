export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 40" {...props}>
      {/* BinaryPrototype Icon - Binary/Code representation */}
      <circle cx="20" cy="20" r="18" fill="#2563EB" />
      <rect x="12" y="12" width="4" height="4" fill="white" />
      <rect x="18" y="12" width="4" height="4" fill="white" />
      <rect x="24" y="12" width="4" height="4" fill="white" />
      <rect x="12" y="18" width="4" height="4" fill="white" />
      <rect x="24" y="18" width="4" height="4" fill="white" />
      <rect x="12" y="24" width="4" height="4" fill="white" />
      <rect x="18" y="24" width="4" height="4" fill="white" />
      <rect x="24" y="24" width="4" height="4" fill="white" />
      
      {/* BinaryPrototypes Text */}
      <text x="50" y="28" fontSize="20" fontWeight="600" fill="#0F172A" fontFamily="system-ui, -apple-system, sans-serif">
        BinaryPrototypes
      </text>
    </svg>
  )
}
