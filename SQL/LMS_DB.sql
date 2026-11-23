-- MySQL 8.0.16+ schema derived from the supplied ERD.
-- Select an existing database before running, for example:
--   mysql -u YOUR_USER -p YOUR_DATABASE < LMS_DB.sql

CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `roles` ENUM('STUDENT', 'TEACHER', 'ADMIN') CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    `password` VARCHAR(255) NOT NULL COMMENT 'Store a password hash, never plaintext',
    `created_at` DATE NOT NULL DEFAULT (CURRENT_DATE),
    `updated_at` DATE NULL,
    PRIMARY KEY (`user_id`),
    CONSTRAINT `chk_users_roles` CHECK (`roles` IN ('STUDENT', 'TEACHER', 'ADMIN'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `classes` (
    `class_id` INT NOT NULL AUTO_INCREMENT,
    `class` VARCHAR(255) NOT NULL,
    `teacher_id` INT NOT NULL,
    `created_at` DATE NOT NULL DEFAULT (CURRENT_DATE),
    `created_by` INT NOT NULL,
    `updated_at` DATE NULL,
    `modified_by` INT NULL,
    PRIMARY KEY (`class_id`),
    KEY `idx_classes_teacher` (`teacher_id`),
    KEY `idx_classes_creator` (`created_by`),
    KEY `idx_classes_modifier` (`modified_by`),
    CONSTRAINT `fk_classes_teacher` FOREIGN KEY (`teacher_id`)
        REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_classes_creator` FOREIGN KEY (`created_by`)
        REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_classes_modifier` FOREIGN KEY (`modified_by`)
        REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `student_classes` (
    `class_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `feedback_from_teacher` TEXT NULL,
    PRIMARY KEY (`class_id`, `student_id`),
    KEY `idx_student_classes_student` (`student_id`),
    CONSTRAINT `fk_student_classes_class` FOREIGN KEY (`class_id`)
        REFERENCES `classes` (`class_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_student_classes_student` FOREIGN KEY (`student_id`)
        REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `assessments` (
    `assessment_id` INT NOT NULL AUTO_INCREMENT,
    `class_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`assessment_id`),
    KEY `idx_assessments_class` (`class_id`),
    CONSTRAINT `fk_assessments_class` FOREIGN KEY (`class_id`)
        REFERENCES `classes` (`class_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `grades` (
    `assessment_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `point_grade` INT NOT NULL,
    `point_total` INT NOT NULL,
    `feedback` TEXT NOT NULL,
    PRIMARY KEY (`assessment_id`, `student_id`),
    KEY `idx_grades_student` (`student_id`),
    CONSTRAINT `fk_grades_assessment` FOREIGN KEY (`assessment_id`)
        REFERENCES `assessments` (`assessment_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_grades_student` FOREIGN KEY (`student_id`)
        REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `reviews_from_students` (
    `user_id` INT NOT NULL,
    `class_id` INT NOT NULL,
    `rating` INT NOT NULL,
    `teacher_score` INT NOT NULL,
    `content_score` INT NOT NULL,
    `pacing_score` INT NOT NULL,
    `review_text` VARCHAR(255) NULL,
    `created_at` DATE NOT NULL DEFAULT (CURRENT_DATE),
    `modified_at` DATE NULL,
    PRIMARY KEY (`user_id`, `class_id`),
    KEY `idx_reviews_from_students_class` (`class_id`),
    CONSTRAINT `chk_reviews_from_students_rating` CHECK (`rating` BETWEEN 1 AND 5),
    CONSTRAINT `fk_reviews_from_students_user` FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_reviews_from_students_class` FOREIGN KEY (`class_id`)
        REFERENCES `classes` (`class_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- MongoDB portion of the ERD (documentation only).
--
-- Collection: assignments_mongo
--   assignments_id: integer
--   class_id: integer -> MySQL classes.class_id
--   assessment_name: string
--   question: array of JSON objects (question data)
--   created_at: date, required/non-null; initialized to the current date on insert
--   modified_at: date
--   created_by: integer, required/non-null -> MySQL users.user_id
--   modified_by: integer -> MySQL users.user_id
--   completed_at: date
--   due_by: date
--
-- Collection: lessons_mongo
--   lesson_id: integer
--   class_id: integer -> MySQL classes.class_id
--   lesson_name: string
--   lesson_Details: JSON object
--   created_at: date, required/non-null; initialized to the current date on insert
--   modified_at: date
--   created_by: integer, required/non-null -> MySQL users.user_id
--   modified_by: integer -> MySQL users.user_id
--   due_by: date
