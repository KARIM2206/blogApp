import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Context/Provider'

const Card = () => {
  const { renderPostPage } = useContext(AuthContext)
const [postItems, setPostItems] = useState([])
  const limit = 4 // لكل صفحة
  const [currentPage, setCurrentPage] = useState(1)

  const allPosts = [ // بيانات تجريبية
    {
      id: 1,
      cover: "/card/blog_pic_2.png",
      author: { username: "john_doe", createdAt: "2025-04-10T12:34:56Z" },
      title: "Complete React To-Do List",
      content: "Build a fully functional React to-do list app with add, edit, delete, and filter features.",
      categories: [
        { category: { id: 101, slug: "react", name: "React" } },
        { category: { id: 102, slug: "frontend", name: "Frontend" } },
      ],
    },
    {
      id: 2,
      cover: "/card/blog_pic_3.png",
      author: { username: "jane_smith", createdAt: "2025-03-25T09:15:22Z" },
      title: "Learn Node.js Basics",
      content: "Understand how to build backend services using Node.js, Express, and MongoDB.",
      categories: [
        { category: { id: 103, slug: "nodejs", name: "Node.js" } },
        { category: { id: 104, slug: "backend", name: "Backend" } },
      ],
    },
    {
      id: 3,
      cover: "/card/blog_pic_4.png",
      author: { username: "alice_wonder", createdAt: "2025-05-01T18:45:00Z" },
      title: "CSS Grid and Flexbox Guide",
      content: "Master modern layout techniques using CSS Grid and Flexbox for responsive designs.",
      categories: [
        { category: { id: 105, slug: "css", name: "CSS" } },
        { category: { id: 106, slug: "design", name: "Design" } },
      ],
    },
    {
      id: 4,
      cover: "/card/blog_pic_4.png",
      author: { username: "alice_wonder", createdAt: "2025-05-01T18:45:00Z" },
      title: "CSS Grid and Flexbox Guide",
      content: "Master modern layout techniques using CSS Grid and Flexbox for responsive designs.",
      categories: [
        { category: { id: 105, slug: "css", name: "CSS" } },
        { category: { id: 106, slug: "design", name: "Design" } },
      ],
    },
    {
      id: 5,
      cover: "/card/blog_pic_4.png",
      author: { username: "alice_wonder", createdAt: "2025-05-01T18:45:00Z" },
      title: "CSS Grid and Flexbox Guide",
      content: "Master modern layout techniques using CSS Grid and Flexbox for responsive designs.",
      categories: [
        { category: { id: 105, slug: "css", name: "CSS" } },
        { category: { id: 106, slug: "design", name: "Design" } },
      ],
    },
    {
      id: 6,
      cover: "/card/blog_pic_4.png",
      author: { username: "alice_wonder", createdAt: "2025-05-01T18:45:00Z" },
      title: "CSS Grid and Flexbox Guide",
      content: "Master modern layout techniques using CSS Grid and Flexbox for responsive designs.",
      categories: [
        { category: { id: 105, slug: "css", name: "CSS" } },
        { category: { id: 106, slug: "design", name: "Design" } },
      ],
    },
  ]

  // Pagination logic
  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit
useEffect(() => {
    if (postItems.length>=0) {
        setPostItems(allPosts.slice(startIndex, endIndex))  
    }
},[currentPage])


  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {postItems.map((e) => (
          <Link to={`/posts/${e.id}`} key={e.id}  className="rounded-lg overflow-hidden shadow-lg bg-white
           group transition-transform hover:-translate-y-1 duration-300">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={e.cover}
                alt="Post Cover"
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>

            <div className="flex flex-col gap-3 py-4 px-5">
              <div className="flex justify-between items-start">
                <p className="text-blue-700 font-bold">{e.author.username}</p>
                <div className="flex flex-col items-end gap-2 text-sm text-gray-500">
                  <p>{new Date(e.author.createdAt).toLocaleDateString()}</p>
                 
                  <div className="flex flex-wrap gap-2">
                    {e.categories.map((c) => (
                      <Link
                        to={`/category/${c.category.slug}`}
                        key={c.category.id}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs rounded transition"
                      >
                        {c.category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900">{e.title}</h2>

              <p className="text-sm text-gray-700">
                {e.content.length > 100 ? e.content.slice(0, 100) + '...' : e.content}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-6">
        <button
          className={`px-5 py-2 rounded-full font-bold text-white transition ${
            currentPage === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
          onClick={() => setCurrentPage((c) => c - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="text-xl font-medium">Page {currentPage}</span>

        <button
          className={`px-5 py-2 rounded-full font-bold text-white transition ${
            endIndex >= allPosts.length
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          onClick={() => setCurrentPage((c) => c + 1)}
          disabled={endIndex >= allPosts.length}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Card
