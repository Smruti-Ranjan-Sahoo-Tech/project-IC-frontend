import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { axiosInstance } from '../API/axiosInstace'
import Footer from '../components/Footer/Footer'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/enquiry/submit', formData)
      toast.success('Message sent successfully! We will get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send message')
    }
  }

  return (
    <>
    <div className="w-full">
      {/* Hero */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-1"></div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with us today!
          </p>
        </div>
      </section>

      {/* Contact Container */}
      <section className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              {[
                { icon: '✉️', title: 'Email', value: 'support@learninghub.com', desc: 'We respond within 24 hours' },
                { icon: '📍', title: 'Address', value: 'QSpiders, Bhubaneswar (BBSR)', desc: 'Visit our office' },
                { icon: '📞', title: 'Phone', value: '+1 (555) 123-4567', desc: 'Available Monday-Friday 9-5 PST' },
              ].map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.icon} {item.title}</h3>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">{item.value}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.desc}</p>
                </div>
              ))}

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Follow us on social media</p>
                <div className="flex gap-4">
                  {[
                    { icon: <FaFacebookF size={16} />, label: 'Facebook' },
                    { icon: <FaTwitter size={16} />, label: 'Twitter' },
                    { icon: <FaLinkedinIn size={16} />, label: 'LinkedIn' },
                    { icon: <FaGithub size={16} />, label: 'GitHub' },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      aria-label={social.label}
                      className="hover-card w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
                >
                  ✉️ Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-50 dark:bg-slate-900">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">Frequently Asked Questions</h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: 'How do I get started?', a: 'Sign up for a free account and start exploring questions.' },
            { q: 'Is there a subscription fee?', a: 'We offer both free and premium plans.' },
            { q: 'How often is content updated?', a: 'We add new questions regularly based on industry trends.' },
            { q: 'Can I download resources?', a: 'Yes, premium members can download solutions.' },
          ].map((faq, idx) => (
            <div key={idx} className="hover-card bg-white dark:bg-gray-900 p-6 rounded-xl border-l-4 border-teal-600 dark:border-teal-400">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">❓ {faq.q}</h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default ContactUs

