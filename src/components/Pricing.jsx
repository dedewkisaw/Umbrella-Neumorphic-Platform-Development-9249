import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiStar, FiZap, FiShield } = FiIcons;

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
      popular: false
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
      popular: true
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
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-neu-200 to-neu-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-neu-900 mb-6">
            Simple, Transparent
            <span className="gradient-text block" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
              Pricing
            </span>
          </h2>
          <p className="text-xl text-neu-600 max-w-3xl mx-auto">
            Choose the option that works best for you. Buy individual apps or get unlimited access 
            to our entire premium library.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`neu-card p-8 relative hover:scale-105 transition-transform ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="neu-button px-4 py-2 bg-blue-500 text-white">
                    <div className="flex items-center gap-2">
                      <SafeIcon icon={FiStar} className="w-4 h-4" />
                      <span className="text-sm font-medium">Most Popular</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-neu-900">{plan.name}</h3>
                  <p className="text-neu-600 mt-2">{plan.description}</p>
                </div>

                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-neu-900">{plan.price}</span>
                    <span className="text-neu-600">/{plan.period}</span>
                  </div>
                </div>

                {/* Highlight */}
                <div className={`neu-card-inset p-4 text-center ${
                  plan.popular ? 'bg-blue-50' : 'bg-green-50'
                }`}>
                  <div className={`font-semibold ${
                    plan.popular ? 'text-blue-700' : 'text-green-700'
                  }`}>
                    {plan.highlight}
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-neu-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full neu-button py-4 hover:scale-105 transition-transform ${
                    plan.popular ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  <span className={`font-semibold ${
                    plan.popular ? 'text-white' : 'text-neu-700'
                  }`}>
                    {plan.buttonText}
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-8 max-w-4xl mx-auto mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neu-900 mb-4">
              Why Our Pricing Makes Sense
            </h3>
            <p className="text-neu-600 text-lg">
              Compare our prices to custom development costs and see the incredible value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="neu-button p-4 inline-flex mx-auto">
                <SafeIcon icon={FiZap} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-neu-900">Instant Value</h4>
              <p className="text-neu-600 text-sm">
                Get professional applications immediately instead of waiting months for development.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="neu-button p-4 inline-flex mx-auto">
                <SafeIcon icon={FiShield} className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-neu-900">Proven Quality</h4>
              <p className="text-neu-600 text-sm">
                Every app is tested, secure, and maintained by professional developers.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="neu-button p-4 inline-flex mx-auto">
                <SafeIcon icon={FiStar} className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-neu-900">Huge Savings</h4>
              <p className="text-neu-600 text-sm">
                Save 90%+ compared to custom development while getting better quality.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-neu-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">Do I own the apps I purchase?</h4>
                <p className="text-neu-600">Yes! Individual purchases give you lifetime ownership with all future updates included.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">Can I use apps commercially?</h4>
                <p className="text-neu-600">All plans include commercial use licenses. Use purchased apps in your business without restrictions.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">What about customizations?</h4>
                <p className="text-neu-600">Source code is included with purchases, and developers offer customization services.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">How do subscriptions work?</h4>
                <p className="text-neu-600">Subscriptions give you access to apps while active. Cancel anytime, no long-term commitments.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">Is support included?</h4>
                <p className="text-neu-600">Yes! All plans include developer support for installation, setup, and basic customizations.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">Are there any hidden fees?</h4>
                <p className="text-neu-600">No hidden fees. The price you see is what you pay, with all features and updates included.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;