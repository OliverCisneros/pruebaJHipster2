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
 * A Alumno.
 */
@Entity
@Table(name = "alumno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "alumno")
public class Alumno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "surname", nullable = false)
    private String surname;

    @NotNull
    @Column(name = "semestre", nullable = false)
    private Integer semestre;

    @OneToMany(mappedBy = "alumno")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Materia> materias = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Alumno name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Alumno surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Integer getSemestre() {
        return semestre;
    }

    public Alumno semestre(Integer semestre) {
        this.semestre = semestre;
        return this;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }

    public Set<Materia> getMaterias() {
        return materias;
    }

    public Alumno materias(Set<Materia> materias) {
        this.materias = materias;
        return this;
    }

    public Alumno addMateria(Materia materia) {
        this.materias.add(materia);
        materia.setAlumno(this);
        return this;
    }

    public Alumno removeMateria(Materia materia) {
        this.materias.remove(materia);
        materia.setAlumno(null);
        return this;
    }

    public void setMaterias(Set<Materia> materias) {
        this.materias = materias;
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
        Alumno alumno = (Alumno) o;
        if (alumno.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alumno.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Alumno{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", semestre='" + getSemestre() + "'" +
            "}";
    }
}
