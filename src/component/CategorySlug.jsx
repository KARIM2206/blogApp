import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context/Provider';
import { useParams } from 'react-router-dom';
// import axios from 'axios'; // غير مستخدم حالياً
import { motion } from 'framer-motion';
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}
const CategorySlug = () => {
  const { slug } = useParams();
  const { postItem } = useContext(AuthContext);
  const [categoryName, setCategoryName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const base_Url = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001";

  // تم تعطيل هذا الجزء لعدم استخدام API حالياً
  /*
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts?limit=${limit}&page=${currentPage}&categorySlug=${slug}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json(); 

        if (data) {
          setPosts(data.data.posts);
          if (data.length > 0) {
            setCategoryName(data[0]?.categories[0]?.category?.name || "");
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  */

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
    // يمكنك إضافة المزيد
  ];

  const trimContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    const trimmed = text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
    return trimmed;
  };

  return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
    <div className='flex flex-col px-4 py-6 gap-6'>
      <h1 className="text-4xl font-bold text-center text-black mb-4">Posts in {slug}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3    gap-6">
        {allPosts.map((e) => (
          <div key={e.id} className="rounded-2xl   shadow-md bg-white
           hover:shadow-xl transition-shadow duration-300">
            <div className=' h-48 w-full overflow-hidden'>
                <div className="relative h-48 w-full   hover:scale-110 transition-all 
                duration-300  ">
              <img
                src={e.cover}
                alt="Post Cover"
                className="w-full h-full  object-cover "
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 
             hover:opacity-100 transition duration-300" />
            </div>
</div>
            <div className="flex flex-col gap-3 p-4 bg-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-blue-800 font-semibold">{e.author.username}</span>
                <span className="text-sm text-gray-500">{new Date(e.author.createdAt).toLocaleDateString()}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-800">{e.title}</h2>
              <p className="text-gray-600">{trimContent(e.content)}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {e.categories.map((c) => (
                  <span key={c.category.id} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                    {c.category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
 </motion.div> );
};

export default CategorySlug;
