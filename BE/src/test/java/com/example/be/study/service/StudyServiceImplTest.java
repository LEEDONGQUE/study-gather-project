package com.example.be.study.service;

import com.example.be.study.dto.StudyCreateRequestDto;
import com.example.be.study.entity.Study;
import com.example.be.study.repository.StudyRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class StudyServiceImplTest {

    @Mock
    private StudyRepository studyRepository;

    @InjectMocks
    private StudyServiceImpl studyService;

    @Test
    void 스터디_생성_성공() {
        // given
        StudyCreateRequestDto dto = new StudyCreateRequestDto();
        dto.setStudyTitle("알고리즘 스터디");
        dto.setStudyTopic("코딩 테스트");
        dto.setDescription("매주 2회 백준 문제 풀이");
        dto.setMaxParticipants(5);
        dto.setPlace("온라인");
        dto.setStartDate("2024-11-20");
        dto.setEndDate("2024-12-20");
        dto.setChatLink("https://open.kakao.com/example");

        Study fake = Study.builder()
                .studyTitle(dto.getStudyTitle())
                .studyTopic(dto.getStudyTopic())
                .description(dto.getDescription())
                .maxParticipants(dto.getMaxParticipants())
                .place(dto.getPlace())
                .startDate(LocalDate.parse(dto.getStartDate()))
                .endDate(LocalDate.parse(dto.getEndDate()))
                .chatLink(dto.getChatLink())
                .build();

        // 엔티티의 id 필드는 @GeneratedValue라 Builder에서 넣을 수 없기 때문에 Reflection 사용
        ReflectionTestUtils.setField(fake, "id", 1L);

        when(studyRepository.save(any(Study.class))).thenReturn(fake);

        // when
        Long result = studyService.createStudy(dto);

        // then
        assertEquals(1L, result);
        verify(studyRepository, times(1)).save(any(Study.class));
    }
}
