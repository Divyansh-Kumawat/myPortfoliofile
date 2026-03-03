import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { personalData } from '../../data/portfolioData';

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-dark-bg/50">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4 inline-block relative text-glow"
                    >
                        Get In Touch
                        <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-primary rounded-full shadow-[0_0_10px_#66FCF1]"></span>
                    </motion.h2>
                    <p className="text-light-text/70 mt-4 max-w-2xl mx-auto">
                        Have a project in mind or want to discuss opportunities? I'd love to hear from you.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        className="w-full lg:w-1/3 space-y-8"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="glass-card p-8 flex flex-col items-center text-center hover:border-primary/50 transition-colors group">
                            <div className="w-14 h-14 bg-dark-bg rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(102,252,241,0.2)]">
                                <Mail className="text-primary" size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-light-heading mb-2">Email Me</h4>
                            <a href={`mailto:${personalData.email}`} className="text-light-text/80 hover:text-primary transition-colors">
                                {personalData.email}
                            </a>
                        </div>

                        <div className="glass-card p-8 flex flex-col items-center text-center hover:border-primary/50 transition-colors group">
                            <div className="w-14 h-14 bg-dark-bg rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(102,252,241,0.2)]">
                                <Phone className="text-primary" size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-light-heading mb-2">Call Me</h4>
                            <a href={`tel:${personalData.phone}`} className="text-light-text/80 hover:text-primary transition-colors">
                                {personalData.phone}
                            </a>
                        </div>

                        <div className="glass-card p-8 flex flex-col items-center text-center hover:border-primary/50 transition-colors group">
                            <div className="w-14 h-14 bg-dark-bg rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(102,252,241,0.2)]">
                                <MapPin className="text-primary" size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-light-heading mb-2">Location</h4>
                            <p className="text-light-text/80">{personalData.location}</p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="w-full lg:w-2/3 glass-card p-8 md:p-10"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Form submission is just UI for layout!"); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-light-text mb-2">Your Name</label>
                                    <input type="text" id="name" placeholder="John Doe" className="w-full bg-dark-bg border border-dark-surface rounded-lg px-4 py-3 text-light-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-light-text mb-2">Your Email</label>
                                    <input type="email" id="email" placeholder="john@example.com" className="w-full bg-dark-bg border border-dark-surface rounded-lg px-4 py-3 text-light-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" required />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-light-text mb-2">Subject</label>
                                <input type="text" id="subject" placeholder="Project Inquiry" className="w-full bg-dark-bg border border-dark-surface rounded-lg px-4 py-3 text-light-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" required />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-light-text mb-2">Message</label>
                                <textarea id="message" rows="5" placeholder="Tell me about your project..." className="w-full bg-dark-bg border border-dark-surface rounded-lg px-4 py-3 text-light-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" required></textarea>
                            </div>

                            <button type="submit" className="btn-primary w-full group">
                                Send Message
                                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
