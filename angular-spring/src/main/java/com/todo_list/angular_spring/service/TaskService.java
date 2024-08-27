package com.todo_list.angular_spring.service;

import com.todo_list.angular_spring.record.TaskRecord;

import java.util.List;

public interface TaskService {
    TaskRecord addTask(TaskRecord taskRecord);

    TaskRecord updateTask(Long id);

    Boolean deleteTask(Long id);

    List<TaskRecord> getAllTasks();
}
