import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Persona e2e test', () => {

    let navBarPage: NavBarPage;
    let personaDialogPage: PersonaDialogPage;
    let personaComponentsPage: PersonaComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Personas', () => {
        navBarPage.goToEntity('persona');
        personaComponentsPage = new PersonaComponentsPage();
        expect(personaComponentsPage.getTitle()).toMatch(/pruebaJHipster2App.persona.home.title/);

    });

    it('should load create Persona dialog', () => {
        personaComponentsPage.clickOnCreateButton();
        personaDialogPage = new PersonaDialogPage();
        expect(personaDialogPage.getModalTitle()).toMatch(/pruebaJHipster2App.persona.home.createOrEditLabel/);
        personaDialogPage.close();
    });

    it('should create and save Personas', () => {
        personaComponentsPage.clickOnCreateButton();
        personaDialogPage.setIdPersonaInput('5');
        expect(personaDialogPage.getIdPersonaInput()).toMatch('5');
        personaDialogPage.setNombreInput('nombre');
        expect(personaDialogPage.getNombreInput()).toMatch('nombre');
        personaDialogPage.setApaternoInput('apaterno');
        expect(personaDialogPage.getApaternoInput()).toMatch('apaterno');
        personaDialogPage.setAmaternoInput('amaterno');
        expect(personaDialogPage.getAmaternoInput()).toMatch('amaterno');
        personaDialogPage.setEdadInput('5');
        expect(personaDialogPage.getEdadInput()).toMatch('5');
        personaDialogPage.save();
        expect(personaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PersonaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-persona div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PersonaDialogPage {
    modalTitle = element(by.css('h4#myPersonaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idPersonaInput = element(by.css('input#field_idPersona'));
    nombreInput = element(by.css('input#field_nombre'));
    apaternoInput = element(by.css('input#field_apaterno'));
    amaternoInput = element(by.css('input#field_amaterno'));
    edadInput = element(by.css('input#field_edad'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdPersonaInput = function (idPersona) {
        this.idPersonaInput.sendKeys(idPersona);
    }

    getIdPersonaInput = function () {
        return this.idPersonaInput.getAttribute('value');
    }

    setNombreInput = function (nombre) {
        this.nombreInput.sendKeys(nombre);
    }

    getNombreInput = function () {
        return this.nombreInput.getAttribute('value');
    }

    setApaternoInput = function (apaterno) {
        this.apaternoInput.sendKeys(apaterno);
    }

    getApaternoInput = function () {
        return this.apaternoInput.getAttribute('value');
    }

    setAmaternoInput = function (amaterno) {
        this.amaternoInput.sendKeys(amaterno);
    }

    getAmaternoInput = function () {
        return this.amaternoInput.getAttribute('value');
    }

    setEdadInput = function (edad) {
        this.edadInput.sendKeys(edad);
    }

    getEdadInput = function () {
        return this.edadInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
