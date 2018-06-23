package com.ninver.repository;


import com.ninver.entities.Accion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAccionRepository extends JpaRepository<Accion, Integer> {
}
