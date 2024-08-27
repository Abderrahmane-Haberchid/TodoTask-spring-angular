package com.todo_list.angular_spring.web;

import com.todo_list.angular_spring.record.TaskRecord;
import com.todo_list.angular_spring.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/task")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TaskController {
    private final TaskService taskService;
    @PostMapping("add")
    public ResponseEntity<TaskRecord> addTask(@RequestBody TaskRecord taskRecord){
        return ResponseEntity.ok(taskService.addTask(taskRecord));
    }

    @PutMapping("done")
    public ResponseEntity<TaskRecord> updateTask(@RequestBody TaskRecord task){
        return ResponseEntity.ok(taskService.updateTask(task.id()));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deleteTask(@PathVariable Long id){
        return ResponseEntity.ok(taskService.deleteTask(id));
    }

    @GetMapping("all")
    public ResponseEntity<List<TaskRecord>> getAllTasks(){
        return ResponseEntity.ok(taskService.getAllTasks());
    }
}
