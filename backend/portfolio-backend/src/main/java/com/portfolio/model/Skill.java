package com.portfolio.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "skills")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Skill name is required")
    @Column(nullable = false, unique = true)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private SkillCategory category;
    
    @Min(value = 1, message = "Proficiency level must be at least 1")
    @Max(value = 10, message = "Proficiency level cannot exceed 10")
    @Column(name = "proficiency_level")
    private Integer proficiencyLevel;
    
    @Column(name = "years_experience")
    private Integer yearsExperience;
    
    @Column(name = "icon_url")
    private String iconUrl;
    
    @Column(name = "is_featured")
    @Builder.Default
    private Boolean featured = false;
    
    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
    
    public enum SkillCategory {
        FRONTEND, BACKEND, DATABASE, DEVOPS, DESIGN, MOBILE, TOOLS, SOFT_SKILLS
    }
}