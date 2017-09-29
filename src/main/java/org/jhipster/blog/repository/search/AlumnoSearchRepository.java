package org.jhipster.blog.repository.search;

import org.jhipster.blog.domain.Alumno;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Alumno entity.
 */
public interface AlumnoSearchRepository extends ElasticsearchRepository<Alumno, Long> {
}
