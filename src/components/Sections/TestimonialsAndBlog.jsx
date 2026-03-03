import { motion } from 'framer-motion';
import { Quote, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { testimonials, blogPosts } from '../../data/portfolioData';

const TestimonialsAndBlog = () => {
    return (
        <section id="insights" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Testimonials */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-3xl font-bold mb-10 text-light-heading flex items-center gap-3">
                            <Quote className="text-primary" /> What People Say
                        </h3>

                        <div className="space-y-8">
                            {testimonials.map((testial, index) => (
                                <motion.div
                                    key={testial.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-8 relative rounded-2xl hover:border-primary/30 transition-colors"
                                >
                                    <Quote className="absolute top-6 right-6 text-primary/10 w-16 h-16" />

                                    <p className="text-light-text/90 italic mb-6 relative z-10 leading-relaxed text-lg">
                                        "{testial.content}"
                                    </p>

                                    <div className="flex items-center gap-4 relative z-10">
                                        <img
                                            src={testial.avatar}
                                            alt={testial.name}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-primary/50"
                                            onError={(e) => {
                                                e.target.src = "https://ui-avatars.com/api/?name=" + testial.name.replace(' ', '+') + "&background=0D1B2A&color=66FCF1";
                                            }}
                                        />
                                        <div>
                                            <h4 className="font-bold text-light-heading">{testial.name}</h4>
                                            {testial.role && <p className="text-sm text-primary">{testial.role}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Blog / Insights */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-3xl font-bold mb-10 text-light-heading flex items-center gap-3">
                            <BookOpen className="text-primary" /> Latest Insights
                        </h3>

                        <div className="grid grid-cols-1 gap-8">
                            {blogPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col sm:flex-row gap-6 items-center bg-dark-bg/40 border border-dark-surface rounded-2xl p-4 hover:bg-dark-surface/50 transition-all cursor-pointer"
                                >
                                    <div className="w-full sm:w-2/5 h-48 sm:h-auto sm:aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-grow py-2">
                                        <div className="flex items-center gap-4 text-xs text-primary mb-3">
                                            <span className="font-mono">{post.date}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                        </div>

                                        <h4 className="text-xl font-bold text-light-heading mb-3 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h4>

                                        <p className="text-light-text/70 mb-4 line-clamp-2 text-sm">
                                            {post.excerpt}
                                        </p>

                                        <a href={post.link} className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all mt-auto group/btn">
                                            Read Article <ArrowRight className="w-4 h-4 transition-transform" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TestimonialsAndBlog;
