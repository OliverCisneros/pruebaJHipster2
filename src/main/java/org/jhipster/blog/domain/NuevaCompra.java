package org.jhipster.blog.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A NuevaCompra.
 */
@Entity
@Table(name = "nueva_compra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "nuevacompra")
public class NuevaCompra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "idventa", nullable = false)
    private Integer idventa;

    @NotNull
    @Column(name = "cantidad_comprar", nullable = false)
    private Integer cantidadComprar;

    @NotNull
    @Column(name = "fecha_transaccion", nullable = false)
    private LocalDate fechaTransaccion;

    @ManyToOne
    private Persona persona;

    @ManyToOne
    private Producto producto;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdventa() {
        return idventa;
    }

    public NuevaCompra idventa(Integer idventa) {
        this.idventa = idventa;
        return this;
    }

    public void setIdventa(Integer idventa) {
        this.idventa = idventa;
    }

    public Integer getCantidadComprar() {
        return cantidadComprar;
    }

    public NuevaCompra cantidadComprar(Integer cantidadComprar) {
        this.cantidadComprar = cantidadComprar;
        return this;
    }

    public void setCantidadComprar(Integer cantidadComprar) {
        this.cantidadComprar = cantidadComprar;
    }

    public LocalDate getFechaTransaccion() {
        return fechaTransaccion;
    }

    public NuevaCompra fechaTransaccion(LocalDate fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion;
        return this;
    }

    public void setFechaTransaccion(LocalDate fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion;
    }

    public Persona getPersona() {
        return persona;
    }

    public NuevaCompra persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Producto getProducto() {
        return producto;
    }

    public NuevaCompra producto(Producto producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        NuevaCompra nuevaCompra = (NuevaCompra) o;
        if (nuevaCompra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nuevaCompra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NuevaCompra{" +
            "id=" + getId() +
            ", idventa='" + getIdventa() + "'" +
            ", cantidadComprar='" + getCantidadComprar() + "'" +
            ", fechaTransaccion='" + getFechaTransaccion() + "'" +
            "}";
    }
}
