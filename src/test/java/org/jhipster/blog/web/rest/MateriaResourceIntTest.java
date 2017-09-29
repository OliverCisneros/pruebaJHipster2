package org.jhipster.blog.web.rest;

import org.jhipster.blog.PruebaJHipster2App;

import org.jhipster.blog.domain.Materia;
import org.jhipster.blog.domain.Profesor;
import org.jhipster.blog.repository.MateriaRepository;
import org.jhipster.blog.repository.search.MateriaSearchRepository;
import org.jhipster.blog.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MateriaResource REST controller.
 *
 * @see MateriaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PruebaJHipster2App.class)
public class MateriaResourceIntTest {

    private static final String DEFAULT_NOMBRE_MATERIA = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_MATERIA = "BBBBBBBBBB";

    @Autowired
    private MateriaRepository materiaRepository;

    @Autowired
    private MateriaSearchRepository materiaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMateriaMockMvc;

    private Materia materia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MateriaResource materiaResource = new MateriaResource(materiaRepository, materiaSearchRepository);
        this.restMateriaMockMvc = MockMvcBuilders.standaloneSetup(materiaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Materia createEntity(EntityManager em) {
        Materia materia = new Materia()
            .nombreMateria(DEFAULT_NOMBRE_MATERIA);
        // Add required entity
        Profesor profesor = ProfesorResourceIntTest.createEntity(em);
        em.persist(profesor);
        em.flush();
        materia.setProfesor(profesor);
        return materia;
    }

    @Before
    public void initTest() {
        materiaSearchRepository.deleteAll();
        materia = createEntity(em);
    }

    @Test
    @Transactional
    public void createMateria() throws Exception {
        int databaseSizeBeforeCreate = materiaRepository.findAll().size();

        // Create the Materia
        restMateriaMockMvc.perform(post("/api/materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materia)))
            .andExpect(status().isCreated());

        // Validate the Materia in the database
        List<Materia> materiaList = materiaRepository.findAll();
        assertThat(materiaList).hasSize(databaseSizeBeforeCreate + 1);
        Materia testMateria = materiaList.get(materiaList.size() - 1);
        assertThat(testMateria.getNombreMateria()).isEqualTo(DEFAULT_NOMBRE_MATERIA);

        // Validate the Materia in Elasticsearch
        Materia materiaEs = materiaSearchRepository.findOne(testMateria.getId());
        assertThat(materiaEs).isEqualToComparingFieldByField(testMateria);
    }

    @Test
    @Transactional
    public void createMateriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materiaRepository.findAll().size();

        // Create the Materia with an existing ID
        materia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMateriaMockMvc.perform(post("/api/materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materia)))
            .andExpect(status().isBadRequest());

        // Validate the Materia in the database
        List<Materia> materiaList = materiaRepository.findAll();
        assertThat(materiaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreMateriaIsRequired() throws Exception {
        int databaseSizeBeforeTest = materiaRepository.findAll().size();
        // set the field null
        materia.setNombreMateria(null);

        // Create the Materia, which fails.

        restMateriaMockMvc.perform(post("/api/materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materia)))
            .andExpect(status().isBadRequest());

        List<Materia> materiaList = materiaRepository.findAll();
        assertThat(materiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMaterias() throws Exception {
        // Initialize the database
        materiaRepository.saveAndFlush(materia);

        // Get all the materiaList
        restMateriaMockMvc.perform(get("/api/materias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materia.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreMateria").value(hasItem(DEFAULT_NOMBRE_MATERIA.toString())));
    }

    @Test
    @Transactional
    public void getMateria() throws Exception {
        // Initialize the database
        materiaRepository.saveAndFlush(materia);

        // Get the materia
        restMateriaMockMvc.perform(get("/api/materias/{id}", materia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(materia.getId().intValue()))
            .andExpect(jsonPath("$.nombreMateria").value(DEFAULT_NOMBRE_MATERIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMateria() throws Exception {
        // Get the materia
        restMateriaMockMvc.perform(get("/api/materias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMateria() throws Exception {
        // Initialize the database
        materiaRepository.saveAndFlush(materia);
        materiaSearchRepository.save(materia);
        int databaseSizeBeforeUpdate = materiaRepository.findAll().size();

        // Update the materia
        Materia updatedMateria = materiaRepository.findOne(materia.getId());
        updatedMateria
            .nombreMateria(UPDATED_NOMBRE_MATERIA);

        restMateriaMockMvc.perform(put("/api/materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMateria)))
            .andExpect(status().isOk());

        // Validate the Materia in the database
        List<Materia> materiaList = materiaRepository.findAll();
        assertThat(materiaList).hasSize(databaseSizeBeforeUpdate);
        Materia testMateria = materiaList.get(materiaList.size() - 1);
        assertThat(testMateria.getNombreMateria()).isEqualTo(UPDATED_NOMBRE_MATERIA);

        // Validate the Materia in Elasticsearch
        Materia materiaEs = materiaSearchRepository.findOne(testMateria.getId());
        assertThat(materiaEs).isEqualToComparingFieldByField(testMateria);
    }

    @Test
    @Transactional
    public void updateNonExistingMateria() throws Exception {
        int databaseSizeBeforeUpdate = materiaRepository.findAll().size();

        // Create the Materia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMateriaMockMvc.perform(put("/api/materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materia)))
            .andExpect(status().isCreated());

        // Validate the Materia in the database
        List<Materia> materiaList = materiaRepository.findAll();
        assertThat(materiaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMateria() throws Exception {
        // Initialize the database
        materiaRepository.saveAndFlush(materia);
        materiaSearchRepository.save(materia);
        int databaseSizeBeforeDelete = materiaRepository.findAll().size();

        // Get the materia
        restMateriaMockMvc.perform(delete("/api/materias/{id}", materia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean materiaExistsInEs = materiaSearchRepository.exists(materia.getId());
        assertThat(materiaExistsInEs).isFalse();

        // Validate the database is empty
        List<Materia> materiaList = materiaRepository.findAll();
        assertThat(materiaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchMateria() throws Exception {
        // Initialize the database
        materiaRepository.saveAndFlush(materia);
        materiaSearchRepository.save(materia);

        // Search the materia
        restMateriaMockMvc.perform(get("/api/_search/materias?query=id:" + materia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materia.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreMateria").value(hasItem(DEFAULT_NOMBRE_MATERIA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Materia.class);
        Materia materia1 = new Materia();
        materia1.setId(1L);
        Materia materia2 = new Materia();
        materia2.setId(materia1.getId());
        assertThat(materia1).isEqualTo(materia2);
        materia2.setId(2L);
        assertThat(materia1).isNotEqualTo(materia2);
        materia1.setId(null);
        assertThat(materia1).isNotEqualTo(materia2);
    }
}
