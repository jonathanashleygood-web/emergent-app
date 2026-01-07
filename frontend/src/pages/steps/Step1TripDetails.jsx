import React from 'react';
import { useForm } from '../../context/FormContext';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { ToggleGroup } from '../../components/ToggleOption';
import FormNavigation from '../../components/FormNavigation';
import { MapPin, Compass } from 'lucide-react';

const flexibilityOptions = [
  { value: 'fixed', label: 'I know exactly where', icon: MapPin },
  { value: 'open', label: 'Open to suggestions', icon: Compass },
];

export const Step1TripDetails = () => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-stone-500 text-lg mb-6">
          Tell us where and when — even rough ideas are perfect.
        </p>
      </div>

      {/* Destinations */}
      <div className="space-y-2">
        <Label htmlFor="destinations" className="text-stone-700 font-medium">
          Where would you like to go?
        </Label>
        <Textarea
          id="destinations"
          data-testid="input-destinations"
          placeholder="e.g., Italy, Bali, or 'somewhere warm with beaches'..."
          value={formData.destinations}
          onChange={(e) => updateFormData({ destinations: e.target.value })}
          className="min-h-[100px] bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
        />
      </div>

      {/* Destination Flexibility */}
      <div className="space-y-3">
        <Label className="text-stone-700 font-medium">
          How set are you on this destination?
        </Label>
        <ToggleGroup
          options={flexibilityOptions}
          value={formData.destination_flexibility}
          onChange={(val) => updateFormData({ destination_flexibility: val })}
        />
      </div>

      {/* Departure Airport */}
      <div className="space-y-2">
        <Label htmlFor="departure_airport" className="text-stone-700 font-medium">
          Departure airport
        </Label>
        <Input
          id="departure_airport"
          data-testid="input-departure-airport"
          placeholder="e.g., London Heathrow, Manchester..."
          value={formData.departure_airport}
          onChange={(e) => updateFormData({ departure_airport: e.target.value })}
          className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
        />
        <div className="flex items-center gap-2 mt-2">
          <Switch
            id="departure_flexible"
            data-testid="switch-departure-flexible"
            checked={formData.departure_flexible}
            onCheckedChange={(checked) => updateFormData({ departure_flexible: checked })}
          />
          <Label htmlFor="departure_flexible" className="text-sm text-stone-500 cursor-pointer">
            I'm flexible on departure airport
          </Label>
        </div>
      </div>

      {/* Travel Dates */}
      <div className="space-y-4">
        <Label className="text-stone-700 font-medium">
          When are you thinking of travelling?
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="travel_start_date" className="text-sm text-stone-500">
              Start date
            </Label>
            <Input
              type="date"
              id="travel_start_date"
              data-testid="input-start-date"
              value={formData.travel_start_date}
              onChange={(e) => updateFormData({ travel_start_date: e.target.value })}
              className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="travel_end_date" className="text-sm text-stone-500">
              End date
            </Label>
            <Input
              type="date"
              id="travel_end_date"
              data-testid="input-end-date"
              value={formData.travel_end_date}
              onChange={(e) => updateFormData({ travel_end_date: e.target.value })}
              className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="travel_date_notes" className="text-sm text-stone-500">
            Or describe your timing
          </Label>
          <Input
            id="travel_date_notes"
            data-testid="input-date-notes"
            placeholder="e.g., 'School holidays in August', 'Anytime in spring'..."
            value={formData.travel_date_notes}
            onChange={(e) => updateFormData({ travel_date_notes: e.target.value })}
            className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta"
          />
        </div>
      </div>

      {/* Trip Length */}
      <div className="space-y-2">
        <Label htmlFor="trip_length_nights" className="text-stone-700 font-medium">
          How many nights?
        </Label>
        <Input
          type="number"
          id="trip_length_nights"
          data-testid="input-trip-length"
          placeholder="e.g., 7, 10, 14..."
          value={formData.trip_length_nights}
          onChange={(e) => updateFormData({ trip_length_nights: e.target.value })}
          className="bg-white border-stone-200 focus:border-terracotta focus:ring-terracotta w-32"
          min="1"
        />
      </div>

      <FormNavigation />
    </div>
  );
};

export default Step1TripDetails;
