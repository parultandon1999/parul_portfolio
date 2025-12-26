import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useSkills, SkillCategory, Skill, Certification } from '@/context/SkillsContext';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { ArrowLeft, Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const AdminSkills = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { skillsData, updateSkillsData, addCategory, updateCategory, deleteCategory, addSkill, updateSkill, deleteSkill, addCertification, updateCertification, deleteCertification } = useSkills();

  const [activeTab, setActiveTab] = useState<'categories' | 'certifications' | 'summary'>('categories');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: 'category' | 'skill' | 'cert' } | null>(null);

  const [categoryForm, setCategoryForm] = useState<SkillCategory>({ id: '', category: '', description: '', skills: [] });
  const [skillForm, setSkillForm] = useState<Skill>({ id: '', name: '', proficiency: 50, experience: '', description: '' });
  const [certForm, setCertForm] = useState<Certification>({ id: '', title: '', issuer: '', year: '' });
  const [summaryForm, setSummaryForm] = useState(skillsData.summary);

  if (isLoading) return null;
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleSaveCategory = () => {
    if (editingCategoryId) {
      updateCategory(editingCategoryId, categoryForm);
      setEditingCategoryId(null);
    } else {
      addCategory({ ...categoryForm, id: Date.now().toString() });
    }
    setCategoryForm({ id: '', category: '', description: '', skills: [] });
  };

  const handleSaveSkill = (categoryId: string) => {
    if (editingSkillId) {
      updateSkill(categoryId, editingSkillId, skillForm);
      setEditingSkillId(null);
    } else {
      addSkill(categoryId, { ...skillForm, id: Date.now().toString() });
    }
    setSkillForm({ id: '', name: '', proficiency: 50, experience: '', description: '' });
  };

  const handleSaveCert = () => {
    if (editingCertId) {
      updateCertification(editingCertId, certForm);
      setEditingCertId(null);
    } else {
      addCertification({ ...certForm, id: Date.now().toString() });
    }
    setCertForm({ id: '', title: '', issuer: '', year: '' });
  };

  const handleSaveSummary = () => {
    updateSkillsData({ ...skillsData, summary: summaryForm });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'category') {
      deleteCategory(deleteConfirm.id);
    } else if (deleteConfirm.type === 'cert') {
      deleteCertification(deleteConfirm.id);
    } else if (deleteConfirm.type === 'skill') {
        // Need to find which category contains this skill to delete it
        // The context deleteSkill function might need categoryId, 
        // strictly speaking based on context usually provided, deleteSkill takes (catId, skillId).
        // Since we only stored skillId in deleteConfirm, we might need to iterate.
        // However, assuming the context handles it or we pass it:
        // Let's safe guard. Ideally we should store catId in deleteConfirm for skills.
        skillsData.categories.forEach(cat => {
            if(cat.skills.find(s => s.id === deleteConfirm.id)) {
                deleteSkill(cat.id, deleteConfirm.id);
            }
        });
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header - EXCLUDED FROM CHANGES */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-mono text-sm"
            >
              <ArrowLeft size={16} />
              Back to Admin
            </button>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              <span className="text-muted-foreground">#</span>manage-skills
            </h1>
          </div>
        </section>

        {/* Tabs - Compact & Sticky */}
        <section className="py-4 border-b border-border overflow-x-auto bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="flex gap-4 min-w-max">
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 font-mono text-sm transition-all rounded-md ${
                  activeTab === 'categories'
                    ? 'text-background bg-foreground font-bold'
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
              >
                Skill Categories
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`px-4 py-2 font-mono text-sm transition-all rounded-md ${
                  activeTab === 'certifications'
                    ? 'text-background bg-foreground font-bold'
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
              >
                Certifications
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-4 py-2 font-mono text-sm transition-all rounded-md ${
                  activeTab === 'summary'
                    ? 'text-background bg-foreground font-bold'
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
              >
                Summary Stats
              </button>
            </div>
          </div>
        </section>

        {/* Content - Optimized for Density */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
            {/* Skill Categories Tab */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                {/* Add Category Form - Compact Grid */}
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                    {editingCategoryId ? 'Edit Category' : 'Add New Category'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <div className="md:col-span-4">
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Name</label>
                        <input
                        type="text"
                        value={categoryForm.category}
                        onChange={(e) => setCategoryForm({ ...categoryForm, category: e.target.value })}
                        placeholder="Category name"
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                    <div className="md:col-span-6">
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Description</label>
                        <input
                        type="text"
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                        placeholder="Category description"
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <button
                        onClick={handleSaveCategory}
                        className="flex-1 px-3 py-2 bg-green-500 text-white rounded font-mono text-sm hover:bg-green-600 flex items-center justify-center gap-2 h-[38px]"
                      >
                        <Save size={14} />
                        {editingCategoryId ? 'Save' : 'Add'}
                      </button>
                      {editingCategoryId && (
                        <button
                          onClick={() => {
                            setEditingCategoryId(null);
                            setCategoryForm({ id: '', category: '', description: '', skills: [] });
                          }}
                          className="px-3 py-2 border border-border text-foreground rounded font-mono hover:bg-secondary h-[38px]"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Categories List */}
                <div className="grid grid-cols-1 gap-4">
                  {skillsData.categories.map((category) => (
                    <div key={category.id} className="border border-border rounded-lg p-4 bg-background/50">
                      <div className="flex items-center justify-between mb-3 border-b border-border pb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-bold text-foreground">{category.category}</h3>
                          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full hidden md:inline-block">
                             {category.description}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingCategoryId(category.id);
                              setCategoryForm(category);
                            }}
                            className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded hover:bg-blue-500/20"
                            title="Edit Category"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: category.id, type: 'category' })}
                            className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded hover:bg-red-500/20"
                            title="Delete Category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Skills Section */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-mono font-bold text-muted-foreground uppercase">Skills ({category.skills.length})</p>
                          <button
                            onClick={() => {
                              setSkillForm({ id: '', name: '', proficiency: 50, experience: '', description: '' });
                              setEditingSkillId(`new-${category.id}`);
                            }}
                            className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-600 rounded text-xs font-mono hover:bg-green-500/20 flex items-center gap-1"
                          >
                            <Plus size={10} />
                            Add Skill
                          </button>
                        </div>

                        {/* Inline Add/Edit Skill Form */}
                        {editingSkillId?.includes(category.id) && (
                           <div className="bg-secondary/40 rounded p-3 mb-3 border border-border border-dashed">
                             <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                                <div className="md:col-span-3">
                                   <label className="text-[10px] uppercase text-muted-foreground">Name</label>
                                   <input
                                      type="text"
                                      value={skillForm.name}
                                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                                      className="w-full px-2 py-1.5 bg-background border border-border rounded text-xs"
                                      placeholder="Skill Name"
                                   />
                                </div>
                                <div className="md:col-span-2">
                                   <label className="text-[10px] uppercase text-muted-foreground">Proficiency (%)</label>
                                   <input
                                      type="number"
                                      min="0" max="100"
                                      value={skillForm.proficiency}
                                      onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) })}
                                      className="w-full px-2 py-1.5 bg-background border border-border rounded text-xs"
                                   />
                                </div>
                                <div className="md:col-span-2">
                                   <label className="text-[10px] uppercase text-muted-foreground">Experience</label>
                                   <input
                                      type="text"
                                      value={skillForm.experience}
                                      onChange={(e) => setSkillForm({ ...skillForm, experience: e.target.value })}
                                      className="w-full px-2 py-1.5 bg-background border border-border rounded text-xs"
                                      placeholder="e.g. 2 years"
                                   />
                                </div>
                                <div className="md:col-span-3">
                                   <label className="text-[10px] uppercase text-muted-foreground">Description</label>
                                   <input
                                      type="text"
                                      value={skillForm.description}
                                      onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                                      className="w-full px-2 py-1.5 bg-background border border-border rounded text-xs"
                                      placeholder="Optional details"
                                   />
                                </div>
                                <div className="md:col-span-2 flex gap-1">
                                   <button onClick={() => handleSaveSkill(category.id)} className="flex-1 bg-green-500 text-white rounded text-xs py-1.5 hover:bg-green-600">Save</button>
                                   <button onClick={() => setEditingSkillId(null)} className="flex-1 bg-secondary border border-border rounded text-xs py-1.5 hover:bg-muted">Cancel</button>
                                </div>
                             </div>
                           </div>
                        )}

                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {category.skills.map((skill) => {
                             // Don't show the skill being edited in the list if it's being edited inline
                             if (editingSkillId === skill.id) {
                                return (
                                    <div key={skill.id} className="bg-secondary/40 rounded p-3 border border-border border-blue-500/50 col-span-full">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                                            <div className="md:col-span-3">
                                                <label className="text-[10px] uppercase text-muted-foreground">Name</label>
                                                <input
                                                type="text"
                                                value={skillForm.name}
                                                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                                                className="w-full px-2 py-1.5 bg-background border border-border rounded text-xs"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] uppercase text-muted-foreground">Proficiency</label>
                                                <input
                                                type="number" min="0" max="100"
                                                value={skillForm.proficiency}
                                                onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) })}
                                                className="w-full px-2 py-1.5 bg-background border border-border rounded text-xs"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] uppercase text-muted-foreground">Exp</label>
                                                <input
                                                type="text"
                                                value={skillForm.experience}
                                                onChange={(e) => setSkillForm({ ...skillForm, experience: e.target.value })}
                                                className="w-full px-2 py-1.5 bg-background border border-border rounded text-xs"
                                                />
                                            </div>
                                            <div className="md:col-span-3">
                                                <label className="text-[10px] uppercase text-muted-foreground">Desc</label>
                                                <input
                                                type="text"
                                                value={skillForm.description}
                                                onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                                                className="w-full px-2 py-1.5 bg-background border border-border rounded text-xs"
                                                />
                                            </div>
                                            <div className="md:col-span-2 flex gap-1">
                                                <button onClick={() => handleSaveSkill(category.id)} className="flex-1 bg-green-500 text-white rounded text-xs py-1.5 hover:bg-green-600">Save</button>
                                                <button onClick={() => setEditingSkillId(null)} className="flex-1 bg-secondary border border-border rounded text-xs py-1.5 hover:bg-muted">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                             }
                             return (
                                <div key={skill.id} className="group bg-secondary/20 rounded p-2 flex items-center justify-between border border-transparent hover:border-border hover:bg-secondary/40 transition-all">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-mono text-sm font-bold text-foreground truncate">{skill.name}</p>
                                            <span className="text-[10px] font-mono bg-background/50 px-1.5 rounded text-muted-foreground">{skill.proficiency}%</span>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground truncate">{skill.experience} {skill.description ? `• ${skill.description}` : ''}</p>
                                    </div>
                                    <div className="flex gap-1 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                        onClick={() => {
                                            setEditingSkillId(skill.id);
                                            setSkillForm(skill);
                                        }}
                                        className="p-1 text-blue-500 hover:bg-blue-500/10 rounded"
                                        >
                                            <Edit2 size={12} />
                                        </button>
                                        <button
                                        onClick={() => setDeleteConfirm({ id: skill.id, type: 'skill' })}
                                        className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                             )
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div className="space-y-6">
                {/* Add Certification Form */}
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                    {editingCertId ? 'Edit Certification' : 'Add New Certification'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <div className="md:col-span-5">
                       <label className="block text-xs font-mono text-muted-foreground mb-1">Title</label>
                        <input
                        type="text"
                        value={certForm.title}
                        onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                        placeholder="Certification Title"
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Issuer</label>
                        <input
                        type="text"
                        value={certForm.issuer}
                        onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                        placeholder="Issuer"
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Year</label>
                        <input
                        type="text"
                        value={certForm.year}
                        onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                        placeholder="Year"
                        className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground"
                        />
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <button
                        onClick={handleSaveCert}
                        className="flex-1 px-3 py-2 bg-green-500 text-white rounded font-mono text-sm hover:bg-green-600 flex items-center justify-center gap-2 h-[38px]"
                      >
                        <Save size={14} />
                        {editingCertId ? 'Save' : 'Add'}
                      </button>
                      {editingCertId && (
                         <button
                            onClick={() => {
                            setEditingCertId(null);
                            setCertForm({ id: '', title: '', issuer: '', year: '' });
                            }}
                            className="px-3 py-2 border border-border text-foreground rounded font-mono hover:bg-secondary h-[38px]"
                         >
                            <X size={14} />
                         </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certifications List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillsData.certifications.map((cert) => (
                    <div key={cert.id} className="border border-border rounded-lg p-3 bg-background/50 hover:bg-secondary/20 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-bold text-foreground text-sm truncate" title={cert.title}>{cert.title}</h3>
                          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                          <p className="text-[10px] font-mono text-muted-foreground mt-1 bg-secondary/50 inline-block px-1.5 rounded">{cert.year}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setEditingCertId(cert.id);
                              setCertForm(cert);
                            }}
                            className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded hover:bg-blue-500/20"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: cert.id, type: 'cert' })}
                            className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded hover:bg-red-500/20"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Tab */}
            {activeTab === 'summary' && (
              <div className="border border-border rounded-lg p-4 bg-secondary/30">
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Summary Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">Total Skills</label>
                    <input
                      type="number"
                      value={summaryForm.totalSkills}
                      onChange={(e) => setSummaryForm({ ...summaryForm, totalSkills: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground focus:outline-none focus:border-foreground text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">Years Experience</label>
                    <input
                      type="text"
                      value={summaryForm.yearsExperience}
                      onChange={(e) => setSummaryForm({ ...summaryForm, yearsExperience: e.target.value })}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground focus:outline-none focus:border-foreground text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">Total Categories</label>
                    <input
                      type="number"
                      value={summaryForm.totalCategories}
                      onChange={(e) => setSummaryForm({ ...summaryForm, totalCategories: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground focus:outline-none focus:border-foreground text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">Avg Proficiency (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={summaryForm.averageProficiency}
                      onChange={(e) => setSummaryForm({ ...summaryForm, averageProficiency: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground focus:outline-none focus:border-foreground text-sm font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4 mt-2">
                      <button
                        onClick={handleSaveSummary}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded font-mono hover:bg-green-600 flex items-center justify-center gap-2 text-sm"
                      >
                        <Save size={14} />
                        Save Summary
                      </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-lg p-5 max-w-sm w-full shadow-xl">
              <h3 className="text-lg font-bold text-foreground mb-2">Confirm Delete</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {deleteConfirm.type === 'category'
                  ? 'This will delete the category and all its skills.'
                  : deleteConfirm.type === 'skill'
                  ? 'Are you sure you want to remove this skill?'
                  : 'This certification will be removed permanently.'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-3 py-2 border border-border text-foreground rounded font-mono text-sm hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded font-mono text-sm hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminSkills;