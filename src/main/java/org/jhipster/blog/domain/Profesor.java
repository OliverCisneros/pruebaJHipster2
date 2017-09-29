package org.jhipster.blog.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Profesor.
 */
@Entity
@Table(name = "profesor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "profesor")
public class Profesor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre_profe", nullable = false)
    private String nombreProfe;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreProfe() {
        return nombreProfe;
    }

    public Profesor nombreProfe(String nombreProfe) {
        this.nombreProfe = nombreProfe;
        return this;
    }

    public void setNombreProfe(String nombreProfe) {
        this.nombreProfe = nombreProfe;
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
        Profesor profesor = (Profesor) o;
        if (profesor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profesor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Profesor{" +
            "id=" + getId() +
            ", nombreProfe='" + getNombreProfe() + "'" +
            "}";
    }
}
