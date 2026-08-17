import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import type { Project, CreateProjectInput } from '../../types/project';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { Plus, Edit, Trash2, MapPin, Search } from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const { projects, isLoading, error, addProject, updateProject, deleteProject } = useProjects();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<CreateProjectInput>({
    title: '',
    description: '',
    image_url: '',
    location: 'Beside Shangri-La Hotel, Sheikh Zayed Road',
    category: 'DOOH Campaigns',
    optional_details: '',
  });

  const categoryOptions = [
    { value: 'DOOH Campaigns', label: 'DOOH Campaigns' },
    { value: 'Brand Activations', label: 'Brand Activations' },
    { value: 'Digital Screens', label: 'Digital Screens' },
    { value: '3D Anamorphic', label: '3D Anamorphic' },
  ];

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setForm({
      title: '',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      location: 'Beside Shangri-La Hotel, Sheikh Zayed Road',
      category: 'DOOH Campaigns',
      optional_details: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj);
    setForm({
      title: proj.title,
      description: proj.description,
      image_url: proj.image_url,
      location: proj.location,
      category: proj.category,
      optional_details: proj.optional_details || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image_url) return;

    setIsSubmitting(true);
    try {
      if (editingProject) {
        await updateProject(editingProject.id, form);
      } else {
        await addProject(form);
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
      await deleteProject(deletingId);
      setDeletingId(null);
    } catch (err: any) {
      alert(err.message || 'Delete failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Manage Projects Showcase</h2>
          <p className="text-xs text-slate-500 font-medium">Add, edit, or delete dynamic campaigns displayed on the website.</p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenAddModal} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Project
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search projects by title, category, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold hidden sm:block">
          Total: <strong className="text-amber-700">{filteredProjects.length}</strong> campaigns
        </div>
      </div>

      {/* Projects Table */}
      {isLoading ? (
        <Spinner label="Loading projects..." />
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
                  <th className="px-6 py-3.5">Image & Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Location</th>
                  <th className="px-6 py-3.5">Description</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                      No projects found matching search filter.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-900 flex items-center gap-3">
                        <img src={p.image_url} alt="" className="w-12 h-9 object-cover rounded-lg bg-slate-100 border border-slate-200 shrink-0" />
                        <span className="line-clamp-1">{p.title}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge variant="gold" size="sm">{p.category}</Badge>
                      </td>
                      <td className="px-6 py-3.5 text-slate-700 font-medium">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate max-w-[180px]">{p.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-slate-600 max-w-xs font-medium">
                        <p className="line-clamp-2">{p.description}</p>
                      </td>
                      <td className="px-6 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
                            title="Edit Project"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingId(p.id)}
                            className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                            title="Delete Project"
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

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project Campaign' : 'Add New Project Campaign'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Project Title *"
            placeholder="e.g. Apex Luxury Vehicle Launch"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category *"
              options={categoryOptions}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <Input
              label="Screen Location *"
              placeholder="e.g. Beside Shangri-La Hotel, Sheikh Zayed Road"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          <Input
            label="Image URL *"
            placeholder="https://images.unsplash.com/..."
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            required
          />

          <Textarea
            label="Campaign Description *"
            placeholder="Brief overview of campaign objectives and placement strategy..."
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <Textarea
            label="Optional Performance Details / Metrics"
            placeholder="e.g. Achieved 1.4M impressions and 45,000 QR scan interactions."
            rows={2}
            value={form.optional_details || ''}
            onChange={(e) => setForm({ ...form, optional_details: e.target.value })}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              {editingProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Project Campaign"
        message="Are you sure you want to delete this project? This action will remove it from the live showcase."
        isLoading={isSubmitting}
      />

    </div>
  );
};
