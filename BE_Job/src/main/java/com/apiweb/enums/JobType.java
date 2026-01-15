package com.apiweb.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum JobType {
    @JsonProperty("Full-time")
    FULL_TIME,
    
    @JsonProperty("Part-time")
    PART_TIME,
    
    @JsonProperty("Freelance")
    FREELANCE,
    @JsonProperty("Remote")
    REMOTE,
    @JsonProperty("Internship")
    INTERNSHIP
}