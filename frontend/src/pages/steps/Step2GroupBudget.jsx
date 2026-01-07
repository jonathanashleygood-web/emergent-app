import React from 'react';
import { useForm } from '../../context/FormContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ToggleGroup } from '../../components/ToggleOption';
import FormNavigation from '../../components/FormNavigation';
import { Users, Baby, Wallet, PiggyBank, DollarSign, HelpCircle } from 'lucide-react';

const budgetFlexibilityOptions = [
  { value: 'fixed', label: 'Fixed budget', icon: Wallet },
  { value: 'flexible', label: 'Some flexibility', icon: PiggyBank },
  { value: 'unsure', label: 'Not sure yet', icon: HelpCircle },
];

const budgetScopeOptions = [
  { value: 'per_person', label: 'Per person', icon: Users },
  { value: 'total_trip', label: 'Total trip', icon: DollarSign },
];

export const Step2GroupBudget = () => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-stone-500 text-lg mb-6">
          Help us understand your group size and budget range.
        </p>
      </div>

      {/* Traveller Count */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="adult_count" className="text-stone-700 font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Adults
          </Label>
          <Input
            type="number"
            id="adult_count"
            data-testid="input-adult-count"
            value={formData.adult_count}
            onChange={(e) => updateFormData({ adult_count: parseInt(e.target.value) || 0 })}
            className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
            min="1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="child_count" className="text-stone-700 font-medium flex items-center gap-2">
            <Baby className="w-4 h-4" />
            Children
          </Label>
          <Input
            type="number"
            id="child_count"
            data-testid="input-child-count"
            value={formData.child_count}
            onChange={(e) => updateFormData({ child_count: parseInt(e.target.value) || 0 })}
            className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
            min="0"
          />
        </div>
      </div>

      {/* Child Ages */}
      {formData.child_count > 0 && (
        <div className="space-y-2">
          <Label htmlFor="child_ages" className="text-stone-700 font-medium">
            Children's ages
          </Label>
          <Input
            id="child_ages"
            data-testid="input-child-ages"
            placeholder="e.g., 5 and 8, or 'toddler and teenager'"
            value={formData.child_ages}
            onChange={(e) => updateFormData({ child_ages: e.target.value })}
            className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
          />
          <p className="text-sm text-stone-400">This helps us suggest family-friendly options</p>
        </div>
      )}

      {/* Budget Range */}
      <div className="space-y-4">
        <Label className="text-stone-700 font-medium">
          What's your budget range? (optional)
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget_min" className="text-sm text-stone-500">
              Minimum (£)
            </Label>
            <Input
              type="number"
              id="budget_min"
              data-testid="input-budget-min"
              placeholder="e.g., 2000"
              value={formData.budget_min}
              onChange={(e) => updateFormData({ budget_min: e.target.value })}
              className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget_max" className="text-sm text-stone-500">
              Maximum (£)
            </Label>
            <Input
              type="number"
              id="budget_max"
              data-testid="input-budget-max"
              placeholder="e.g., 5000"
              value={formData.budget_max}
              onChange={(e) => updateFormData({ budget_max: e.target.value })}
              className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Budget Scope */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          Is this budget per person or total?
        </Label>
        <ToggleGroup
          options={budgetScopeOptions}
          value={formData.budget_scope}
          onChange={(val) => updateFormData({ budget_scope: val })}
        />
      </div>

      {/* Budget Flexibility */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          How flexible is your budget?
        </Label>
        <p className="text-sm text-stone-400">
          We won't push you — this just helps us suggest realistic options.
        </p>
        <ToggleGroup
          options={budgetFlexibilityOptions}
          value={formData.budget_flexibility}
          onChange={(val) => updateFormData({ budget_flexibility: val })}
          columns={3}
        />
      </div>

      <FormNavigation />
    </div>
  );
};

export default Step2GroupBudget;
