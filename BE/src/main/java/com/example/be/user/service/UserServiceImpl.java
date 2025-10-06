package com.example.be.user.service;

import com.example.be.user.dto.SignUpRequestDto;
import com.example.be.user.dto.UserResponseDto;
import com.example.be.user.entity.UserEntity;
import com.example.be.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void signUp(SignUpRequestDto requestDto) {
        // 1. 비밀번호와 비밀번호 확인 필드가 일치하는지 확인
        if (!requestDto.getPassword().equals(requestDto.getPasswordCheck())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 2. 학번 중복 확인
        if (userRepository.existsByStudentNumber(requestDto.getStudentNumber())) {
            throw new IllegalArgumentException("이미 사용 중인 학번입니다.");
        }

        // 3. 이메일 중복 확인
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 4. 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        // 5. UserEntity 객체 생성 및 DB 저장
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
        // orElseThrow를 사용하여 코드를 더 간결하게 수정
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다. userId: " + userId));

        return new UserResponseDto(user);
    }
}
