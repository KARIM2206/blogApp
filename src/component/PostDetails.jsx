import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateComment from './CreateComment';
import Comments from './Comments';
import { motion } from 'framer-motion';
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}
const PostDetails = () => {
  const { id } = useParams();

  const [tags, setTags] = useState([]);

  const base_Url = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001";

  // const updateTrigger = () => {
  //   setRefreshTrigger(prev => prev + 1);
  // };

  // API call commented out - using static data instead
  /*
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${base_Url}/api/v1/posts/${id}`);
        const data = await response.json();

        if (data.data) {
          const tagsArray = Array.isArray(data.data.tags)
            ? data.data.tags
            : JSON.parse(data.data.tags);
          setTags(tagsArray);
          setPosts([data.data]);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPosts();
  }, [id]);
  */

  // بيانات تجريبية
  const allPosts = [
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
    }
  ];

  const trimContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    const trimmed = text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
    return trimmed;
  };

  return (
    <div className="flex flex-col px-[12px]">
         <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
      <div className="w-full px-6 md:px-12 bg-gray-100 py-8">
        {allPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
            <img
              src={`${post.cover}`}
              alt="post cover"
              className="w-full h-56 object-cover rounded-t-xl"
            />

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sky-800 font-semibold">{post.author.username}</p>
                  <p className="text-gray-500 text-sm">{new Date(post.author.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.length > 0 ? (
                    tags.map((tag, key) => (
                      <div
                        key={key}
                        className="bg-gray-200 text-sm text-gray-800 py-1 px-3 rounded-full"
                      >
                        {tag}
                      </div>
                    ))
                  ) : (
                    post.categories.map((c) => (
                      <div
                        key={c.category.id}
                        className="bg-gray-200 text-sm text-gray-800 py-1 px-3 rounded-full"
                      >
                        {c.category.name}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
              <p className="text-gray-700 text-base mb-4">{trimContent(post.content)}</p>
            </div>
          </div>
        ))}
      </div>
</motion.div>
      {/* التعليقات */}
   <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
      <div className="flex flex-col px-6 md:px-12">
        <Comments postId={id}  />
        <CreateComment postId={id}  />
      </div>
      </motion.div>
    </div>
  );
};

export default PostDetails;
