import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Materia e2e test', () => {

    let navBarPage: NavBarPage;
    let materiaDialogPage: MateriaDialogPage;
    let materiaComponentsPage: MateriaComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Materias', () => {
        navBarPage.goToEntity('materia');
        materiaComponentsPage = new MateriaComponentsPage();
        expect(materiaComponentsPage.getTitle()).toMatch(/pruebaJHipster2App.materia.home.title/);

    });

    it('should load create Materia dialog', () => {
        materiaComponentsPage.clickOnCreateButton();
        materiaDialogPage = new MateriaDialogPage();
        expect(materiaDialogPage.getModalTitle()).toMatch(/pruebaJHipster2App.materia.home.createOrEditLabel/);
        materiaDialogPage.close();
    });

   /* it('should create and save Materias', () => {
        materiaComponentsPage.clickOnCreateButton();
        materiaDialogPage.setNombreMateriaInput('nombreMateria');
        expect(materiaDialogPage.getNombreMateriaInput()).toMatch('nombreMateria');
        materiaDialogPage.alumnoSelectLastOption();
        materiaDialogPage.profesorSelectLastOption();
        materiaDialogPage.save();
        expect(materiaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MateriaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-materia div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MateriaDialogPage {
    modalTitle = element(by.css('h4#myMateriaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreMateriaInput = element(by.css('input#field_nombreMateria'));
    alumnoSelect = element(by.css('select#field_alumno'));
    profesorSelect = element(by.css('select#field_profesor'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreMateriaInput = function (nombreMateria) {
        this.nombreMateriaInput.sendKeys(nombreMateria);
    }

    getNombreMateriaInput = function () {
        return this.nombreMateriaInput.getAttribute('value');
    }

    alumnoSelectLastOption = function () {
        this.alumnoSelect.all(by.tagName('option')).last().click();
    }

    alumnoSelectOption = function (option) {
        this.alumnoSelect.sendKeys(option);
    }

    getAlumnoSelect = function () {
        return this.alumnoSelect;
    }

    getAlumnoSelectedOption = function () {
        return this.alumnoSelect.element(by.css('option:checked')).getText();
    }

    profesorSelectLastOption = function () {
        this.profesorSelect.all(by.tagName('option')).last().click();
    }

    profesorSelectOption = function (option) {
        this.profesorSelect.sendKeys(option);
    }

    getProfesorSelect = function () {
        return this.profesorSelect;
    }

    getProfesorSelectedOption = function () {
        return this.profesorSelect.element(by.css('option:checked')).getText();
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
