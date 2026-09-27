import { useState } from 'react';

export default function GeminiAssistant() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setResponse(data.text);
    } catch (error) {
      setResponse('Error: Could not connect to the financial modeling engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #333', borderRadius: '8px', backgroundColor: '#111' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Ask the AI Planner</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question about asset allocation, tax efficiency, or withdrawal rates..."
          style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#000', color: '#fff', fontFamily: 'inherit' }}
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: '#ededed', color: '#000', border: 'none', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Analyzing...' : 'Ask Gemini'}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#222', borderRadius: '4px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
          {response}
        </div>
      )}
    </div>
  );
}
