package com.example.be.user.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class MyPageResponseDto {

    private UserInfo userInfo;
    private List<CreatedStudyItem> createdStudies; // 내가 생성한 모임 리스트
    private List<AppliedStudyItem> appliedStudies; // 내가 신청한 모임 리스트

    // [사용자 프로필 정보]
    @Getter @Builder
    public static class UserInfo {
        private String name;
        private String studentNumber;
    }

    // [1. 내가 생성한 모임 DTO] - 주제, 모임이름, 모집기간
    @Getter @Builder
    public static class CreatedStudyItem {
        private Long studyId;
        private String topic;      // 주제
        private String title;      // 모임 이름
        private String startDate;  // 모집 시작일
        private String endDate;    // 모집 종료일
    }

    // [2. 내가 신청한 모임 DTO] - 주제, 모임이름, 신청날짜
    @Getter @Builder
    public static class AppliedStudyItem {
        private Long studyId;
        private String topic;           // 주제
        private String title;           // 모임 이름
        private String applicationDate; // 신청 날짜
    }
}