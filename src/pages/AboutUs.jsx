import Footer from '../components/Footer/Footer'

const AboutUs = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO & Founder', bio: 'Passionate about education technology' },
    { name: 'Jane Smith', role: 'CTO', bio: 'Full-stack developer with 10+ years experience' },
    { name: 'Mike Johnson', role: 'Content Lead', bio: 'Educator focused on curriculum design' },
    { name: 'Sarah Williams', role: 'Community Manager', bio: 'Building meaningful learning communities' },
  ]

  const values = [
    { title: 'Excellence', description: 'Highest standards in content and service quality' },
    { title: 'Inclusivity', description: 'Learning opportunities accessible to everyone' },
    { title: 'Innovation', description: 'Continuously improving our platform and methods' },
    { title: 'Community', description: 'Strong support system for learners' },
  ]

  return (
    <>
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-1"></div>

        <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Learning Club</h1>
          <p className="text-xl md:text-2xl opacity-95">
            Empowering developers worldwide with quality learning resources and community support
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Mission */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Learning Club is dedicated to providing high-quality, curated programming questions and answers to help developers master their craft. We believe in democratizing education and creating a platform where anyone can learn, grow, and excel in programming.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To become the most trusted and comprehensive learning platform for programmers globally, fostering a community where knowledge flows freely and every learner can achieve their full potential.
            </p>
          </div>

          {/* What Makes Us Different */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Curated Content', description: 'Questions reviewed by industry experts' },
                { title: 'Expert Solutions', description: 'Detailed answers with explanations' },
                { title: 'Active Community', description: 'Support from experienced developers' },
                { title: 'Continuous Updates', description: 'Fresh content aligned with industry trends' },
              ].map((item, idx) => (
                <div key={idx} className="hover-card bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-teal-600 dark:border-teal-400 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">Our Team</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
            Meet the passionate people behind Learning Club
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="hover-card bg-gray-50 dark:bg-gray-900 p-6 rounded-xl text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-teal-600 dark:text-teal-400 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-700 dark:text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="hover-card bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-teal-600 dark:hover:border-teal-400 hover:shadow-lg transition-all duration-300 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-slate-900 to-amber-500"></div>
        <div className="absolute top-0 right-20 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          {[
            { number: '1000+', label: 'Questions' },
            { number: '500+', label: 'Active Users' },
            { number: '10+', label: 'Courses' },
          ].map((stat, idx) => (
            <div key={idx}>
              <h4 className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</h4>
              <p className="text-xl opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default AboutUs


