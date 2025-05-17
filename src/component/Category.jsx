import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React from 'react'
import { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

// بيانات الكاتجوري (ممكن تجيبها من API لو 
// حابب)
const categories = [
  {
    id: 1,
    name: 'Web Development',
    description: 'Learn how to build modern websites and web apps.',
    image: '/images/web-develop.jpeg',
  },
  {
    id: 2,
    name: 'Graphic Design',
    description: 'Master the art of visual communication.',
    image: '/images/design.jpeg',
  },
  {
    id: 3,
    name: 'Digital Marketing',
    description: 'Grow your audience with smart marketing strategies.',
    image: '/images/markting.jpeg',
  },
  {
    id: 4,
    name: 'Programming',
    description: 'Code like a pro in multiple languages.',
    image: '/images/programing.jpeg',
  },
]

const Category = () => {

    const changeHandler=(e)=>{
        console.log(e)
        setInterval(()=>{
            console.log(e)
        })
    }
  return (
    <div className="px-6 py-12 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Explore Categories</h2>
      
      <Swiper
        spaceBetween={20}
        modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
 
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      autoplay={{
        delay: 3000,
        disableOnInteraction:false
      }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div
              className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg group "
              style={{
                // backgroundImage: `url(${cat.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
                <div className='w-full h-full hover:scale-110 transition-all  
                 duration-500'>  <div className="bg-black/30 hover:bg-black/50 absolute w-full h-full"></div>
                    <img src={`${cat.image}`} alt={`${cat.name}`} className='w-full h-full object-cover ' /></div>
            

              <div className="absolute bottom-[-40px] p-6 z-10 text-white hover:bottom-0 transition-all duration-500 ">
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="mt-2 text-sm text-gray-200 ">{cat.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Category
