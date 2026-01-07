import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Filter,
  Eye,
  Trash2,
  ChevronRight,
  Calendar,
  MapPin,
  DollarSign,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-purple-100 text-purple-800',
  booked: 'bg-green-100 text-green-800',
  archived: 'bg-stone-100 text-stone-600',
};

const statusLabels = {
  new: 'New',
  contacted: 'Contacted',
  in_progress: 'In Progress',
  booked: 'Booked',
  archived: 'Archived',
};

export const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, in_progress: 0, booked: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      const [inquiriesRes, statsRes] = await Promise.all([
        axios.get(`${API}/inquiries?${params.toString()}`),
        axios.get(`${API}/inquiries/stats`)
      ]);
      
      setInquiries(inquiriesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      await axios.delete(`${API}/inquiries/${id}`);
      toast.success('Inquiry deleted');
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

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
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white"
            data-testid="nav-dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 transition-colors"
            data-testid="nav-inquiries"
          >
            <Users className="w-5 h-5" />
            Inquiries
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 transition-colors"
            data-testid="nav-back-to-site"
          >
            <LogOut className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl text-charcoal">Dashboard</h1>
            <p className="text-stone-500">Manage your travel inquiries</p>
          </div>
          <Button
            onClick={fetchInquiries}
            variant="outline"
            className="flex items-center gap-2"
            data-testid="btn-refresh"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'bg-stone-100' },
            { label: 'New', value: stats.new, color: 'bg-blue-100' },
            { label: 'Contacted', value: stats.contacted, color: 'bg-yellow-100' },
            { label: 'In Progress', value: stats.in_progress, color: 'bg-purple-100' },
            { label: 'Booked', value: stats.booked, color: 'bg-green-100' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${stat.color} rounded-2xl p-5`}
            >
              <p className="text-sm text-stone-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-semibold text-charcoal">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Button type="submit" data-testid="btn-search">Search</Button>
            </form>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-stone-500">
              <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin" />
              Loading inquiries...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-12 text-center text-stone-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p>No inquiries found</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {inquiries.map((inquiry, index) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-charcoal">
                          {inquiry.first_name} {inquiry.last_name}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inquiry.status]}`}>
                          {statusLabels[inquiry.status]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {inquiry.destinations?.substring(0, 50) || 'Not specified'}
                          {inquiry.destinations?.length > 50 && '...'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {inquiry.adult_count} adults
                          {inquiry.child_count > 0 && `, ${inquiry.child_count} children`}
                        </span>
                        {(inquiry.budget_min || inquiry.budget_max) && (
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5" />
                            £{inquiry.budget_min || '0'} - £{inquiry.budget_max || '∞'}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(inquiry.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/inquiry/${inquiry.id}`)}
                        className="text-stone-600 hover:text-charcoal"
                        data-testid={`btn-view-${inquiry.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(inquiry.id)}
                        className="text-red-500 hover:text-red-700"
                        data-testid={`btn-delete-${inquiry.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/inquiry/${inquiry.id}`)}
                        className="text-stone-400"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
