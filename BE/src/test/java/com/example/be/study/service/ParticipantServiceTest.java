package com.example.be.study.service;

import com.example.be.study.entity.Participant;
import com.example.be.study.entity.ParticipantStatus;
import com.example.be.study.entity.Study;
import com.example.be.study.repository.ParticipantRepository;
import com.example.be.study.repository.StudyRepository;
import com.example.be.user.entity.UserEntity;
import com.example.be.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ParticipantServiceTest {

    @Autowired
    private ParticipantService participantService;

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    private Long studyId;
    private Long userId;

    @BeforeEach
    void setup() {
        // 스터디 생성
        Study study = Study.builder()
                .studyTitle("테스트 스터디")
                .studyTopic("Java")
                .description("테스트 설명")
                .maxParticipants(5)
                .place("온라인")
                .startDate(java.time.LocalDate.now())
                .endDate(java.time.LocalDate.now().plusDays(10))
                .chatLink(null)
                .build();

        // PK 이름 수정 getId() → getStudyId()
        studyId = studyRepository.save(study).getStudyId();

        // 유저 생성
        UserEntity user = UserEntity.builder()
                .studentNumber("20220001")
                .userName("테스터")
                .email("test@test.com")
                .password("1234")
                .build();
        userId = userRepository.save(user).getUserId();
    }

    @Test
    void testApplySuccess() {
        // when
        participantService.apply(studyId, userId);

        // then
        Participant participant = participantRepository.findAll().get(0);
        assertEquals(ParticipantStatus.PENDING, participant.getStatus());

        // PK 이름 수정 getId() → getStudyId()
        assertEquals(studyId, participant.getStudy().getStudyId());

        assertEquals(userId, participant.getUser().getUserId());
    }
}