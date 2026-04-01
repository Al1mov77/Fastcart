import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Info</h2>

            <div className="flex items-start gap-4 mb-6">
              <div className="bg-red-500 text-white p-3 rounded-full">
                📞
              </div>
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-gray-500 text-sm">Available 24/7</p>
                <p className="text-gray-800 mt-1">+980611112222</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-500 text-white p-3 rounded-full">
                ✉️
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-500 text-sm">
                  We reply within 24 hours
                </p>
                <p className="text-gray-800 mt-1">
                  customer@exclusive.com
                </p>
                <p className="text-gray-800">
                  support@exclusive.com
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-400">
            We’re here to help you anytime
          </div>
        </div>

        <form className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
          <h2 className="text-2xl font-bold">Send Message</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <input
            type="tel"
            placeholder="Your Phone"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <textarea
            placeholder="Your Message"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full h-36 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;