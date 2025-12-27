import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useSkills, SkillCategory, Skill, Certification } from '@/context/SkillsContext';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { ArrowLeft, Plus, Edit2, Trash2, X, Save, Check } from 'lucide-react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

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
        {/* Header */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              <span className="text-muted-foreground">#</span>manage-skills
            </h1>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-4 border-b border-border overflow-x-auto bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-6 lg:px-20">
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                minWidth: 'max-content',
                '& .MuiTab-root': {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  color: 'hsl(var(--muted-foreground))',
                  '&.Mui-selected': {
                    color: 'hsl(var(--foreground))',
                    backgroundColor: 'hsl(var(--secondary))',
                  },
                },
              }}
            >
              <Tab label="Skill Categories" value="categories" />
              <Tab label="Certifications" value="certifications" />
              <Tab label="Summary" value="summary" />
            </Tabs>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
            {/* Skill Categories Tab */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                {/* Add Category Form */}
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
                      <Button
                        variant="contained"
                        onClick={handleSaveCategory}
                        startIcon={<Save size={14} />}
                        fullWidth
                        sx={{
                            bgcolor: '#22c55e', 
                            '&:hover': { bgcolor: '#16a34a' },
                            fontFamily: 'monospace',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            height: '38px'
                        }}
                      >
                        {editingCategoryId ? 'Save' : 'Add'}
                      </Button>
                      
                      {editingCategoryId && (
                        <IconButton
                          onClick={() => {
                            setEditingCategoryId(null);
                            setCategoryForm({ id: '', category: '', description: '', skills: [] });
                          }}
                          sx={{ 
                              border: '1px solid hsl(var(--border))', 
                              borderRadius: 1,
                              color: 'hsl(var(--foreground))',
                              height: '38px',
                              width: '38px'
                          }}
                        >
                          <X size={14} />
                        </IconButton>
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
                          <IconButton
                            onClick={() => {
                              setEditingCategoryId(category.id);
                              setCategoryForm(category);
                            }}
                            size="small"
                            sx={{ 
                                bgcolor: 'rgba(59, 130, 246, 0.1)', 
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                color: '#2563eb',
                                borderRadius: 1,
                                '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.2)' }
                            }}
                          >
                            <Edit2 size={14} />
                          </IconButton>
                          <IconButton
                            onClick={() => setDeleteConfirm({ id: category.id, type: 'category' })}
                            size="small"
                            sx={{ 
                                bgcolor: 'rgba(239, 68, 68, 0.1)', 
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#dc2626',
                                borderRadius: 1,
                                '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
                            }}
                          >
                            <Trash2 size={14} />
                          </IconButton>
                        </div>
                      </div>

                      {/* Skills Section */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-mono font-bold text-muted-foreground uppercase">Skills ({category.skills.length})</p>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                              setSkillForm({ id: '', name: '', proficiency: 50, experience: '', description: '' });
                              setEditingSkillId(`new-${category.id}`);
                            }}
                            startIcon={<Plus size={10} />}
                            sx={{
                                borderColor: 'rgba(22, 163, 74, 0.2)',
                                color: '#16a34a',
                                bgcolor: 'rgba(22, 163, 74, 0.1)',
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                '&:hover': { bgcolor: 'rgba(22, 163, 74, 0.2)', borderColor: '#16a34a' }
                            }}
                          >
                            Add Skill
                          </Button>
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
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleSaveSkill(category.id)}
                                    startIcon={<Check size={14} />}
                                    sx={{
                                      flex: 1,
                                      bgcolor: '#22c55e',
                                      color: 'white',
                                      fontFamily: 'monospace',
                                      textTransform: 'none',
                                      fontSize: '0.75rem',
                                      '&:hover': { bgcolor: '#16a34a' },
                                    }}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setEditingSkillId(null)}
                                    startIcon={<X size={14} />}
                                    sx={{
                                      flex: 1,
                                      borderColor: 'hsl(var(--border))',
                                      color: 'hsl(var(--foreground))',
                                      fontFamily: 'monospace',
                                      textTransform: 'none',
                                      fontSize: '0.75rem',
                                      '&:hover': { bgcolor: 'hsl(var(--secondary))', borderColor: 'hsl(var(--foreground))' },
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                             </div>
                           </div>
                        )}

                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {category.skills.map((skill) => {
                             if (editingSkillId === skill.id) {
                                return (
                                    <div key={skill.id} className="bg-secondary/40 rounded p-3 border border-border border-blue-500/50 col-span-full">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                                            {/* ... Inputs identical to above form ... */}
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
                                                <Button 
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleSaveSkill(category.id)}
                                                    sx={{ 
                                                        flex: 1, 
                                                        bgcolor: '#22c55e', 
                                                        fontSize: '0.75rem', 
                                                        fontFamily: 'monospace',
                                                        '&:hover': { bgcolor: '#16a34a' } 
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                                <Button 
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => setEditingSkillId(null)}
                                                    sx={{ 
                                                        flex: 1, 
                                                        borderColor: 'hsl(var(--border))', 
                                                        color: 'hsl(var(--foreground))',
                                                        fontSize: '0.75rem', 
                                                        fontFamily: 'monospace',
                                                        '&:hover': { bgcolor: 'hsl(var(--secondary))' } 
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
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
                                        <IconButton
                                          onClick={() => {
                                              setEditingSkillId(skill.id);
                                              setSkillForm(skill);
                                          }}
                                          size="small"
                                          sx={{ 
                                              color: '#3b82f6', 
                                              padding: '4px',
                                              '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.1)' } 
                                          }}
                                        >
                                            <Edit2 size={12} />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => setDeleteConfirm({ id: skill.id, type: 'skill' })}
                                          size="small"
                                          sx={{ 
                                              color: '#ef4444', 
                                              padding: '4px',
                                              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } 
                                          }}
                                        >
                                            <Trash2 size={12} />
                                        </IconButton>
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
                      <Button
                        variant="contained"
                        onClick={handleSaveCert}
                        startIcon={<Save size={14} />}
                        fullWidth
                        sx={{
                            bgcolor: '#22c55e', 
                            '&:hover': { bgcolor: '#16a34a' },
                            fontFamily: 'monospace',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            height: '38px'
                        }}
                      >
                        {editingCertId ? 'Save' : 'Add'}
                      </Button>
                      
                      {editingCertId && (
                        <IconButton
                            onClick={() => {
                            setEditingCertId(null);
                            setCertForm({ id: '', title: '', issuer: '', year: '' });
                            }}
                            sx={{ 
                              border: '1px solid hsl(var(--border))', 
                              borderRadius: 1,
                              color: 'hsl(var(--foreground))',
                              height: '38px',
                              width: '38px'
                            }}
                        >
                            <X size={14} />
                        </IconButton>
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
                          <IconButton
                            onClick={() => {
                              setEditingCertId(cert.id);
                              setCertForm(cert);
                            }}
                            size="small"
                            sx={{ 
                                bgcolor: 'rgba(59, 130, 246, 0.1)', 
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                color: '#2563eb',
                                borderRadius: 1,
                                '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.2)' }
                            }}
                          >
                            <Edit2 size={12} />
                          </IconButton>
                          <IconButton
                            onClick={() => setDeleteConfirm({ id: cert.id, type: 'cert' })}
                            size="small"
                            sx={{ 
                                bgcolor: 'rgba(239, 68, 68, 0.1)', 
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: '#dc2626',
                                borderRadius: 1,
                                '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
                            }}
                          >
                            <Trash2 size={12} />
                          </IconButton>
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
                      <Button
                        variant="contained"
                        onClick={handleSaveSummary}
                        startIcon={<Save size={14} />}
                        fullWidth
                        sx={{
                            bgcolor: '#22c55e', 
                            '&:hover': { bgcolor: '#16a34a' },
                            fontFamily: 'monospace',
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            padding: '8px'
                        }}
                      >
                        Save Summary
                      </Button>
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
                <Button
                  variant="outlined"
                  onClick={() => setDeleteConfirm(null)}
                  fullWidth
                  sx={{
                    borderColor: 'hsl(var(--border))', 
                    color: 'hsl(var(--foreground))',
                    fontFamily: 'monospace',
                    textTransform: 'none',
                    '&:hover': { borderColor: 'hsl(var(--foreground))', bgcolor: 'hsl(var(--secondary))' }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={confirmDelete}
                  fullWidth
                  color="error"
                  sx={{
                    fontFamily: 'monospace',
                    textTransform: 'none'
                  }}
                >
                  Delete
                </Button>
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