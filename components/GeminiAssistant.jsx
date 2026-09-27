import { useState } from 'react';

export default function GeminiAssistant() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!res.ok) throw new Error('Could not connect to the financial modeling engine.');
      
      const data = await res.json();
      setResponse(data.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#22c55e',
          borderRadius: '50%',
          marginRight: '8px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }} />
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Ask the AI Planner</h3>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question about asset allocation, tax efficiency, or withdrawal rates..."
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #4b5563',
            backgroundColor: 'transparent',
            color: 'inherit',
            fontFamily: 'inherit',
            minHeight: '80px',
            resize: 'vertical'
          }}
          required
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            alignSelf: 'flex-start',
            padding: '0.5rem 1rem',
            backgroundColor: '#ffffff',
            color: '#000000',
            fontWeight: 600,
            borderRadius: '0.375rem',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          Ask Gemini
        </button>
      </form>

      {error && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', color: '#ef4444' }}>
          {error}
        </div>
      )}

      {isLoading && (
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ height: '0.875rem', backgroundColor: 'rgba(156, 163, 175, 0.3)', borderRadius: '0.25rem', width: '100%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div style={{ height: '0.875rem', backgroundColor: 'rgba(156, 163, 175, 0.3)', borderRadius: '0.25rem', width: '92%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div style={{ height: '0.875rem', backgroundColor: 'rgba(156, 163, 175, 0.3)', borderRadius: '0.25rem', width: '80%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        </div>
      )}

      {response && !isLoading && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', borderTop: '1px solid rgba(156, 163, 175, 0.2)', whiteSpace: 'pre-wrap' }}>
          {response}
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
