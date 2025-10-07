import { useEffect } from 'react';
import { UnifiedBackground } from '../components/UnifiedBackground';
import { setupGlassEffects } from '../utils/glassEffects';

export default function Cookies() {
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
              Cookie
              <br />
              <span className="italic font-serif text-orange-600">Policy</span>
            </h1>
          </div>
          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 relative overflow-visible">
            <p className="text-white/60 mb-12">Last updated: October 4, 2025</p>

            <div className="space-y-8 text-white/80">
              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">1. What Are Cookies</h2>
                <p className="leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website or use our services.
                  They help us provide you with a better experience by remembering your preferences, analyzing how you use
                  our services, and personalizing content. Cookies are widely used to make websites work more efficiently
                  and to provide information to website owners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">2. Types of Cookies We Use</h2>

                <div className="space-y-6">
                  <div className="glass-badge glass-hover rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-3">Essential Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies are necessary for our website to function properly. They enable core functionality such
                      as security, network management, and accessibility. You cannot opt-out of these cookies as they are
                      essential to providing our services.
                    </p>
                  </div>

                  <div className="glass-badge glass-hover rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-3">Performance Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies collect information about how you use our website, such as which pages you visit most
                      often and if you receive error messages. This helps us improve the performance and functionality of
                      our services. All information collected is aggregated and anonymous.
                    </p>
                  </div>

                  <div className="glass-badge glass-hover rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-3">Functional Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies allow our website to remember choices you make (such as your username, language, or
                      region) and provide enhanced, personalized features. They may also be used to provide services you
                      have requested, such as watching a video or commenting on content.
                    </p>
                  </div>

                  <div className="glass-badge glass-hover rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-3">Targeting/Advertising Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies are used to deliver advertisements that are relevant to you and your interests. They
                      are also used to limit the number of times you see an advertisement and help measure the effectiveness
                      of advertising campaigns. They remember that you have visited our website and this information is
                      shared with other organizations such as advertisers.
                    </p>
                  </div>

                  <div className="glass-badge glass-hover rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-3">Analytics Cookies</h3>
                    <p className="leading-relaxed">
                      We use analytics cookies to understand how visitors interact with our website. These cookies help us
                      analyze traffic patterns, identify popular content, and improve user experience. We may use services
                      like Google Analytics for this purpose.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">3. Third-Party Cookies</h2>
                <p className="leading-relaxed mb-4">
                  In addition to our own cookies, we may use various third-party cookies to report usage statistics,
                  deliver advertisements, and provide social media features. These include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Social media platforms (Facebook, Instagram, Twitter) for sharing features</li>
                  <li>Advertising networks for targeted advertising</li>
                  <li>Payment processors for secure transactions</li>
                  <li>Customer support tools for chat functionality</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">4. How Long Do Cookies Last</h2>
                <p className="leading-relaxed mb-4">
                  Cookies can be session-based or persistent:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them.
                    They help us recognize you when you return to our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">5. Managing Your Cookie Preferences</h2>
                <p className="leading-relaxed mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Using our cookie consent tool when you first visit our website</li>
                  <li>Adjusting your browser settings to refuse all or some cookies</li>
                  <li>Deleting cookies that have already been set</li>
                  <li>Visiting our Cookie Preference Center to update your choices</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Please note that blocking or deleting cookies may impact your experience on our website and limit
                  the functionality of certain features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">6. Browser-Specific Cookie Management</h2>
                <p className="leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their settings. Here's how to manage cookies
                  in popular browsers:
                </p>
                <div className="space-y-3 ml-4">
                  <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                  <p><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                  <p><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
                  <p><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">7. Do Not Track Signals</h2>
                <p className="leading-relaxed">
                  Some browsers have a "Do Not Track" feature that lets you tell websites you do not want to have your
                  online activities tracked. Currently, our website does not respond to Do Not Track signals. We continue
                  to monitor developments around DNT browser technology and may implement DNT signal recognition in the future.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">8. Changes to This Cookie Policy</h2>
                <p className="leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons. We encourage you to review this page periodically to stay
                  informed about our use of cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-400 mb-4">9. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have questions about our use of cookies or this Cookie Policy, please contact us at:
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
