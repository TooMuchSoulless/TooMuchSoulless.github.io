//import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">About Us</h1>
        <div className="flex flex-wrap justify-between mb-12">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">Discover Our Unique Accessories</h2>
              <p className="text-lg mb-8 text-gray-700">
                At our store, we offer a wide range of unique accessories that are sure to add a touch of style to your everyday life. Whether you're looking for trendy jewelry, fashionable bags, or stylish hats, we have something for everyone.
              </p>
            </div>
            <p className="text-lg mb-8 text-gray-700">
              Our accessories are carefully curated to ensure quality and uniqueness. We believe that accessories are not just items, but expressions of personality and individuality. That's why we strive to bring you the most unique and stylish pieces to help you stand out from the crowd.
            </p>
            <p className="text-lg text-gray-700">
              Explore our collection today and discover the perfect accessories to complement your style!
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src="https://toomuchsoulless.github.io/images/main-side.jpg" alt="Accessories" className="rounded-lg shadow-xl mb-4 md:mb-0" />
          </div>
        </div>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Benefits</h2>
        <div className="flex justify-between">
          <div className="w-1/3 flex flex-col items-center">
            <img src="https://toomuchsoulless.github.io/images/monitor.png" alt="Free Shipping" className="shadow-xl mb-4" width="54" height="54" />
            <h3 className="text-lg font-semibold mb-2 text-purple-600">Free Shipping</h3>
            <p className="text-gray-700">Enjoy free shipping on all orders</p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <img src="https://toomuchsoulless.github.io/images/gift.png" alt="Gift Package" className="shadow-xl mb-4" width="54" height="54" />
            <h3 className="text-lg font-semibold mb-2 text-purple-600">Gift Package</h3>
            <p className="text-gray-700">All orders come beautifully packaged</p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <img src="https://toomuchsoulless.github.io/images/express-delivery.png" alt="Fast Delivery" className="shadow-xl mb-4" width="54" height="54" />
            <h3 className="text-lg font-semibold mb-2 text-purple-600">Fast Delivery</h3>
            <p className="text-gray-700">Get your order delivered quickly</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;