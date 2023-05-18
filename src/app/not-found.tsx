import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ padding: '72px 16px 16px', textAlign: 'center' }}>
      <h2>Error 404</h2>
      <h3>Page Not Found</h3>

      <p>Could not find requested resource</p>

      <Link href='/' style={{ color: '#3895ff' }}>
        Back to home
      </Link>
    </main>
  )
}
