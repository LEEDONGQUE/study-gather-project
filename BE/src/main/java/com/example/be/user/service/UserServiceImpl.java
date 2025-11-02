package com.example.be.user.service;

import com.example.be.global.dto.ApiResponseDto;
import com.example.be.global.jwt.JwtTokenProvider;
import com.example.be.user.dto.LoginRequestDto;
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
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public void signUp(SignUpRequestDto requestDto) {
        //signup 로직 순서는 어떻게 해야할까?
        //우선 이름, 학번, 이메일, 비밀번호, 비밀번호 확인 순서로 사용자가 타이핑함.
        //맨 처음 서비스를 시작했을 때 당연히 DB에는 값이 저장안되어있으니 학번 중복을
        //학번 중복을 로직 맨 처음에 베치하면 NullPointerException이 발생할수도있지 않을까?
        //비밀번호랑 비밀번호확인 값을 먼저 체크하는게 맞을까?
        // 1. 학번 중복 확인
        if (userRepository.existsByStudentNumber(requestDto.getStudentNumber())) {
            throw new IllegalArgumentException("이미 사용 중인 학번입니다.");
        }// 이런 오류 발생났을 때 global 폴더에 만든 GlobalExceptionHandler 호출하면되지않나?

        //  이메일 중복 확인
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        // 비밀번호랑 비밀번호확인이랑 같은지 체크
        if (!requestDto.getPassword().equals(requestDto.getPasswordCheck())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        //  비밀번호 암호화
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

    /**
     * 로그인 진행
     * @param requestDto 로그인 요청 DTO(학번, 비밀번호)
     * @return 성공 메시지
     */
    public ApiResponseDto<?> login(LoginRequestDto requestDto) {
        // 학번 검증
        UserEntity user = userRepository.findByStudentNumber(requestDto.getStudentNumber())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 학번입니다."));

        // 비밀번호 일치 여부 검증
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 로그인 성공 시 JWT 토큰 발행
        String token = jwtTokenProvider.createToken(user.getStudentNumber());

        // 성공 응답
        return ApiResponseDto.success("로그인 성공", token);
    }
}
