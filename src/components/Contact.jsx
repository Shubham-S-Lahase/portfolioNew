import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.info('Sending...', { autoClose: 1000 });

    const response = await fetch('https://formspree.io/f/xkgwrybn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } else {
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="py-12 bg-transparent">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-slate-950 text-center mb-8">Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-950">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-transparent shadow-sm sm:text-sm border border-gray-300 rounded-md dark:border-gray-600 text-slate-950 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-950">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-transparent shadow-sm sm:text-sm border border-gray-300 rounded-md dark:border-gray-600 text-slate-950 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-950">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-transparent shadow-sm sm:text-sm border border-gray-300 rounded-md dark:border-gray-600 text-slate-950 focus:outline-none"
              rows="4"
            ></textarea>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-zinc-950 border-2 border-gray-900 hover:bg-slate-800 hover:text-pink-50 hover:border-slate-800 focus:outline-none"
          >
            Send
          </motion.button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;