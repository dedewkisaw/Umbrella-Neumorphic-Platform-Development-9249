import React from 'react';
import DocumentLayout from '../components/DocumentLayout';
import * as FiIcons from 'react-icons/fi';

const { FiSettings } = FiIcons;

const CookiePolicy = () => {
  return (
    <DocumentLayout
      title="Cookie Policy"
      subtitle="How we use cookies and similar tracking technologies"
      icon={FiSettings}
      lastUpdated="January 15, 2025"
    >
      <div className="space-y-8 text-neu-700 leading-relaxed">
        
        <section className="neu-card-inset p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">What Are Cookies?</h3>
          <p className="text-base lg:text-lg">
            Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our services.
          </p>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Types of Cookies We Use</h3>
          <div className="space-y-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Essential Cookies</h4>
              <p className="text-neu-700 mb-3">
                These cookies are necessary for our website to function properly. They enable core functionality such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>User authentication and security</li>
                <li>Shopping cart functionality</li>
                <li>Load balancing and performance</li>
                <li>Basic site navigation</li>
              </ul>
            </div>
            
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Analytics Cookies</h4>
              <p className="text-neu-700 mb-3">
                These cookies help us understand how visitors interact with our website:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>Page views and user journeys</li>
                <li>Popular content and features</li>
                <li>Site performance metrics</li>
                <li>Error tracking and debugging</li>
              </ul>
            </div>

            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Functional Cookies</h4>
              <p className="text-neu-700 mb-3">
                These cookies enhance your experience by remembering your choices:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>Language and region preferences</li>
                <li>Theme and display settings</li>
                <li>Form data and progress</li>
                <li>Customization options</li>
              </ul>
            </div>

            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Marketing Cookies</h4>
              <p className="text-neu-700 mb-3">
                These cookies are used to deliver relevant advertisements:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neu-600">
                <li>Personalized content recommendations</li>
                <li>Targeted advertising campaigns</li>
                <li>Social media integration</li>
                <li>Conversion tracking</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Third-Party Cookies</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <p className="text-neu-700 mb-4">
              We use trusted third-party services that may set their own cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li><strong>Google Analytics:</strong> Website usage analytics and reporting</li>
              <li><strong>Stripe:</strong> Payment processing and fraud prevention</li>
              <li><strong>Intercom:</strong> Customer support and messaging</li>
              <li><strong>Cloudflare:</strong> Security and performance optimization</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Cookie Duration</h3>
          <div className="space-y-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Session Cookies</h4>
              <p className="text-neu-700">
                These cookies are temporary and are deleted when you close your browser. They're essential for maintaining your session while navigating our site.
              </p>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Persistent Cookies</h4>
              <p className="text-neu-700">
                These cookies remain on your device for a set period (typically 1-24 months) to remember your preferences across visits.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Managing Your Cookie Preferences</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <p className="text-neu-700 mb-4">
              You have several options to control cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li><strong>Browser Settings:</strong> Configure your browser to block or delete cookies</li>
              <li><strong>Cookie Banner:</strong> Use our cookie consent banner to manage preferences</li>
              <li><strong>Opt-out Links:</strong> Visit third-party websites to opt out of their tracking</li>
              <li><strong>Do Not Track:</strong> Enable browser "Do Not Track" settings</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Browser-Specific Instructions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Chrome</h4>
              <ol className="list-decimal list-inside space-y-1 text-neu-600 text-sm">
                <li>Click the three dots menu</li>
                <li>Go to Settings → Privacy and security</li>
                <li>Click "Cookies and other site data"</li>
                <li>Choose your preferred settings</li>
              </ol>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Firefox</h4>
              <ol className="list-decimal list-inside space-y-1 text-neu-600 text-sm">
                <li>Click the menu button</li>
                <li>Go to Settings → Privacy & Security</li>
                <li>Find "Cookies and Site Data"</li>
                <li>Adjust your preferences</li>
              </ol>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Safari</h4>
              <ol className="list-decimal list-inside space-y-1 text-neu-600 text-sm">
                <li>Go to Safari → Preferences</li>
                <li>Click the Privacy tab</li>
                <li>Choose "Block all cookies" or customize</li>
                <li>Apply your settings</li>
              </ol>
            </div>
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Edge</h4>
              <ol className="list-decimal list-inside space-y-1 text-neu-600 text-sm">
                <li>Click the three dots menu</li>
                <li>Go to Settings → Privacy, search, and services</li>
                <li>Find "Cookies and site permissions"</li>
                <li>Configure your preferences</li>
              </ol>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Impact of Disabling Cookies</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
            <p className="text-neu-700 mb-4">
              Please note that disabling certain cookies may affect your experience:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>You may need to log in repeatedly</li>
              <li>Some features may not work properly</li>
              <li>Personalization will be limited</li>
              <li>Analytics data will be incomplete</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Updates to This Policy</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700">
              We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We encourage you to review this policy periodically. The "Last updated" date at the top indicates when this policy was last revised.
            </p>
          </div>
        </section>

      </div>
    </DocumentLayout>
  );
};

export default CookiePolicy;