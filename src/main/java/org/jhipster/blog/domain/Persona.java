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
 * A Persona.
 */
@Entity
@Table(name = "persona")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "persona")
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "id_persona", nullable = false)
    private Integer idPersona;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "apaterno", nullable = false)
    private String apaterno;

    @NotNull
    @Column(name = "amaterno", nullable = false)
    private String amaterno;

    @NotNull
    @Column(name = "edad", nullable = false)
    private Integer edad;

    @OneToMany(mappedBy = "persona")
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

    public Integer getIdPersona() {
        return idPersona;
    }

    public Persona idPersona(Integer idPersona) {
        this.idPersona = idPersona;
        return this;
    }

    public void setIdPersona(Integer idPersona) {
        this.idPersona = idPersona;
    }

    public String getNombre() {
        return nombre;
    }

    public Persona nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApaterno() {
        return apaterno;
    }

    public Persona apaterno(String apaterno) {
        this.apaterno = apaterno;
        return this;
    }

    public void setApaterno(String apaterno) {
        this.apaterno = apaterno;
    }

    public String getAmaterno() {
        return amaterno;
    }

    public Persona amaterno(String amaterno) {
        this.amaterno = amaterno;
        return this;
    }

    public void setAmaterno(String amaterno) {
        this.amaterno = amaterno;
    }

    public Integer getEdad() {
        return edad;
    }

    public Persona edad(Integer edad) {
        this.edad = edad;
        return this;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public Set<NuevaCompra> getNuevaCompras() {
        return nuevaCompras;
    }

    public Persona nuevaCompras(Set<NuevaCompra> nuevaCompras) {
        this.nuevaCompras = nuevaCompras;
        return this;
    }

    public Persona addNuevaCompra(NuevaCompra nuevaCompra) {
        this.nuevaCompras.add(nuevaCompra);
        nuevaCompra.setPersona(this);
        return this;
    }

    public Persona removeNuevaCompra(NuevaCompra nuevaCompra) {
        this.nuevaCompras.remove(nuevaCompra);
        nuevaCompra.setPersona(null);
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
        Persona persona = (Persona) o;
        if (persona.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), persona.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", idPersona='" + getIdPersona() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", apaterno='" + getApaterno() + "'" +
            ", amaterno='" + getAmaterno() + "'" +
            ", edad='" + getEdad() + "'" +
            "}";
    }
}
