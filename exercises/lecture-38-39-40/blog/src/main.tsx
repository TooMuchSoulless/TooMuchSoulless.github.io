import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Blog from './pages/Blog.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import PostItem from './pages/PostItem.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
    children: [
      {
        path: "blog",
        element: <PostItem />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
