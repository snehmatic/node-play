/**
 * Server-Side Rendering (SSR) Test Page
 * 
 * This page demonstrates SSR using Next.js's getServerSideProps function.
 * 
 * HOW SSR WORKS:
 * - Every time a user requests this page, Next.js runs getServerSideProps on the server
 * - The function executes BEFORE the page component renders
 * - The returned props are passed to the page component
 * - The entire page is rendered to HTML on the server and sent to the client
 * - This happens on EVERY REQUEST (no caching by default)
 * 
 * WHY THIS IS IMPORTANT FOR YOUR PAAS:
 * - Tests that your platform can execute Node.js code on every request
 * - Verifies that environment variables are accessible
 * - Confirms that the server can handle dynamic, per-request rendering
 */

import Link from 'next/link';

/**
 * getServerSideProps - This function runs on the SERVER for every request
 * 
 * @returns {object} An object with a 'props' key containing data to pass to the page component
 * 
 * WHEN IT RUNS:
 * - On every page request (both initial page load and client-side navigation)
 * - Always runs on the server, never in the browser
 * 
 * WHAT IT DOES:
 * - Fetches the current server time (proves the code runs on each request)
 * - Reads environment variables (proves server-side execution context)
 * - Returns data that will be injected as props into the SSRPage component below
 */
export async function getServerSideProps() {
  // Get the current time on the server
  // This will be different on each request, proving SSR is working
  const currentTime = new Date().toISOString();
  
  // Get the hostname from environment variables
  // In a Kubernetes/container environment, this identifies which pod is serving the request
  // If not set, we provide a fallback message
  const hostname = process.env.HOSTNAME || 'Not set (check your platform configuration)';
  
  // Return the props object
  // These values will be passed to the SSRPage component below as props
  return {
    props: {
      serverTime: currentTime,
      hostname: hostname,
    },
  };
}

/**
 * SSRPage Component - The actual page that gets rendered
 * 
 * @param {object} props - The props returned from getServerSideProps
 * @param {string} props.serverTime - The timestamp when the page was rendered
 * @param {string} props.hostname - The hostname of the server/container that rendered this page
 */
export default function SSRPage({ serverTime, hostname }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f9ff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: '#0070f3',
        color: 'white',
        padding: '16px 32px',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>
          SSR Test Page
        </h1>
      </div>

      {/* Main Content Card */}
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%'
      }}>
        {/* Status Indicator */}
        <div style={{
          backgroundColor: '#dbeafe',
          border: '2px solid #0070f3',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#0070f3',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            <strong style={{ color: '#0070f3' }}>Live Server-Side Rendering</strong>
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#1e40af'
          }}>
            ⚡ This page is rendered fresh on the server with EVERY request
          </p>
        </div>

        {/* Server Time Display */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#4b5563',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Server Render Time:
          </label>
          <div style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '12px 16px',
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            color: '#111827'
          }}>
            {serverTime}
          </div>
          <p style={{
            fontSize: '0.85rem',
            color: '#6b7280',
            marginTop: '8px',
            fontStyle: 'italic'
          }}>
            💡 Refresh this page - the time should update immediately
          </p>
        </div>

        {/* Hostname Display */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#4b5563',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Server Hostname (Pod/Container ID):
          </label>
          <div style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '12px 16px',
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            color: '#111827',
            wordBreak: 'break-all'
          }}>
            {hostname}
          </div>
          <p style={{
            fontSize: '0.85rem',
            color: '#6b7280',
            marginTop: '8px',
            fontStyle: 'italic'
          }}>
            🖥️ This identifies which server/container handled the request
          </p>
        </div>

        {/* Explanation Section */}
        <div style={{
          backgroundColor: '#fffbeb',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            margin: '0 0 8px 0',
            fontSize: '1rem',
            color: '#92400e'
          }}>
            How SSR Works:
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            fontSize: '0.9rem',
            color: '#78350f',
            lineHeight: '1.6'
          }}>
            <li>The server executes <code>getServerSideProps()</code> on every request</li>
            <li>Fresh data is fetched and the page is rendered to HTML</li>
            <li>The complete HTML is sent to the browser</li>
            <li><strong>No caching</strong> - perfect for real-time data</li>
          </ul>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <Link href="/" style={{
            flex: '1',
            padding: '12px 24px',
            backgroundColor: '#6b7280',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            ← Back to Home
          </Link>
          <Link href="/isr" style={{
            flex: '1',
            padding: '12px 24px',
            backgroundColor: '#10b981',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            Try ISR Test →
          </Link>
        </div>
      </div>

      {/* Testing Instructions */}
      <div style={{
        marginTop: '2rem',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#333' }}>
          🧪 Testing Checklist for PaaS:
        </h3>
        <ol style={{ color: '#666', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
          <li>Refresh the page multiple times - timestamp should always update</li>
          <li>Verify the hostname is displayed correctly (set HOSTNAME env var in your platform)</li>
          <li>If you have multiple replicas/pods, the hostname should vary between requests</li>
          <li>Check that the page loads quickly (SSR should be efficient)</li>
        </ol>
      </div>
    </div>
  );
}
