package org.jhipster.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.blog.domain.NuevaCompra;

import org.jhipster.blog.repository.NuevaCompraRepository;
import org.jhipster.blog.repository.search.NuevaCompraSearchRepository;
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
 * REST controller for managing NuevaCompra.
 */
@RestController
@RequestMapping("/api")
public class NuevaCompraResource {

    private final Logger log = LoggerFactory.getLogger(NuevaCompraResource.class);

    private static final String ENTITY_NAME = "nuevaCompra";

    private final NuevaCompraRepository nuevaCompraRepository;

    private final NuevaCompraSearchRepository nuevaCompraSearchRepository;

    public NuevaCompraResource(NuevaCompraRepository nuevaCompraRepository, NuevaCompraSearchRepository nuevaCompraSearchRepository) {
        this.nuevaCompraRepository = nuevaCompraRepository;
        this.nuevaCompraSearchRepository = nuevaCompraSearchRepository;
    }

    /**
     * POST  /nueva-compras : Create a new nuevaCompra.
     *
     * @param nuevaCompra the nuevaCompra to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nuevaCompra, or with status 400 (Bad Request) if the nuevaCompra has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nueva-compras")
    @Timed
    public ResponseEntity<NuevaCompra> createNuevaCompra(@Valid @RequestBody NuevaCompra nuevaCompra) throws URISyntaxException {
        log.debug("REST request to save NuevaCompra : {}", nuevaCompra);
        if (nuevaCompra.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new nuevaCompra cannot already have an ID")).body(null);
        }
        NuevaCompra result = nuevaCompraRepository.save(nuevaCompra);
        nuevaCompraSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/nueva-compras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nueva-compras : Updates an existing nuevaCompra.
     *
     * @param nuevaCompra the nuevaCompra to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nuevaCompra,
     * or with status 400 (Bad Request) if the nuevaCompra is not valid,
     * or with status 500 (Internal Server Error) if the nuevaCompra couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nueva-compras")
    @Timed
    public ResponseEntity<NuevaCompra> updateNuevaCompra(@Valid @RequestBody NuevaCompra nuevaCompra) throws URISyntaxException {
        log.debug("REST request to update NuevaCompra : {}", nuevaCompra);
        if (nuevaCompra.getId() == null) {
            return createNuevaCompra(nuevaCompra);
        }
        NuevaCompra result = nuevaCompraRepository.save(nuevaCompra);
        nuevaCompraSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nuevaCompra.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nueva-compras : get all the nuevaCompras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nuevaCompras in body
     */
    @GetMapping("/nueva-compras")
    @Timed
    public List<NuevaCompra> getAllNuevaCompras() {
        log.debug("REST request to get all NuevaCompras");
        return nuevaCompraRepository.findAll();
        }

    /**
     * GET  /nueva-compras/:id : get the "id" nuevaCompra.
     *
     * @param id the id of the nuevaCompra to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nuevaCompra, or with status 404 (Not Found)
     */
    @GetMapping("/nueva-compras/{id}")
    @Timed
    public ResponseEntity<NuevaCompra> getNuevaCompra(@PathVariable Long id) {
        log.debug("REST request to get NuevaCompra : {}", id);
        NuevaCompra nuevaCompra = nuevaCompraRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nuevaCompra));
    }

    /**
     * DELETE  /nueva-compras/:id : delete the "id" nuevaCompra.
     *
     * @param id the id of the nuevaCompra to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nueva-compras/{id}")
    @Timed
    public ResponseEntity<Void> deleteNuevaCompra(@PathVariable Long id) {
        log.debug("REST request to delete NuevaCompra : {}", id);
        nuevaCompraRepository.delete(id);
        nuevaCompraSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/nueva-compras?query=:query : search for the nuevaCompra corresponding
     * to the query.
     *
     * @param query the query of the nuevaCompra search
     * @return the result of the search
     */
    @GetMapping("/_search/nueva-compras")
    @Timed
    public List<NuevaCompra> searchNuevaCompras(@RequestParam String query) {
        log.debug("REST request to search NuevaCompras for query {}", query);
        return StreamSupport
            .stream(nuevaCompraSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
