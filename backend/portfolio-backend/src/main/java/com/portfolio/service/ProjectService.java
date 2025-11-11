package com.portfolio.service;

import com.portfolio.dto.ProjectDTO;
import com.portfolio.model.Project;
import com.portfolio.model.Project.ProjectStatus;
import com.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Project operations
 * Contains business logic for project management
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    
    /**
     * Get all active projects
     * TODO: Add caching for better performance
     */
    public List<ProjectDTO> getAllActiveProjects() {
        log.info("Fetching all active projects");
        List<Project> projects = projectRepository.findByStatusOrderByDisplayOrderAsc(ProjectStatus.ACTIVE);
        return projects.stream()
                .map(this::convertToDTO)
                .toList();
    }
    
    /**
     * Get featured projects for homepage
     */
    public List<ProjectDTO> getFeaturedProjects() {
        log.info("Fetching featured projects");
        List<Project> featuredProjects = projectRepository.findByFeaturedTrueOrderByDisplayOrder();
        return featuredProjects.stream()
                .map(this::convertToDTO)
                .toList();
    }
    
    /**
     * Get project by ID
     */
    public Optional<ProjectDTO> getProjectById(Long id) {
        log.info("Fetching project with ID: {}", id);
        return projectRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    /**
     * Find projects by technology
     * TODO: Implement full-text search for better matching
     */
    public List<ProjectDTO> getProjectsByTechnology(String technology) {
        log.info("Searching projects by technology: {}", technology);
        List<Project> projects = projectRepository.findByTechnologyContaining(technology);
        return projects.stream()
                .map(this::convertToDTO)
                .toList();
    }
    
    /**
     * Create new project
     * TODO: Add validation and security checks
     */
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        log.info("Creating new project: {}", projectDTO.getTitle());
        
        Project project = Project.builder()
                .title(projectDTO.getTitle())
                .description(projectDTO.getDescription())
                .detailedDescription(projectDTO.getDetailedDescription())
                .imageUrl(projectDTO.getImageUrl())
                .githubUrl(projectDTO.getGithubUrl())
                .liveUrl(projectDTO.getLiveUrl())
                .featured(projectDTO.getFeatured() != null ? projectDTO.getFeatured() : false)
                .technologies(projectDTO.getTechnologies())
                .status(ProjectStatus.ACTIVE)
                .build();
        
        Project savedProject = projectRepository.save(project);
        log.info("Project created successfully with ID: {}", savedProject.getId());
        
        return convertToDTO(savedProject);
    }
    
    /**
     * Convert Project entity to DTO
     */
    private ProjectDTO convertToDTO(Project project) {
        return ProjectDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .detailedDescription(project.getDetailedDescription())
                .imageUrl(project.getImageUrl())
                .githubUrl(project.getGithubUrl())
                .liveUrl(project.getLiveUrl())
                .featured(project.getFeatured())
                .technologies(project.getTechnologies())
                .status(project.getStatus())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}