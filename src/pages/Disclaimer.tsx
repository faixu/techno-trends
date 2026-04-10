import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Helmet>
        <title>Disclaimer | TECNO TRENDS</title>
        <meta name="description" content="Disclaimer for TECNO TRENDS. Information provided on this website is for general informational purposes only." />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-12">Disclaimer</h1>
          
          <div className="prose prose-gray max-w-none font-light leading-relaxed text-gray-600 space-y-8">
            <p>Last updated: April 10, 2026</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">1. General Information</h2>
              <p>
                The information provided by TECNO TRENDS on this website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">2. External Links Disclaimer</h2>
              <p>
                The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">3. Professional Disclaimer</h2>
              <p>
                The site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional advice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">4. Affiliate Disclosures</h2>
              <p>
                The site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include but are not limited to Amazon, ShareASale, and others. We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn advertising fees by linking to Amazon.com and affiliated websites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">5. Errors and Omissions Disclaimer</h2>
              <p>
                While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, TECNO TRENDS is not responsible for any errors or omissions, or for the results obtained from the use of this information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">6. Contact Us</h2>
              <p>
                Should you have any feedback, comments, requests for technical support or other inquiries, please contact us by email: <a href="mailto:faisal.hassan.0996@gmail.com" className="text-blue-600 hover:underline">faisal.hassan.0996@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
