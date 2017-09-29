package org.jhipster.blog.repository;

import org.jhipster.blog.domain.NuevaCompra;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the NuevaCompra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NuevaCompraRepository extends JpaRepository<NuevaCompra, Long> {

}
