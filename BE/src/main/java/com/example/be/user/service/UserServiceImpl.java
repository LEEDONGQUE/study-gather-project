package com.example.be.user.service;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.global.jwt.JwtTokenProvider;
import com.example.be.study.repository.StudyMemberRepository;
import com.example.be.study.repository.StudyRepository;
import com.example.be.user.dto.LoginRequestDto;
import com.example.be.user.dto.MyPageResponseDto;
import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;
import com.example.be.user.entity.UserEntity;
import com.example.be.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final StudyRepository studyRepository;             // [생성 모임용]
    private final StudyMemberRepository studyMemberRepository; // [신청 모임용]
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    // ... (기존 signUp, getUserInfo, login 메서드 유지) ...
    @Override
    @Transactional
    public void signUp(SignUpRequestDto requestDto) {
        if (userRepository.existsByStudentNumber(requestDto.getStudentNumber())) {
            throw new IllegalArgumentException("이미 사용 중인 학번입니다.");
        }
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        if (!requestDto.getPassword().equals(requestDto.getPasswordCheck())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
        UserEntity newUser = UserEntity.builder()
                .studentNumber(requestDto.getStudentNumber())
                .userName(requestDto.getUserName())
                .email(requestDto.getEmail())
                .password(encodedPassword)
                .build();
        userRepository.save(newUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserInfo(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다. userId: " + userId));
        return new UserResponseDto(user);
    }

    @Override
    public ApiResponseDto<?> login(LoginRequestDto requestDto) {
        UserEntity user = userRepository.findByStudentNumber(requestDto.getStudentNumber())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 학번입니다."));
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        String token = jwtTokenProvider.createToken(user.getStudentNumber());
        return ApiResponseDto.success("로그인 성공", token);
    }

    // ==========================================
    // [신규] 마이페이지 정보 조회 로직
    // ==========================================
    @Transactional(readOnly = true)
    public MyPageResponseDto getMyPageInfo(String studentNumber) {
        // 1. 사용자 조회
        UserEntity user = userRepository.findByStudentNumber(studentNumber)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        // 2. 내가 생성한 모임 조회 (주제, 이름, 기간)
        List<MyPageResponseDto.CreatedStudyItem> createdList = studyRepository.findAllByOrganizer(user).stream()
                .map(study -> MyPageResponseDto.CreatedStudyItem.builder()
                        .studyId(study.getId())
                        .topic(study.getStudyTopic())
                        .title(study.getStudyTitle())
                        .startDate(study.getStartDate().toString())
                        .endDate(study.getEndDate().toString())
                        .build())
                .collect(Collectors.toList());

        // 3. 내가 신청한 모임 조회 (주제, 이름, 신청날짜)
        List<MyPageResponseDto.AppliedStudyItem> appliedList = studyMemberRepository.findAllByUser(user).stream()
                .map(member -> MyPageResponseDto.AppliedStudyItem.builder()
                        .studyId(member.getStudy().getId())
                        .topic(member.getStudy().getStudyTopic())
                        .title(member.getStudy().getStudyTitle())
                        .applicationDate(member.getApplicationDate().toString())
                        .build())
                .collect(Collectors.toList());

        // 4. 결과 리턴
        return MyPageResponseDto.builder()
                .userInfo(MyPageResponseDto.UserInfo.builder()
                        .name(user.getUserName())
                        .studentNumber(user.getStudentNumber())
                        .build())
                .createdStudies(createdList)
                .appliedStudies(appliedList)
                .build();
    }
}