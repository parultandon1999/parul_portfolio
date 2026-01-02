# Site Content Management Guide

Your site now has expanded content control with granular visibility and ordering options.

## New Features

### 1. **Visibility Controls**
Every section and item now has a visibility toggle:
- Toggle sections on/off from the Settings tab in Admin
- Toggle individual items (hero, footer, featured projects, skills, social links)
- Use the eye icon to show/hide content without deleting it

### 2. **Ordering System**
Control the display order of items:
- Featured Projects: Set custom order (1, 2, 3, etc.)
- Skill Categories: Arrange categories in your preferred order
- Sidebar Social Links: Reorder social links
- Action Buttons: Control button display order

### 3. **Settings Panel**
A lightweight floating settings panel (bottom-right corner) provides:
- **Visibility Tab**: Toggle entire sections on/off
- **Export Tab**: Download your site content as JSON
- **Import Tab**: Restore content from a previously exported JSON file

### 4. **Admin Panel Enhancements**
New Settings tab in Admin includes:
- Section visibility toggles
- Individual item visibility controls
- Data export functionality

## How to Use

### Managing Content

1. **In Admin Panel**:
   - Go to each section tab (Hero, Featured, Skills, etc.)
   - Toggle visibility with the eye icon
   - Set order numbers for items
   - Save changes

2. **Using Settings Panel**:
   - Click the settings icon (bottom-right)
   - Toggle sections on/off
   - Export/import your content

### Exporting & Importing

**Export**:
- Click "Export JSON" in Settings Panel or Admin Settings tab
- Your site content downloads as `site-content.json`
- Use this to backup or share your configuration

**Import**:
- Click "Choose File" in Settings Panel Import tab
- Select a previously exported JSON file
- Your content will be restored

## Data Structure

All content is stored in `siteContent.ts` with the following structure:

```typescript
{
  hero: { visible, order, ... },
  actionButtons: { resume: { visible, order, ... }, chat: { visible, order, ... } },
  sidebarSocialLinks: [{ visible, order, ... }],
  featuredProjects: [{ visible, order, ... }],
  skillCategories: [{ visible, order, ... }],
  footer: { visible, ... },
  settings: {
    theme: "auto" | "light" | "dark",
    sectionVisibility: { hero, actionButtons, sidebarSocial, featuredProjects, skills, footer }
  }
}
```

## Tips

- Use visibility toggles to temporarily hide content without deleting
- Order numbers don't need to be sequential (1, 3, 5 works fine)
- Export your content regularly as backup
- The Settings Panel is always accessible from any page
