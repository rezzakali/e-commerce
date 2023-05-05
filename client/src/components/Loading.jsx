import React from 'react';

function Loading() {
  return (
    <tr className="d-flex justify-content-center">
      <td className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </td>
    </tr>
  );
}

export default Loading;
