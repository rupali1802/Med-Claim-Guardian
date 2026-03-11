import React, { useEffect } from 'react';

export default function TermsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 flex items-center justify-between border-b">
          <h2 className="text-2xl font-bold">Terms & Conditions</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 text-gray-700">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h3>
            <p className="text-sm leading-relaxed">
              By accessing and using the Med-Claim Guardian platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">2. Use License</h3>
            <p className="text-sm leading-relaxed mb-3">
              Permission is granted to temporarily download one copy of the materials (information or software) on Med-Claim Guardian's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="text-sm space-y-2 ml-4">
              <li>• Modify or copy the materials</li>
              <li>• Use the materials for any commercial purpose or for any public display</li>
              <li>• Attempt to decompile or reverse engineer any software</li>
              <li>• Remove any copyright or other proprietary notations from the materials</li>
              <li>• Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">3. Disclaimer</h3>
            <p className="text-sm leading-relaxed">
              The materials on Med-Claim Guardian's website are provided "as is". Med-Claim Guardian makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">4. Limitations</h3>
            <p className="text-sm leading-relaxed">
              In no event shall Med-Claim Guardian or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Med-Claim Guardian's website, even if Med-Claim Guardian or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">5. Accuracy of Materials</h3>
            <p className="text-sm leading-relaxed">
              The materials appearing on Med-Claim Guardian's website could include technical, typographical, or photographic errors. Med-Claim Guardian does not warrant that any of the materials on its website are accurate, complete, or current. Med-Claim Guardian may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">6. Links</h3>
            <p className="text-sm leading-relaxed">
              Med-Claim Guardian has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Med-Claim Guardian of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">7. Modifications</h3>
            <p className="text-sm leading-relaxed">
              Med-Claim Guardian may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">8. Governing Law</h3>
            <p className="text-sm leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Med-Claim Guardian operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">9. Data Privacy & Security</h3>
            <p className="text-sm leading-relaxed">
              We are committed to protecting your healthcare data. All data is encrypted using industry-standard SSL/TLS protocols. We comply with HIPAA regulations and all applicable healthcare data protection laws.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">10. Contact Information</h3>
            <p className="text-sm leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact us at: support@medclaimguardian.com or visit our website at www.medclaimguardian.com
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 border-t flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
          >
            I Accept & Close
          </button>
        </div>
      </div>
    </div>
  );
}
