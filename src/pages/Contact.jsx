import React, { useState } from 'react';
import DocumentLayout from '../components/DocumentLayout';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare } = FiIcons;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form or show success message
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <DocumentLayout
      title="Contact Us"
      subtitle="Get in touch with our team - we're here to help"
      icon={FiMail}
    >
      <div className="space-y-8">
        
        {/* Contact Methods */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="neu-card-inset p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center hover:scale-105 transition-transform">
            <div className="neu-button p-4 inline-flex mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <FiMail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neu-900 mb-2">Email Us</h3>
            <p className="text-neu-600 mb-3">For general inquiries and support</p>
            <a href="mailto:hello@umbrella.app" className="text-blue-600 hover:text-blue-800 font-medium">
              hello@umbrella.app
            </a>
          </div>

          <div className="neu-card-inset p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center hover:scale-105 transition-transform">
            <div className="neu-button p-4 inline-flex mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <FiPhone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neu-900 mb-2">Call Us</h3>
            <p className="text-neu-600 mb-3">Speak with our support team</p>
            <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800 font-medium">
              +1 (555) 123-4567
            </a>
          </div>

          <div className="neu-card-inset p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center hover:scale-105 transition-transform">
            <div className="neu-button p-4 inline-flex mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <FiMapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neu-900 mb-2">Visit Us</h3>
            <p className="text-neu-600 mb-3">Our headquarters location</p>
            <span className="text-blue-600 font-medium">San Francisco, CA</span>
          </div>
        </section>

        {/* Contact Form */}
        <section className="neu-card-inset p-8 bg-white rounded-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neu-900 mb-4">Send Us a Message</h3>
            <p className="text-neu-600">
              Have a question or need assistance? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neu-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-neu-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="neu-input w-full pl-10 pr-4 py-3 text-neu-700 placeholder-neu-400"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neu-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-neu-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="neu-input w-full pl-10 pr-4 py-3 text-neu-700 placeholder-neu-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neu-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="neu-input w-full px-4 py-3 text-neu-700 placeholder-neu-400"
                placeholder="What can we help you with?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neu-700 mb-2">
                Message *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FiMessageSquare className="h-5 w-5 text-neu-400" />
                </div>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="neu-input w-full pl-10 pr-4 py-3 text-neu-700 placeholder-neu-400 resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="neu-button px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <FiSend className="w-5 h-5" />
                  <span className="font-semibold text-lg">Send Message</span>
                </div>
              </button>
            </div>
          </form>
        </section>

        {/* Office Hours */}
        <section className="neu-card-inset p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-xl font-bold text-neu-900 mb-4">Support Hours</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neu-800 mb-2">Email Support</h4>
                <p className="text-neu-600">24/7 - We respond within 24 hours</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-800 mb-2">Phone Support</h4>
                <p className="text-neu-600">Monday - Friday, 9 AM - 6 PM PST</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </DocumentLayout>
  );
};

export default Contact;