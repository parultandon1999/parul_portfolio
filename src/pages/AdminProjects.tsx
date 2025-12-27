import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useProjects, Project, ProjectImage } from '@/context/ProjectsContext';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { ArrowLeft, Plus, Edit2, Trash2, X, Upload, Eye, ChevronLeft, ChevronRight, Save, Github, Globe } from 'lucide-react';

const AdminProjects = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [previewProjectId, setPreviewProjectId] = useState<number | null>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; type: 'project' | 'image' } | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    tags: [],
    github: '',
    demo: '',
    image: '',
    images: [],
    hoverPreview: {
      title: '',
      description: '',
      image: '',
    },
  });
  const [tagInput, setTagInput] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageDesc, setImageDesc] = useState('');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editingImageTitle, setEditingImageTitle] = useState('');
  const [editingImageDesc, setEditingImageDesc] = useState('');
  const [demoPreviewEnabled, setDemoPreviewEnabled] = useState(true);

  if (isLoading) return null;
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags,
      github: project.github,
      demo: project.demo,
      image: project.image || '',
      images: project.images || [],
      hoverPreview: project.hoverPreview || {
        title: project.title,
        description: project.description,
        image: project.image || '',
      },
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({
          ...formData,
          image: base64,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHoverPreviewImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({
          ...formData,
          hoverPreview: {
            ...formData.hoverPreview!,
            image: base64,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGalleryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && imageTitle.trim()) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        const newImage: ProjectImage = {
          id: Date.now().toString(),
          title: imageTitle,
          description: imageDesc,
          url: base64,
        };
        setFormData({
          ...formData,
          images: [...(formData.images || []), newImage],
        });
        setImageTitle('');
        setImageDesc('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = (img: ProjectImage) => {
    setEditingImageId(img.id);
    setEditingImageTitle(img.title);
    setEditingImageDesc(img.description);
  };

  const handleSaveImageEdit = () => {
    if (editingImageId) {
      setFormData({
        ...formData,
        images: formData.images?.map(img =>
          img.id === editingImageId
            ? { ...img, title: editingImageTitle, description: editingImageDesc }
            : img
        ) || [],
      });
      setEditingImageId(null);
      setEditingImageTitle('');
      setEditingImageDesc('');
    }
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    
    if (deleteConfirm.type === 'project') {
      deleteProject(deleteConfirm.id);
    } else if (deleteConfirm.type === 'image') {
      if (deleteConfirm.id === 1) {
        setFormData({ ...formData, image: '' });
      } else if (deleteConfirm.id === 2) {
        setFormData({
          ...formData,
          hoverPreview: { ...formData.hoverPreview!, image: '' },
        });
      } else {
        setFormData({
          ...formData,
          images: formData.images?.filter(img => img.id !== deleteConfirm.id.toString()) || [],
        });
      }
    }
    setDeleteConfirm(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
    } else {
      addProject(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: [],
      github: '',
      demo: '',
      image: '',
      images: [],
      hoverPreview: { title: '', description: '', image: '' },
    });
    setEditingId(null);
    setShowForm(false);
    setTagInput('');
    setImageTitle('');
    setImageDesc('');
  };

  const previewProject = previewProjectId ? projects.find(p => p.id === previewProjectId) : null;
  const previewImages = previewProject?.images || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header - Preserved */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="flex items-center justify-between">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                <span className="text-muted-foreground">#</span>manage-projects
              </h1>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg font-mono hover:bg-foreground/90 transition-colors shadow-sm text-sm"
              >
                <Plus size={16} />
                Add Project
              </button>
            </div>
          </div>
        </section>

        {/* Projects Grid - Optimized */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-border rounded-lg overflow-hidden hover:border-foreground/50 transition-colors bg-secondary/5 group">
                  <div className="p-3 border-b border-border flex items-center justify-between bg-secondary/20">
                    <h3 className="text-base font-bold text-foreground truncate max-w-[150px]" title={project.title}>{project.title}</h3>
                    <div className="flex gap-1">
                      <button onClick={() => setPreviewProjectId(previewProjectId === project.id ? null : project.id)} className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded hover:bg-blue-500/20">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => handleEdit(project)} className="p-1.5 bg-green-500/10 border border-green-500/20 text-green-600 rounded hover:bg-green-500/20">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteConfirm({ id: project.id, type: 'project' })} className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded hover:bg-red-500/20">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 space-y-3">
                    <div className="flex gap-3">
                        {project.image ? (
                           <img src={project.image} alt={project.title} className="w-20 h-20 object-cover rounded bg-secondary" />
                        ) : (
                           <div className="w-20 h-20 bg-secondary rounded flex items-center justify-center text-muted-foreground">
                             <Eye size={20} />
                           </div>
                        )}
                        <div className="flex-1 min-w-0">
                           <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-2">{project.description}</p>
                           <div className="flex gap-2">
                              {project.github && <a href={project.github} target="_blank" className="text-muted-foreground hover:text-foreground"><Github size={14}/></a>}
                              {project.demo && <a href={project.demo} target="_blank" className="text-muted-foreground hover:text-foreground"><Globe size={14}/></a>}
                           </div>
                        </div>
                    </div>

                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 bg-secondary text-muted-foreground text-[10px] font-mono rounded border border-border">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && <span className="text-[10px] text-muted-foreground px-1">+{project.tags.length - 4}</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Modal - Denser Layout */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
              <div className="sticky top-0 bg-card/95 border-b border-border p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-bold text-foreground">
                  {editingId ? 'Edit Project' : 'New Project'}
                </h2>
                <div className="flex gap-2">
                    <button type="button" onClick={handleSubmit} className="px-3 py-1.5 bg-foreground text-background rounded font-mono text-xs hover:bg-foreground/90 flex items-center gap-2">
                        <Save size={14} /> Save
                    </button>
                    <button onClick={resetForm} className="p-1.5 hover:bg-secondary rounded border border-transparent hover:border-border transition-all">
                        <X size={18} />
                    </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Left Column (Main Info) */}
                <div className="md:col-span-8 space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-muted-foreground mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-mono text-muted-foreground mb-1">GitHub</label>
                                <input
                                    type="text"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                                    placeholder="https://"
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-mono text-muted-foreground mb-1">Demo</label>
                                <input
                                    type="text"
                                    value={formData.demo}
                                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                    className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                                    placeholder="https://"
                                />
                            </div>
                        </div>
                     </div>

                    <div>
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground resize-none"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Tags</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                placeholder="Add tag..."
                                className="flex-1 px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                            />
                            <button type="button" onClick={handleAddTag} className="px-3 py-2 bg-secondary border border-border rounded hover:bg-foreground hover:text-background transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-secondary/30 rounded border border-border/50">
                            {formData.tags.map((tag) => (
                            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-background border border-border rounded text-xs">
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(tag)} className="text-muted-foreground hover:text-red-500"><X size={12} /></button>
                            </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (Images) */}
                <div className="md:col-span-4 space-y-4">
                     {/* Main Image */}
                    <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                        <label className="text-xs font-mono font-bold text-muted-foreground block mb-2">Main Image</label>
                        <div className="relative group">
                            {formData.image ? (
                                <>
                                    <img src={formData.image} className="w-full h-32 object-cover rounded bg-background" alt="Main" />
                                    <button type="button" onClick={() => setDeleteConfirm({ id: 1, type: 'image' })} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded hover:border-foreground/50 cursor-pointer transition-colors bg-secondary/10">
                                    <Upload size={20} className="mb-1 text-muted-foreground" />
                                    <span className="text-[10px] text-muted-foreground">Upload</span>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Hover Preview Toggle & Image */}
                    <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                             <label className="text-xs font-mono font-bold text-muted-foreground">Preview Image</label>
                             <button type="button" onClick={() => setDemoPreviewEnabled(!demoPreviewEnabled)} className={`text-[10px] px-1.5 py-0.5 rounded border ${demoPreviewEnabled ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-secondary border-border text-muted-foreground'}`}>
                                {demoPreviewEnabled ? 'ON' : 'OFF'}
                             </button>
                        </div>
                        {demoPreviewEnabled && (
                            <div className="relative group">
                                {formData.hoverPreview?.image ? (
                                    <>
                                        <img src={formData.hoverPreview.image} className="w-full h-24 object-cover rounded bg-background" alt="Preview" />
                                        <button type="button" onClick={() => setDeleteConfirm({ id: 2, type: 'image' })} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
                                    </>
                                ) : (
                                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-border rounded hover:border-foreground/50 cursor-pointer transition-colors bg-secondary/10">
                                        <span className="text-[10px] text-muted-foreground">+ Upload Preview</span>
                                        <input type="file" accept="image/*" onChange={handleHoverPreviewImageUpload} className="hidden" />
                                    </label>
                                )}
                                <input 
                                    type="text" 
                                    placeholder="Preview Title" 
                                    value={formData.hoverPreview?.title || ''}
                                    onChange={(e) => setFormData({ ...formData, hoverPreview: { ...formData.hoverPreview!, title: e.target.value } })}
                                    className="w-full mt-2 px-2 py-1 bg-background border border-border rounded text-[10px]"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Full Width - Gallery */}
                <div className="md:col-span-12 border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-3">
                         <label className="text-xs font-mono font-bold text-muted-foreground">Gallery Images</label>
                         <label className="text-xs px-2 py-1 bg-secondary border border-border rounded cursor-pointer hover:bg-secondary/80 flex items-center gap-1">
                            <Upload size={12} /> Add Image
                            <input type="file" accept="image/*" onChange={handleAddGalleryImage} className="hidden" />
                        </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
                        <div className="md:col-span-4">
                            <input type="text" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} placeholder="Image Title" className="w-full px-2 py-1.5 bg-secondary border border-border rounded text-xs mb-2" />
                            <input type="text" value={imageDesc} onChange={(e) => setImageDesc(e.target.value)} placeholder="Image Description" className="w-full px-2 py-1.5 bg-secondary border border-border rounded text-xs" />
                        </div>
                        <div className="md:col-span-8 overflow-x-auto">
                            <div className="flex gap-3 pb-2">
                                {formData.images?.map((img) => (
                                    <div key={img.id} className="flex-shrink-0 w-32 bg-secondary/30 border border-border rounded p-2 relative group">
                                        <img src={img.url} className="w-full h-20 object-cover rounded mb-1 bg-background" alt={img.title} />
                                        <p className="text-[10px] font-bold truncate">{img.title || 'Untitled'}</p>
                                        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <button type="button" onClick={() => handleEditImage(img)} className="p-1 bg-blue-500 text-white rounded"><Edit2 size={10}/></button>
                                             <button type="button" onClick={() => setDeleteConfirm({ id: parseInt(img.id), type: 'image' })} className="p-1 bg-red-500 text-white rounded"><X size={10}/></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-lg p-5 max-w-sm w-full shadow-2xl">
              <h3 className="text-base font-bold text-foreground mb-2">
                {deleteConfirm.type === 'project' ? 'Delete Project?' : 'Delete Image?'}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {deleteConfirm.type === 'project' 
                  ? 'This action cannot be undone.'
                  : 'Remove this image permanently?'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-3 py-2 border border-border text-foreground rounded text-xs font-mono hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded text-xs font-mono hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal - Condensed */}
        {previewProject && (
             <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                 <div className="bg-card border border-border rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto p-4 shadow-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-lg font-bold">{previewProject.title}</h2>
                        <button onClick={() => setPreviewProjectId(null)}><X size={18} /></button>
                    </div>
                    <img src={previewProject.image} className="w-full h-40 object-cover rounded mb-4" alt="Main" />
                    <p className="text-sm text-muted-foreground mb-4">{previewProject.description}</p>
                    {previewImages.length > 0 && (
                        <div>
                             <p className="text-xs font-mono mb-2">Gallery Preview</p>
                             <div className="flex gap-2 overflow-x-auto">
                                {previewImages.map(img => (
                                    <img key={img.id} src={img.url} className="w-16 h-16 object-cover rounded border border-border" alt="Thumb" />
                                ))}
                             </div>
                        </div>
                    )}
                 </div>
             </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminProjects;