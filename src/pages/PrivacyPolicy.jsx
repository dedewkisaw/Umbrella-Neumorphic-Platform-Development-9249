import React from 'react';
import DocumentLayout from '../components/DocumentLayout';
import * as FiIcons from 'react-icons/fi';

const { FiShield } = FiIcons;

const PrivacyPolicy = () => {
  return (
    <DocumentLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information"
      icon={FiShield}
      lastUpdated="January 15, 2025"
    >
      <div className="space-y-8 text-neu-700 leading-relaxed">
        
        <section className="neu-card-inset p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Introduction</h3>
          <p className="text-base lg:text-lg">
            At Umbrella, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully.
          </p>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Information We Collect</h3>
          <div className="space-y-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Personal Information</h4>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials and profile information</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication preferences and history</li>
              </ul>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Usage Information</h4>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>Device and browser information</li>
                <li>IP address and geographic location</li>
                <li>Pages visited and features used</li>
                <li>Time and duration of visits</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">How We Use Your Information</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information and updates</li>
              <li>Respond to customer service requests</li>
              <li>Improve our website and services</li>
              <li>Prevent fraudulent transactions and monitor against theft</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Information Sharing</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <p className="text-neu-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist in operating our website</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Data Security</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Your Rights</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability where applicable</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Cookies and Tracking</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings. For more information, please see our Cookie Policy.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Children's Privacy</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <p className="text-neu-700">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Changes to This Policy</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </div>
        </section>

      </div>
    </DocumentLayout>
  );
};

export default PrivacyPolicy;