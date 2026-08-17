import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { useLocations } from '../../hooks/useLocations';
import { useQuotations } from '../../hooks/useQuotations';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FolderKanban, MapPin, FileText, Plus, ExternalLink, Clock } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { projects } = useProjects();
  const { locations } = useLocations();
  const { quotations } = useQuotations();

  const recentQuotations = quotations.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="gold" size="sm">MANAGEMENT PORTAL</Badge>
            <span className="text-xs text-slate-500 font-semibold">Aldar Media Content System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Aldar Media Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Manage Sheikh Zayed Road Boulevard Zone projects, screen locations, and client quotation requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/projects">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Project
            </Button>
          </Link>
          <Link to="/admin/locations">
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Location
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Projects</span>
            <span className="text-3xl font-black text-slate-900">{projects.length}</span>
            <span className="text-[11px] text-slate-500 font-semibold">Published in Showcase</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Network Locations</span>
            <span className="text-3xl font-black text-emerald-700">{locations.length}</span>
            <span className="text-[11px] text-slate-500 font-semibold">Boulevard Zone Corridor</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Inbound Quotations</span>
            <span className="text-3xl font-black text-sky-700">{quotations.length}</span>
            <span className="text-[11px] text-slate-500 font-semibold">Saved to Supabase</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700">
            <FileText className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Recent Client Quotation Inquiries</h3>
            <Badge variant="blue" size="sm">{recentQuotations.length} Latest</Badge>
          </div>
          <Link to="/admin/quotations">
            <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              View All Inquiries
            </Button>
          </Link>
        </div>

        {recentQuotations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs font-medium">
            No quotation requests submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Client Name</th>
                  <th className="px-6 py-3.5">Email & Phone</th>
                  <th className="px-6 py-3.5">Service Requested</th>
                  <th className="px-6 py-3.5">Date Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentQuotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div>{q.name}</div>
                      {q.company && <div className="text-[11px] text-slate-500 font-medium">{q.company}</div>}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <div>{q.email}</div>
                      <div className="text-[11px] text-slate-500">{q.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="gold" size="sm">{q.service_type}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap flex items-center gap-1.5 pt-5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(q.created_at).toLocaleDateString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
