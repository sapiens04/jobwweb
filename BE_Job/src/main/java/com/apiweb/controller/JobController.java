package com.apiweb.controller;

import com.apiweb.model.JobDTO;
import com.apiweb.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public Page<JobDTO> searchPublicJobs(
            @RequestParam String title,
            @RequestParam int page,
            @RequestParam(defaultValue = "5") int size) {

        return jobService.searchPublicJobs(title, page, size);
    }

}
