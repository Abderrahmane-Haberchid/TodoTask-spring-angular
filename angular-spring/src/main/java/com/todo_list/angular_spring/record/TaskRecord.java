package com.todo_list.angular_spring.record;

import com.todo_list.angular_spring.enumerated.Priority;
import lombok.Builder;

import java.util.Date;
@Builder
public record TaskRecord(Long id, String title, Date createdAt, Priority priority, String status) {

}
