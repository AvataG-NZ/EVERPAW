import { useEffect } from 'react';
import { UnifiedBackground } from '../components/UnifiedBackground';
import { setupGlassEffects } from '../utils/glassEffects';

export default function Privacy() {
  useEffect(() => {
    const cleanup = setupGlassEffects();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen relative">
      <UnifiedBackground />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Legal
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-4">
              Privacy
              <br />
              <span className="italic font-serif text-orange-600">Policy</span>
            </h1>
          </div>
          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 relative overflow-visible">
            <p className="text-white/60 mb-12">Last updated: October 4, 2025</p>

            <div className="space-y-8 text-white/80">
              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">1. Information We Collect</h2>
                <p className="leading-relaxed mb-4">
                  At EverPaw, we collect information that you provide directly to us, including your name, email address,
                  phone number, and pet information. We also collect information about your pet's activities, health metrics,
                  and behavioral patterns through our smart devices and mobile application.
                </p>
                <p className="leading-relaxed">
                  Automatically collected information includes device information, usage data, location data, and interaction
                  with our services. This helps us improve our products and provide personalized experiences for you and your pet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">2. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Monitor your pet's health and activity levels</li>
                  <li>Send you notifications about your pet's wellbeing</li>
                  <li>Process transactions and send related information</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Send you technical notices, updates, and security alerts</li>
                  <li>Provide personalized content and product recommendations</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">3. Information Sharing and Disclosure</h2>
                <p className="leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your consent or at your direction</li>
                  <li>With veterinary professionals if you choose to share health data</li>
                  <li>With service providers who assist in our operations</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect the rights and safety of EverPaw, our users, and the public</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">4. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. We use encryption, secure servers,
                  and regular security assessments to safeguard your data. However, no method of transmission over the
                  Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">5. Your Rights and Choices</h2>
                <p className="leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access, update, or delete your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Object to processing of your information</li>
                  <li>Request restriction of processing</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">6. Children's Privacy</h2>
                <p className="leading-relaxed">
                  Our services are not directed to children under 13. We do not knowingly collect personal information
                  from children under 13. If we become aware that we have collected personal information from a child
                  under 13, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">7. International Data Transfers</h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and maintained on servers located outside of your state,
                  province, country, or other governmental jurisdiction where data protection laws may differ.
                  By using our services, you consent to the transfer of your information to our facilities and
                  third-party service providers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">8. Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting
                  the new policy on this page and updating the "Last updated" date. You are advised to review this
                  policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">9. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 glass-badge glass-hover rounded-xl border border-white/20 relative overflow-visible fluent-button">
                  <p className="text-white">Email: privacy@everpaw.com</p>
                  <p className="text-white">Address: 123 Pet Tech Lane, San Francisco, CA 94102</p>
                  <p className="text-white">Phone: (555) 123-4567</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
