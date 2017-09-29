package org.jhipster.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Producto.
 */
@Entity
@Table(name = "producto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "producto")
public class Producto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "id_producto", nullable = false)
    private Integer idProducto;

    @NotNull
    @Column(name = "nombre_producto", nullable = false)
    private String nombreProducto;

    @NotNull
    @Column(name = "precio_venta", nullable = false)
    private Double precioVenta;

    @NotNull
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @OneToMany(mappedBy = "producto")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NuevaCompra> nuevaCompras = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdProducto() {
        return idProducto;
    }

    public Producto idProducto(Integer idProducto) {
        this.idProducto = idProducto;
        return this;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public Producto nombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
        return this;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public Double getPrecioVenta() {
        return precioVenta;
    }

    public Producto precioVenta(Double precioVenta) {
        this.precioVenta = precioVenta;
        return this;
    }

    public void setPrecioVenta(Double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public Producto cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Set<NuevaCompra> getNuevaCompras() {
        return nuevaCompras;
    }

    public Producto nuevaCompras(Set<NuevaCompra> nuevaCompras) {
        this.nuevaCompras = nuevaCompras;
        return this;
    }

    public Producto addNuevaCompra(NuevaCompra nuevaCompra) {
        this.nuevaCompras.add(nuevaCompra);
        nuevaCompra.setProducto(this);
        return this;
    }

    public Producto removeNuevaCompra(NuevaCompra nuevaCompra) {
        this.nuevaCompras.remove(nuevaCompra);
        nuevaCompra.setProducto(null);
        return this;
    }

    public void setNuevaCompras(Set<NuevaCompra> nuevaCompras) {
        this.nuevaCompras = nuevaCompras;
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
        Producto producto = (Producto) o;
        if (producto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), producto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Producto{" +
            "id=" + getId() +
            ", idProducto='" + getIdProducto() + "'" +
            ", nombreProducto='" + getNombreProducto() + "'" +
            ", precioVenta='" + getPrecioVenta() + "'" +
            ", cantidad='" + getCantidad() + "'" +
            "}";
    }
}
