import React from 'react';
import { Link } from 'react-router';

export default function PageTwo() {
  return (
    <div>
      <p>This is a pretty boring page. It is here purely to test out React Router.</p>
      <p>I apologise for my lack of creativity on this page.</p>
      <p>Probably best to go back to <Link to="/page1">page one</Link>.</p>
    </div>
  );
}
