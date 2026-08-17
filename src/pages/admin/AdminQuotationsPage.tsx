import React, { useState } from 'react';
import { useQuotations } from '../../hooks/useQuotations';
import type { QuotationRequest } from '../../types/quotation';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { Eye, Trash2, Mail, Phone, Calendar, User, Building, Search, FileText } from 'lucide-react';

export const AdminQuotationsPage: React.FC = () => {
  const { quotations, isLoading, error, deleteQuotation } = useQuotations();

  const [search, setSearch] = useState('');
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationRequest | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsSubmitting(true);
    try {
      await deleteQuotation(deletingId);
      setDeletingId(null);
      if (selectedQuotation?.id === deletingId) {
        setSelectedQuotation(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete quotation request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredQuotations = quotations.filter(
    (q) =>
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.service_type.toLowerCase().includes(search.toLowerCase()) ||
      (q.company && q.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Submitted Quotation Requests</h2>
          <p className="text-xs text-slate-500 font-medium">Review commercial placement requests submitted via the public quotation form.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search inquiries by client name, email, company, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold hidden sm:block">
          Total Requests: <strong className="text-sky-700">{filteredQuotations.length}</strong>
        </div>
      </div>

      {/* Quotations Table */}
      {isLoading ? (
        <Spinner label="Loading quotation requests..." />
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
          {error}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Client Name</th>
                  <th className="px-6 py-3.5">Contact Details</th>
                  <th className="px-6 py-3.5">Service Requested</th>
                  <th className="px-6 py-3.5">Date Submitted</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredQuotations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                      No quotation requests found matching filter.
                    </td>
                  </tr>
                ) : (
                  filteredQuotations.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{q.name}</span>
                        </div>
                        {q.company && (
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                            <Building className="w-3 h-3 text-slate-400" />
                            <span>{q.company}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-800">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{q.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{q.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="gold" size="sm">{q.service_type}</Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(q.created_at).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedQuotation(q)}
                            className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-800 flex items-center gap-1 text-[11px] font-bold px-2.5"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => setDeletingId(q.id)}
                            className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                            title="Delete Request"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details View Modal */}
      <Modal
        isOpen={Boolean(selectedQuotation)}
        onClose={() => setSelectedQuotation(null)}
        title="Quotation Request Details"
        maxWidth="lg"
      >
        {selectedQuotation && (
          <div className="flex flex-col gap-6">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Requested Service</span>
                <Badge variant="gold">{selectedQuotation.service_type}</Badge>
              </div>
              <div className="flex flex-col gap-1 text-right text-xs text-slate-500">
                <span>Submission Timestamp</span>
                <span className="font-bold text-slate-800">{new Date(selectedQuotation.created_at).toLocaleString()}</span>
              </div>
            </div>

            {/* Client info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Client Name</span>
                <span className="text-sm font-bold text-slate-900">{selectedQuotation.name}</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Company Name</span>
                <span className="text-sm font-bold text-slate-900">{selectedQuotation.company || 'Not specified'}</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Email Address</span>
                <a href={`mailto:${selectedQuotation.email}`} className="text-sm font-bold text-amber-700 hover:underline">
                  {selectedQuotation.email}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Phone Number</span>
                <a href={`tel:${selectedQuotation.phone}`} className="text-sm font-bold text-emerald-700 hover:underline">
                  {selectedQuotation.phone}
                </a>
              </div>
            </div>

            {/* Message / Requirements */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Client Message & Campaign Requirements</span>
              </h4>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">
                {selectedQuotation.message}
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setDeletingId(selectedQuotation.id)}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Delete Request
              </Button>
              <Button variant="ghost" onClick={() => setSelectedQuotation(null)}>
                Close
              </Button>
            </div>

          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Quotation Request"
        message="Are you sure you want to remove this client inquiry record?"
        isLoading={isSubmitting}
      />

    </div>
  );
};
