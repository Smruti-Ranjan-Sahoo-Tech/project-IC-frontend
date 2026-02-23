import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const Services = () => {
  const { isLoggedIn } = useAuthStore()

  const services = [
    {
      icon: '📚',
      title: 'Comprehensive Question Bank',
      description: 'Access thousands of carefully curated programming questions covering all major topics.',
      features: ['1000+ Questions', 'Multiple Difficulty Levels', 'Regular Updates']
    },
    {
      icon: '🎯',
      title: 'Course-Based Learning',
      description: 'Organize your learning journey by selecting specific courses and mastering them.',
      features: ['10+ Courses', 'Structured Path', 'Progress Tracking']
    },
    {
      icon: '💡',
      title: 'Expert Answers',
      description: 'Every question includes detailed, well-explained answers by industry experts.',
      features: ['Expert Written', 'Easy to Understand', 'Real-world Examples']
    },
    {
      icon: '🚀',
      title: 'Interview Preparation',
      description: 'Prepare for technical interviews with questions mimicking real scenarios.',
      features: ['Interview Focus', 'Coding Problems', 'Subjective Questions']
    },
    {
      icon: '📊',
      title: 'Performance Analytics',
      description: 'Track your learning progress and identify areas for improvement.',
      features: ['Progress Tracking', 'Performance Reports', 'Personalized Insights']
    },
    {
      icon: '👥',
      title: 'Community Support',
      description: 'Join a community of learners and connect with experts.',
      features: ['Active Community', 'Expert Guidance', 'Peer Learning']
    }
  ]

  const adminServices = [
    { icon: '✍️', title: 'Create & Manage Questions', description: 'Easy-to-use tools for creating and managing questions' },
    { icon: '📈', title: 'Analytics Dashboard', description: 'Detailed insights into platform usage and user activity' },
    { icon: '👥', title: 'User Management', description: 'Manage users, roles, and permissions with ease' }
  ]

  const pricing = [
    { name: 'Free Learner', price: '₹0', features: ['Access to basic questions', 'View answers', '2 courses'] },
    // { name: 'Contributor Admin', price: '₹499', badge: 'MOST POPULAR', features: ['Create questions', 'Manage content', 'All courses', 'Analytics'] },
    // { name: 'Premium Pro', price: '₹999', features: ['Everything', 'Priority support', 'Advanced analytics', 'Offline access'] }
  ]

  return (
    <>
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl opacity-95">Comprehensive learning solutions for developers of all levels</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-slate-950">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">What We Offer</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="hover-card bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg dark:shadow-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-teal-600 dark:hover:border-teal-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-teal-600 dark:text-teal-400">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Services */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-50 dark:bg-slate-900">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">For Content Creators</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminServices.map((service, idx) => (
            <div key={idx} className="hover-card bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg dark:shadow-2xl text-center">
              <div className="text-5xl mb-4 inline-block">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-slate-950">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">Simple Pricing</h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((plan, idx) => (
            <div key={idx} className={`hover-card rounded-xl shadow-lg dark:shadow-2xl p-8 relative transition-all duration-300 ${
              plan.badge 
                ? 'bg-teal-600 text-white border-4 border-teal-600 transform scale-105' 
                : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white'
            }`}>
              
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                  {plan.badge}
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.badge ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{plan.name}</h3>
              <p className={`text-4xl font-bold mb-6 ${plan.badge ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{plan.price}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 ${plan.badge ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    <span>✓</span> {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                plan.badge
                  ? 'bg-white text-teal-600 hover:bg-gray-100'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}>
                {isLoggedIn ? 'Upgrade Now' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-slate-900 to-amber-500"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-1"></div>

        <div className="relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl mb-10 opacity-95">Join thousands of developers learning on Learning Club</p>
          
          {!isLoggedIn && (
            <Link 
              to="/register" 
              className="inline-block px-10 py-4 bg-white text-teal-600 font-bold text-lg rounded-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Journey Today
            </Link>
          )}
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default Services


