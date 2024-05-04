import { createContext, ReactNode } from 'react';
import Post2 from '../components/Post-2';

const BlogContext = createContext("");

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-screen-xl mx-auto bg-gray-100">
            <main className="mt-8">
                {children}
            </main>
        </div>
    ); 
}

function PostItem() {
    const blogName = "Your Favourite Blog";
    return (
        <BlogContext.Provider value={blogName}>
            <Layout>
                <Post2 />
            </Layout>
        </BlogContext.Provider>
    );
}

export default PostItem;