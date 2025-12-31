/**
 * Incremental Static Regeneration (ISR) Test Page
 * 
 * This page demonstrates ISR using Next.js's getStaticProps with revalidate.
 * 
 * HOW ISR WORKS:
 * - During build time (npm run build), Next.js generates a static HTML page
 * - The page is served from cache (super fast!)
 * - After the revalidate time expires (10 seconds in this case), the NEXT request triggers regeneration
 * - While regenerating in the background, the stale cached version is still served (stale-while-revalidate)
 * - Once regeneration completes, the new version replaces the cached version
 * 
 * WHY THIS IS IMPORTANT FOR YOUR PAAS:
 * - Tests that your platform can serve static files efficiently
 * - Verifies that background regeneration works correctly
 * - Confirms that the platform can handle the revalidation timing mechanism
 * - Proves that your platform supports Next.js's hybrid static/dynamic approach
 */

import Link from 'next/link';

/**
 * getStaticProps - This function runs at BUILD TIME and during REVALIDATION
 * 
 * @returns {object} An object with 'props' and 'revalidate' keys
 * 
 * WHEN IT RUNS:
 * - At build time (npm run build) - generates initial static page
 * - In production, after revalidate time expires on the next request
 * - Runs on the server, never in the browser
 * 
 * THE REVALIDATE PROPERTY:
 * - revalidate: 10 means "keep this page cached for 10 seconds"
 * - After 10 seconds, the next visitor triggers a background regeneration
 * - That visitor still sees the old cached version (instant load!)
 * - Subsequent visitors see the updated version
 * 
 * HOW TO TEST:
 * 1. Refresh the page multiple times quickly - you'll see the SAME timestamp
 * 2. Wait 10+ seconds and refresh - still the same timestamp (you're seeing cached version)
 * 3. Refresh again - NOW you'll see a new timestamp (regeneration happened in background)
 */
export async function getStaticProps() {
  // Get the current time when this page is being generated/regenerated
  // This timestamp will "freeze" for 10 seconds at a time
  const renderTime = new Date().toISOString();
  
  // Get the hostname from environment variables
  // This shows which server/container built or regenerated the page
  const hostname = process.env.HOSTNAME || 'Not set (check your platform configuration)';
  
  // Calculate when the next revalidation is eligible
  // This is just for display purposes to help with testing
  const nextRevalidation = new Date(Date.now() + 10000).toISOString();
  
  // Return the props and revalidate configuration
  return {
    props: {
      renderTime: renderTime,
      hostname: hostname,
      nextRevalidation: nextRevalidation,
    },
    // CRITICAL: This tells Next.js to keep the page cached for 10 seconds
    // After 10 seconds, trigger regeneration on the next request
    revalidate: 10, // In seconds
  };
}

/**
 * ISRPage Component - The actual page that gets rendered
 * 
 * @param {object} props - The props returned from getStaticProps
 * @param {string} props.renderTime - The timestamp when the page was last generated
 * @param {string} props.hostname - The hostname that generated this page version
 * @param {string} props.nextRevalidation - Estimated time for next revalidation eligibility
 */
export default function ISRPage({ renderTime, hostname, nextRevalidation }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0fdf4',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: '#10b981',
        color: 'white',
        padding: '16px 32px',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>
          ISR Test Page
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
          backgroundColor: '#d1fae5',
          border: '2px solid #10b981',
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
              backgroundColor: '#10b981',
              borderRadius: '50%'
            }}></div>
            <strong style={{ color: '#059669' }}>Incremental Static Regeneration</strong>
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: '#047857'
          }}>
            ⚡ This page is cached for 10 seconds, then regenerated in the background
          </p>
        </div>

        {/* Render Time Display */}
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
            Page Generation Time:
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
            {renderTime}
          </div>
          <p style={{
            fontSize: '0.85rem',
            color: '#6b7280',
            marginTop: '8px',
            fontStyle: 'italic'
          }}>
            💡 This timestamp stays frozen for 10 seconds between updates
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
            Server Hostname (Pod/Container that built this version):
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
            🖥️ This shows which server generated this cached version
          </p>
        </div>

        {/* Next Revalidation Time Display */}
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
            Next Revalidation Eligible After:
          </label>
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '6px',
            padding: '12px 16px',
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            color: '#78350f'
          }}>
            {nextRevalidation}
          </div>
          <p style={{
            fontSize: '0.85rem',
            color: '#6b7280',
            marginTop: '8px',
            fontStyle: 'italic'
          }}>
            ⏱️ After this time, the next request will trigger background regeneration
          </p>
        </div>

        {/* Explanation Section */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            margin: '0 0 8px 0',
            fontSize: '1rem',
            color: '#1e40af'
          }}>
            How ISR Works:
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            fontSize: '0.9rem',
            color: '#1e3a8a',
            lineHeight: '1.6'
          }}>
            <li>Page is pre-built at build time and served from cache (lightning fast!)</li>
            <li>Cache is valid for <strong>10 seconds</strong> (the revalidate time)</li>
            <li>After 10 seconds, the next visitor triggers background regeneration</li>
            <li>That visitor still gets the cached version instantly</li>
            <li>Subsequent visitors get the updated version</li>
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
          <Link href="/ssr" style={{
            flex: '1',
            padding: '12px 24px',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            Try SSR Test →
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
          🧪 Testing ISR on Your PaaS:
        </h3>
        <ol style={{ color: '#666', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
          <li><strong>Initial test:</strong> Refresh multiple times quickly - timestamp should NOT change</li>
          <li><strong>Wait 10 seconds</strong> and refresh once - you'll still see the OLD timestamp</li>
          <li><strong>Refresh again</strong> (after step 2) - now you should see a NEW timestamp</li>
          <li>The background regeneration happened between your 2nd and 3rd refresh</li>
          <li>Repeat the test to verify consistent 10-second caching behavior</li>
        </ol>
        
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#fef3c7',
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: '#78350f'
        }}>
          <strong>💡 Pro Tip:</strong> ISR is perfect for content that changes occasionally but doesn't need
          to be real-time. It combines the speed of static pages with the freshness of dynamic content.
        </div>
      </div>
    </div>
  );
}
