package com.endbit.auth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.endbit.auth.model.TableEntity;
import com.endbit.auth.model.TableSession;
import com.endbit.auth.service.TableService;
import com.endbit.auth.service.TableSessionService;

@RestController
@RequestMapping("/sessions")
public class TableSessionController {

    @Autowired
    private TableSessionService sessionService;

    @Autowired
    private TableService tableService;

    /**
     * ABRE OU RETORNA SESSÃO ATIVA DA MESA
     * (endpoint principal do QR Code)
     */
    @GetMapping("/table/{token}")
    public ResponseEntity<?> openSessionByTableToken(
            @PathVariable String token) {

        TableEntity table = tableService.findByToken(token);

        TableSession session = sessionService.openOrGetSession(table);

        return ResponseEntity.ok(session);
    }

    /**
     * BUSCA SESSÃO POR TOKEN
     */
    @GetMapping("/{sessionToken}")
    public ResponseEntity<TableSession> findByToken(
            @PathVariable String sessionToken) {

        return ResponseEntity.ok(
                sessionService.findByToken(sessionToken));
    }

    /**
     * FECHA SESSÃO DA MESA
     */
    @PatchMapping("/table/{tableId}/close")
    public ResponseEntity<?> closeSession(
            @PathVariable Long tableId) {

        TableSession session = sessionService.closeSession(tableId);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Sessão encerrada com sucesso",
                        "sessionToken", session.getSessionToken()
                )
        );
    }

    /**
     * ATUALIZA ATIVIDADE (heartbeat do frontend)
     */
    @PatchMapping("/{sessionToken}/touch")
    public ResponseEntity<?> touch(
            @PathVariable String sessionToken) {

        sessionService.touch(sessionToken);

        return ResponseEntity.ok(
                Map.of("message", "atividade atualizada")
        );
    }
}