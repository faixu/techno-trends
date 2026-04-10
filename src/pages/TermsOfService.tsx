import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Helmet>
        <title>Terms of Service | TECNO TRENDS</title>
        <meta name="description" content="Terms of Service for TECNO TRENDS. Please read these terms carefully before using our website." />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-12">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none font-light leading-relaxed text-gray-600 space-y-8">
            <p>Last updated: April 10, 2026</p>
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">1. Agreement to Terms</h2>
              <p>
                By accessing or using TECNO TRENDS, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on TECNO TRENDS's website for personal, non-commercial transitory viewing only.
              </p>
              <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials;</li>
                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>Attempt to decompile or reverse engineer any software contained on TECNO TRENDS's website;</li>
                <li>Remove any copyright or other proprietary notations from the materials; or</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">3. Disclaimer</h2>
              <p>
                The materials on TECNO TRENDS's website are provided on an 'as is' basis. TECNO TRENDS makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">4. Limitations</h2>
              <p>
                In no event shall TECNO TRENDS or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TECNO TRENDS's website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">6. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at: <a href="mailto:faisal.hassan.0996@gmail.com" className="text-blue-600 hover:underline">faisal.hassan.0996@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
