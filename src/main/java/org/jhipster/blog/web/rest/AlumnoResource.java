package org.jhipster.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.blog.domain.Alumno;

import org.jhipster.blog.repository.AlumnoRepository;
import org.jhipster.blog.repository.search.AlumnoSearchRepository;
import org.jhipster.blog.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Alumno.
 */
@RestController
@RequestMapping("/api")
public class AlumnoResource {

    private final Logger log = LoggerFactory.getLogger(AlumnoResource.class);

    private static final String ENTITY_NAME = "alumno";

    private final AlumnoRepository alumnoRepository;

    private final AlumnoSearchRepository alumnoSearchRepository;

    public AlumnoResource(AlumnoRepository alumnoRepository, AlumnoSearchRepository alumnoSearchRepository) {
        this.alumnoRepository = alumnoRepository;
        this.alumnoSearchRepository = alumnoSearchRepository;
    }

    /**
     * POST  /alumnos : Create a new alumno.
     *
     * @param alumno the alumno to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alumno, or with status 400 (Bad Request) if the alumno has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/alumnos")
    @Timed
    public ResponseEntity<Alumno> createAlumno(@Valid @RequestBody Alumno alumno) throws URISyntaxException {
        log.debug("REST request to save Alumno : {}", alumno);
        if (alumno.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new alumno cannot already have an ID")).body(null);
        }
        Alumno result = alumnoRepository.save(alumno);
        alumnoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/alumnos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /alumnos : Updates an existing alumno.
     *
     * @param alumno the alumno to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alumno,
     * or with status 400 (Bad Request) if the alumno is not valid,
     * or with status 500 (Internal Server Error) if the alumno couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/alumnos")
    @Timed
    public ResponseEntity<Alumno> updateAlumno(@Valid @RequestBody Alumno alumno) throws URISyntaxException {
        log.debug("REST request to update Alumno : {}", alumno);
        if (alumno.getId() == null) {
            return createAlumno(alumno);
        }
        Alumno result = alumnoRepository.save(alumno);
        alumnoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, alumno.getId().toString()))
            .body(result);
    }

    /**
     * GET  /alumnos : get all the alumnos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of alumnos in body
     */
    @GetMapping("/alumnos")
    @Timed
    public List<Alumno> getAllAlumnos() {
        log.debug("REST request to get all Alumnos");
        return alumnoRepository.findAll();
        }

    /**
     * GET  /alumnos/:id : get the "id" alumno.
     *
     * @param id the id of the alumno to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alumno, or with status 404 (Not Found)
     */
    @GetMapping("/alumnos/{id}")
    @Timed
    public ResponseEntity<Alumno> getAlumno(@PathVariable Long id) {
        log.debug("REST request to get Alumno : {}", id);
        Alumno alumno = alumnoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(alumno));
    }

    /**
     * DELETE  /alumnos/:id : delete the "id" alumno.
     *
     * @param id the id of the alumno to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/alumnos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAlumno(@PathVariable Long id) {
        log.debug("REST request to delete Alumno : {}", id);
        alumnoRepository.delete(id);
        alumnoSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/alumnos?query=:query : search for the alumno corresponding
     * to the query.
     *
     * @param query the query of the alumno search
     * @return the result of the search
     */
    @GetMapping("/_search/alumnos")
    @Timed
    public List<Alumno> searchAlumnos(@RequestParam String query) {
        log.debug("REST request to search Alumnos for query {}", query);
        return StreamSupport
            .stream(alumnoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
