package com.ninver.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "accion")
public class Accion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;

    public Accion(String nombre) {
        this.nombre = nombre;
    }

    //@OneToMany(mappedBy = "accion")
    //List<Log> logs;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
