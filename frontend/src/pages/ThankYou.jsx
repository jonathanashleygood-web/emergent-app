import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import Logo from '../components/Logo';

export const ThankYou = () => {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/10 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-sage" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="default" />
        </div>

        {/* Message */}
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">
          Thank You!
        </h1>
        <p className="font-accent text-2xl text-terracotta mb-6">
          Your dream trip is in good hands
        </p>
        <p className="text-stone-600 text-lg leading-relaxed mb-8">
          We've received your travel preferences and we're already excited to start planning! 
          We'll review your inquiry and get back to you with tailored ideas within 24-48 hours.
        </p>

        {/* What's Next */}
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm mb-8">
          <h3 className="font-heading text-xl text-charcoal mb-4">What happens next?</h3>
          <ul className="text-left space-y-3 text-stone-600">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta text-sm font-medium">1</span>
              <span>We'll review your preferences and start researching options</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta text-sm font-medium">2</span>
              <span>Carly will reach out with personalized recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta text-sm font-medium">3</span>
              <span>Together, we'll refine and perfect your itinerary</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              variant="outline"
              className="border-2 border-terracotta text-terracotta hover:bg-terracotta/10 rounded-full px-6 py-2 font-medium transition-all flex items-center gap-2"
              data-testid="btn-back-home"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/inquiry">
            <Button
              className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-6 py-2 font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              data-testid="btn-new-inquiry"
            >
              Plan Another Trip
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
