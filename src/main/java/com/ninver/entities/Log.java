package com.ninver.entities;

import javax.persistence.*;

@Entity
@Table(name = "log_user")
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    Usuario usuario;

    @ManyToOne
    Accion accion;

    public Log(Usuario usuario, Accion accion) {
        this.usuario = usuario;
        this.accion = accion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Accion getAccion() {
        return accion;
    }

    public void setAccion(Accion accion) {
        this.accion = accion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
