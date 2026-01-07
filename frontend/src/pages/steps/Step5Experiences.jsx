import React from 'react';
import { useForm } from '../../context/FormContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { ToggleGroup } from '../../components/ToggleOption';
import FormNavigation from '../../components/FormNavigation';
import { Users, User, Shuffle, PartyPopper } from 'lucide-react';

const explorationOptions = [
  { value: 'guided', label: 'Guided tours & experiences', icon: Users },
  { value: 'independent', label: 'Independent exploration', icon: User },
  { value: 'mixed', label: 'Mix of both', icon: Shuffle },
];

export const Step5Experiences = () => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-stone-500 text-lg mb-6">
          Tell us about the experiences you're dreaming of.
        </p>
      </div>

      {/* Must-Do Experiences */}
      <div className="space-y-2">
        <Label htmlFor="must_do_experiences" className="text-stone-700 font-medium">
          Any must-do experiences or bucket list items?
        </Label>
        <Textarea
          id="must_do_experiences"
          data-testid="input-must-do-experiences"
          placeholder="e.g., 'Hot air balloon ride', 'Cooking class', 'See the Northern Lights'..."
          value={formData.must_do_experiences}
          onChange={(e) => updateFormData({ must_do_experiences: e.target.value })}
          className="min-h-[120px] bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
        />
        <p className="text-sm text-stone-400">
          Don't hold back — we love making dream experiences happen!
        </p>
      </div>

      {/* Exploration Style */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          How do you like to explore?
        </Label>
        <ToggleGroup
          options={explorationOptions}
          value={formData.exploration_style}
          onChange={(val) => updateFormData({ exploration_style: val })}
          columns={1}
        />
      </div>

      {/* Special Occasion */}
      <div className="space-y-2">
        <Label htmlFor="special_occasion" className="text-stone-700 font-medium flex items-center gap-2">
          <PartyPopper className="w-4 h-4 text-terracotta" />
          Celebrating something special? (optional)
        </Label>
        <Input
          id="special_occasion"
          data-testid="input-special-occasion"
          placeholder="e.g., 'Anniversary', 'Birthday', 'Honeymoon'..."
          value={formData.special_occasion}
          onChange={(e) => updateFormData({ special_occasion: e.target.value })}
          className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
        />
        <p className="text-sm text-stone-400">
          Let us help make it extra memorable!
        </p>
      </div>

      <FormNavigation />
    </div>
  );
};

export default Step5Experiences;
