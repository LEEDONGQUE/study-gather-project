package com.example.be.study.service;

import com.example.be.study.entity.Participant;
import com.example.be.study.entity.ParticipantStatus;
import com.example.be.study.entity.Study;
import com.example.be.study.repository.ParticipantRepository;
import com.example.be.study.repository.StudyRepository;
import com.example.be.user.entity.UserEntity;
import com.example.be.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ParticipantService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;
    private final UserRepository userRepository;

    /**
     * 스터디 신청 기능 (userId 를 직접 받아 처리)
     */
    public void apply(Long studyId, Long userId) {

        // 스터디 조회
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() ->
                        new IllegalArgumentException("해당 스터디를 찾을 수 없습니다. studyId=" + studyId));

        // 유저 조회
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("사용자를 찾을 수 없습니다. userId=" + userId));

        // 중복 신청 여부 검사
        if (participantRepository.existsByStudyAndUser(study, user)) {
            throw new IllegalArgumentException("이미 신청한 스터디입니다.");
        }

        // 참여자 엔티티 생성
        Participant participant = Participant.builder()
                .study(study)
                .user(user)
                .status(ParticipantStatus.PENDING)
                .build();

        // 저장
        participantRepository.save(participant);
    }
}
