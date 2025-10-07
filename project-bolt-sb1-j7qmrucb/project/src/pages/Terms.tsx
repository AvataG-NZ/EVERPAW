import { useEffect } from 'react';
import { UnifiedBackground } from '../components/UnifiedBackground';
import { setupGlassEffects } from '../utils/glassEffects';

export default function Terms() {
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
              Terms of
              <br />
              <span className="italic font-serif text-orange-600">Service</span>
            </h1>
          </div>
          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 relative overflow-visible">
            <p className="text-white/60 mb-12">Last updated: October 4, 2025</p>

            <div className="space-y-8 text-white/80">
              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing or using EverPaw's services, including our smart devices, mobile applications, and website,
                  you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use
                  our services. We reserve the right to modify these terms at any time, and your continued use constitutes
                  acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">2. Description of Service</h2>
                <p className="leading-relaxed mb-4">
                  EverPaw provides smart pet care technology including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI-powered pet monitoring devices and cameras</li>
                  <li>Activity and health tracking applications</li>
                  <li>Automated feeding and care systems</li>
                  <li>E-commerce platform for pet products</li>
                  <li>Cloud-based data storage and analytics</li>
                  <li>Community features and social connectivity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">3. User Accounts</h2>
                <p className="leading-relaxed mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities
                  that occur under your account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                  <li>Not share your account with others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">4. Acceptable Use</h2>
                <p className="leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our services for any illegal purpose</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful code or malware</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Use automated systems to access our services without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">5. Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content, features, and functionality of EverPaw services, including but not limited to text, graphics,
                  logos, images, software, and data compilations, are owned by EverPaw or its licensors and are protected by
                  copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or
                  lease any part of our services without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">6. Purchases and Payments</h2>
                <p className="leading-relaxed mb-4">
                  All purchases through our platform are subject to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Product availability and pricing accuracy</li>
                  <li>Our right to refuse or cancel orders</li>
                  <li>Applicable taxes and shipping fees</li>
                  <li>Our return and refund policy</li>
                  <li>Subscription terms for recurring services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">7. Disclaimer of Warranties</h2>
                <p className="leading-relaxed">
                  Our services are provided "as is" and "as available" without warranties of any kind, either express or
                  implied. We do not warrant that our services will be uninterrupted, error-free, or secure. We do not
                  guarantee the accuracy or reliability of any information obtained through our services. EverPaw devices
                  and services are not a substitute for professional veterinary care.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">8. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  To the maximum extent permitted by law, EverPaw shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
                  indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of
                  our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">9. Indemnification</h2>
                <p className="leading-relaxed">
                  You agree to indemnify, defend, and hold harmless EverPaw and its officers, directors, employees, and
                  agents from any claims, liabilities, damages, losses, and expenses arising out of or in any way connected
                  with your access to or use of our services, your violation of these terms, or your violation of any rights
                  of another person or entity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">10. Termination</h2>
                <p className="leading-relaxed">
                  We reserve the right to suspend or terminate your access to our services at any time, with or without
                  cause, with or without notice. Upon termination, your right to use our services will immediately cease.
                  All provisions that by their nature should survive termination shall survive, including ownership provisions,
                  warranty disclaimers, and limitations of liability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">11. Governing Law</h2>
                <p className="leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of the State of California,
                  without regard to its conflict of law provisions. Any disputes arising from these terms or your use of
                  our services shall be resolved in the state or federal courts located in San Francisco, California.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">12. Contact Information</h2>
                <p className="leading-relaxed">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 glass-badge glass-hover rounded-xl border border-white/20 relative overflow-visible fluent-button">
                  <p className="text-white">Email: legal@everpaw.com</p>
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
