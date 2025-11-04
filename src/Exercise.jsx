import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";

function Exercise() {
  // State untuk menyimpan data posts dari API
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk fetch data saat component pertama kali dimuat
  useEffect(() => {
    // Fungsi untuk fetch data dari API
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Fetch data dari JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Cek apakah response berhasil
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        // Convert response ke JSON
        const data = await response.json();
        
        // Ambil hanya 20 posts pertama dan transform data
        const transformedData = data.slice(0, 20).map((post, index) => ({
          id: post.id,
          title: post.title,
          description: post.body,
          buttonColor: index === 2 ? "bg-red-600" : "bg-gray-700",
          highlighted: index === 8
        }));
        
        // Simpan data ke state
        setPosts(transformedData);
        setLoading(false);
        
        console.log('Data berhasil diambil:', transformedData);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); 

  // Tampilkan loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <div className="text-2xl font-semibold text-gray-700 mb-2">Loading...</div>
          <div className="text-gray-500">Mengambil data post cards...</div>
        </div>
      </div>
    );
  }

  // Tampilkan error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-2xl font-semibold text-special-red2 mb-2">Error!</div>
          <div className="text-gray-700 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Tampilkan data posts menggunakan PostCard component
  return (
    <div>
      <PostCard posts={posts} />
      
      <div className="text-center py-6 bg-gray-100">
        <p className="text-gray-600 text-lg">
          Total Posts: <span className="font-semibold text-gray-800">{posts.length}</span>
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Data dari JSONPlaceholder API
        </p>
      </div>
    </div>
  );
}

export default Exercise;