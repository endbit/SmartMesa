package com.endbit.auth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.endbit.auth.model.TableEntity;
import com.endbit.auth.service.TableService;

@RestController
@RequestMapping("/tables")
public class TableController {

    @Autowired
    private TableService tableService;

    /* LISTAR TODAS AS MESAS */
    @GetMapping
    public ResponseEntity<List<TableEntity>> findAll() {
        return ResponseEntity.ok(tableService.findAll());
    }

    /* BUSCAR POR ID */
    @GetMapping("/{id}")
    public ResponseEntity<TableEntity> findById(@PathVariable Long id) {
        return ResponseEntity.ok(tableService.findById(id));
    }

    /* BUSCAR POR TOKEN */
    @GetMapping("/token/{token}")
    public ResponseEntity<TableEntity> findByToken(
            @PathVariable String token) {

        return ResponseEntity.ok(
                tableService.findByToken(token));
    }

    /* CRIAR MESA */
    @PostMapping
    public ResponseEntity<TableEntity> create(
            @RequestBody TableEntity table) {

        return ResponseEntity.ok(
                tableService.create(table));
    }

    /* ATUALIZAR */
    @PutMapping("/{id}")
    public ResponseEntity<TableEntity> update(
            @PathVariable Long id,
            @RequestBody TableEntity table) {

        return ResponseEntity.ok(
                tableService.update(id, table));
    }

    /* ATIVAR / DESATIVAR */
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TableEntity> toggle(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                tableService.toggleActive(id));
    }

    /* OCUPAR MESA */
    @PatchMapping("/{id}/occupy")
    public ResponseEntity<TableEntity> occupy(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                tableService.occupyTable(id));
    }

    /* LIBERAR MESA */
    @PatchMapping("/{id}/free")
    public ResponseEntity<TableEntity> free(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                tableService.freeTable(id));
    }

    /* FECHAR MESA */
    @PatchMapping("/{id}/close")
    public ResponseEntity<TableEntity> close(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                tableService.closeTable(id));
    }

    /* REGERAR TOKEN */
    @PatchMapping("/{id}/regenerate-token")
    public ResponseEntity<TableEntity> regenerateToken(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                tableService.regenerateToken(id));
    }

    /* DELETE */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable Long id) {

        tableService.delete(id);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Mesa removida com sucesso"));
    }
}