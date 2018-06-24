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

    private int accion_id;

    public int getAccion_id() {
        return accion_id;
    }

    public void setAccion_id(int accion_id) {
        this.accion_id = accion_id;
    }

    public Usuario getUsuario() {
        return usuario;

    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
