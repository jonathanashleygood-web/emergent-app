import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Plane,
  Heart,
  Utensils,
  FileCheck,
  Clock,
  Trash2,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import Logo from '../components/Logo';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const statusColors = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  booked: 'bg-green-100 text-green-800 border-green-200',
  archived: 'bg-stone-100 text-stone-600 border-stone-200',
};

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.map(v => v.replace(/_/g, ' ')).join(', ') : 'Not specified';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (value === null || value === undefined || value === '') {
    return 'Not specified';
  }
  return String(value).replace(/_/g, ' ');
};

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl border border-stone-200 p-6">
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-100">
      <div className="p-2 bg-terracotta/10 rounded-lg">
        <Icon className="w-5 h-5 text-terracotta" />
      </div>
      <h2 className="font-heading text-xl text-charcoal">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, value }) => (
  <div className="py-2">
    <dt className="text-sm text-stone-500 mb-1">{label}</dt>
    <dd className="text-charcoal font-medium capitalize">{formatValue(value)}</dd>
  </div>
);

export const InquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInquiry = async () => {
    try {
      const response = await axios.get(`${API}/inquiries/${id}`);
      setInquiry(response.data);
    } catch (error) {
      console.error('Error fetching inquiry:', error);
      toast.error('Failed to load inquiry');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiry();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(`${API}/inquiries/${id}/status?status=${newStatus}`);
      setInquiry(prev => ({ ...prev, status: newStatus }));
      toast.success('Status updated');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      await axios.delete(`${API}/inquiries/${id}`);
      toast.success('Inquiry deleted');
      navigate('/admin');
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-stone-500">Loading...</div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-stone-500">Inquiry not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal min-h-screen p-6 flex flex-col">
        <div className="mb-10">
          <Logo size="small" className="[&_span]:text-white [&_.text-stone-500]:text-white/60 [&_.text-terracotta]:text-dusty-rose" />
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white"
          >
            <Users className="w-5 h-5" />
            Inquiries
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-stone-500 hover:text-charcoal mb-4 transition-colors"
            data-testid="btn-back"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-heading text-3xl text-charcoal mb-2">
                {inquiry.first_name} {inquiry.last_name}
              </h1>
              <div className="flex items-center gap-4 text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {inquiry.email}
                </span>
                {inquiry.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    {inquiry.phone}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={inquiry.status} onValueChange={handleStatusChange}>
                <SelectTrigger className={`w-40 ${statusColors[inquiry.status]}`} data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-500 border-red-200 hover:bg-red-50"
                data-testid="btn-delete"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-sm text-stone-400">
            <Clock className="w-4 h-4" />
            Submitted {formatDate(inquiry.created_at)}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trip Details */}
          <Section title="Trip Details" icon={MapPin}>
            <dl className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Destinations" value={inquiry.destinations} />
              </div>
              <Field label="Flexibility" value={inquiry.destination_flexibility} />
              <Field label="Departure Airport" value={inquiry.departure_airport} />
              <Field label="Flexible Departure" value={inquiry.departure_flexible} />
              <Field label="Trip Length" value={inquiry.trip_length_nights ? `${inquiry.trip_length_nights} nights` : null} />
              <Field label="Start Date" value={inquiry.travel_start_date} />
              <Field label="End Date" value={inquiry.travel_end_date} />
              {inquiry.travel_date_notes && (
                <div className="col-span-2">
                  <Field label="Date Notes" value={inquiry.travel_date_notes} />
                </div>
              )}
            </dl>
          </Section>

          {/* Group & Budget */}
          <Section title="Group & Budget" icon={Users}>
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Adults" value={inquiry.adult_count} />
              <Field label="Children" value={inquiry.child_count} />
              {inquiry.child_ages && (
                <div className="col-span-2">
                  <Field label="Children's Ages" value={inquiry.child_ages} />
                </div>
              )}
              <Field label="Budget Min" value={inquiry.budget_min ? `£${inquiry.budget_min}` : null} />
              <Field label="Budget Max" value={inquiry.budget_max ? `£${inquiry.budget_max}` : null} />
              <Field label="Budget Scope" value={inquiry.budget_scope} />
              <Field label="Budget Flexibility" value={inquiry.budget_flexibility} />
            </dl>
          </Section>

          {/* Travel Style */}
          <Section title="Travel Style" icon={Heart}>
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Pace" value={inquiry.travel_pace} />
              <Field label="Accommodation Priority" value={inquiry.accommodation_priority} />
              <div className="col-span-2">
                <Field label="Interests" value={inquiry.travel_interests} />
              </div>
              <div className="col-span-2">
                <Field label="Accommodation Types" value={inquiry.accommodation_type} />
              </div>
            </dl>
          </Section>

          {/* Flights & Transport */}
          <Section title="Flights & Transport" icon={Plane}>
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Flight Priority" value={inquiry.flight_priority} />
              <Field label="Layover Tolerance" value={inquiry.layover_tolerance} />
              <div className="col-span-2">
                <Field label="Airline Preferences" value={inquiry.airline_preferences} />
              </div>
              <div className="col-span-2">
                <Field label="Transport Preferences" value={inquiry.transport_preference} />
              </div>
            </dl>
          </Section>

          {/* Experiences */}
          <Section title="Experiences" icon={Calendar}>
            <dl className="space-y-4">
              <Field label="Must-Do Experiences" value={inquiry.must_do_experiences} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Exploration Style" value={inquiry.exploration_style} />
                <Field label="Special Occasion" value={inquiry.special_occasion} />
              </div>
            </dl>
          </Section>

          {/* Practical Details */}
          <Section title="Practical Details" icon={FileCheck}>
            <dl className="space-y-4">
              <Field label="Dietary Requirements" value={inquiry.dietary_requirements} />
              <Field label="Accessibility Needs" value={inquiry.accessibility_needs} />
              <Field label="Passport Valid (6+ months)" value={inquiry.passport_valid} />
            </dl>
          </Section>

          {/* Contact Preferences */}
          <Section title="Contact & Intent" icon={Mail}>
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Preferred Contact" value={inquiry.preferred_contact_method} />
              <Field label="Booking Timeline" value={inquiry.booking_timeline} />
              <div className="col-span-2">
                <Field label="Planning Style" value={inquiry.planning_style} />
              </div>
            </dl>
          </Section>
        </div>
      </main>
    </div>
  );
};

export default InquiryDetail;
