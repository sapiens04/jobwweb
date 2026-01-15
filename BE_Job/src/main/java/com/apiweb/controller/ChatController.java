// // package com.apiweb.controller;

// // import com.apiweb.repository.ApplyJobRepository;
// // import com.apiweb.repository.entity.ApplyJobEntity;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.beans.factory.annotation.Value;
// // import org.springframework.http.*;
// // import org.springframework.web.bind.annotation.*;
// // import org.springframework.web.client.RestTemplate;

// // import java.util.*;
// // import java.util.stream.Collectors;

// // @RestController
// // @RequestMapping("/api/chat")
// // @CrossOrigin(origins = "*")
// // public class ChatController {

// //     @Value("${gemini.api.key}")
// //     private String apiKey;

// //     @Value("${gemini.api.url}")
// //     private String apiUrl;

// //     @Autowired
// //     private ApplyJobRepository applyJobRepository;

// //     @PostMapping
// //     public ResponseEntity<?> getChatResponse(@RequestBody Map<String, String> payload) {
// //         String userMessage = payload.get("message");

// //         // 1. Lấy dữ liệu ứng viên từ Database để làm ngữ cảnh (Context)
// //         List<ApplyJobEntity> candidates = applyJobRepository.findAll();
// //         String candidateContext = candidates.stream()
// //                 .map(c -> String.format("- %s (Email: %s, Vị trí: %s, Trạng thái: %s)", 
// //                         c.getFullName(), c.getEmail(), c.getJob().getTitle(), c.getStatus()))
// //                 .collect(Collectors.joining("\n"));

// //         // 2. Xây dựng Prompt gửi cho Gemini
// //         String prompt = "Bạn là trợ lý AI tên RecruiterPro. Dưới đây là danh sách ứng viên thực tế trong hệ thống:\n" 
// //                 + candidateContext 
// //                 + "\n\nHãy trả lời câu hỏi sau bằng tiếng Việt một cách chuyên nghiệp: " + userMessage;

// //         // 3. Gọi API Gemini bằng RestTemplate
// //         RestTemplate restTemplate = new RestTemplate();
// //         HttpHeaders headers = new HttpHeaders();
// //         headers.setContentType(MediaType.APPLICATION_JSON);

// //         // Cấu trúc Body theo yêu cầu của Google Gemini API
// //         Map<String, Object> requestBody = Map.of(
// //             "contents", List.of(
// //                 Map.of("parts", List.of(Map.of("text", prompt)))
// //             )
// //         );

// //         HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        
// //         try {
// //             ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "?key=" + apiKey, entity, Map.class);
            
// //             // Trích xuất nội dung trả về từ JSON của Gemini
// //             Map responseBody = response.getBody();
// //             List candidatesList = (List) responseBody.get("candidates");
// //             Map firstCandidate = (Map) candidatesList.get(0);
// //             Map content = (Map) firstCandidate.get("content");
// //             List parts = (List) content.get("parts");
// //             Map firstPart = (Map) parts.get(0);
// //             String aiReply = (String) firstPart.get("text");

// //             // Trả về cho Frontend
// //             return ResponseEntity.ok(Map.of(
// //                 "reply", aiReply,
// //                 "suggestions", List.of("Tóm tắt ứng viên", "Viết JD mới", "Mức lương thị trường")
// //             ));
// //         } catch (Exception e) {
// //             e.printStackTrace();
// //             return ResponseEntity.status(500).body(Map.of("reply", "Lỗi kết nối AI: " + e.getMessage()));
// //         }
// //     }
// // }

// package com.apiweb.controller;

// import com.apiweb.repository.ApplyJobRepository;
// import com.apiweb.repository.JobRepository;
// import com.apiweb.repository.entity.ApplyJobEntity;
// import com.apiweb.repository.entity.JobEntity;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.client.RestTemplate;

// import java.util.*;
// import java.util.stream.Collectors;

// // @RestController
// // @RequestMapping("/api/chat")
// // @CrossOrigin(origins = "*", allowedHeaders = "*") // Cho phép mọi Header bao gồm Authorization
// // public class ChatController {

// //     @Value("${gemini.api.key}")
// //     private String apiKey;

// //     @Value("${gemini.api.url}")
// //     private String apiUrl;

// //     @Autowired
// //     private ApplyJobRepository applyJobRepository;

// //     @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE) // Đảm bảo luôn trả về JSON
// //     public ResponseEntity<?> getChatResponse(@RequestBody Map<String, String> payload) {
// //         String userMessage = payload.get("message");

// //         try {
// //             // 1. Lấy dữ liệu ngữ cảnh
// //             List<ApplyJobEntity> candidates = applyJobRepository.findAll();
// //             // Sửa lại đoạn lấy dữ liệu ngữ cảnh
// // String candidateContext = candidates.stream()
// // .map(c -> {
// //     String jobTitle = (c.getJob() != null) ? c.getJob().getTitle() : "N/A";
// //     // LẤY THÊM LƯƠNG TỪ BẢNG JOB Ở ĐÂY
// //     String salary = (c.getJob() != null) ? String.valueOf(c.getJob().getSalary()) : "Thỏa thuận";
    
// //     return String.format("- %s (Ứng tuyển: %s, Lương: %s, Trạng thái: %s)", 
// //                          c.getFullName(), jobTitle, salary, c.getStatus());
// // })
// // .collect(Collectors.joining("\n"));

// //             // 2. Xây dựng Prompt
// //             String prompt = "Bạn là trợ lý AI tên RecruiterPro. Dưới đây là danh sách ứng viên thực tế:\n" 
// //                     + candidateContext 
// //                     + "\n\nCâu hỏi: " + userMessage;

// //             // 3. Gọi Gemini
// //             RestTemplate restTemplate = new RestTemplate();
// //             HttpHeaders headers = new HttpHeaders();
// //             headers.setContentType(MediaType.APPLICATION_JSON);

// //             Map<String, Object> requestBody = Map.of(
// //                 "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
// //             );

// //             HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
// //             // Gọi API
// //             ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "?key=" + apiKey, entity, Map.class);
            
// //             // Bóc tách dữ liệu an toàn
// //             String aiReply = "Xin lỗi, tôi không thể xử lý câu trả lời lúc này.";
// //             if (response.getBody() != null) {
// //                 List candidatesList = (List) response.getBody().get("candidates");
// //                 if (candidatesList != null && !candidatesList.isEmpty()) {
// //                     Map firstCandidate = (Map) candidatesList.get(0);
// //                     Map content = (Map) firstCandidate.get("content");
// //                     List parts = (List) content.get("parts");
// //                     aiReply = (String) ((Map) parts.get(0)).get("text");
// //                 }
// //             }

// //             return ResponseEntity.ok(Map.of(
// //                 "reply", aiReply,
// //                 "suggestions", List.of("Tóm tắt ứng viên", "Mức lương thị trường", "Viết email mời PV")
// //             ));

// //         } catch (Exception e) {
// //             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
// //                     .body(Map.of("reply", "Lỗi kết nối AI: " + e.getMessage()));
// //         }
// //     }
// // }

// @RestController
// @RequestMapping("/api/chat")
// @CrossOrigin(origins = "*", allowedHeaders = "*")
// public class ChatController {

//     @Value("${gemini.api.key}")
//     private String apiKey;

//     @Value("${gemini.api.url}")
//     private String apiUrl;

//     @Autowired
//     private ApplyJobRepository applyJobRepository;

//     @Autowired
//     private JobRepository jobRepository; // 1. Thêm Repository này

//     @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//     public ResponseEntity<?> getChatResponse(@RequestBody Map<String, String> payload) {
//         String userMessage = payload.get("message");

//         try {
//             // 2. Lấy dữ liệu Ứng viên (Candidates)
//             List<ApplyJobEntity> candidates = applyJobRepository.findAll();
//             String candidateContext = candidates.stream()
//                     .map(c -> String.format("- %s (Ứng tuyển: %s, Trạng thái: %s)", 
//                             c.getFullName(), 
//                             (c.getJob() != null ? c.getJob().getTitle() : "N/A"), 
//                             c.getStatus()))
//                     .collect(Collectors.joining("\n"));

//             // 3. Lấy dữ liệu Công việc (Jobs)
//             List<JobEntity> jobs = jobRepository.findAll(); // Giả sử tên là JobEntity
//             String jobContext = jobs.stream()
//                     .map(j -> String.format("- %s (Lương: %s, Địa điểm: %s, Yêu cầu: %s)", 
//                             j.getTitle(), 
//                             j.getSalary(), // Đảm bảo bảng Job có trường này
//                             j.getAddress(), 
//                             j.getRequirement()))
//                     .collect(Collectors.joining("\n"));

//             // 4. Xây dựng Prompt "Toàn diện"
//             String prompt = "Bạn là trợ lý AI tên RecruiterPro. Dưới đây là dữ liệu từ hệ thống:\n\n" 
//                     + " DANH SÁCH CÔNG VIỆC ĐANG TUYỂN:\n" + jobContext 
//                     + "\n\n DANH SÁCH ỨNG VIÊN ĐÃ NỘP ĐƠN:\n" + candidateContext 
//                     + "\n\nHãy trả lời câu hỏi dựa trên dữ liệu trên một cách chuyên nghiệp: " + userMessage;

//             // 5. Gọi Gemini (giữ nguyên logic RestTemplate cũ của bạn)
//             RestTemplate restTemplate = new RestTemplate();
//             HttpHeaders headers = new HttpHeaders();
//             headers.setContentType(MediaType.APPLICATION_JSON);

//             Map<String, Object> requestBody = Map.of(
//                 "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
//             );

//             HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
//             ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "?key=" + apiKey, entity, Map.class);
            
//             // ... (Phần bóc tách aiReply giữ nguyên)
            
//             return ResponseEntity.ok(Map.of(
//                 "reply", aiReply,
//                 "suggestions", List.of("Tổng quan các Job", "Ứng viên tiềm năng", "So sánh lương các Job")
//             ));

//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body(Map.of("reply", "Lỗi kết nối AI: " + e.getMessage()));
//         }
//     }
// }


package com.apiweb.controller;

import com.apiweb.repository.ApplyJobRepository;
import com.apiweb.repository.JobRepository; // Đảm bảo đã import
import com.apiweb.repository.entity.ApplyJobEntity;
import com.apiweb.repository.entity.JobEntity; // Đảm bảo đã import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

// @RestController
// @RequestMapping("/api/chat")
// @CrossOrigin(origins = "*", allowedHeaders = "*")
// public class ChatController {

//     @Value("${gemini.api.key}")
//     private String apiKey;

//     @Value("${gemini.api.url}")
//     private String apiUrl;

//     @Autowired
//     private ApplyJobRepository applyJobRepository;

//     @Autowired
//     private JobRepository jobRepository; // Thêm để lấy thông tin Job

//     @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//     public ResponseEntity<?> getChatResponse(@RequestBody Map<String, String> payload) {
//         String userMessage = payload.get("message");
        
//         // KHAI BÁO BIẾN Ở ĐÂY ĐỂ TRÁNH LỖI "cannot be resolved"
//         String aiReply = "Xin lỗi, tôi gặp trục trặc khi kết nối với bộ não AI.";

//         try {
//             // 1. Lấy dữ liệu Ứng viên (Context 1)
//             List<ApplyJobEntity> candidates = applyJobRepository.findAll();
//             String candidateContext = candidates.stream()
//                     .map(c -> String.format("- Ứng viên: %s, Vị trí nộp: %s, Trạng thái: %s", 
//                             c.getFullName(), 
//                             (c.getJob() != null ? c.getJob().getTitle() : "N/A"), 
//                             c.getStatus()))
//                     .collect(Collectors.joining("\n"));

//             // 2. Lấy dữ liệu Công việc (Context 2)
//             List<JobEntity> jobs = jobRepository.findAll();
//             String jobContext = jobs.stream()
//                     .map(j -> String.format("- Công việc: %s, Lương: %s, Yêu cầu: %s", 
//                             j.getTitle(), j.getSalary(), j.getRequirement()))
//                     .collect(Collectors.joining("\n"));

//             // 3. Xây dựng Prompt tổng hợp
//             String prompt = "Bạn là trợ lý AI chuyên nghiệp. Dữ liệu hệ thống hiện có:\n\n"
//                     + "[DANH SÁCH CÔNG VIỆC]\n" + jobContext + "\n\n"
//                     + "[DANH SÁCH ỨNG VIÊN]\n" + candidateContext + "\n\n"
//                     + "Câu hỏi: " + userMessage;

//             // 4. Gọi API Gemini
//             RestTemplate restTemplate = new RestTemplate();
//             HttpHeaders headers = new HttpHeaders();
//             headers.setContentType(MediaType.APPLICATION_JSON);

//             Map<String, Object> requestBody = Map.of(
//                 "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
//             );

//             HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
//             ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "?key=" + apiKey, entity, Map.class);
            
//             // 5. Gán giá trị cho aiReply (Biến đã khai báo ở đầu phương thức)
//             if (response.getBody() != null) {
//                 List candidatesList = (List) response.getBody().get("candidates");
//                 if (candidatesList != null && !candidatesList.isEmpty()) {
//                     Map firstCandidate = (Map) candidatesList.get(0);
//                     Map content = (Map) firstCandidate.get("content");
//                     List parts = (List) content.get("parts");
//                     aiReply = (String) ((Map) parts.get(0)).get("text");
//                 }
//             }

//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                     .body(Map.of("reply", "Lỗi xử lý AI: " + e.getMessage()));
//         }

//         // TRẢ VỀ KẾT QUẢ (Lúc này aiReply chắc chắn đã tồn tại)
//         return ResponseEntity.ok(Map.of(
//             "reply", aiReply,
//             "suggestions", List.of("Phân tích Job", "Danh sách ứng viên", "Mức lương chung")
//         ));
//     }
// }


@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatController {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    @Autowired
    private ApplyJobRepository applyJobRepository;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getChatResponse(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");
        String aiReply = "Xin lỗi, tôi gặp trục trặc khi kết nối với bộ não AI.";

        try {
            // 1. Lấy dữ liệu Công việc CHI TIẾT (Bổ sung Company, Description, Benefit, v.v.)
            List<JobEntity> jobs = jobRepository.findAll();
            String jobContext = jobs.stream()
                    .map(j -> String.format(
                        "- CÔNG TY: %s\n  + Vị trí: %s\n  + Mức lương: %s\n  + Địa điểm: %s\n  + Loại hình: %s\n  + Mô tả: %s\n  + Yêu cầu: %s\n  + Quyền lợi: %s", 
                        j.getCompanyName(), j.getTitle(), j.getSalary(), j.getAddress(), 
                        j.getTypeOfJob(), j.getDescription(), j.getRequirement(), j.getBenefit()
                    ))
                    .collect(Collectors.joining("\n\n"));

            // 2. Lấy dữ liệu Ứng viên (Gắn kết chặt chẽ với tên công ty và vị trí)
            List<ApplyJobEntity> candidates = applyJobRepository.findAll();
            String candidateContext = candidates.stream()
                    .map(c -> String.format("- Ứng viên %s nộp vào vị trí %s của công ty %s (Trạng thái: %s)", 
                            c.getFullName(), 
                            (c.getJob() != null ? c.getJob().getTitle() : "N/A"),
                            (c.getJob() != null ? c.getJob().getCompanyName() : "N/A"),
                            c.getStatus()))
                    .collect(Collectors.joining("\n"));

            // 3. Xây dựng Prompt "Siêu ngữ cảnh"
            String prompt = "Bạn là trợ lý tuyển dụng AI cấp cao tên RecruiterPro. Dưới đây là dữ liệu toàn diện từ hệ thống của chúng tôi:\n\n"
                    + "=== DANH SÁCH CÔNG VIỆC VÀ CHI TIẾT CÔNG TY ===\n" + jobContext + "\n\n"
                    + "=== DANH SÁCH ỨNG VIÊN HIỆN TẠI ===\n" + candidateContext + "\n\n"
                    + "HƯỚNG DẪN TRẢ LỜI:\n"
                    + "1. Sử dụng dữ liệu trên để trả lời chi tiết về tên công ty, lương, mô tả công việc hoặc quyền lợi khi người dùng hỏi.\n"
                    + "2. Nếu người dùng hỏi về ứng viên, hãy cho biết họ nộp vào công ty nào và trạng thái ra sao.\n"
                    + "3. Trả lời bằng tiếng Việt, giọng văn chuyên nghiệp, hỗ trợ nhiệt tình.\n"
                    + "4. Nếu thông tin không có trong dữ liệu, hãy lịch sự thông báo không tìm thấy.\n\n"
                    + "CÂU HỎI CỦA NGƯỜI DÙNG: " + userMessage;

            // 4. Gọi API Gemini
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", prompt))))
            );

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "?key=" + apiKey, entity, Map.class);
            
            if (response.getBody() != null) {
                List candidatesList = (List) response.getBody().get("candidates");
                if (candidatesList != null && !candidatesList.isEmpty()) {
                    Map firstCandidate = (Map) candidatesList.get(0);
                    Map content = (Map) firstCandidate.get("content");
                    List parts = (List) content.get("parts");
                    aiReply = (String) ((Map) parts.get(0)).get("text");
                }
            }

            // Gợi ý câu hỏi đa dạng hơn dựa trên dữ liệu mới
            return ResponseEntity.ok(Map.of(
                "reply", aiReply,
                "suggestions", List.of("Chi tiết đãi ngộ công ty A", "Top Job lương cao", "Ứng viên mới nhất")
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("reply", "Lỗi xử lý AI: " + e.getMessage()));
        }
    }
}