import React from 'react';
import DocumentLayout from '../components/DocumentLayout';
import * as FiIcons from 'react-icons/fi';

const { FiFileText } = FiIcons;

const TermsOfService = () => {
  return (
    <DocumentLayout
      title="Terms of Service"
      subtitle="Legal terms and conditions for using Umbrella platform"
      icon={FiFileText}
      lastUpdated="January 15, 2025"
    >
      <div className="space-y-8 text-neu-700 leading-relaxed">
        
        <section className="neu-card-inset p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Agreement to Terms</h3>
          <p className="text-base lg:text-lg">
            By accessing and using Umbrella's services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our platform, applications, and all related services.
          </p>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Service Description</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700 mb-4">
              Umbrella provides a premium platform for hosting and distributing web applications. Our services include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>Web application hosting and deployment</li>
              <li>Premium application marketplace</li>
              <li>Developer tools and resources</li>
              <li>Technical support and documentation</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">User Accounts</h3>
          <div className="space-y-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Account Registration</h4>
              <p className="text-neu-700 mb-3">
                To use certain features of our service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>Provide accurate and complete information</li>
                <li>Keep your login credentials secure</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Account Termination</h4>
              <p className="text-neu-700">
                We reserve the right to terminate or suspend accounts that violate these terms, engage in fraudulent activity, or pose a security risk to our platform.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Acceptable Use</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
            <p className="text-neu-700 mb-4">You agree NOT to use our services to:</p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malicious software or content</li>
              <li>Engage in unauthorized access or security breaches</li>
              <li>Spam, harass, or abuse other users</li>
              <li>Interfere with the proper functioning of our services</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Intellectual Property</h3>
          <div className="space-y-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Our Content</h4>
              <p className="text-neu-700">
                The Umbrella platform, including its design, functionality, and content, is protected by intellectual property laws. You may not copy, modify, or distribute our proprietary content without permission.
              </p>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">User Content</h4>
              <p className="text-neu-700">
                You retain ownership of content you upload or create using our services. However, you grant us a license to host, display, and distribute your content as necessary to provide our services.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Payment Terms</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>Subscription fees are billed in advance</li>
              <li>Price changes will be communicated 30 days in advance</li>
              <li>Failure to pay may result in service suspension</li>
              <li>Taxes are additional and your responsibility</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Disclaimers and Limitations</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <p className="text-neu-700 mb-4">
              Our services are provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>Uninterrupted or error-free operation</li>
              <li>Complete security or data protection</li>
              <li>Compatibility with all systems</li>
              <li>Achievement of specific results</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Indemnification</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700">
              You agree to indemnify and hold harmless Umbrella from any claims, damages, or expenses arising from your use of our services, violation of these terms, or infringement of any rights of another party.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Governing Law</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700">
              These terms are governed by the laws of the State of California, United States. Any disputes will be resolved in the courts of San Francisco County, California.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Changes to Terms</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700">
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms. We will provide notice of significant changes.
            </p>
          </div>
        </section>

      </div>
    </DocumentLayout>
  );
};

export default TermsOfService;