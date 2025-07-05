import React from 'react';
import DocumentLayout from '../components/DocumentLayout';
import * as FiIcons from 'react-icons/fi';

const { FiHeart } = FiIcons;

const About = () => {
  return (
    <DocumentLayout
      title="About Umbrella"
      subtitle="Learn about our mission to democratize web application development"
      icon={FiHeart}
    >
      <div className="space-y-8 text-neu-700 leading-relaxed">
        
        <section className="neu-card-inset p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Our Mission</h3>
          <p className="text-base lg:text-lg">
            At Umbrella, we believe that everyone should have access to professional web applications without the complexity and cost of custom development. Our mission is to democratize web development by providing a curated marketplace of premium, ready-to-use applications.
          </p>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Our Story</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700 mb-4">
              Founded in 2023 by a team of experienced developers and entrepreneurs, Umbrella was born from a simple observation: businesses were repeatedly building the same types of web applications, wasting time and resources on reinventing the wheel.
            </p>
            <p className="text-neu-700">
              We saw an opportunity to bridge the gap between custom development and template solutions by creating a platform where professional developers could share their expertise through high-quality, tested applications that businesses could purchase and deploy immediately.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">What We Do</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">For Businesses</h4>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>Access to 500+ professional applications</li>
                <li>Instant deployment and setup</li>
                <li>Lifetime updates and support</li>
                <li>Commercial use licensing</li>
                <li>90% cost savings vs custom development</li>
              </ul>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">For Developers</h4>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>Monetize your development skills</li>
                <li>Reach a global marketplace</li>
                <li>Focus on creativity, not marketing</li>
                <li>Fair revenue sharing model</li>
                <li>Community of like-minded creators</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Our Values</h3>
          <div className="space-y-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Quality First</h4>
              <p className="text-neu-700">
                Every application in our marketplace goes through rigorous testing and code review. We maintain the highest standards for security, performance, and user experience.
              </p>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Developer Success</h4>
              <p className="text-neu-700">
                We're committed to helping developers succeed. Our platform provides the tools, audience, and support needed to turn coding skills into sustainable income.
              </p>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Customer Obsession</h4>
              <p className="text-neu-700">
                Our customers' success is our success. We listen, iterate, and continuously improve based on feedback from both buyers and sellers in our marketplace.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Our Team</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700 mb-4">
              Our diverse team of engineers, designers, and business professionals is united by a passion for making web development more accessible. We're headquartered in San Francisco with team members around the world.
            </p>
            <p className="text-neu-700">
              Every team member brings unique expertise and perspective, from Fortune 500 enterprise experience to startup agility. We believe in remote-first culture, continuous learning, and building products that make a real difference.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Recognition & Milestones</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-neu-900 mb-2">500+</div>
              <div className="text-neu-600">Premium Applications</div>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-neu-900 mb-2">50K+</div>
              <div className="text-neu-600">Happy Customers</div>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-neu-900 mb-2">1000+</div>
              <div className="text-neu-600">Developer Partners</div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Join Our Community</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <p className="text-neu-700 mb-4">
              Whether you're a business looking for solutions or a developer wanting to share your expertise, we'd love to have you join the Umbrella community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="neu-button px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform">
                <span className="font-semibold">Get Started Today</span>
              </button>
              <button className="neu-button px-6 py-3 hover:scale-105 transition-transform">
                <span className="text-neu-700 font-medium">Contact Us</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </DocumentLayout>
  );
};

export default About;