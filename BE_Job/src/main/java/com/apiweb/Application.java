// package com.apiweb;
// import io.github.cdimascio.dotenv.Dotenv;
// import jakarta.annotation.PostConstruct;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// import java.util.TimeZone;

// @SpringBootApplication
//     public class Application {
//     public static void main(String[] args) {
//         SpringApplication.run(Application.class, args);
//     }
//     // Set múi giờ mặc định cho toàn bộ ứng dụng khi khởi động
//     @PostConstruct
//     public void init() {
//         TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
//     }
// }



// // package com.apiweb;

// // import jakarta.annotation.PostConstruct;
// // import org.springframework.boot.SpringApplication;
// // import org.springframework.boot.autoconfigure.SpringBootApplication;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
// // import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// // import java.nio.file.Path;
// // import java.nio.file.Paths;
// // import java.util.TimeZone;

// // @SpringBootApplication
// // public class Application implements WebMvcConfigurer { // Thêm implements để cấu hình đường dẫn

// //     public static void main(String[] args) {
// //         SpringApplication.run(Application.class, args);
// //     }

// //     @PostConstruct
// //     public void init() {
// //         TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
// //     }

// //     @Override
// //     public void addResourceHandlers(ResourceHandlerRegistry registry) {
// //         // 1. Lấy đường dẫn gốc của dự án để tìm folder uploads
// //         String userDir = System.getProperty("user.dir");
// //         Path projectRootDir = Paths.get(userDir);

// //         // Nếu bạn chạy từ BE_Job, lùi ra 1 cấp để thấy folder uploads ở gốc
// //         if (userDir.endsWith("BE_Job")) {
// //             projectRootDir = projectRootDir.getParent();
// //         }

// //         // 2. Ánh xạ URL /uploads/** vào folder vật lý trên ổ đĩa
// //         // toUri().toString() sẽ tạo ra tiền tố "file:/" chuẩn cho Windows
// //         String uploadPath = projectRootDir.resolve("uploads").toAbsolutePath().toUri().toString();

// //         registry.addResourceHandler("/uploads/**")
// //                 .addResourceLocations(uploadPath)
// //                 .setCachePeriod(0);
// //         // 3. Đảm bảo Spring luôn tìm thấy file tĩnh (CSS/JS) của React trong folder static
// //         registry.addResourceHandler("/**")
// //                 .addResourceLocations("classpath:/static/");
// //     }
// // }

package com.apiweb;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.TimeZone;

@SpringBootApplication
public class Application implements WebMvcConfigurer {

    public static void main(String[] args) {
        // Nạp file .env
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
    
        // Kiểm tra thủ công xem có đọc được không (In ra console để debug)
        String dbUrl = dotenv.get("DB_URL");
        if (dbUrl == null || dbUrl.isEmpty()) {
            System.err.println("LỖI: Không tìm thấy biến DB_URL trong file .env!");
        } else {
            System.out.println("Đã nạp thành công DB_URL: " + dbUrl);
        }
    
        // Đẩy vào System Properties
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
    
        SpringApplication.run(Application.class, args);
    }

    // Thiết lập múi giờ Việt Nam
    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
    }

    // Cấu hình để xem được file ảnh/CV qua URL (ví dụ: localhost:8080/uploads/cv.pdf)
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Lấy giá trị STATIC_LOCATIONS đã nạp từ .env
        String staticLocations = System.getProperty("STATIC_LOCATIONS");
        
        if (staticLocations != null) {
            registry.addResourceHandler("/uploads/**")
                    .addResourceLocations(staticLocations)
                    .setCachePeriod(0);
        }

        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }
}