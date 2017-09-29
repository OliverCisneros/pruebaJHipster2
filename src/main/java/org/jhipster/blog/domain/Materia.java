package org.jhipster.blog.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Materia.
 */
@Entity
@Table(name = "materia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "materia")
public class Materia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre_materia", nullable = false)
    private String nombreMateria;

    @ManyToOne
    private Alumno alumno;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Profesor profesor;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreMateria() {
        return nombreMateria;
    }

    public Materia nombreMateria(String nombreMateria) {
        this.nombreMateria = nombreMateria;
        return this;
    }

    public void setNombreMateria(String nombreMateria) {
        this.nombreMateria = nombreMateria;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public Materia alumno(Alumno alumno) {
        this.alumno = alumno;
        return this;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public Materia profesor(Profesor profesor) {
        this.profesor = profesor;
        return this;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
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
        Materia materia = (Materia) o;
        if (materia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), materia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Materia{" +
            "id=" + getId() +
            ", nombreMateria='" + getNombreMateria() + "'" +
            "}";
    }
}
