import { motion } from 'framer-motion';
import { Quote, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { testimonials, blogPosts } from '../../data/portfolioData';
import SectionHeader from '../UI/SectionHeader';

const TestimonialsAndBlog = () => (
    <section id="insights" className="relative border-t border-white/5 py-24 px-5 sm:px-6 md:px-10 lg:px-14">
        <SectionHeader
            index="05"
            label="insights"
            title="WORDS &"
            pixelWord="WRITING"
            lede="What people I have worked with say, and what I have been thinking about lately."
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">

            {/* Testimonials */}
            <div>
                <h3 className="mb-7 flex items-center gap-3 text-xl font-bold uppercase tracking-wide">
                    <Quote size={18} strokeWidth={2} className="text-term" /> What People Say
                </h3>

                <div className="space-y-5">
                    {testimonials.map((testimonial, index) => (
                        <motion.figure
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="brackets panel panel-glow relative overflow-hidden p-7"
                        >
                            <Quote className="absolute right-5 top-5 h-12 w-12 text-term/10" />

                            <blockquote className="relative z-10 mb-5 text-sm leading-relaxed text-ink-soft">
                                &ldquo;{testimonial.content}&rdquo;
                            </blockquote>

                            <figcaption className="relative z-10 flex items-center gap-3 border-t border-rule pt-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    loading="lazy"
                                    className="h-11 w-11 shrink-0 border border-rule object-cover"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=111111&color=FF5F1F`;
                                    }}
                                />
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wide">{testimonial.name}</p>
                                    {testimonial.role && (
                                        <p className="font-pixel text-xs text-term">{testimonial.role}</p>
                                    )}
                                </div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>

            {/* Writing */}
            <div>
                <h3 className="mb-7 flex items-center gap-3 text-xl font-bold uppercase tracking-wide">
                    <BookOpen size={18} strokeWidth={2} className="text-term" /> Latest Insights
                </h3>

                <div className="grid grid-cols-1 gap-5">
                    {blogPosts.map((post, index) => {
                        const isPublished = post.link && post.link !== '#';

                        return (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="panel panel-glow group flex flex-col gap-5 p-4 sm:flex-row"
                            >
                                <div className="relative h-40 w-full shrink-0 overflow-hidden border border-rule sm:aspect-[4/3] sm:h-auto sm:w-2/5">
                                    <img
                                        src={post.image}
                                        alt=""
                                        aria-hidden="true"
                                        loading="lazy"
                                        className="h-full w-full object-cover brightness-[0.62] transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-term/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                                </div>

                                <div className="flex flex-grow flex-col py-1 pr-1">
                                    <div className="font-pixel mb-2 flex items-center gap-3 text-xs text-term">
                                        <span>{post.date}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={11} /> {post.readTime}
                                        </span>
                                    </div>

                                    <h4 className="mb-2 text-base font-bold uppercase leading-tight tracking-tight">
                                        {post.title}
                                    </h4>

                                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                                        {post.excerpt}
                                    </p>

                                    {isPublished ? (
                                        <a
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-pixel mt-auto inline-flex items-center gap-2 text-sm uppercase tracking-wider text-term transition-all hover:gap-3"
                                        >
                                            Read Article <ArrowRight size={14} />
                                        </a>
                                    ) : (
                                        <span className="font-pixel mt-auto text-xs uppercase tracking-widest text-ink-mute">
                                            [ coming soon ]
                                        </span>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </div>
    </section>
);

export default TestimonialsAndBlog;
