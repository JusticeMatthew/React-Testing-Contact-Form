import React from 'react';

export default function Results({ data }) {
  return (
    <div>
      {data && (
        <pre aria-label='results' style={{ textAlign: 'left', color: 'white' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
