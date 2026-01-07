import React from 'react';
import { useForm } from '../../context/FormContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ToggleGroup } from '../../components/ToggleOption';
import FormNavigation from '../../components/FormNavigation';
import { 
  PiggyBank, 
  Zap, 
  Plane, 
  Scale,
  Ban,
  Clock,
  Shuffle,
  Car,
  Bus,
  CarTaxiFront
} from 'lucide-react';

const flightPriorityOptions = [
  { value: 'cheapest', label: 'Cheapest option', icon: PiggyBank },
  { value: 'fastest', label: 'Fastest route', icon: Zap },
  { value: 'direct', label: 'Direct flights only', icon: Plane },
  { value: 'balanced', label: 'Best balance', icon: Scale },
];

const layoverOptions = [
  { value: 'none', label: 'No layovers', icon: Ban },
  { value: 'short_only', label: 'Short layovers OK', icon: Clock },
  { value: 'flexible', label: 'Flexible', icon: Shuffle },
];

const transportOptions = [
  { value: 'transfers', label: 'Private transfers', icon: CarTaxiFront },
  { value: 'public_transport', label: 'Public transport', icon: Bus },
  { value: 'car_hire', label: 'Car hire', icon: Car },
  { value: 'flexible', label: 'Flexible / Mix', icon: Shuffle },
];

export const Step4Flights = () => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-stone-500 text-lg mb-6">
          Let us know your preferences for getting there and around.
        </p>
      </div>

      {/* Flight Priority */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          What matters most for flights?
        </Label>
        <ToggleGroup
          options={flightPriorityOptions}
          value={formData.flight_priority}
          onChange={(val) => updateFormData({ flight_priority: val })}
        />
      </div>

      {/* Layover Tolerance */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          How do you feel about layovers?
        </Label>
        <ToggleGroup
          options={layoverOptions}
          value={formData.layover_tolerance}
          onChange={(val) => updateFormData({ layover_tolerance: val })}
          columns={3}
        />
      </div>

      {/* Airline Preferences */}
      <div className="space-y-2">
        <Label htmlFor="airline_preferences" className="text-stone-700 font-medium">
          Any airline preferences? (optional)
        </Label>
        <Input
          id="airline_preferences"
          data-testid="input-airline-preferences"
          placeholder="e.g., 'BA for Avios', 'No budget airlines'..."
          value={formData.airline_preferences}
          onChange={(e) => updateFormData({ airline_preferences: e.target.value })}
          className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
        />
      </div>

      {/* Transport Preferences */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          How would you like to get around at your destination?
        </Label>
        <p className="text-sm text-stone-400">
          Select all that work for you.
        </p>
        <ToggleGroup
          options={transportOptions}
          value={formData.transport_preference}
          onChange={(val) => updateFormData({ transport_preference: val })}
          multiple={true}
        />
      </div>

      <FormNavigation />
    </div>
  );
};

export default Step4Flights;
