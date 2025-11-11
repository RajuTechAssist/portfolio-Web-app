// ========================================
// API SERVICE LAYER - JAVASCRIPT 2025
// ========================================

/**
 * Modern API Service Layer with JavaScript
 * Features: Error handling, caching, retry logic
 */
class ApiService {
  constructor() {
     this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';
    this.cache = new Map();
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  }

  // =====================================
  // CORE HTTP METHODS
  // =====================================

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `${options.method || 'GET'}-${url}`;

    // Check cache for GET requests
    if (!options.method || options.method === 'GET') {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.data;
      }
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          // TODO: Add auth headers when implementing authentication
          // 'Authorization': `Bearer ${this.getAuthToken()}`
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: 'Request failed',
          message: `HTTP error! status: ${response.status}`,
          statusCode: response.status,
          timestamp: new Date().toISOString()
        }));
        throw new Error(errorData.message);
      }

      const data = await response.json();
      
      // Cache successful GET requests
      if (!options.method || options.method === 'GET') {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // =====================================
  // PROJECT ENDPOINTS
  // =====================================

  async getProjects(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.technologies?.length) {
      filters.technologies.forEach(tech => queryParams.append('tech', tech));
    }
    if (filters.status?.length) {
      filters.status.forEach(status => queryParams.append('status', status));
    }
    if (filters.featured !== undefined) {
      queryParams.append('featured', filters.featured.toString());
    }

    const endpoint = `/projects${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await this.get(endpoint);
    return response.data || response;
  }

  async getFeaturedProjects() {
    const response = await this.get('/projects/featured');
    return response.data || response;
  }

  async getProject(id) {
    const response = await this.get(`/projects/${id}`);
    return response.data || response;
  }

  async createProject(project) {
    const response = await this.post('/projects', project);
    return response.data || response;
  }

  async updateProject(id, project) {
    const response = await this.put(`/projects/${id}`, project);
    return response.data || response;
  }

  async deleteProject(id) {
    await this.delete(`/projects/${id}`);
  }

  // =====================================
  // SKILL ENDPOINTS
  // =====================================

  async getSkills(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.category?.length) {
      filters.category.forEach(cat => queryParams.append('category', cat));
    }
    if (filters.minProficiency) {
      queryParams.append('minProficiency', filters.minProficiency.toString());
    }
    if (filters.featured !== undefined) {
      queryParams.append('featured', filters.featured.toString());
    }

    const endpoint = `/skills${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await this.get(endpoint);
    return response.data || response;
  }

  async getFeaturedSkills() {
    const response = await this.get('/skills/featured');
    return response.data || response;
  }

  async getSkillsByCategory(category) {
    const response = await this.get(`/skills/category/${category}`);
    return response.data || response;
  }

  // =====================================
  // EXPERIENCE ENDPOINTS
  // =====================================

  async getExperiences() {
    const response = await this.get('/experiences');
    return response.data || response;
  }

  async getExperience(id) {
    const response = await this.get(`/experiences/${id}`);
    return response.data || response;
  }

  // =====================================
  // SERVICE ENDPOINTS
  // =====================================

  async getServices() {
    const response = await this.get('/services');
    return response.data || response;
  }

  async getFeaturedServices() {
    const response = await this.get('/services/featured');
    return response.data || response;
  }

  async getService(id) {
    const response = await this.get(`/services/${id}`);
    return response.data || response;
  }

  async getServicesByCategory(category) {
    const response = await this.get(`/services/category/${category}`);
    return response.data || response;
  }

  // =====================================
  // ABOUT/PERSONAL INFO ENDPOINTS
  // =====================================

  async getAboutInfo() {
    const response = await this.get('/about');
    return response.data || response;
  }

  // =====================================
  // CONTACT ENDPOINTS
  // =====================================

  async submitContactForm(formData) {
    const response = await this.post('/contact', formData);
    return response.data || response;
  }

  // =====================================
  // ANALYTICS ENDPOINTS (Future)
  // =====================================

  async trackPageView(page) {
    try {
      await this.post('/analytics/pageview', { page, timestamp: new Date().toISOString() });
    } catch (error) {
      // Analytics failures shouldn't break the app
      console.warn('Analytics tracking failed:', error);
    }
  }

  async trackEvent(event, properties = {}) {
    try {
      await this.post('/analytics/event', { 
        event, 
        properties, 
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      console.warn('Event tracking failed:', error);
    }
  }

  // =====================================
  // UTILITY METHODS
  // =====================================

  clearCache() {
    this.cache.clear();
  }

  getAuthToken() {
    // TODO: Implement when adding authentication
    return localStorage.getItem('auth_token');
  }

  // Health check endpoint
  async healthCheck() {
    return this.get('/health');
  }
}

// =====================================
// SPECIALIZED SERVICE CLASSES
// =====================================

/**
 * Project-specific service with additional methods
 */
class ProjectService extends ApiService {
  async searchProjects(query) {
    return this.getProjects({ search: query });
  }

  async getProjectsByTechnology(technology) {
    return this.getProjects({ technologies: [technology] });
  }

  async toggleProjectFeatured(id) {
    return this.put(`/projects/${id}/toggle-featured`, {});
  }
}

/**
 * Skill-specific service with additional methods
 */
class SkillService extends ApiService {
  async getSkillsGroupedByCategory() {
    const skills = await this.getSkills();
    return skills.reduce((groups, skill) => {
      const category = skill.category;
      if (!groups[category]) groups[category] = [];
      groups[category].push(skill);
      return groups;
    }, {});
  }

  async getTopSkills(limit = 10) {
    const skills = await this.getSkills();
    return skills
      .sort((a, b) => b.proficiencyLevel - a.proficiencyLevel)
      .slice(0, limit);
  }
}

// =====================================
// SINGLETON INSTANCES
// =====================================

export const apiService = new ApiService();
export const projectService = new ProjectService();
export const skillService = new SkillService();

// =====================================
// MOCK DATA (Development)
// =====================================

export const mockData = {
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce platform built with React and Spring Boot',
      technologies: ['React', 'JavaScript', 'Spring Boot', 'PostgreSQL'],
      featured: true,
      status: 'ACTIVE',
      displayOrder: 1,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      featured: true,
      status: 'ACTIVE',
      displayOrder: 2,
      createdAt: '2024-01-10T14:20:00Z',
      updatedAt: '2024-01-10T14:20:00Z'
    }
  ],

  skills: [
    {
      id: 1,
      name: 'React',
      category: 'FRONTEND',
      proficiencyLevel: 9,
      yearsExperience: 4,
      featured: true,
      displayOrder: 1,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'Spring Boot',
      category: 'BACKEND',
      proficiencyLevel: 8,
      yearsExperience: 3,
      featured: true,
      displayOrder: 2,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default apiService;