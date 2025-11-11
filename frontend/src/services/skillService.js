import { apiService } from './api';

export const SkillService = {
    getAllSkills: async () => {
        return await apiService.getSkills();
    },
    
    getFeaturedSkills: async () => {
        return await apiService.getFeaturedSkills();
    },
    
    getSkillsByCategory: async (category) => {
        return await apiService.getSkillsByCategory(category);
    }
};

export default SkillService;
