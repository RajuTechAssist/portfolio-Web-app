import { apiService } from './api';

export const ProjectService = {
    getAllProjects: async () => {
        return await apiService.getProjects();
    },
    
    getFeaturedProjects: async () => {
        return await apiService.getFeaturedProjects();
    },
    
    getProjectById: async (id) => {
        return await apiService.getProject(id);
    },
    
    createProject: async (project) => {
        return await apiService.createProject(project);
    }
};

export default ProjectService;
