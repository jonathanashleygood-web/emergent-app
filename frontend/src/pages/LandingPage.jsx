import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import Logo from '../components/Logo';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-sand">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1766910701111-9eee02328e95?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Couple walking on tropical beach at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <header className="p-6 lg:p-10">
            <Logo size="default" className="[&_span]:text-white [&_.text-stone-500]:text-white/80 [&_.text-terracotta]:text-dusty-rose" />
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center px-6 lg:px-10 pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <p className="font-accent text-2xl text-dusty-rose mb-4">
                Your dream trip starts here
              </p>
              <h1 className="font-heading text-5xl md:text-7xl text-white font-semibold leading-tight mb-6">
                Luxury travel,{' '}
                <span className="text-dusty-rose">personally</span>{' '}
                curated
              </h1>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                Tell us your travel dreams and we'll craft a bespoke itinerary 
                tailored just for you. No cookie-cutter packages — just 
                unforgettable experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/inquiry">
                  <Button 
                    className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-10 py-4 text-lg font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3"
                    data-testid="btn-start-inquiry"
                  >
                    Start Planning
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mt-12 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-dusty-rose" />
                  <span>Bespoke itineraries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-dusty-rose" />
                  <span>Personal service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-dusty-rose" />
                  <span>Worldwide destinations</span>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">
              How it works
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Planning your perfect getaway is simple with our personalized approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell us your dreams',
                description: 'Share your travel preferences, must-do experiences, and what matters most to you.',
              },
              {
                step: '02',
                title: 'We craft your trip',
                description: 'Carly personally researches and designs a bespoke itinerary just for you.',
              },
              {
                step: '03',
                title: 'Travel in style',
                description: 'Sit back, relax, and enjoy your perfectly planned luxury getaway.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-sand rounded-2xl p-8 text-center"
              >
                <span className="font-accent text-4xl text-terracotta">{item.step}</span>
                <h3 className="font-heading text-2xl text-charcoal mt-4 mb-3">
                  {item.title}
                </h3>
                <p className="text-stone-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-10 bg-sage/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal mb-6">
              Ready to start your adventure?
            </h2>
            <p className="text-stone-500 text-lg mb-10 max-w-2xl mx-auto">
              It only takes a few minutes to tell us about your dream trip. 
              We'll handle the rest.
            </p>
            <Link to="/inquiry">
              <Button 
                className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-10 py-4 text-lg font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3 mx-auto"
                data-testid="btn-cta-inquiry"
              >
                Plan My Trip
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 lg:px-10 bg-charcoal">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="small" className="[&_span]:text-white [&_.text-stone-500]:text-white/60 [&_.text-terracotta]:text-dusty-rose" />
          <p className="text-white/50 text-sm">
            © 2024 Little Luxe GETAWAYS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
