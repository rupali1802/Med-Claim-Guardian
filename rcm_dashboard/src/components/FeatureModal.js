import React, { useEffect } from 'react';

const FEATURE_DETAILS = {
  'AI-Powered Predictions': {
    title: 'AI-Powered Claim Denial Predictions',
    icon: '⚡',
    description: 'Get instant, accurate predictions on claim denial probability before submission.',
    keyInsights: [
      {
        label: 'Accuracy Rate',
        value: '94%',
        description: 'Based on analysis of 500K+ healthcare claims'
      },
      {
        label: 'Average Processing Time',
        value: '< 1 second',
        description: 'Per claim prediction using optimized ML algorithms'
      },
      {
        label: 'Denial Rate Reduction',
        value: '42%',
        description: 'Achieved by clients using our predictions'
      },
      {
        label: 'Cost Savings',
        value: '$250K/year',
        description: 'Average annual savings for mid-size healthcare providers'
      }
    ],
    benefits: [
      'Reduce claim rejections before submission',
      'Identify high-risk claims in real-time',
      'Optimize revenue cycle management',
      'Improve financial forecasting accuracy'
    ],
    useCases: [
      'Pre-submission claim verification',
      'Appeals strategy planning',
      'Provider performance benchmarking',
      'Compliance monitoring'
    ]
  },
  'SHAP Explainability': {
    title: 'SHAP Feature Explainability',
    icon: '🔍',
    description: 'Understand exactly why claims are denied with transparent AI explanations.',
    keyInsights: [
      {
        label: 'Top Contributing Factors',
        value: '8-10',
        description: 'Key features analyzed per claim for detailed insights'
      },
      {
        label: 'Explanation Accuracy',
        value: '99%',
        description: 'Feature importance correctly identified versus human review'
      },
      {
        label: 'Time to Resolution',
        value: '60% faster',
        description: 'Appeal resolution using explainable insights'
      },
      {
        label: 'Team Training Impact',
        value: '35%',
        description: 'Improvement in staff decision-making with explanations'
      }
    ],
    benefits: [
      'Transparent AI decision-making',
      'Build trust in predictions',
      'Train staff with real examples',
      'Support compliance audits'
    ],
    useCases: [
      'Staff training programs',
      'Regulatory compliance',
      'Appeal preparation',
      'Quality assurance reviews'
    ]
  },
  'Real-time Analytics': {
    title: 'Real-time Analytics Dashboard',
    icon: '📊',
    description: 'Monitor denial trends and patterns across payers and procedures.',
    keyInsights: [
      {
        label: 'Data Points Tracked',
        value: '50+',
        description: 'Comprehensive metrics per claim and provider'
      },
      {
        label: 'Update Frequency',
        value: 'Real-time',
        description: 'Instant updates as claims are processed'
      },
      {
        label: 'Insight Generation',
        value: '3-5 mins',
        description: 'Automated actionable insights per analysis'
      },
      {
        label: 'Visualization Types',
        value: '20+',
        description: 'Customizable charts and heatmaps available'
      }
    ],
    benefits: [
      'Identify denial patterns instantly',
      'Track KPIs in real-time',
      'Benchmark against industry standards',
      'Spot seasonal trends'
    ],
    useCases: [
      'Executive dashboards',
      'Operations monitoring',
      'Trend identification',
      'Performance reporting'
    ]
  },
  'What-If Simulation': {
    title: 'What-If Scenario Simulation',
    icon: '🎯',
    description: 'Test scenarios and explore claim outcomes before submission.',
    keyInsights: [
      {
        label: 'Simulation Speed',
        value: '< 500ms',
        description: 'Per scenario analysis and prediction'
      },
      {
        label: 'Scenarios Per Session',
        value: 'Unlimited',
        description: 'Test as many variations as needed'
      },
      {
        label: 'Parameter Options',
        value: '30+',
        description: 'Claim attributes that can be modified'
      },
      {
        label: 'Success Rate',
        value: '89%',
        description: 'Of optimized claims pass submission on first try'
      }
    ],
    benefits: [
      'Optimize claims before submission',
      'Test different strategies',
      'Compare outcomes side-by-side',
      'Minimize rejection risk'
    ],
    useCases: [
      'Claim optimization',
      'Strategy comparison',
      'Training simulations',
      'Risk mitigation'
    ]
  },
  'AI Assistant': {
    title: 'Intelligent Healthcare AI Assistant',
    icon: '🤖',
    description: 'Get smart recommendations and insights from our healthcare billing expert AI.',
    keyInsights: [
      {
        label: 'Questions Answered',
        value: '1000+',
        description: 'Unique billing and coding questions in knowledge base'
      },
      {
        label: 'Response Accuracy',
        value: '97%',
        description: 'Validated against healthcare billing experts'
      },
      {
        label: 'Available 24/7',
        value: '100%',
        description: 'Instant answers anytime, anywhere'
      },
      {
        label: 'Time Saved Per Query',
        value: '15 mins',
        description: 'Versus manual research and expert consultation'
      }
    ],
    benefits: [
      'Instant expert advice on demand',
      'Reduce manual research time',
      'Improve coding accuracy',
      'Support staff upskilling'
    ],
    useCases: [
      'Coding assistance',
      'Compliance questions',
      'Billing guidance',
      'Training and support'
    ]
  },
  'ROI Calculator': {
    title: 'ROI & Proof of Value Calculator',
    icon: '💰',
    description: 'Calculate and visualize your return on investment and business impact.',
    keyInsights: [
      {
        label: 'Average ROI',
        value: '320%',
        description: 'Within first 12 months of implementation'
      },
      {
        label: 'Payback Period',
        value: '3-4 months',
        description: 'To recover platform investment'
      },
      {
        label: 'Scenarios Supported',
        value: '5+',
        description: 'Different organization sizes and claim volumes'
      },
      {
        label: 'Additional Revenue',
        value: '$180K-500K',
        description: 'Annual additional recovered revenue per organization'
      }
    ],
    benefits: [
      'Justify platform investment',
      'Track actual vs. projected savings',
      'Make data-driven budget decisions',
      'Communicate value to stakeholders'
    ],
    useCases: [
      'Executive presentations',
      'Budget justification',
      'Performance tracking',
      'Growth planning'
    ]
  }
};

export default function FeatureModal({ isOpen, featureKey, onClose }) {
  const feature = FEATURE_DETAILS[featureKey];

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

  if (!isOpen || !feature) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 flex items-start justify-between border-b">
          <div className="flex gap-4 items-start flex-1">
            <span className="text-4xl">{feature.icon}</span>
            <div>
              <h2 className="text-3xl font-bold">{feature.title}</h2>
              <p className="text-blue-100 mt-2">{feature.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Key Insights */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Insights & Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feature.keyInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition"
                >
                  <p className="text-sm text-gray-600 mb-2">{insight.label}</p>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{insight.value}</p>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feature.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {feature.useCases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="bg-purple-50 rounded-lg p-4 border border-purple-100 flex items-start gap-3"
                >
                  <span className="text-purple-600 text-lg">▸</span>
                  <p className="text-gray-700">{useCase}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 border-t">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition"
          >
            Close & Explore Features
          </button>
        </div>
      </div>
    </div>
  );
}
