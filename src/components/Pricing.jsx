import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiStar, FiZap, FiShield, FiTrendingUp, FiDollarSign, FiGift, FiAward, FiUsers, FiGlobe, FiHeart, FiTarget } = FiIcons;

const Pricing = () => {
  const plans = [
    {
      name: "Individual Purchase",
      price: "$29-199",
      period: "per app",
      description: "Buy specific apps you need",
      features: [
        "Own the app forever",
        "Lifetime updates included",
        "Commercial use license",
        "Developer support",
        "Source code access"
      ],
      highlight: "Perfect for specific needs",
      buttonText: "Browse Apps",
      popular: false,
      color: "from-blue-500 to-purple-500",
      badge: "Starter",
      savings: null
    },
    {
      name: "Pro Access",
      price: "$49",
      period: "month",
      description: "Access to premium apps",
      features: [
        "Access 100+ premium apps",
        "New apps added monthly",
        "Priority support",
        "Advanced features unlocked",
        "Commercial use included",
        "Team collaboration tools"
      ],
      highlight: "Most popular choice",
      buttonText: "Start Pro",
      popular: true,
      color: "from-green-500 to-blue-500",
      badge: "Most Popular",
      savings: "Save 60%"
    },
    {
      name: "Unlimited Access",
      price: "$99",
      period: "month",
      description: "Full marketplace access",
      features: [
        "Access to ALL applications",
        "Exclusive early access",
        "White-label options",
        "API access included",
        "Custom integrations",
        "Dedicated account manager",
        "Enterprise support"
      ],
      highlight: "Best value for businesses",
      buttonText: "Go Unlimited",
      popular: false,
      color: "from-purple-500 to-pink-500",
      badge: "Enterprise",
      savings: "Save 80%"
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gradient-to-br from-neu-200 to-neu-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="neu-button inline-flex items-center gap-3 px-8 py-4 mb-8 bg-gradient-to-r from-green-100 to-blue-100">
            <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-green-600" />
            <span className="text-neu-700 font-bold text-lg">Transparent Pricing</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-neu-900 mb-8">
            Simple, Transparent
            <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              Pricing Plans
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-neu-600 max-w-4xl mx-auto leading-relaxed">
            Choose the option that works best for you. Buy individual apps or get unlimited access to our entire premium library.
          </p>
        </motion.div>

        {/* Enhanced Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`neu-card p-8 relative hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-blue-50 ${
                plan.popular ? 'ring-4 ring-green-400 shadow-2xl' : ''
              }`}
            >
              {/* Enhanced Badge */}
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="neu-button px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
                    <div className="flex items-center gap-2">
                      <SafeIcon icon={FiStar} className="w-5 h-5" />
                      <span className="font-bold">{plan.badge}</span>
                    </div>
                  </div>
                </div>
              )}

              {!plan.popular && (
                <div className="absolute -top-4 -right-4 neu-button p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <span className="font-bold text-sm">{plan.badge}</span>
                </div>
              )}

              <div className="space-y-8">
                {/* Enhanced Header */}
                <div className="text-center space-y-4">
                  <div className={`neu-button p-4 inline-flex mx-auto bg-gradient-to-r ${plan.color} text-white shadow-xl`}>
                    <SafeIcon icon={plan.popular ? FiStar : FiGlobe} className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neu-900">{plan.name}</h3>
                  <p className="text-neu-600 text-lg">{plan.description}</p>
                  
                  {plan.savings && (
                    <div className="neu-button px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100">
                      <span className="text-green-700 font-bold text-sm">{plan.savings}</span>
                    </div>
                  )}
                </div>

                {/* Enhanced Pricing */}
                <div className="text-center space-y-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-neu-900">{plan.price}</span>
                    <span className="text-neu-600 text-lg">/{plan.period}</span>
                  </div>
                  
                  <div className={`neu-card-inset p-4 bg-gradient-to-r ${
                    plan.popular ? 'from-green-50 to-blue-50' : 'from-blue-50 to-purple-50'
                  }`}>
                    <div className={`font-bold text-lg ${
                      plan.popular ? 'text-green-700' : 'text-blue-700'
                    }`}>
                      {plan.highlight}
                    </div>
                  </div>
                </div>

                {/* Enhanced Features */}
                <div className="space-y-4">
                  <h4 className="font-bold text-neu-900 text-center">What's Included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="neu-button p-2 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                        </div>
                        <span className="text-neu-700 font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Enhanced CTA Button */}
                <button className={`w-full neu-button py-4 hover:scale-105 transition-transform shadow-xl ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                    : 'bg-gradient-to-r from-blue-100 to-purple-100'
                }`}>
                  <div className="flex items-center justify-center gap-3">
                    <SafeIcon icon={plan.popular ? FiZap : FiTarget} className="w-5 h-5" />
                    <span className={`font-bold text-lg ${
                      plan.popular ? 'text-white' : 'text-neu-700'
                    }`}>
                      {plan.buttonText}
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-8 lg:p-16 max-w-6xl mx-auto mb-20 bg-gradient-to-br from-white to-purple-50"
        >
          <div className="text-center mb-12">
            <div className="neu-button inline-flex items-center gap-3 px-6 py-3 mb-6 bg-gradient-to-r from-purple-100 to-pink-100">
              <SafeIcon icon={FiGift} className="w-5 h-5 text-purple-600" />
              <span className="text-neu-700 font-bold">Amazing Value</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-neu-900 mb-6">
              Why Our Pricing Makes Sense
              <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
                Incredible ROI
              </span>
            </h3>
            
            <p className="text-lg text-neu-600 max-w-3xl mx-auto">
              Compare our prices to custom development costs and see the incredible value you get with professional, tested applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: FiZap, 
                title: "Instant Value", 
                desc: "Get professional applications immediately instead of waiting months for development.",
                color: "from-blue-500 to-purple-500",
                stat: "Launch in minutes"
              },
              { 
                icon: FiShield, 
                title: "Proven Quality", 
                desc: "Every app is tested, secure, and maintained by professional developers.",
                color: "from-green-500 to-blue-500",
                stat: "99.9% uptime"
              },
              { 
                icon: FiTrendingUp, 
                title: "Huge Savings", 
                desc: "Save 90%+ compared to custom development while getting better quality.",
                color: "from-purple-500 to-pink-500",
                stat: "90% cost savings"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center space-y-6 neu-card-inset p-8 hover:scale-105 transition-transform"
              >
                <div className={`neu-button p-4 inline-flex mx-auto bg-gradient-to-r ${item.color} text-white shadow-xl`}>
                  <SafeIcon icon={item.icon} className="w-8 h-8" />
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-neu-900 text-xl">{item.title}</h4>
                  <p className="text-neu-600 leading-relaxed">{item.desc}</p>
                  
                  <div className="neu-card-inset p-3 bg-gradient-to-r from-green-100 to-blue-100">
                    <div className="font-bold text-green-700">{item.stat}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-8 lg:p-16 max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50"
        >
          <div className="text-center mb-12">
            <div className="neu-button inline-flex items-center gap-3 px-6 py-3 mb-6 bg-gradient-to-r from-blue-100 to-green-100">
              <SafeIcon icon={FiUsers} className="w-5 h-5 text-blue-600" />
              <span className="text-neu-700 font-bold">Got Questions?</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-neu-900 mb-6">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "Do I own the apps I purchase?",
                a: "Yes! Individual purchases give you lifetime ownership with all future updates included."
              },
              {
                q: "Can I use apps commercially?",
                a: "All plans include commercial use licenses. Use purchased apps in your business without restrictions."
              },
              {
                q: "What about customizations?",
                a: "Source code is included with purchases, and developers offer customization services."
              },
              {
                q: "How do subscriptions work?",
                a: "Subscriptions give you access to apps while active. Cancel anytime, no long-term commitments."
              },
              {
                q: "Is support included?",
                a: "Yes! All plans include developer support for installation, setup, and basic customizations."
              },
              {
                q: "Are there any hidden fees?",
                a: "No hidden fees. The price you see is what you pay, with all features and updates included."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="neu-card-inset p-6 hover:scale-105 transition-transform"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="neu-button p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <span className="font-bold text-sm">Q</span>
                    </div>
                    <h4 className="font-bold text-neu-900 text-lg">{faq.q}</h4>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="neu-button p-2 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      <span className="font-bold text-sm">A</span>
                    </div>
                    <p className="text-neu-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;