package com.portfolio.dto;

import com.portfolio.model.Project.ProjectStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Data Transfer Object for Project
 * Used for API responses to frontend
 */
@Data
@Builder
public class ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private String detailedDescription;
    private String imageUrl;
    private String githubUrl;
    private String liveUrl;
    private Boolean featured;
    private List<String> technologies;
    private ProjectStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}