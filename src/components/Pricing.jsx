import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiStar, FiZap, FiShield } = FiIcons;

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "List unlimited apps",
        "Basic app hosting",
        "SSL certificates",
        "Basic analytics",
        "Community support"
      ],
      commission: "5% commission on sales",
      buttonText: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "month",
      description: "For serious developers",
      features: [
        "Everything in Free",
        "0% commission on sales",
        "Custom domains",
        "Advanced analytics",
        "Priority support",
        "Featured app listings",
        "Early access to new features"
      ],
      commission: "0% commission - keep 100%",
      buttonText: "Start Pro",
      popular: true
    },
    {
      name: "Business",
      price: "$99",
      period: "month",
      description: "For agencies and teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "White-label options",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Custom contract terms"
      ],
      commission: "0% commission - keep 100%",
      buttonText: "Start Business",
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
            Simple, Fair
            <span className="gradient-text block">Pricing</span>
          </h2>
          <p className="text-xl text-neu-600 max-w-3xl mx-auto">
            Start for free, upgrade when you're ready. Our revenue-share model means we only succeed when you do.
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
                    {plan.price !== "$0" && (
                      <span className="text-neu-600">/{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Commission Highlight */}
                <div className={`neu-card-inset p-4 text-center ${
                  plan.name === 'Free' ? 'bg-red-50' : 'bg-green-50'
                }`}>
                  <div className={`font-semibold ${
                    plan.name === 'Free' ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {plan.commission}
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

        {/* Revenue Share Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="neu-card p-8 max-w-4xl mx-auto mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neu-900 mb-4">
              Why Revenue Sharing Works
            </h3>
            <p className="text-neu-600 text-lg">
              We only make money when you make money. This aligns our interests with your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="neu-button p-4 inline-flex mx-auto">
                <SafeIcon icon={FiZap} className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-neu-900">No Upfront Costs</h4>
              <p className="text-neu-600 text-sm">
                Start selling immediately without any setup fees or monthly minimums.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="neu-button p-4 inline-flex mx-auto">
                <SafeIcon icon={FiShield} className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-neu-900">Fair & Transparent</h4>
              <p className="text-neu-600 text-sm">
                Only 5% commission on the free plan. No hidden fees or surprise charges.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="neu-button p-4 inline-flex mx-auto">
                <SafeIcon icon={FiStar} className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-neu-900">Aligned Success</h4>
              <p className="text-neu-600 text-sm">
                We invest in marketing and features that help you sell more apps.
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
                <h4 className="font-semibold text-neu-900 mb-2">How does the commission work?</h4>
                <p className="text-neu-600">We take 5% of each sale on the free plan. Pro and Business plans have 0% commission.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">When do I get paid?</h4>
                <p className="text-neu-600">Payments are processed weekly. You'll receive your earnings minus commission every Friday.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">Can I set my own prices?</h4>
                <p className="text-neu-600">Yes! You have complete control over your app pricing, including one-time, subscription, and free options.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibent text-neu-900 mb-2">Is there a minimum payout?</h4>
                <p className="text-neu-600">No minimum payout. Even if you earn $1, you'll receive it in your weekly payment.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">What payment methods do you support?</h4>
                <p className="text-neu-600">We support PayPal, Stripe, and direct bank transfers in most countries.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neu-900 mb-2">Can I upgrade or downgrade anytime?</h4>
                <p className="text-neu-600">Yes! Change your plan anytime. Upgrades are instant, downgrades take effect at the next billing cycle.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;