package com.example.be.user.controller;

import com.example.be.study.repository.ParticipantRepository;
import com.example.be.study.repository.StudyRepository;
import com.example.be.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ParticipantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Test
    void testApplyController() throws Exception {
        // given
        Long studyId = studyRepository.findAll().get(0).getId();
        Long userId = userRepository.findAll().get(0).getUserId();

        // when & then
        mockMvc.perform(post("/participants/" + studyId)
                        .param("userId", String.valueOf(userId)))
                .andExpect(status().isOk());
    }
}
