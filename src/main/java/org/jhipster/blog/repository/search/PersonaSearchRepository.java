package org.jhipster.blog.repository.search;

import org.jhipster.blog.domain.Persona;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Persona entity.
 */
public interface PersonaSearchRepository extends ElasticsearchRepository<Persona, Long> {
}
