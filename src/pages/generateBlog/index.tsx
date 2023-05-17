import React from 'react';
import generateBlog from '../../utils/generateBlogFromYoutube';

function App() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={ async () => {
          await generateBlog('https://www.youtube.com/watch?v=2G_mWfG0DZE');
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
