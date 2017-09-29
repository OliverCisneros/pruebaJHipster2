package org.jhipster.blog.repository.search;

import org.jhipster.blog.domain.Materia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Materia entity.
 */
public interface MateriaSearchRepository extends ElasticsearchRepository<Materia, Long> {
}
