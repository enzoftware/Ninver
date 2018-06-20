package com.ninver.entities;

import javax.persistence.*;
import javax.validation.constraints.Max;
import java.util.List;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;
    private String apellido;
    private String contrasena;

    @OneToMany(mappedBy = "usuario")
    private List<Log> logs;

    public Usuario(String nombre, String apellido, String contrasena) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasena = contrasena;
    }

    public int getId() {
        return id;

    }

    public List<Log> getLogs() {
        return logs;
    }

    public void setLogs(List<Log> logs) {
        this.logs = logs;
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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
