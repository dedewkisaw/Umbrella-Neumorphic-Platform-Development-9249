import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiCheck, FiStar, FiCreditCard } = FiIcons;

const SubscriptionModal = ({ isOpen, onClose, currentPlan = 'Free' }) => {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const plans = [
    {
      name: 'Free',
      price: '€0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Browse app marketplace',
        'Purchase individual apps',
        'Basic customer support',
        'Community access',
        'App documentation'
      ],
      limits: {
        apps: 'Individual purchase',
        marketplace: 'Full access',
        support: 'Community'
      }
    },
    {
      name: 'Pro',
      price: '€39',
      period: 'month',
      description: 'For active developers',
      features: [
        'Everything in Free',
        'Monthly app credits (€50 value)',
        'Priority customer support',
        'Early access to new apps',
        'Developer resources',
        'Advanced app analytics',
        'Custom app requests'
      ],
      limits: {
        apps: '€50 monthly credits',
        marketplace: 'Full access + early access',
        support: 'Priority email'
      },
      popular: true
    },
    {
      name: 'Business',
      price: '€99',
      period: 'month',
      description: 'For growing businesses',
      features: [
        'Everything in Pro',
        'Monthly app credits (€150 value)',
        'Team collaboration tools',
        'White-label licensing',
        'Custom domain integration',
        'Advanced analytics dashboard',
        'API access',
        'Dedicated account manager',
        'Team training sessions'
      ],
      limits: {
        apps: '€150 monthly credits',
        marketplace: 'Full access + exclusives',
        support: 'Phone & email'
      }
    },
    {
      name: 'Enterprise',
      price: '€249',
      period: 'month',
      description: 'For large organizations',
      features: [
        'Everything in Business',
        'Unlimited app access',
        'Custom app development',
        'Enterprise-grade security',
        'SLA guarantees',
        'On-premise deployment',
        'Custom integrations',
        '24/7 phone support',
        'Dedicated dev team',
        'Training & onboarding',
        'Custom licensing terms'
      ],
      limits: {
        apps: 'Unlimited access',
        marketplace: 'Full access + custom apps',
        support: '24/7 dedicated team'
      }
    }
  ];

  const handleUpgrade = (plan) => {
    // Simulate payment process
    console.log('Upgrading to:', plan.name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="neu-card p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neu-900">Choose Your Plan</h2>
            <button
              onClick={onClose}
              className="neu-button p-2 hover:scale-105 transition-transform"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-neu-600" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`neu-card p-6 relative transition-all ${
                  selectedPlan === plan.name ? 'ring-2 ring-blue-500' : ''
                } ${plan.popular ? 'ring-2 ring-green-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="neu-button px-3 py-1 bg-green-500 text-white text-xs">
                      <div className="flex items-center gap-1">
                        <SafeIcon icon={FiStar} className="w-3 h-3" />
                        Popular
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-neu-900">{plan.name}</h3>
                    <p className="text-neu-600 text-sm">{plan.description}</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-neu-900">{plan.price}</span>
                      {plan.price !== '€0' && (
                        <span className="text-neu-600">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <div className="neu-card-inset p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neu-600">App Access</span>
                      <span className="text-neu-800 font-medium">{plan.limits.apps}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neu-600">Marketplace</span>
                      <span className="text-neu-800 font-medium">{plan.limits.marketplace}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neu-600">Support</span>
                      <span className="text-neu-800 font-medium">{plan.limits.support}</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-neu-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(plan)}
                    disabled={currentPlan === plan.name}
                    className={`w-full neu-button py-3 hover:scale-105 transition-transform disabled:opacity-50 ${
                      plan.popular ? 'bg-green-500 text-white' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {currentPlan === plan.name ? (
                        <span className="text-neu-700 font-medium">Current Plan</span>
                      ) : (
                        <>
                          <SafeIcon icon={FiCreditCard} className="w-4 h-4" />
                          <span className={`font-medium ${plan.popular ? 'text-white' : 'text-neu-700'}`}>
                            {plan.price === '€0' ? 'Start Free' : 'Upgrade'}
                          </span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-neu-600 text-sm">
              All plans include secure payments, lifetime app ownership, and premium support. Cancel anytime with one click.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionModal;