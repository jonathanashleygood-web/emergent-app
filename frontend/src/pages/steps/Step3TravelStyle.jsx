import React from 'react';
import { useForm } from '../../context/FormContext';
import { Label } from '../../components/ui/label';
import { ToggleGroup } from '../../components/ToggleOption';
import FormNavigation from '../../components/FormNavigation';
import { 
  Turtle, 
  Footprints, 
  Zap, 
  Landmark, 
  Mountain, 
  UtensilsCrossed, 
  Waves, 
  TreePine, 
  Building2, 
  Sparkles, 
  BadgePercent,
  Hotel,
  Castle,
  Home,
  BedDouble,
  Gem,
  Palette,
  MapPin,
  Shuffle
} from 'lucide-react';

const paceOptions = [
  { value: 'relaxed', label: 'Relaxed — plenty of downtime', icon: Turtle },
  { value: 'balanced', label: 'Balanced — mix of both', icon: Footprints },
  { value: 'fast', label: 'Fast-paced — see it all!', icon: Zap },
];

const interestOptions = [
  { value: 'culture', label: 'Culture & History', icon: Landmark },
  { value: 'adventure', label: 'Adventure & Sports', icon: Mountain },
  { value: 'food_wine', label: 'Food & Wine', icon: UtensilsCrossed },
  { value: 'beach', label: 'Beach & Relaxation', icon: Waves },
  { value: 'nature', label: 'Nature & Wildlife', icon: TreePine },
  { value: 'city', label: 'City Exploration', icon: Building2 },
  { value: 'luxury', label: 'Luxury & Pampering', icon: Sparkles },
  { value: 'value', label: 'Value for Money', icon: BadgePercent },
];

const accommodationOptions = [
  { value: 'boutique_hotel', label: 'Boutique Hotel', icon: Castle },
  { value: 'resort', label: 'Resort', icon: Hotel },
  { value: 'apartment_villa', label: 'Apartment / Villa', icon: Home },
  { value: 'standard_hotel', label: 'Standard Hotel', icon: BedDouble },
];

const priorityOptions = [
  { value: 'comfort', label: 'Comfort', icon: BedDouble },
  { value: 'design', label: 'Design & Style', icon: Palette },
  { value: 'location', label: 'Location', icon: MapPin },
  { value: 'flexible', label: 'Flexible', icon: Shuffle },
];

export const Step3TravelStyle = () => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-stone-500 text-lg mb-6">
          Help us understand your travel personality.
        </p>
      </div>

      {/* Travel Pace */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          What's your ideal travel pace?
        </Label>
        <ToggleGroup
          options={paceOptions}
          value={formData.travel_pace}
          onChange={(val) => updateFormData({ travel_pace: val })}
          columns={1}
        />
      </div>

      {/* Travel Interests */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          What are you most interested in on this trip?
        </Label>
        <p className="text-sm text-stone-400">
          Select all that apply — this helps us tailor recommendations.
        </p>
        <ToggleGroup
          options={interestOptions}
          value={formData.travel_interests}
          onChange={(val) => updateFormData({ travel_interests: val })}
          multiple={true}
        />
      </div>

      {/* Accommodation Type */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          What type of accommodation do you prefer?
        </Label>
        <p className="text-sm text-stone-400">
          Select all that appeal to you.
        </p>
        <ToggleGroup
          options={accommodationOptions}
          value={formData.accommodation_type}
          onChange={(val) => updateFormData({ accommodation_type: val })}
          multiple={true}
        />
      </div>

      {/* Accommodation Priority */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          What matters most in your stay?
        </Label>
        <ToggleGroup
          options={priorityOptions}
          value={formData.accommodation_priority}
          onChange={(val) => updateFormData({ accommodation_priority: val })}
        />
      </div>

      <FormNavigation />
    </div>
  );
};

export default Step3TravelStyle;
