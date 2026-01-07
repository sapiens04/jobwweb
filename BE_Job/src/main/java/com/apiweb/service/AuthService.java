package com.apiweb.service;

import com.apiweb.model.RegisterDTO;
import com.apiweb.repository.entity.UserEntity;

public interface AuthService  {
    UserEntity register(RegisterDTO request);
    }
