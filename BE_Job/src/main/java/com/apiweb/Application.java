package com.apiweb;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
    public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    // Set múi giờ mặc định cho toàn bộ ứng dụng khi khởi động
    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
    }
}



// package com.apiweb;

// import jakarta.annotation.PostConstruct;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.util.TimeZone;

// @SpringBootApplication
// public class Application implements WebMvcConfigurer { // Thêm implements để cấu hình đường dẫn

//     public static void main(String[] args) {
//         SpringApplication.run(Application.class, args);
//     }

//     @PostConstruct
//     public void init() {
//         TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
//     }

//     @Override
//     public void addResourceHandlers(ResourceHandlerRegistry registry) {
//         // 1. Lấy đường dẫn gốc của dự án để tìm folder uploads
//         String userDir = System.getProperty("user.dir");
//         Path projectRootDir = Paths.get(userDir);

//         // Nếu bạn chạy từ BE_Job, lùi ra 1 cấp để thấy folder uploads ở gốc
//         if (userDir.endsWith("BE_Job")) {
//             projectRootDir = projectRootDir.getParent();
//         }

//         // 2. Ánh xạ URL /uploads/** vào folder vật lý trên ổ đĩa
//         // toUri().toString() sẽ tạo ra tiền tố "file:/" chuẩn cho Windows
//         String uploadPath = projectRootDir.resolve("uploads").toAbsolutePath().toUri().toString();

//         registry.addResourceHandler("/uploads/**")
//                 .addResourceLocations(uploadPath)
//                 .setCachePeriod(0);
//         // 3. Đảm bảo Spring luôn tìm thấy file tĩnh (CSS/JS) của React trong folder static
//         registry.addResourceHandler("/**")
//                 .addResourceLocations("classpath:/static/");
//     }
// }