package org.jhipster.blog.web.rest;

import org.jhipster.blog.PruebaJHipster2App;

import org.jhipster.blog.domain.Alumno;
import org.jhipster.blog.domain.Materia;
import org.jhipster.blog.repository.AlumnoRepository;
import org.jhipster.blog.repository.search.AlumnoSearchRepository;
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
 * Test class for the AlumnoResource REST controller.
 *
 * @see AlumnoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PruebaJHipster2App.class)
public class AlumnoResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_SEMESTRE = 1;
    private static final Integer UPDATED_SEMESTRE = 2;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private AlumnoSearchRepository alumnoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAlumnoMockMvc;

    private Alumno alumno;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlumnoResource alumnoResource = new AlumnoResource(alumnoRepository, alumnoSearchRepository);
        this.restAlumnoMockMvc = MockMvcBuilders.standaloneSetup(alumnoResource)
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
    public static Alumno createEntity(EntityManager em) {
        Alumno alumno = new Alumno()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .semestre(DEFAULT_SEMESTRE);
        // Add required entity
        Materia materia = MateriaResourceIntTest.createEntity(em);
        em.persist(materia);
        em.flush();
        alumno.getMaterias().add(materia);
        return alumno;
    }

    @Before
    public void initTest() {
        alumnoSearchRepository.deleteAll();
        alumno = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlumno() throws Exception {
        int databaseSizeBeforeCreate = alumnoRepository.findAll().size();

        // Create the Alumno
        restAlumnoMockMvc.perform(post("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumno)))
            .andExpect(status().isCreated());

        // Validate the Alumno in the database
        List<Alumno> alumnoList = alumnoRepository.findAll();
        assertThat(alumnoList).hasSize(databaseSizeBeforeCreate + 1);
        Alumno testAlumno = alumnoList.get(alumnoList.size() - 1);
        assertThat(testAlumno.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAlumno.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testAlumno.getSemestre()).isEqualTo(DEFAULT_SEMESTRE);

        // Validate the Alumno in Elasticsearch
        Alumno alumnoEs = alumnoSearchRepository.findOne(testAlumno.getId());
        assertThat(alumnoEs).isEqualToComparingFieldByField(testAlumno);
    }

    @Test
    @Transactional
    public void createAlumnoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alumnoRepository.findAll().size();

        // Create the Alumno with an existing ID
        alumno.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlumnoMockMvc.perform(post("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumno)))
            .andExpect(status().isBadRequest());

        // Validate the Alumno in the database
        List<Alumno> alumnoList = alumnoRepository.findAll();
        assertThat(alumnoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = alumnoRepository.findAll().size();
        // set the field null
        alumno.setName(null);

        // Create the Alumno, which fails.

        restAlumnoMockMvc.perform(post("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumno)))
            .andExpect(status().isBadRequest());

        List<Alumno> alumnoList = alumnoRepository.findAll();
        assertThat(alumnoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSurnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = alumnoRepository.findAll().size();
        // set the field null
        alumno.setSurname(null);

        // Create the Alumno, which fails.

        restAlumnoMockMvc.perform(post("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumno)))
            .andExpect(status().isBadRequest());

        List<Alumno> alumnoList = alumnoRepository.findAll();
        assertThat(alumnoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSemestreIsRequired() throws Exception {
        int databaseSizeBeforeTest = alumnoRepository.findAll().size();
        // set the field null
        alumno.setSemestre(null);

        // Create the Alumno, which fails.

        restAlumnoMockMvc.perform(post("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumno)))
            .andExpect(status().isBadRequest());

        List<Alumno> alumnoList = alumnoRepository.findAll();
        assertThat(alumnoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAlumnos() throws Exception {
        // Initialize the database
        alumnoRepository.saveAndFlush(alumno);

        // Get all the alumnoList
        restAlumnoMockMvc.perform(get("/api/alumnos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alumno.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE)));
    }

    @Test
    @Transactional
    public void getAlumno() throws Exception {
        // Initialize the database
        alumnoRepository.saveAndFlush(alumno);

        // Get the alumno
        restAlumnoMockMvc.perform(get("/api/alumnos/{id}", alumno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alumno.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.semestre").value(DEFAULT_SEMESTRE));
    }

    @Test
    @Transactional
    public void getNonExistingAlumno() throws Exception {
        // Get the alumno
        restAlumnoMockMvc.perform(get("/api/alumnos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlumno() throws Exception {
        // Initialize the database
        alumnoRepository.saveAndFlush(alumno);
        alumnoSearchRepository.save(alumno);
        int databaseSizeBeforeUpdate = alumnoRepository.findAll().size();

        // Update the alumno
        Alumno updatedAlumno = alumnoRepository.findOne(alumno.getId());
        updatedAlumno
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .semestre(UPDATED_SEMESTRE);

        restAlumnoMockMvc.perform(put("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlumno)))
            .andExpect(status().isOk());

        // Validate the Alumno in the database
        List<Alumno> alumnoList = alumnoRepository.findAll();
        assertThat(alumnoList).hasSize(databaseSizeBeforeUpdate);
        Alumno testAlumno = alumnoList.get(alumnoList.size() - 1);
        assertThat(testAlumno.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAlumno.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testAlumno.getSemestre()).isEqualTo(UPDATED_SEMESTRE);

        // Validate the Alumno in Elasticsearch
        Alumno alumnoEs = alumnoSearchRepository.findOne(testAlumno.getId());
        assertThat(alumnoEs).isEqualToComparingFieldByField(testAlumno);
    }

    @Test
    @Transactional
    public void updateNonExistingAlumno() throws Exception {
        int databaseSizeBeforeUpdate = alumnoRepository.findAll().size();

        // Create the Alumno

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAlumnoMockMvc.perform(put("/api/alumnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alumno)))
            .andExpect(status().isCreated());

        // Validate the Alumno in the database
        List<Alumno> alumnoList = alumnoRepository.findAll();
        assertThat(alumnoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAlumno() throws Exception {
        // Initialize the database
        alumnoRepository.saveAndFlush(alumno);
        alumnoSearchRepository.save(alumno);
        int databaseSizeBeforeDelete = alumnoRepository.findAll().size();

        // Get the alumno
        restAlumnoMockMvc.perform(delete("/api/alumnos/{id}", alumno.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean alumnoExistsInEs = alumnoSearchRepository.exists(alumno.getId());
        assertThat(alumnoExistsInEs).isFalse();

        // Validate the database is empty
        List<Alumno> alumnoList = alumnoRepository.findAll();
        assertThat(alumnoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAlumno() throws Exception {
        // Initialize the database
        alumnoRepository.saveAndFlush(alumno);
        alumnoSearchRepository.save(alumno);

        // Search the alumno
        restAlumnoMockMvc.perform(get("/api/_search/alumnos?query=id:" + alumno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alumno.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].semestre").value(hasItem(DEFAULT_SEMESTRE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Alumno.class);
        Alumno alumno1 = new Alumno();
        alumno1.setId(1L);
        Alumno alumno2 = new Alumno();
        alumno2.setId(alumno1.getId());
        assertThat(alumno1).isEqualTo(alumno2);
        alumno2.setId(2L);
        assertThat(alumno1).isNotEqualTo(alumno2);
        alumno1.setId(null);
        assertThat(alumno1).isNotEqualTo(alumno2);
    }
}
