import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAbout, TimelineEvent, CoreValue } from '@/context/AboutContext';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import { ArrowLeft, Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const AdminAbout = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { aboutData, updateIntro, updateWhoIAm, updateStats, addValue, updateValue, deleteValue, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent, addInterest, removeInterest, addBeyondWork, updateBeyondWork, removeBeyondWork, updateCTA } = useAbout();

  const [activeTab, setActiveTab] = useState<'intro' | 'values' | 'timeline' | 'interests' | 'beyond' | 'cta'>('intro');
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [introForm, setIntroForm] = useState(aboutData.intro);
  const [whoIAmForm, setWhoIAmForm] = useState({ part1: aboutData.whoIAm, part2: aboutData.whoIAmPart2, part3: aboutData.whoIAmPart3 });
  const [statsForm, setStatsForm] = useState(aboutData.stats);
  const [valueForm, setValueForm] = useState<CoreValue>({ id: '', title: '', description: '', icon: '' });
  const [timelineForm, setTimelineForm] = useState<TimelineEvent>({ id: '', year: '', title: '', description: '', icon: '' });
  const [interestInput, setInterestInput] = useState('');
  const [beyondWorkInput, setBeyondWorkInput] = useState('');
  const [ctaForm, setCtaForm] = useState({ heading: aboutData.ctaHeading, description: aboutData.ctaDescription });

  if (isLoading) return null;
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'value') deleteValue(deleteConfirm.id);
    else if (deleteConfirm.type === 'timeline') deleteTimelineEvent(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <SocialSidebar />
      <main className="lg:pl-16">
        {/* Header - Preserved as requested */}
        <section className="py-20 border-b border-border">
          <div className="container mx-auto px-6 lg:px-20">
            <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-mono text-sm">
              <ArrowLeft size={16} />
              Back to Admin
            </button>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              <span className="text-muted-foreground">#</span>manage-about
            </h1>
          </div>
        </section>

        {/* Tabs - Sticky & Compact */}
        <section className="py-4 border-b border-border overflow-x-auto bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="flex gap-4 min-w-max">
              {['intro', 'values', 'timeline', 'interests', 'beyond', 'cta'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 font-mono text-sm transition-all rounded-md ${
                    activeTab === tab 
                      ? 'text-background bg-foreground font-bold' 
                      : 'text-muted-foreground hover:bg-secondary/50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content - Optimized for Density */}
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
            
            {/* Intro Tab */}
            {activeTab === 'intro' && (
              <div className="space-y-6">
                {/* Introduction - Compact Grid */}
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Introduction</h3>
                    <button onClick={() => updateIntro(introForm)} className="px-3 py-1.5 bg-green-500 text-white rounded font-mono text-xs hover:bg-green-600 flex items-center gap-2">
                      <Save size={12} /> Save
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-12">
                      <label className="block text-xs font-mono text-muted-foreground mb-1">Heading</label>
                      <input type="text" value={introForm.heading} onChange={(e) => setIntroForm({ ...introForm, heading: e.target.value })} className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                    </div>
                    <div className="md:col-span-12">
                      <label className="block text-xs font-mono text-muted-foreground mb-1">Description</label>
                      <textarea value={introForm.description} onChange={(e) => setIntroForm({ ...introForm, description: e.target.value })} rows={2} className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground resize-none" />
                    </div>
                  </div>
                </div>

                {/* Who I Am - 3 Column Grid */}
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Who I Am</h3>
                     <button onClick={() => { updateWhoIAm(whoIAmForm.part1, 1); updateWhoIAm(whoIAmForm.part2, 2); updateWhoIAm(whoIAmForm.part3, 3); }} className="px-3 py-1.5 bg-green-500 text-white rounded font-mono text-xs hover:bg-green-600 flex items-center gap-2">
                      <Save size={12} /> Save
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Paragraph 1', val: whoIAmForm.part1, key: 'part1' },
                      { label: 'Paragraph 2', val: whoIAmForm.part2, key: 'part2' },
                      { label: 'Paragraph 3', val: whoIAmForm.part3, key: 'part3' }
                    ].map((part, idx) => (
                      <div key={idx}>
                        <label className="block text-xs font-mono text-muted-foreground mb-1">{part.label}</label>
                        <textarea 
                          value={part.val} 
                          onChange={(e) => setWhoIAmForm({ ...whoIAmForm, [part.key]: e.target.value })} 
                          rows={6} 
                          className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-xs focus:outline-none focus:border-foreground resize-none" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics - 4 Column Grid */}
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Statistics</h3>
                     <button onClick={() => updateStats(statsForm)} className="px-3 py-1.5 bg-green-500 text-white rounded font-mono text-xs hover:bg-green-600 flex items-center gap-2">
                        <Save size={12} /> Save
                     </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Years Exp.', val: statsForm.experience, key: 'experience' },
                      { label: 'Projects', val: statsForm.projects, key: 'projects' },
                      { label: 'Skills', val: statsForm.skills, key: 'skills' },
                      { label: 'Certs', val: statsForm.certifications, key: 'certifications' }
                    ].map((stat, idx) => (
                      <div key={idx}>
                        <label className="block text-xs font-mono text-muted-foreground mb-1">{stat.label}</label>
                        <input 
                          type="text" 
                          value={stat.val} 
                          onChange={(e) => setStatsForm({ ...statsForm, [stat.key]: e.target.value })} 
                          className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm font-mono focus:outline-none focus:border-foreground" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Values Tab */}
            {activeTab === 'values' && (
              <div className="space-y-6">
                {/* Values Form - Inline Grid */}
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">{editingId ? 'Edit Value' : 'Add New Value'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                     <div className="md:col-span-1">
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Icon</label>
                        <input type="text" value={valueForm.icon} onChange={(e) => setValueForm({ ...valueForm, icon: e.target.value })} placeholder="Emoji" className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                     </div>
                     <div className="md:col-span-3">
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Title</label>
                        <input type="text" value={valueForm.title} onChange={(e) => setValueForm({ ...valueForm, title: e.target.value })} placeholder="Title" className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                     </div>
                     <div className="md:col-span-6">
                        <label className="block text-xs font-mono text-muted-foreground mb-1">Description</label>
                        <input type="text" value={valueForm.description} onChange={(e) => setValueForm({ ...valueForm, description: e.target.value })} placeholder="Description" className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                     </div>
                     <div className="md:col-span-2 flex gap-2">
                        <button onClick={() => { if (editingId) { updateValue(editingId, valueForm); setEditingId(null); } else { addValue({ ...valueForm, id: Date.now().toString() }); } setValueForm({ id: '', title: '', description: '', icon: '' }); }} className="flex-1 px-3 py-2 bg-green-500 text-white rounded font-mono text-sm hover:bg-green-600 h-[38px] flex items-center justify-center">
                           {editingId ? <Save size={14} /> : <Plus size={14} />}
                        </button>
                        {editingId && <button onClick={() => { setEditingId(null); setValueForm({ id: '', title: '', description: '', icon: '' }); }} className="px-3 py-2 bg-secondary border border-border rounded h-[38px] hover:bg-muted"><X size={14}/></button>}
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutData.values.map((value) => (
                    <div key={value.id} className="border border-border rounded-lg p-3 bg-background/50 flex items-start justify-between group hover:border-foreground/20 transition-colors">
                      <div className="flex-1 pr-4">
                        <p className="text-sm font-bold text-foreground flex items-center gap-2 mb-1">
                          <span className="text-lg">{value.icon}</span> {value.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{value.description}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingId(value.id); setValueForm(value); }} className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded hover:bg-blue-500/20">
                          <Edit2 size={12} />
                        </button>
                        <button onClick={() => setDeleteConfirm({ id: value.id, type: 'value' })} className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded hover:bg-red-500/20">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">{editingId ? 'Edit Event' : 'Add Event'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                     <div className="md:col-span-2">
                       <label className="block text-xs font-mono text-muted-foreground mb-1">Year</label>
                       <input type="text" value={timelineForm.year} onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })} placeholder="2023" className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                     </div>
                     <div className="md:col-span-1">
                       <label className="block text-xs font-mono text-muted-foreground mb-1">Icon</label>
                       <input type="text" value={timelineForm.icon} onChange={(e) => setTimelineForm({ ...timelineForm, icon: e.target.value })} placeholder="💼" className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                     </div>
                     <div className="md:col-span-3">
                       <label className="block text-xs font-mono text-muted-foreground mb-1">Title</label>
                       <input type="text" value={timelineForm.title} onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })} placeholder="Role/Event" className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                     </div>
                     <div className="md:col-span-4">
                       <label className="block text-xs font-mono text-muted-foreground mb-1">Description</label>
                       <input type="text" value={timelineForm.description} onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })} placeholder="Details" className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                     </div>
                     <div className="md:col-span-2 flex gap-2">
                       <button onClick={() => { if (editingId) { updateTimelineEvent(editingId, timelineForm); setEditingId(null); } else { addTimelineEvent({ ...timelineForm, id: Date.now().toString() }); } setTimelineForm({ id: '', year: '', title: '', description: '', icon: '' }); }} className="flex-1 px-3 py-2 bg-green-500 text-white rounded font-mono text-sm hover:bg-green-600 h-[38px] flex items-center justify-center">
                          {editingId ? <Save size={14} /> : <Plus size={14} />}
                       </button>
                       {editingId && <button onClick={() => { setEditingId(null); setTimelineForm({ id: '', year: '', title: '', description: '', icon: '' }); }} className="px-3 py-2 bg-secondary border border-border rounded h-[38px] hover:bg-muted"><X size={14}/></button>}
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutData.timeline.map((event) => (
                    <div key={event.id} className="border border-border rounded-lg p-3 bg-background/50 flex items-start justify-between group hover:border-foreground/20 transition-colors">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded text-muted-foreground">{event.year}</span>
                           <span className="text-sm font-bold text-foreground">{event.icon} {event.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingId(event.id); setTimelineForm(event); }} className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 rounded hover:bg-blue-500/20">
                          <Edit2 size={12} />
                        </button>
                        <button onClick={() => setDeleteConfirm({ id: event.id, type: 'timeline' })} className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-600 rounded hover:bg-red-500/20">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests Tab */}
            {activeTab === 'interests' && (
              <div className="space-y-6">
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Add Interest</h3>
                  <div className="flex gap-2">
                    <input type="text" value={interestInput} onChange={(e) => setInterestInput(e.target.value)} placeholder="e.g. Hiking, Sci-Fi" className="flex-1 px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                    <button onClick={() => { if (interestInput.trim()) { addInterest(interestInput); setInterestInput(''); } }} className="px-4 py-2 bg-green-500 text-white rounded font-mono text-sm hover:bg-green-600 flex items-center gap-2">
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aboutData.interests.map((interest) => (
                    <div key={interest} className="px-3 py-1.5 bg-background border border-border text-muted-foreground text-xs font-mono rounded-full flex items-center gap-2 hover:border-foreground/40 transition-colors">
                      {interest}
                      <button onClick={() => removeInterest(interest)} className="text-red-500 hover:text-red-700">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Beyond Work Tab */}
            {activeTab === 'beyond' && (
              <div className="space-y-6">
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Add Paragraph</h3>
                  <div className="space-y-3">
                    <textarea value={beyondWorkInput} onChange={(e) => setBeyondWorkInput(e.target.value)} placeholder="What else do you do?" rows={3} className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground resize-none" />
                    <button onClick={() => { if (beyondWorkInput.trim()) { addBeyondWork(beyondWorkInput); setBeyondWorkInput(''); } }} className="w-full px-3 py-2 bg-green-500 text-white rounded font-mono text-xs hover:bg-green-600 flex items-center justify-center gap-2">
                      <Plus size={14} /> Add Paragraph
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {aboutData.beyondWork.map((text, idx) => (
                    <div key={idx} className="border border-border rounded-lg p-3 bg-background/50 flex gap-3 group">
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{text}</p>
                      <button onClick={() => removeBeyondWork(idx)} className="p-1.5 h-fit bg-red-500/10 border border-red-500/20 text-red-600 rounded hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Tab */}
            {activeTab === 'cta' && (
              <div className="border border-border rounded-lg p-4 bg-secondary/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Call to Action</h3>
                  <button onClick={() => updateCTA(ctaForm.heading, ctaForm.description)} className="px-3 py-1.5 bg-green-500 text-white rounded font-mono text-xs hover:bg-green-600 flex items-center gap-2">
                     <Save size={12} /> Save
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1">Heading</label>
                      <input type="text" value={ctaForm.heading} onChange={(e) => setCtaForm({ ...ctaForm, heading: e.target.value })} className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground" />
                   </div>
                   <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1">Description</label>
                      <textarea value={ctaForm.description} onChange={(e) => setCtaForm({ ...ctaForm, description: e.target.value })} rows={3} className="w-full px-3 py-2 bg-secondary border border-border rounded text-foreground text-sm focus:outline-none focus:border-foreground resize-none" />
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
              <h3 className="text-lg font-bold text-foreground mb-2">Delete Item?</h3>
              <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-3 py-2 border border-border text-foreground rounded font-mono text-sm hover:bg-secondary transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="flex-1 px-3 py-2 bg-red-500 text-white rounded font-mono text-sm hover:bg-red-600 transition-colors">
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

export default AdminAbout;