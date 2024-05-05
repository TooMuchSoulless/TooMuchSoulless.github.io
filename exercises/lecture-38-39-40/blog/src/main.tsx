import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Blog from './pages/Blog'
import About from './pages/About'
import Contact from './pages/Contact'
import Chat from './pages/Chat'
import PostItem from './pages/PostItem'

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
      {
        path: "chat",
        element: <Chat />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
