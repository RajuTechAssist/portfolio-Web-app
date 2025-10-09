package com.portfolio.controller;

import com.portfolio.dto.ProjectDTO;
import com.portfolio.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Project operations
 * Provides API endpoints for the React frontend
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "https://yourproductionurl.com"})
@Tag(name = "Projects", description = "Portfolio projects management API")
public class ProjectController {
    
    private final ProjectService projectService;
    
    /**
     * Get all active projects
     */
    @GetMapping
    @Operation(summary = "Get all active projects", description = "Retrieve all active portfolio projects")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        log.info("API: Getting all active projects");
        List<ProjectDTO> projects = projectService.getAllActiveProjects();
        return ResponseEntity.ok(projects);
    }
    
    /**
     * Get featured projects
     */
    @GetMapping("/featured")
    @Operation(summary = "Get featured projects", description = "Retrieve featured portfolio projects for homepage")
    public ResponseEntity<List<ProjectDTO>> getFeaturedProjects() {
        log.info("API: Getting featured projects");
        List<ProjectDTO> featuredProjects = projectService.getFeaturedProjects();
        return ResponseEntity.ok(featuredProjects);
    }
    
    /**
     * Get project by ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get project by ID", description = "Retrieve a specific project by its ID")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        log.info("API: Getting project with ID: {}", id);
        return projectService.getProjectById(id)
                .map(project -> ResponseEntity.ok(project))
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Search projects by technology
     */
    @GetMapping("/search")
    @Operation(summary = "Search projects by technology", description = "Find projects that use a specific technology")
    public ResponseEntity<List<ProjectDTO>> searchProjectsByTechnology(
            @RequestParam String technology) {
        log.info("API: Searching projects by technology: {}", technology);
        List<ProjectDTO> projects = projectService.getProjectsByTechnology(technology);
        return ResponseEntity.ok(projects);
    }
    
    /**
     * Create new project
     * TODO: Add authentication and authorization
     */
    @PostMapping
    @Operation(summary = "Create new project", description = "Create a new portfolio project")
    public ResponseEntity<ProjectDTO> createProject(@Valid @RequestBody ProjectDTO projectDTO) {
        log.info("API: Creating new project: {}", projectDTO.getTitle());
        ProjectDTO createdProject = projectService.createProject(projectDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }
}