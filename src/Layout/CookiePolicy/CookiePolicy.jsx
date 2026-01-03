import React from "react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-lg p-6 md:p-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            KrishiLink – Smart Farming Platform <br />
            Effective Date: 10 April 2024 | Last Updated: 10 April 2024
          </p>
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed">
            This Cookie Policy explains how <strong>KrishiLink</strong> uses
            cookies and similar technologies to recognize you when you visit
            our website and use our farming-related services. It explains what
            these technologies are, why we use them, and how you can control
            them.
          </p>
        </section>

        {/* What are cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            What are cookies?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cookies are small text files that are stored on your device
            (computer, smartphone, or tablet) when you visit a website.
            They help websites remember your actions and preferences such as
            login information, language, location, and farming-related
            interests over a period of time.
          </p>
        </section>

        {/* Why we use cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Why does KrishiLink use cookies?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To ensure the platform functions properly for farmers and agribusiness users</li>
            <li>To remember your login and dashboard preferences</li>
            <li>To analyze usage patterns and improve farming services</li>
            <li>To provide personalized agricultural content and recommendations</li>
            <li>To keep our platform secure</li>
          </ul>
        </section>

        {/* Types of cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Types of cookies we use
          </h2>

          <div className="space-y-4">
            <div className="alert alert-info">
              <div>
                <h3 className="font-semibold">Necessary Cookies</h3>
                <p className="text-sm">
                  These cookies are essential for the operation of KrishiLink.
                  They enable core features such as secure login, user
                  authentication, and access to farmer dashboards. Without
                  these cookies, the platform cannot function properly.
                </p>
              </div>
            </div>

            <div className="alert alert-success">
              <div>
                <h3 className="font-semibold">Functional Cookies</h3>
                <p className="text-sm">
                  Functional cookies allow us to remember your preferences,
                  such as language, region, crop interests, and previously
                  viewed farming resources, to provide a better experience.
                </p>
              </div>
            </div>

            <div className="alert alert-warning">
              <div>
                <h3 className="font-semibold">Analytics Cookies</h3>
                <p className="text-sm">
                  These cookies help us understand how farmers and users
                  interact with KrishiLink. The information collected is used
                  to improve performance, content quality, and usability of
                  our farming tools and services.
                </p>
              </div>
            </div>

            <div className="alert alert-error">
              <div>
                <h3 className="font-semibold">Third-Party Cookies</h3>
                <p className="text-sm">
                  In some cases, we may use trusted third-party services such
                  as analytics or mapping tools. These cookies are governed
                  by the respective third parties’ privacy policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Managing cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            How can you control cookies?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to decide whether to accept or reject cookies.
            You can modify your browser settings to manage or delete cookies
            at any time. Please note that disabling cookies may affect certain
            features and functionality of KrishiLink.
          </p>
        </section>

        {/* Updates */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Updates to this Cookie Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for legal and regulatory reasons.
            Any updates will be posted on this page with a revised date.
          </p>
        </section>

      </div>
    </div>
  );
};

export default CookiePolicy;
