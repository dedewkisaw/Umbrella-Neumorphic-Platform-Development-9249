import React from 'react';
import DocumentLayout from '../components/DocumentLayout';
import * as FiIcons from 'react-icons/fi';

const { FiUsers } = FiIcons;

const GDPR = () => {
  return (
    <DocumentLayout
      title="GDPR Compliance"
      subtitle="Your data protection rights under the General Data Protection Regulation"
      icon={FiUsers}
      lastUpdated="January 15, 2025"
    >
      <div className="space-y-8 text-neu-700 leading-relaxed">
        
        <section className="neu-card-inset p-6 lg:p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">GDPR Overview</h3>
          <p className="text-base lg:text-lg">
            The General Data Protection Regulation (GDPR) is a comprehensive data protection law that gives individuals control over their personal data. At Umbrella, we are committed to full GDPR compliance and protecting your privacy rights.
          </p>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Your Data Protection Rights</h3>
          <div className="space-y-4">
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Right to Information</h4>
              <p className="text-neu-700">
                You have the right to be informed about how your personal data is being used. This includes understanding what data we collect, why we collect it, how long we keep it, and who we share it with.
              </p>
            </div>
            
            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Right of Access</h4>
              <p className="text-neu-700">
                You can request a copy of all personal data we hold about you. This includes the right to obtain confirmation that we are processing your data and access to the data itself.
              </p>
            </div>

            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Right to Rectification</h4>
              <p className="text-neu-700">
                You can request that we correct any personal data about you that is inaccurate or incomplete. We will make the corrections within one month of your request.
              </p>
            </div>

            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Right to Erasure (Right to be Forgotten)</h4>
              <p className="text-neu-700">
                You can request that we delete your personal data in certain circumstances, such as when the data is no longer necessary for the original purpose or when you withdraw consent.
              </p>
            </div>

            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Right to Restrict Processing</h4>
              <p className="text-neu-700">
                You can request that we limit how we use your personal data while we investigate a complaint you have made about how we use your data.
              </p>
            </div>

            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Right to Data Portability</h4>
              <p className="text-neu-700">
                You can request that we provide your data in a structured, commonly used, and machine-readable format so you can transfer it to another service provider.
              </p>
            </div>

            <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
              <h4 className="text-lg font-semibold text-neu-900 mb-3">Right to Object</h4>
              <p className="text-neu-700">
                You can object to certain types of processing, including direct marketing, profiling, and processing based on legitimate interests.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Legal Basis for Processing</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <p className="text-neu-700 mb-4">We process your personal data based on the following legal grounds:</p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li><strong>Consent:</strong> When you have given clear consent for specific processing activities</li>
              <li><strong>Contract:</strong> When processing is necessary to fulfill our contract with you</li>
              <li><strong>Legal Obligation:</strong> When we must process data to comply with legal requirements</li>
              <li><strong>Legitimate Interest:</strong> When processing serves our legitimate business interests while respecting your rights</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Data Retention</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700 mb-4">We retain your personal data only as long as necessary:</p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li><strong>Account Data:</strong> Until you delete your account or request deletion</li>
              <li><strong>Transaction Records:</strong> 7 years for tax and legal compliance</li>
              <li><strong>Support Communications:</strong> 3 years for quality assurance</li>
              <li><strong>Analytics Data:</strong> 26 months (anonymized after 14 months)</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">International Data Transfers</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <p className="text-neu-700 mb-4">
              When we transfer your data outside the European Economic Area (EEA), we ensure adequate protection through:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>EU-US Privacy Framework compliance</li>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Adequacy decisions by the European Commission</li>
              <li>Appropriate safeguards and security measures</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Data Protection Officer</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700 mb-4">
              We have appointed a Data Protection Officer (DPO) to oversee our data protection strategy and ensure compliance with GDPR requirements.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-neu-700">
                <strong>Contact our DPO:</strong><br />
                Email: dpo@umbrella.app<br />
                Address: Data Protection Officer, Umbrella Inc., San Francisco, CA
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">How to Exercise Your Rights</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <p className="text-neu-700 mb-4">To exercise any of your GDPR rights, you can:</p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>Use the privacy controls in your account settings</li>
              <li>Contact us at privacy@umbrella.app</li>
              <li>Submit a formal request through our privacy portal</li>
              <li>Contact our Data Protection Officer directly</li>
            </ul>
            <p className="text-neu-700 mt-4">
              We will respond to your request within one month. In complex cases, we may extend this period by two months and will inform you of the extension within the first month.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Data Breach Notification</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-white rounded-lg">
            <p className="text-neu-700">
              In the unlikely event of a data breach that poses a high risk to your rights and freedoms, we will notify you within 72 hours of becoming aware of the breach. We will also report the breach to the relevant supervisory authority as required by law.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl lg:text-2xl font-bold text-neu-900 mb-4">Complaints and Supervisory Authority</h3>
          <div className="neu-card-inset p-4 lg:p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
            <p className="text-neu-700 mb-4">
              If you believe we have not handled your personal data in accordance with GDPR, you have the right to lodge a complaint with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neu-600">
              <li>Your local data protection authority</li>
              <li>The Irish Data Protection Commission (our lead supervisory authority)</li>
              <li>Any EU supervisory authority where you have concerns</li>
            </ul>
            <p className="text-neu-700 mt-4">
              However, we encourage you to contact us first so we can try to resolve any concerns directly.
            </p>
          </div>
        </section>

      </div>
    </DocumentLayout>
  );
};

export default GDPR;