// Utility functions for managing static data
import { staticServices, staticSkills, staticProjects } from '../data/staticData.js';

// Helper to generate unique IDs for new items
export const generateId = (prefix = 'item') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Data management functions
export const dataManager = {
  // Services
  addService: (service) => {
    const newService = {
      _id: generateId('service'),
      ...service,
      category: service.category || 'Development'
    };
    staticServices.unshift(newService);
    return newService;
  },

  updateService: (id, updates) => {
    const index = staticServices.findIndex(s => s._id === id);
    if (index !== -1) {
      staticServices[index] = { ...staticServices[index], ...updates };
      return staticServices[index];
    }
    return null;
  },

  deleteService: (id) => {
    const index = staticServices.findIndex(s => s._id === id);
    if (index !== -1) {
      return staticServices.splice(index, 1)[0];
    }
    return null;
  },

  // Skills
  addSkill: (skill) => {
    const newSkill = {
      _id: generateId('skill'),
      ...skill,
      level: Number(skill.level) || 0,
      category: skill.category || 'General'
    };
    staticSkills.unshift(newSkill);
    return newSkill;
  },

  updateSkill: (id, updates) => {
    const index = staticSkills.findIndex(s => s._id === id);
    if (index !== -1) {
      staticSkills[index] = { ...staticSkills[index], ...updates };
      return staticSkills[index];
    }
    return null;
  },

  deleteSkill: (id) => {
    const index = staticSkills.findIndex(s => s._id === id);
    if (index !== -1) {
      return staticSkills.splice(index, 1)[0];
    }
    return null;
  },

  // Projects
  addProject: (project) => {
    const newProject = {
      _id: generateId('project'),
      ...project
    };
    staticProjects.unshift(newProject);
    return newProject;
  },

  updateProject: (id, updates) => {
    const index = staticProjects.findIndex(p => p._id === id);
    if (index !== -1) {
      staticProjects[index] = { ...staticProjects[index], ...updates };
      return staticProjects[index];
    }
    return null;
  },

  deleteProject: (id) => {
    const index = staticProjects.findIndex(p => p._id === id);
    if (index !== -1) {
      return staticProjects.splice(index, 1)[0];
    }
    return null;
  },

  // Export current data (useful for backing up or syncing)
  exportData: () => ({
    services: [...staticServices],
    skills: [...staticSkills], 
    projects: [...staticProjects],
    exportedAt: new Date().toISOString()
  }),

  // Import data (useful for restoring or syncing)
  importData: (data) => {
    if (data.services) {
      staticServices.length = 0;
      staticServices.push(...data.services);
    }
    if (data.skills) {
      staticSkills.length = 0;
      staticSkills.push(...data.skills);
    }
    if (data.projects) {
      staticProjects.length = 0;
      staticProjects.push(...data.projects);
    }
  }
};