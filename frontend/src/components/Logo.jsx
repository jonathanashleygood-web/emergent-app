import React from 'react';
import { Plane } from 'lucide-react';

export const Logo = ({ size = 'default', className = '' }) => {
  const sizes = {
    small: {
      container: 'gap-2',
      icon: 'w-6 h-6',
      title: 'text-lg',
      subtitle: 'text-xs',
    },
    default: {
      container: 'gap-3',
      icon: 'w-8 h-8',
      title: 'text-2xl',
      subtitle: 'text-sm',
    },
    large: {
      container: 'gap-4',
      icon: 'w-12 h-12',
      title: 'text-4xl',
      subtitle: 'text-base',
    },
  };

  const s = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center ${s.container} ${className}`}>
      <div className="relative">
        <div className="bg-terracotta rounded-full p-2 shadow-lg">
          <Plane className={`${s.icon} text-white transform -rotate-45`} strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-sage rounded-full w-3 h-3 border-2 border-white" />
      </div>
      <div className="flex flex-col">
        <span className={`font-heading ${s.title} text-charcoal tracking-tight leading-none`}>
          Little Luxe
        </span>
        <span className={`font-heading ${s.title} text-terracotta tracking-tight leading-none`}>
          GETAWAYS
        </span>
        <span className={`font-accent ${s.subtitle} text-stone-500 mt-0.5`}>
          by Carly
        </span>
      </div>
    </div>
  );
};

export default Logo;
