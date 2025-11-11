package com.portfolio.repository;

import com.portfolio.model.Skill;
import com.portfolio.model.Skill.SkillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    
    // Find skills by category
    List<Skill> findByCategoryOrderByDisplayOrder(SkillCategory category);
    
    // Find featured skills
    List<Skill> findByFeaturedTrueOrderByDisplayOrder();
    
    // Find skills above a certain proficiency level
    List<Skill> findByProficiencyLevelGreaterThanEqualOrderByProficiencyLevelDesc(Integer level);
}