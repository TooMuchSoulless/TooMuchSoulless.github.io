import { useContext, createContext, ReactNode } from 'react';
import Post from '../components/Post';
import {Outlet, Link} from "react-router-dom";

const BlogContext = createContext("");

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-screen-xl mx-auto p-4 bg-gray-100">
            <Header />
            <main className="mt-8">
                {children}
            </main>
        </div>
    ); 
}

function BlogInfo() {
    const blogName = useContext(BlogContext);
    return <span className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to {blogName}!</span>;
}

function Header() {
    return (
        <div className="border-b-2 border-gray-900 mb-5 flex justify-between items-center text-sm bg-purple-600 text-white py-4">
            <div className="text-indigo-600 flex items-center pb-2 pr-2 uppercase">
                <a href="#" className="font-semibold inline-block ml-3">
                    <BlogInfo />
                </a>
            </div>
            <Link to={`blog`} className="text-1xl text-gray-900 hover:text-white">See All</Link>
            <Link to={`about`} className="text-1xl text-gray-900 hover:text-white">About</Link>
            <Link to={`contact`} className="text-1xl text-gray-900 hover:text-white">Contact</Link>
            <Link to={`chat`} className="text-1xl text-gray-900 hover:text-white last-link">Chat</Link>
        </div>
    );
}  

function Blog() {
    const blogName = "Your Favourite Blog";
    return (
        <BlogContext.Provider value={blogName}>
            <Layout>
                <Post />
                <Outlet />
            </Layout>
        </BlogContext.Provider>
    );
}

export default Blog;
