import React, { useState } from 'react';
import DocumentLayout from '../components/DocumentLayout';
import * as FiIcons from 'react-icons/fi';

const { FiHelpCircle, FiSearch, FiChevronDown, FiChevronUp, FiBook, FiMessageCircle, FiMail } = FiIcons;

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top navigation, fill out the registration form with your email and password, and verify your email address. You'll be able to start browsing and purchasing apps immediately."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through Stripe."
        },
        {
          question: "How do I download purchased apps?",
          answer: "After purchase, go to your Dashboard and click on 'My Library'. Find your app and click the 'Download' button. You'll receive a ZIP file containing all the source code and documentation."
        }
      ]
    },
    {
      title: "Purchasing & Licensing",
      faqs: [
        {
          question: "Do I own the apps I purchase?",
          answer: "Yes! When you purchase an app, you receive a lifetime license that includes commercial use rights, source code access, and all future updates. There are no recurring fees for individual purchases."
        },
        {
          question: "Can I use purchased apps for commercial projects?",
          answer: "Absolutely! All our licenses include commercial use rights. You can use purchased apps for client projects, your own business, or resell as part of a larger solution."
        },
        {
          question: "What's the difference between individual purchase and subscription?",
          answer: "Individual purchases give you lifetime ownership of specific apps. Subscriptions provide access to our entire library while your subscription is active, plus early access to new releases."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "What if an app doesn't work as expected?",
          answer: "All apps come with detailed documentation and setup instructions. If you encounter issues, contact the developer directly through the app page, or reach out to our support team for assistance."
        },
        {
          question: "Do apps come with documentation?",
          answer: "Yes! Every app includes comprehensive documentation covering installation, configuration, customization options, and troubleshooting. Many also include video tutorials."
        },
        {
          question: "Can I request customizations?",
          answer: "While apps are sold as-is, many developers offer custom modification services. You can contact developers directly through their profile pages to discuss custom work."
        }
      ]
    },
    {
      title: "Account & Billing",
      faqs: [
        {
          question: "How do I update my billing information?",
          answer: "Go to your Dashboard, click on 'Account Settings', then 'Billing Information'. You can update your payment methods, billing address, and download invoices from this section."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer a 30-day satisfaction guarantee. If an app doesn't meet your expectations, contact our support team within 30 days of purchase for a full refund."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription anytime from your Dashboard. Go to 'Subscription Management' and click 'Cancel Subscription'. You'll retain access until your current billing period ends."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const faqId = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <DocumentLayout
      title="Help Center"
      subtitle="Find answers to common questions and get the support you need"
      icon={FiHelpCircle}
    >
      <div className="space-y-8">
        
        {/* Search */}
        <section className="neu-card-inset p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-neu-900 mb-2">Search for Help</h3>
            <p className="text-neu-600">Type your question below to find relevant answers</p>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-neu-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neu-input w-full pl-10 pr-4 py-4 text-neu-700 placeholder-neu-400 text-lg"
              placeholder="Search help articles and FAQs..."
            />
          </div>
        </section>

        {/* Quick Links */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="neu-card-inset p-6 bg-white rounded-lg hover:scale-105 transition-transform">
            <div className="neu-button p-3 inline-flex mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <FiBook className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neu-900 mb-2 text-center">Documentation</h3>
            <p className="text-neu-600 text-center mb-4">
              Comprehensive guides and tutorials for getting started
            </p>
            <button className="w-full neu-button py-3 hover:scale-105 transition-transform">
              <span className="text-neu-700 font-medium">View Docs</span>
            </button>
          </div>

          <div className="neu-card-inset p-6 bg-white rounded-lg hover:scale-105 transition-transform">
            <div className="neu-button p-3 inline-flex mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <FiMessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neu-900 mb-2 text-center">Live Chat</h3>
            <p className="text-neu-600 text-center mb-4">
              Get instant help from our support team
            </p>
            <button className="w-full neu-button py-3 hover:scale-105 transition-transform">
              <span className="text-neu-700 font-medium">Start Chat</span>
            </button>
          </div>

          <div className="neu-card-inset p-6 bg-white rounded-lg hover:scale-105 transition-transform">
            <div className="neu-button p-3 inline-flex mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <FiMail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neu-900 mb-2 text-center">Email Support</h3>
            <p className="text-neu-600 text-center mb-4">
              Send us a detailed message about your issue
            </p>
            <button className="w-full neu-button py-3 hover:scale-105 transition-transform">
              <span className="text-neu-700 font-medium">Contact Us</span>
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neu-900 mb-4">Frequently Asked Questions</h3>
            <p className="text-neu-600">
              {searchTerm ? `Search results for "${searchTerm}"` : 'Browse common questions by category'}
            </p>
          </div>

          <div className="space-y-6">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="neu-card-inset p-6 bg-white rounded-lg">
                <h4 className="text-xl font-semibold text-neu-900 mb-4">{category.title}</h4>
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => {
                    const faqId = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openFAQ === faqId;
                    
                    return (
                      <div key={faqIndex} className="border border-neu-200 rounded-lg">
                        <button
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-neu-50 transition-colors"
                        >
                          <span className="font-medium text-neu-900">{faq.question}</span>
                          {isOpen ? (
                            <FiChevronUp className="w-5 h-5 text-neu-500" />
                          ) : (
                            <FiChevronDown className="w-5 h-5 text-neu-500" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-3 text-neu-600 leading-relaxed border-t border-neu-200">
                            <div className="pt-3">{faq.answer}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {searchTerm && filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="neu-card-inset p-8 max-w-md mx-auto bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <FiSearch className="w-16 h-16 text-neu-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neu-900 mb-2">No Results Found</h3>
                <p className="text-neu-600 mb-4">
                  We couldn't find any help articles matching your search. Try different keywords or contact our support team.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="neu-button px-6 py-3 hover:scale-105 transition-transform"
                >
                  <span className="text-neu-700 font-medium">Clear Search</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Contact Support */}
        <section className="neu-card-inset p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-neu-900 mb-4">Still Need Help?</h3>
            <p className="text-neu-600 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or issues you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="neu-button px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 transition-transform">
                <div className="flex items-center gap-3">
                  <FiMessageCircle className="w-5 h-5" />
                  <span className="font-semibold">Start Live Chat</span>
                </div>
              </button>
              <button className="neu-button px-8 py-4 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-neu-600" />
                  <span className="text-neu-700 font-medium">Send Email</span>
                </div>
              </button>
            </div>
          </div>
        </section>

      </div>
    </DocumentLayout>
  );
};

export default Help;