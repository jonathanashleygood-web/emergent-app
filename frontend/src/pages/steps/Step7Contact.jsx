import React from 'react';
import { useForm } from '../../context/FormContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ToggleGroup } from '../../components/ToggleOption';
import FormNavigation from '../../components/FormNavigation';
import { 
  Mail, 
  Phone, 
  MessageCircle,
  Search,
  Calendar,
  Rocket,
  Sparkles,
  ListChecks,
  Handshake
} from 'lucide-react';

const contactOptions = [
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
];

const timelineOptions = [
  { value: 'exploring', label: 'Just exploring', icon: Search },
  { value: '1_3_months', label: 'Within 1-3 months', icon: Calendar },
  { value: 'ready', label: 'Ready to book!', icon: Rocket },
];

const planningOptions = [
  { value: 'full_service', label: 'Plan everything for me', icon: Sparkles },
  { value: 'options', label: 'Give me options to choose', icon: ListChecks },
  { value: 'collaborative', label: 'Let\'s plan together', icon: Handshake },
];

export const Step7Contact = ({ onSubmit, isSubmitting }) => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-stone-500 text-lg mb-6">
          Almost there! How can we reach you?
        </p>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name" className="text-stone-700 font-medium">
            First name *
          </Label>
          <Input
            id="first_name"
            data-testid="input-first-name"
            placeholder="Your first name"
            value={formData.first_name}
            onChange={(e) => updateFormData({ first_name: e.target.value })}
            className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name" className="text-stone-700 font-medium">
            Last name *
          </Label>
          <Input
            id="last_name"
            data-testid="input-last-name"
            placeholder="Your last name"
            value={formData.last_name}
            onChange={(e) => updateFormData({ last_name: e.target.value })}
            className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-stone-700 font-medium">
          Email address *
        </Label>
        <Input
          type="email"
          id="email"
          data-testid="input-email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
          required
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-stone-700 font-medium">
          Phone number (optional)
        </Label>
        <Input
          type="tel"
          id="phone"
          data-testid="input-phone"
          placeholder="+44 7XXX XXX XXX"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
        />
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          Preferred contact method
        </Label>
        <ToggleGroup
          options={contactOptions}
          value={formData.preferred_contact_method}
          onChange={(val) => updateFormData({ preferred_contact_method: val })}
          columns={3}
        />
      </div>

      {/* Booking Timeline */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          When are you hoping to book?
        </Label>
        <p className="text-sm text-stone-400">
          This helps us prioritise planning time.
        </p>
        <ToggleGroup
          options={timelineOptions}
          value={formData.booking_timeline}
          onChange={(val) => updateFormData({ booking_timeline: val })}
          columns={3}
        />
      </div>

      {/* Planning Style */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          How would you like us to help?
        </Label>
        <ToggleGroup
          options={planningOptions}
          value={formData.planning_style}
          onChange={(val) => updateFormData({ planning_style: val })}
          columns={1}
        />
      </div>

      <FormNavigation onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default Step7Contact;
