package org.jhipster.blog.web.rest;

import org.jhipster.blog.PruebaJHipster2App;

import org.jhipster.blog.domain.NuevaCompra;
import org.jhipster.blog.repository.NuevaCompraRepository;
import org.jhipster.blog.repository.search.NuevaCompraSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NuevaCompraResource REST controller.
 *
 * @see NuevaCompraResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PruebaJHipster2App.class)
public class NuevaCompraResourceIntTest {

    private static final Integer DEFAULT_IDVENTA = 1;
    private static final Integer UPDATED_IDVENTA = 2;

    private static final Integer DEFAULT_CANTIDAD_COMPRAR = 1;
    private static final Integer UPDATED_CANTIDAD_COMPRAR = 2;

    private static final LocalDate DEFAULT_FECHA_TRANSACCION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_TRANSACCION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private NuevaCompraRepository nuevaCompraRepository;

    @Autowired
    private NuevaCompraSearchRepository nuevaCompraSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNuevaCompraMockMvc;

    private NuevaCompra nuevaCompra;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NuevaCompraResource nuevaCompraResource = new NuevaCompraResource(nuevaCompraRepository, nuevaCompraSearchRepository);
        this.restNuevaCompraMockMvc = MockMvcBuilders.standaloneSetup(nuevaCompraResource)
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
    public static NuevaCompra createEntity(EntityManager em) {
        NuevaCompra nuevaCompra = new NuevaCompra()
            .idventa(DEFAULT_IDVENTA)
            .cantidadComprar(DEFAULT_CANTIDAD_COMPRAR)
            .fechaTransaccion(DEFAULT_FECHA_TRANSACCION);
        return nuevaCompra;
    }

    @Before
    public void initTest() {
        nuevaCompraSearchRepository.deleteAll();
        nuevaCompra = createEntity(em);
    }

    @Test
    @Transactional
    public void createNuevaCompra() throws Exception {
        int databaseSizeBeforeCreate = nuevaCompraRepository.findAll().size();

        // Create the NuevaCompra
        restNuevaCompraMockMvc.perform(post("/api/nueva-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nuevaCompra)))
            .andExpect(status().isCreated());

        // Validate the NuevaCompra in the database
        List<NuevaCompra> nuevaCompraList = nuevaCompraRepository.findAll();
        assertThat(nuevaCompraList).hasSize(databaseSizeBeforeCreate + 1);
        NuevaCompra testNuevaCompra = nuevaCompraList.get(nuevaCompraList.size() - 1);
        assertThat(testNuevaCompra.getIdventa()).isEqualTo(DEFAULT_IDVENTA);
        assertThat(testNuevaCompra.getCantidadComprar()).isEqualTo(DEFAULT_CANTIDAD_COMPRAR);
        assertThat(testNuevaCompra.getFechaTransaccion()).isEqualTo(DEFAULT_FECHA_TRANSACCION);

        // Validate the NuevaCompra in Elasticsearch
        NuevaCompra nuevaCompraEs = nuevaCompraSearchRepository.findOne(testNuevaCompra.getId());
        assertThat(nuevaCompraEs).isEqualToComparingFieldByField(testNuevaCompra);
    }

    @Test
    @Transactional
    public void createNuevaCompraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nuevaCompraRepository.findAll().size();

        // Create the NuevaCompra with an existing ID
        nuevaCompra.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNuevaCompraMockMvc.perform(post("/api/nueva-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nuevaCompra)))
            .andExpect(status().isBadRequest());

        // Validate the NuevaCompra in the database
        List<NuevaCompra> nuevaCompraList = nuevaCompraRepository.findAll();
        assertThat(nuevaCompraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdventaIsRequired() throws Exception {
        int databaseSizeBeforeTest = nuevaCompraRepository.findAll().size();
        // set the field null
        nuevaCompra.setIdventa(null);

        // Create the NuevaCompra, which fails.

        restNuevaCompraMockMvc.perform(post("/api/nueva-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nuevaCompra)))
            .andExpect(status().isBadRequest());

        List<NuevaCompra> nuevaCompraList = nuevaCompraRepository.findAll();
        assertThat(nuevaCompraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCantidadComprarIsRequired() throws Exception {
        int databaseSizeBeforeTest = nuevaCompraRepository.findAll().size();
        // set the field null
        nuevaCompra.setCantidadComprar(null);

        // Create the NuevaCompra, which fails.

        restNuevaCompraMockMvc.perform(post("/api/nueva-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nuevaCompra)))
            .andExpect(status().isBadRequest());

        List<NuevaCompra> nuevaCompraList = nuevaCompraRepository.findAll();
        assertThat(nuevaCompraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaTransaccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = nuevaCompraRepository.findAll().size();
        // set the field null
        nuevaCompra.setFechaTransaccion(null);

        // Create the NuevaCompra, which fails.

        restNuevaCompraMockMvc.perform(post("/api/nueva-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nuevaCompra)))
            .andExpect(status().isBadRequest());

        List<NuevaCompra> nuevaCompraList = nuevaCompraRepository.findAll();
        assertThat(nuevaCompraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNuevaCompras() throws Exception {
        // Initialize the database
        nuevaCompraRepository.saveAndFlush(nuevaCompra);

        // Get all the nuevaCompraList
        restNuevaCompraMockMvc.perform(get("/api/nueva-compras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nuevaCompra.getId().intValue())))
            .andExpect(jsonPath("$.[*].idventa").value(hasItem(DEFAULT_IDVENTA)))
            .andExpect(jsonPath("$.[*].cantidadComprar").value(hasItem(DEFAULT_CANTIDAD_COMPRAR)))
            .andExpect(jsonPath("$.[*].fechaTransaccion").value(hasItem(DEFAULT_FECHA_TRANSACCION.toString())));
    }

    @Test
    @Transactional
    public void getNuevaCompra() throws Exception {
        // Initialize the database
        nuevaCompraRepository.saveAndFlush(nuevaCompra);

        // Get the nuevaCompra
        restNuevaCompraMockMvc.perform(get("/api/nueva-compras/{id}", nuevaCompra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nuevaCompra.getId().intValue()))
            .andExpect(jsonPath("$.idventa").value(DEFAULT_IDVENTA))
            .andExpect(jsonPath("$.cantidadComprar").value(DEFAULT_CANTIDAD_COMPRAR))
            .andExpect(jsonPath("$.fechaTransaccion").value(DEFAULT_FECHA_TRANSACCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNuevaCompra() throws Exception {
        // Get the nuevaCompra
        restNuevaCompraMockMvc.perform(get("/api/nueva-compras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNuevaCompra() throws Exception {
        // Initialize the database
        nuevaCompraRepository.saveAndFlush(nuevaCompra);
        nuevaCompraSearchRepository.save(nuevaCompra);
        int databaseSizeBeforeUpdate = nuevaCompraRepository.findAll().size();

        // Update the nuevaCompra
        NuevaCompra updatedNuevaCompra = nuevaCompraRepository.findOne(nuevaCompra.getId());
        updatedNuevaCompra
            .idventa(UPDATED_IDVENTA)
            .cantidadComprar(UPDATED_CANTIDAD_COMPRAR)
            .fechaTransaccion(UPDATED_FECHA_TRANSACCION);

        restNuevaCompraMockMvc.perform(put("/api/nueva-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNuevaCompra)))
            .andExpect(status().isOk());

        // Validate the NuevaCompra in the database
        List<NuevaCompra> nuevaCompraList = nuevaCompraRepository.findAll();
        assertThat(nuevaCompraList).hasSize(databaseSizeBeforeUpdate);
        NuevaCompra testNuevaCompra = nuevaCompraList.get(nuevaCompraList.size() - 1);
        assertThat(testNuevaCompra.getIdventa()).isEqualTo(UPDATED_IDVENTA);
        assertThat(testNuevaCompra.getCantidadComprar()).isEqualTo(UPDATED_CANTIDAD_COMPRAR);
        assertThat(testNuevaCompra.getFechaTransaccion()).isEqualTo(UPDATED_FECHA_TRANSACCION);

        // Validate the NuevaCompra in Elasticsearch
        NuevaCompra nuevaCompraEs = nuevaCompraSearchRepository.findOne(testNuevaCompra.getId());
        assertThat(nuevaCompraEs).isEqualToComparingFieldByField(testNuevaCompra);
    }

    @Test
    @Transactional
    public void updateNonExistingNuevaCompra() throws Exception {
        int databaseSizeBeforeUpdate = nuevaCompraRepository.findAll().size();

        // Create the NuevaCompra

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNuevaCompraMockMvc.perform(put("/api/nueva-compras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nuevaCompra)))
            .andExpect(status().isCreated());

        // Validate the NuevaCompra in the database
        List<NuevaCompra> nuevaCompraList = nuevaCompraRepository.findAll();
        assertThat(nuevaCompraList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNuevaCompra() throws Exception {
        // Initialize the database
        nuevaCompraRepository.saveAndFlush(nuevaCompra);
        nuevaCompraSearchRepository.save(nuevaCompra);
        int databaseSizeBeforeDelete = nuevaCompraRepository.findAll().size();

        // Get the nuevaCompra
        restNuevaCompraMockMvc.perform(delete("/api/nueva-compras/{id}", nuevaCompra.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean nuevaCompraExistsInEs = nuevaCompraSearchRepository.exists(nuevaCompra.getId());
        assertThat(nuevaCompraExistsInEs).isFalse();

        // Validate the database is empty
        List<NuevaCompra> nuevaCompraList = nuevaCompraRepository.findAll();
        assertThat(nuevaCompraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchNuevaCompra() throws Exception {
        // Initialize the database
        nuevaCompraRepository.saveAndFlush(nuevaCompra);
        nuevaCompraSearchRepository.save(nuevaCompra);

        // Search the nuevaCompra
        restNuevaCompraMockMvc.perform(get("/api/_search/nueva-compras?query=id:" + nuevaCompra.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nuevaCompra.getId().intValue())))
            .andExpect(jsonPath("$.[*].idventa").value(hasItem(DEFAULT_IDVENTA)))
            .andExpect(jsonPath("$.[*].cantidadComprar").value(hasItem(DEFAULT_CANTIDAD_COMPRAR)))
            .andExpect(jsonPath("$.[*].fechaTransaccion").value(hasItem(DEFAULT_FECHA_TRANSACCION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NuevaCompra.class);
        NuevaCompra nuevaCompra1 = new NuevaCompra();
        nuevaCompra1.setId(1L);
        NuevaCompra nuevaCompra2 = new NuevaCompra();
        nuevaCompra2.setId(nuevaCompra1.getId());
        assertThat(nuevaCompra1).isEqualTo(nuevaCompra2);
        nuevaCompra2.setId(2L);
        assertThat(nuevaCompra1).isNotEqualTo(nuevaCompra2);
        nuevaCompra1.setId(null);
        assertThat(nuevaCompra1).isNotEqualTo(nuevaCompra2);
    }
}
