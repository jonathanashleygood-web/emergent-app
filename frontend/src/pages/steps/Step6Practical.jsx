import React from 'react';
import { useForm } from '../../context/FormContext';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { ToggleGroup } from '../../components/ToggleOption';
import FormNavigation from '../../components/FormNavigation';
import { Check, X, HelpCircle } from 'lucide-react';

const passportOptions = [
  { value: 'yes', label: 'Yes, valid for 6+ months', icon: Check },
  { value: 'no', label: 'No, needs renewing', icon: X },
  { value: 'unsure', label: "I'm not sure", icon: HelpCircle },
];

export const Step6Practical = () => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-stone-500 text-lg mb-6">
          Just a few practical details to help us plan better.
        </p>
      </div>

      {/* Dietary Requirements */}
      <div className="space-y-2">
        <Label htmlFor="dietary_requirements" className="text-stone-700 font-medium">
          Any dietary requirements? (optional)
        </Label>
        <Textarea
          id="dietary_requirements"
          data-testid="input-dietary"
          placeholder="e.g., 'Vegetarian', 'Gluten-free', 'Severe nut allergy'..."
          value={formData.dietary_requirements}
          onChange={(e) => updateFormData({ dietary_requirements: e.target.value })}
          className="min-h-[80px] bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
        />
      </div>

      {/* Accessibility Needs */}
      <div className="space-y-2">
        <Label htmlFor="accessibility_needs" className="text-stone-700 font-medium">
          Any accessibility requirements? (optional)
        </Label>
        <Textarea
          id="accessibility_needs"
          data-testid="input-accessibility"
          placeholder="e.g., 'Wheelchair access', 'Ground floor rooms', 'Limited mobility'..."
          value={formData.accessibility_needs}
          onChange={(e) => updateFormData({ accessibility_needs: e.target.value })}
          className="min-h-[80px] bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
        />
        <p className="text-sm text-stone-400">
          We want to ensure your trip is comfortable and accessible.
        </p>
      </div>

      {/* Passport Valid */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          Is your passport valid for at least 6 months from your travel date?
        </Label>
        <ToggleGroup
          options={passportOptions}
          value={formData.passport_valid}
          onChange={(val) => updateFormData({ passport_valid: val })}
          columns={3}
        />
        {formData.passport_valid === 'no' && (
          <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            No worries! Just make sure to renew before booking. Most destinations require 6 months validity.
          </p>
        )}
      </div>

      <FormNavigation />
    </div>
  );
};

export default Step6Practical;
