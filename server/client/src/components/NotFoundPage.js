import React from 'react';

const NotFoundPage = () => (
  <div className="center" style={{ marginTop: '20px' }}>
    <h2 style={{ color: 'white' }}>Unauthorized. Please login</h2>,
    <button
      className="btn waves-effect waves-light blue"
      onClick={() => {
        window.location.href = '/';
      }}>
      Go home
    </button>
  </div>
);

export default NotFoundPage;
