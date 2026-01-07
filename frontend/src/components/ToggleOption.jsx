import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const ToggleOption = ({ 
  label, 
  selected, 
  onClick, 
  icon: Icon,
  className = '' 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all text-left w-full",
        selected 
          ? "border-terracotta bg-terracotta/10 text-terracotta" 
          : "border-stone-200 hover:border-terracotta/50 hover:bg-terracotta/5 text-stone-600",
        className
      )}
    >
      {Icon && <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />}
      <span className="font-medium flex-1">{label}</span>
      {selected && (
        <Check className="w-5 h-5 text-terracotta flex-shrink-0" strokeWidth={2} />
      )}
    </button>
  );
};

export const ToggleGroup = ({ 
  options, 
  value, 
  onChange, 
  multiple = false,
  columns = 2,
  className = ''
}) => {
  const handleClick = (optionValue) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter(v => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
    }
  };

  const isSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn(`grid ${gridCols[columns] || gridCols[2]} gap-3`, className)}>
      {options.map((option) => (
        <ToggleOption
          key={option.value}
          label={option.label}
          icon={option.icon}
          selected={isSelected(option.value)}
          onClick={() => handleClick(option.value)}
        />
      ))}
    </div>
  );
};

export default ToggleOption;
