package com.portfolio.config;

import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Initialize the database with sample data
 * TODO: Remove this in production and use proper data migration
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    
    @Override
    public void run(String... args) throws Exception {
        initializeProjects();
        initializeSkills();
    }
    
    private void initializeProjects() {
        if (projectRepository.count() == 0) {
            log.info("Initializing sample projects...");
            
            // TODO: Replace with real project data
            Project project1 = Project.builder()
                    .title("E-Commerce Platform")
                    .description("Modern e-commerce platform built with React and Spring Boot")
                    .detailedDescription("A full-stack e-commerce solution with modern UI/UX, secure payment integration, and admin dashboard.")
                    .technologies(List.of("React", "Spring Boot", "PostgreSQL", "Stripe"))
                    .featured(true)
                    .displayOrder(1)
                    .build();
            
            Project project2 = Project.builder()
                    .title("Task Management App")
                    .description("Collaborative task management application with real-time updates")
                    .detailedDescription("A productivity app that helps teams collaborate effectively with real-time notifications and progress tracking.")
                    .technologies(List.of("React Native", "Node.js", "MongoDB", "Socket.io"))
                    .featured(true)
                    .displayOrder(2)
                    .build();
            
            projectRepository.saveAll(List.of(project1, project2));
            log.info("Sample projects initialized successfully");
        }
    }
    
    private void initializeSkills() {
        if (skillRepository.count() == 0) {
            log.info("Initializing sample skills...");
            
            // TODO: Replace with real skill data
            Skill skill1 = Skill.builder()
                    .name("React")
                    .category(Skill.SkillCategory.FRONTEND)
                    .proficiencyLevel(9)
                    .yearsExperience(4)
                    .featured(true)
                    .displayOrder(1)
                    .build();
            
            Skill skill2 = Skill.builder()
                    .name("Spring Boot")
                    .category(Skill.SkillCategory.BACKEND)
                    .proficiencyLevel(8)
                    .yearsExperience(3)
                    .featured(true)
                    .displayOrder(2)
                    .build();
            
            skillRepository.saveAll(List.of(skill1, skill2));
            log.info("Sample skills initialized successfully");
        }
    }
}
