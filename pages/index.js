/**
 * Landing Page - Next.js Probe Application
 * 
 * This is the entry point of our probe application. It provides navigation
 * to test different Next.js rendering modes.
 */

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        color: '#333'
      }}>
        Next.js Probe Application
      </h1>
      
      <p style={{
        fontSize: '1.2rem',
        marginBottom: '2rem',
        color: '#666',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Test your Node.js PaaS platform's handling of different Next.js rendering modes
      </p>

      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Link to SSR test page */}
        <Link href="/ssr" style={{
          display: 'block',
          padding: '20px 40px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: '600',
          transition: 'background-color 0.2s',
          textAlign: 'center',
          minWidth: '200px'
        }}>
          Test SSR
          <div style={{
            fontSize: '0.9rem',
            fontWeight: 'normal',
            marginTop: '8px',
            opacity: '0.9'
          }}>
            Server-Side Rendering
          </div>
        </Link>

        {/* Link to ISR test page */}
        <Link href="/isr" style={{
          display: 'block',
          padding: '20px 40px',
          backgroundColor: '#10b981',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: '600',
          transition: 'background-color 0.2s',
          textAlign: 'center',
          minWidth: '200px'
        }}>
          Test ISR
          <div style={{
            fontSize: '0.9rem',
            fontWeight: 'normal',
            marginTop: '8px',
            opacity: '0.9'
          }}>
            Incremental Static Regeneration
          </div>
        </Link>
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: '700px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#333' }}>
          How to Use This Probe:
        </h2>
        <ul style={{ color: '#666', lineHeight: '1.8' }}>
          <li>
            <strong>SSR Test:</strong> Renders on every request. The timestamp should change with each page refresh.
          </li>
          <li>
            <strong>ISR Test:</strong> Cached and revalidated every 10 seconds. The timestamp will stay the same for 10 seconds.
          </li>
          <li>
            Both pages display <code>process.env.HOSTNAME</code> to identify which container/pod is serving the request.
          </li>
        </ul>
      </div>
    </div>
  );
}
