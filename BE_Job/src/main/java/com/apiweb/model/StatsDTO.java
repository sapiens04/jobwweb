package com.apiweb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor  // Tạo constructor không tham số
@AllArgsConstructor // Tạo constructor có đầy đủ tham số (long, long, long, double)
public class StatsDTO {
    private long activeJobs;
    private long totalCandidates;
    private long hiredCandidates;
    private double conversionRate;
}