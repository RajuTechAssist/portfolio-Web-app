package com.portfolio.repository;

import com.portfolio.model.Project;
import com.portfolio.model.Project.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Project entity
 * Provides database operations for projects
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    // Find featured projects for homepage display
    List<Project> findByFeaturedTrueOrderByDisplayOrder();
    
    // Find projects by status
    List<Project> findByStatusOrderByDisplayOrder(ProjectStatus status);
    
    // Find projects containing specific technology
    @Query("SELECT p FROM Project p JOIN p.technologies t WHERE LOWER(t) LIKE LOWER(CONCAT('%', :technology, '%'))")
    List<Project> findByTechnologyContaining(@Param("technology") String technology);
    
    // Get all active projects ordered by display order
    List<Project> findByStatusOrderByDisplayOrderAsc(ProjectStatus status);
}