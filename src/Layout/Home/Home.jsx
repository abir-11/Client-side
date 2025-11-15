import React from 'react';
import hero1 from '../../assets/photo-1486754735734-325b5831c3ad.avif'
import hero2 from '../../assets/photo-1495107334309-fcf20504a5ab.avif'
import hero3 from '../../assets/premium_photo-1661811677567-6f14477aa1fa.avif'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';
import { Parallax, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Suspense } from 'react';
import KrishiCardPromise from './KrishiCardPromise';
import { FaLeaf, FaSeedling, FaCheck } from 'react-icons/fa';
import Marquee from "react-fast-marquee";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from 'react';
import { FaQuoteLeft, FaStar, FaRegCommentDots } from "react-icons/fa";
import { use } from 'react';
import { AuthContext } from './../../Context/AuthContext/AuthContext';
import { Link } from 'react-router';


const krishiPromise=fetch('http://localhost:3000/latest-krishiCard')
.then(res=>res.json());
const Home = () => {
    const {loading}=use(AuthContext)
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = [
    {
      question: "How can we protect organic farming?",
      answer:
        "We use natural fertilizers, avoid harmful pesticides, and focus on sustainable soil management. This ensures long-term productivity and healthy crops.",
    },
    {
      question: "What are the benefits of organic farming?",
      answer:
        "Organic farming improves soil fertility, reduces pollution, and produces healthier food with better taste and nutrition.",
    },
    {
      question: "How can users share their farming experience?",
      answer:
        "You can create an account and post your photos, videos, and stories directly on our blog section.",
    },
    {
      question: "Is this platform free to use?",
      answer:
        "Yes! Our platform is completely free for users who want to learn, share, and grow together.",
    },
  ];
         if (loading) {
    return <p className="text-center text-lg text-green-600">Loading...</p>;
  }

    return (
        <div className='min-h-screen'>
            {/* hero section */}
           <div>
             <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        speed={800}
        parallax={true}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false, 
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]} // Autoplay যোগ করা হয়েছে
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
         
          data-swiper-parallax="-23%"
        ></div>

        <SwiperSlide  style={{
             backgroundImage:
              `url(${hero2})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               height:'80vh'
        }}>
          <div className="w-full h-full bg-black/50 flex flex-col justify-center items-start text-start text-white px-6">
    
    <div
      className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
      data-swiper-parallax="-300"
    >
      Smart Farming Solutions
    </div>

    <div
      className="text-xl md:text-2xl font-medium mb-6 text-gray-200"
      data-swiper-parallax="-200"
    >
     Modernize Your Agriculture
    </div>

    <div
      className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-300"
      data-swiper-parallax="-100"
    >
      <p>
        Leverage IoT and data-driven technology to increase productivity, reduce waste, and monitor your crops in real-time for smarter, sustainable farming.
      </p>
    </div>
  </div>
        </SwiperSlide>

        <SwiperSlide  style={{
             backgroundImage:
              `url(${hero3})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               height:'80vh'
        }}>
        <div className="w-full h-full bg-black/50 flex flex-col justify-center items-start text-start text-white px-6">
    
    <div
      className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
      data-swiper-parallax="-300"
    >
     Farmers’ Marketplace
    </div>

    <div
      className="text-xl md:text-2xl font-medium mb-6 text-gray-200"
      data-swiper-parallax="-200"
    >
    Connect. Trade. Grow.
    </div>

    <div
      className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-300"
      data-swiper-parallax="-100"
    >
      <p>
       Empowering farmers to directly sell their products online, expand their reach, and get the best price for their hard work through our digital platform
      </p>
    </div>
  </div>
        </SwiperSlide>


        <SwiperSlide  style={{
             backgroundImage:
             `url(${hero1})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               height:'80vh'
        }}>
          <div className="w-full h-full bg-black/50 flex flex-col justify-center items-start text-start text-white px-6">
    
   
    <div
      className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
      data-swiper-parallax="-300"
    >
      Organic Crop Management
    </div>

    <div
      className="text-xl md:text-2xl font-medium mb-6 text-gray-200"
      data-swiper-parallax="-200"
    >
     Grow Naturally, Eat Healthy
    </div>

    <div
      className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-300"
      data-swiper-parallax="-100"
    >
      <p>
       Adopt eco-friendly methods to maintain soil fertility, avoid harmful chemicals, and ensure your produce stays fresh, healthy, and natural.
      </p>
    </div>
  </div>
        </SwiperSlide>

      </Swiper>
            </div> 

            {/* kirshi card section */}
            <div>
                
                 <KrishiCardPromise krishiPromise={krishiPromise}></KrishiCardPromise>
                
            </div>
                 <div className='flex justify-center mt-10 '>
                  <Link to='/allCrops'><button className="btn mx-auto btn-outline hover:scale-105 transition  ease-in-out border-green-800 bg-green-800 text-white">View All</button></Link>
                 </div>
            <div>
                  <section className="py-16 ">
      <div className="container mx-auto px-6 text-center">
        <p className="text-green-600 font-semibold mb-2 flex justify-center items-center gap-2">
          <FaLeaf /> WHY CHOOSE US
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
         The Agriculture Process
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto mb-12">
          We take part in many key international agricultural exhibitions, which gives us the opportunity to find new partners, learn new trends in the development of the agricultural sector, share experiences, present our products and the latest innovations.
        </p>

       <div className='flex  w-11/12 mx-auto justify-center flex-col items-center  mb-10'>
         <div className="flex flex-col gap-3 sm:flex-row   sm:justify-between  items-center mb-10">
         
          <div className="flex items-start gap-4">
            <div className="bg-green-600 text-white p-4 rounded-full text-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
              <FaSeedling />
            </div>
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-semibold hover:text-green-700">
                Sustainable & Regenerative Agriculture
              </h3>
              <p className="text-gray-600 mt-1">
                Solution for small and large businesses voluptatem accusantium doloremque laudantium
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-green-600 text-white p-4 rounded-full text-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
              <FaLeaf />
            </div>
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-semibold hover:text-green-700">
                Organic Agriculture & Food Production
              </h3>
              <p className="text-gray-600 mt-1">
                Solution for small and large businesses voluptatem accusantium doloremque laudantium
              </p>
            </div>
          </div>

           
        </div>
         <div>
               <ul className="text-left  space-y-2">
          <li className="flex items-center gap-2 text-gray-800">
            <FaCheck className="text-green-600" /> 100% Naturally
          </li>
          <li className="flex items-center gap-2 text-gray-800">
            <FaCheck className="text-green-600" /> Home Delivery Service
          </li>
          <li className="flex items-center gap-2 text-gray-800">
            <FaCheck className="text-green-600" /> High tech Processing
          </li>
          <li className="flex items-center gap-2 text-gray-800">
            <FaCheck className="text-green-600" /> Best Quality Product
          </li>
        </ul>
         </div>
       </div>
       
      </div>
    </section>
            </div>
        <div className="bg-gray-50 py-8 mb-20 shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        🌿 My Nature Blog Gallery
      </h2>

      <Marquee speed={50} pauseOnHover gradient={false}>
        <img
          src="https://i.ibb.co.com/5XXfCnwq/download-10.jpg"
          alt="Nature 1"
          className="mx-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300  overflow-hidden object-cover w-[300px] h-[180px] "
        />
        <img
          src="https://i.ibb.co.com/Lz008d2P/download-3.jpg"
          alt="Nature 2"
          className="mx-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300  overflow-hidden object-cover w-[300px] h-[180px]"
        />
        <img
          src="https://i.ibb.co.com/350HWHd1/download-4.jpg"
          alt="Nature 3"
          className="mx-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300  overflow-hidden object-cover w-[300px] h-[180px]"
        />
        <img
          src="https://i.ibb.co.com/GGLxWWm/download-6.jpg"
          alt="Nature 4"
          className="mx-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300  overflow-hidden object-cover w-[300px] h-[180px]"
        />
      </Marquee>
    </div>

        <div>
     <section className="bg-white py-16 px-6 md:px-16">
      <div className="flex flex-col-reverse lg:flex-row md:flex-col-reverse sm:flex-row gap-8 items-center">
       
        <div className="w-fit mx-auto">
    <img
      src="https://i.ibb.co.com/HTjvjtcP/h1-banner7.jpg"
      alt="Farmer"
      className="rounded-2xl shadow-lg "
    />
    
  </div>

       
        <div>
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            Do You Have Any Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our mission is to promote sustainable and eco-friendly farming.
            Here are some common questions our community often asks.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl border overflow-hidden transition-all duration-300 hover:bg-green-800 hover:text-white ${
                  openIndex === index ? "bg-green-800 text-white" : "bg-white"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="font-semibold">{faq.question}</span>
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
        </div>

        <div>
               <section className="py-16 px-6 md:px-12 bg-white">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-green-700 font-medium flex justify-center items-center gap-2">
          🌱 Our Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-green-900">
          What Our Customer Says
        </h2>
      </div>

      {/* Two Testimonials */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Testimonial 1 */}
        <div className="bg-red-50 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <FaQuoteLeft className="text-green-700 text-2xl mb-2" />
            <div className="flex text-yellow-500 mb-2">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Quality Food</h3>
            <p className="text-green-700 mb-4 text-sm">
              Sit amet consectetur adipiscing eiusmod tempor incididunt labore
              dolore magna aliqua. Suspendisse ultrices gravida aisu scom viverra
              accumsan facilisis.
            </p>
            <hr className="border-gray-300 mb-4" />
            <div className="flex items-center gap-3">
              <FaRegCommentDots className="text-green-700 text-xl" />
              <div>
                <h4 className="font-semibold text-green-900">Michelle Marry</h4>
                <p className="text-yellow-600 text-sm">Customer</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src="https://i.ibb.co.com/bgs9qZPC/blog-4.jpg"
              alt="Tomatoes"
              className="rounded-lg w-32 h-32 object-cover mx-auto md:mx-0"
            />
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-green-50 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <FaQuoteLeft className="text-green-700 text-2xl mb-2" />
            <div className="flex text-yellow-500 mb-2">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Quality Food</h3>
            <p className="text-green-700 mb-4 text-sm">
              Sit amet consectetur adipiscing eiusmod tempor incididunt labore
              dolore magna aliqua. Suspendisse ultrices gravida aisu scom viverra
              accumsan facilisis.
            </p>
            <hr className="border-gray-300 mb-4" />
            <div className="flex items-center gap-3">
              <FaRegCommentDots className="text-green-700 text-xl" />
              <div>
                <h4 className="font-semibold text-green-900">Sarah Albert</h4>
                <p className="text-yellow-600 text-sm">Customer</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src="https://i.ibb.co.com/hJW9YWQ0/blog-3.jpg"
              alt="Carrots"
              className="rounded-lg w-32 h-32 object-cover mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
        </div>
        </div>
    );
};

export default Home;