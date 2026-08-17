import React, { useState } from 'react';
import { useLocations } from '../../hooks/useLocations';
import type { LocationItem, CreateLocationInput, LocationStatus } from '../../types/location';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { Plus, Edit, Trash2, MapPin, Search } from 'lucide-react';

export const AdminLocationsPage: React.FC = () => {
  const { locations, isLoading, error, addLocation, updateLocation, deleteLocation } = useLocations();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<CreateLocationInput>({
    name: '',
    description: '',
    image_url: '',
    location_text: '',
    zone: 'Sheikh Zayed Road Boulevard Zone',
    status: 'Available',
    display_type: 'Digital LED Screen 4K',
    dimensions: '18m x 6m',
    specs: '',
    map_url: '',
  });

  const statusOptions = [
    { value: 'Available', label: 'Available (متوفرة)' },
    { value: 'Booked', label: 'Booked (محجوزة)' },
  ];

  const handleOpenAddModal = () => {
    setEditingLocation(null);
    setForm({
      name: '',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      location_text: 'Sheikh Zayed Road Boulevard Zone',
      zone: 'Sheikh Zayed Road Boulevard Zone',
      status: 'Available',
      display_type: 'Digital LED Screen 4K',
      dimensions: '18m x 6m',
      specs: 'Dimensions: 18m x 6m | Resolution: 4K LED',
      map_url: 'https://maps.google.com/?q=Sheikh+Zayed+Road+Dubai',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (loc: LocationItem) => {
    setEditingLocation(loc);
    setForm({
      name: loc.name,
      description: loc.description,
      image_url: loc.image_url,
      location_text: loc.location_text,
      zone: loc.zone || 'Sheikh Zayed Road Boulevard Zone',
      status: loc.status || 'Available',
      display_type: loc.display_type || 'Digital LED Screen 4K',
      dimensions: loc.dimensions || '18m x 6m',
      specs: loc.specs || '',
      map_url: loc.map_url || '',
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (loc: LocationItem) => {
    const newStatus: LocationStatus = loc.status === 'Booked' ? 'Available' : 'Booked';
    try {
      await updateLocation(loc.id, { status: newStatus });
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.image_url || !form.location_text) return;

    setIsSubmitting(true);
    try {
      if (editingLocation) {
        await updateLocation(editingLocation.id, form);
      } else {
        await addLocation(form);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsSubmitting(true);
    try {
      await deleteLocation(deletingId);
      setDeletingId(null);
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLocations = locations.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.location_text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Manage Network Locations & Availability</h2>
          <p className="text-xs text-slate-500 font-medium">Add, edit, or toggle status (Available/Booked) for Sheikh Zayed Road Boulevard Zone display sites.</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenAddModal} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Location
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold hidden sm:block">
          Total Sites: <strong className="text-emerald-700">{filteredLocations.length}</strong>
        </div>
      </div>

      {/* Locations Table */}
      {isLoading ? (
        <Spinner label="Loading locations..." />
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
                  <th className="px-6 py-3.5">Image & Name</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Location Text</th>
                  <th className="px-6 py-3.5">Type & Size</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLocations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                      No locations found.
                    </td>
                  </tr>
                ) : (
                  filteredLocations.map((loc) => {
                    const isShangriLa = loc.name.toLowerCase().includes('shangri-la') || loc.location_text.toLowerCase().includes('shangri-la');
                    const isAvailable = loc.status === 'Available' || !loc.status;

                    return (
                      <tr key={loc.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3.5 font-bold text-slate-900 flex items-center gap-3">
                          <img src={loc.image_url} alt="" className="w-12 h-9 object-cover rounded-lg bg-slate-100 border border-slate-200 shrink-0" />
                          <div>
                            <span className="line-clamp-1">{loc.name}</span>
                            {isShangriLa && <Badge variant="gold" size="sm" className="mt-0.5">FLAGSHIP</Badge>}
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <button
                            onClick={() => handleToggleStatus(loc)}
                            title="Click to toggle status"
                            className="cursor-pointer"
                          >
                            <Badge variant={isAvailable ? 'emerald' : 'red'} size="sm">
                              {isAvailable ? 'Available (متوفرة)' : 'Booked (محجوزة)'}
                            </Badge>
                          </button>
                        </td>
                        <td className="px-6 py-3.5 text-slate-800 font-medium">
                          <div className="flex items-center gap-1 font-bold text-amber-700">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span>{loc.location_text}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-slate-600 font-medium">
                          <div className="font-bold text-slate-900">{loc.display_type || 'Digital LED'}</div>
                          <div className="text-[11px] text-slate-500">{loc.dimensions || '18m x 6m'}</div>
                        </td>
                        <td className="px-6 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(loc)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
                              title="Edit Location"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingId(loc.id)}
                              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                              title="Delete Location"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLocation ? 'Edit Network Location' : 'Add New Network Location'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Location Name *"
            placeholder="e.g. Shangri-La Horizon Mega Screen"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Availability Status *"
              options={statusOptions}
              value={form.status || 'Available'}
              onChange={(e) => setForm({ ...form, status: e.target.value as LocationStatus })}
            />
            <Input
              label="Display Type *"
              placeholder="e.g. Digital LED Screen 4K"
              value={form.display_type || ''}
              onChange={(e) => setForm({ ...form, display_type: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location Landmark / Description Text *"
              placeholder="e.g. Beside Shangri-La Hotel, Sheikh Zayed Road"
              value={form.location_text}
              onChange={(e) => setForm({ ...form, location_text: e.target.value })}
              required
            />
            <Input
              label="Screen Dimensions *"
              placeholder="e.g. 18m x 6m"
              value={form.dimensions || ''}
              onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
            />
          </div>

          <Input
            label="Image URL *"
            placeholder="https://images.unsplash.com/..."
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            required
          />

          <Input
            label="Google Maps URL"
            placeholder="https://maps.google.com/?q=..."
            value={form.map_url || ''}
            onChange={(e) => setForm({ ...form, map_url: e.target.value })}
          />

          <Textarea
            label="Site Description *"
            placeholder="Detailed description of visibility, traffic orientation, and dwell time..."
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <Input
            label="Technical Specs (Dimensions, Resolution, Impressions)"
            placeholder="e.g. Dimensions: 18m x 6m | Resolution: 4K Ultra HD | Impressions: 280,000+"
            value={form.specs || ''}
            onChange={(e) => setForm({ ...form, specs: e.target.value })}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              {editingLocation ? 'Save Location' : 'Create Location'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Location"
        message="Are you sure you want to remove this location from the network database?"
        isLoading={isSubmitting}
      />

    </div>
  );
};
