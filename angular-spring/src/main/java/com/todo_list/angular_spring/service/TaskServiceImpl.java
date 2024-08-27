package com.todo_list.angular_spring.service;

import com.todo_list.angular_spring.mappers.TaskMapper;
import com.todo_list.angular_spring.models.Tasks;
import com.todo_list.angular_spring.record.TaskRecord;
import com.todo_list.angular_spring.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService{

    private final TaskRepository taskRepository;
    @Override
    public TaskRecord addTask(TaskRecord taskRecord) {
        var task= Tasks.builder()
                .title(taskRecord.title())
                .createdAt(new Date())
                .priority(taskRecord.priority())
                .status("Actif")
                .build();

        taskRepository.save(task);
        return taskRecord;
    }
    @Override
    public TaskRecord updateTask(Long id) {
        var tasks = taskRepository.findById(id).get();
        tasks.setStatus("Done");
        taskRepository.save(tasks);

        return TaskRecord.builder()
                .title(tasks.getTitle())
                .status(tasks.getStatus())
                .priority(tasks.getPriority())
                .createdAt(tasks.getCreatedAt())
                .build();
    }

    @Override
    public Boolean deleteTask(Long id) {

             taskRepository.deleteById(id);
             return true;
    }

    @Override
    public List<TaskRecord> getAllTasks() {

        List<Tasks> tasksList = taskRepository.findAll();
        List<TaskRecord> taskRecords = new ArrayList<>();
        tasksList.stream()
                .map(tasks -> {
                    var taskrecord = TaskRecord.builder()
                            .id(tasks.getId())
                            .title(tasks.getTitle())
                            .status(tasks.getStatus())
                            .createdAt(tasks.getCreatedAt())
                            .priority(tasks.getPriority())
                            .build();
                  taskRecords.add(taskrecord);
                    return taskrecord;
                }).toList();

        return taskRecords;
    }
}
