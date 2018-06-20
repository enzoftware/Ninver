package com.ninver.entities;

import javax.persistence.*;

@Entity
@Table(name = "log_user")
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int usuario_id;
    private int accion_id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(int usuario_id) {
        this.usuario_id = usuario_id;
    }

    public int getAccion_id() {
        return accion_id;
    }

    public void setAccion_id(int accion_id) {
        this.accion_id = accion_id;
    }
}
