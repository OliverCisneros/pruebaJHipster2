package org.jhipster.blog.repository.search;

import org.jhipster.blog.domain.Profesor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Profesor entity.
 */
public interface ProfesorSearchRepository extends ElasticsearchRepository<Profesor, Long> {
}
