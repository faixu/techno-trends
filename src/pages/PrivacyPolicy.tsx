import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Helmet>
        <title>Privacy Policy | TECNO TRENDS</title>
        <meta name="description" content="Privacy Policy for TECNO TRENDS. Learn how we collect, use, and protect your data." />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-12">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none font-light leading-relaxed text-gray-600 space-y-8">
            <p>Last updated: April 10, 2026</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">1. Introduction</h2>
              <p>
                Welcome to TECNO TRENDS. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">2. Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">4. Cookies and Web Beacons</h2>
              <p>
                TECNO TRENDS uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
              <p>
                <strong>Google DoubleClick DART Cookie:</strong> Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">5. Advertising Partners Privacy Policies</h2>
              <p>
                Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on TECNO TRENDS, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              </p>
              <p>
                Note that TECNO TRENDS has no access to or control over these cookies that are used by third-party advertisers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">6. Third-Party Links</h2>
              <p>
                This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">7. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:faisal.hassan.0996@gmail.com" className="text-blue-600 hover:underline">faisal.hassan.0996@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
