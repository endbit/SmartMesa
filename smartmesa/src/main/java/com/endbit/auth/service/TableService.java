package com.endbit.auth.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endbit.auth.model.TableEntity;
import com.endbit.auth.repository.TableRepository;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    /* LISTAR TODAS AS MESAS */
    public List<TableEntity> findAll() {
        return tableRepository.findAll();
    }

    /* BUSCAR POR ID */
    public TableEntity findById(Long id) {
        return tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa não encontrada"));
    }

    /* BUSCAR POR TOKEN */
    public TableEntity findByToken(String token) {
        return tableRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Mesa inválida"));
    }

    /* CRIAR MESA */
    public TableEntity create(TableEntity table) {

        tableRepository.findByNumber(table.getNumber())
                .ifPresent(t -> {
                    throw new RuntimeException("Já existe uma mesa com esse número");
                });

        table.setActive(true);
        table.setOccupied(false);
        table.setOccupiedAt(null);

        table.setToken(generateToken());

        return tableRepository.save(table);
    }

    /* ATUALIZAR MESA */
    public TableEntity update(Long id, TableEntity updated) {

        TableEntity table = findById(id);

        table.setNumber(updated.getNumber());
        table.setActive(updated.getActive());

        return tableRepository.save(table);
    }

    /* ATIVAR / DESATIVAR */
    public TableEntity toggleActive(Long id) {

        TableEntity table = findById(id);

        table.setActive(!table.getActive());

        return tableRepository.save(table);
    }

    /* OCUPAR MESA */
    public TableEntity occupyTable(Long id) {

        TableEntity table = findById(id);

        if (!table.getOccupied()) {
            table.setOccupied(true);
            table.setOccupiedAt(LocalDateTime.now());
        }

        return tableRepository.save(table);
    }

    /* LIBERAR MESA */
    public TableEntity freeTable(Long id) {

        TableEntity table = findById(id);

        table.setOccupied(false);
        table.setOccupiedAt(null);

        return tableRepository.save(table);
    }

    /* FECHAR MESA */
    public TableEntity closeTable(Long id) {
        return freeTable(id);
    }

    /* REGERAR TOKEN */
    public TableEntity regenerateToken(Long id) {

        TableEntity table = findById(id);

        table.setToken(generateToken());

        return tableRepository.save(table);
    }

    /* DELETE */
    public void delete(Long id) {

        TableEntity table = findById(id);

        if (Boolean.TRUE.equals(table.getOccupied())) {
            throw new RuntimeException(
                    "Não é possível excluir uma mesa ocupada");
        }

        tableRepository.delete(table);
    }

    /* GERADOR TOKEN */
    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}