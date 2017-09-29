import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Alumno e2e test', () => {

    let navBarPage: NavBarPage;
    let alumnoDialogPage: AlumnoDialogPage;
    let alumnoComponentsPage: AlumnoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Alumnos', () => {
        navBarPage.goToEntity('alumno');
        alumnoComponentsPage = new AlumnoComponentsPage();
        expect(alumnoComponentsPage.getTitle()).toMatch(/pruebaJHipster2App.alumno.home.title/);

    });

    it('should load create Alumno dialog', () => {
        alumnoComponentsPage.clickOnCreateButton();
        alumnoDialogPage = new AlumnoDialogPage();
        expect(alumnoDialogPage.getModalTitle()).toMatch(/pruebaJHipster2App.alumno.home.createOrEditLabel/);
        alumnoDialogPage.close();
    });

   /* it('should create and save Alumnos', () => {
        alumnoComponentsPage.clickOnCreateButton();
        alumnoDialogPage.setNameInput('name');
        expect(alumnoDialogPage.getNameInput()).toMatch('name');
        alumnoDialogPage.setSurnameInput('surname');
        expect(alumnoDialogPage.getSurnameInput()).toMatch('surname');
        alumnoDialogPage.setSemestreInput('5');
        expect(alumnoDialogPage.getSemestreInput()).toMatch('5');
        alumnoDialogPage.save();
        expect(alumnoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AlumnoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-alumno div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AlumnoDialogPage {
    modalTitle = element(by.css('h4#myAlumnoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    surnameInput = element(by.css('input#field_surname'));
    semestreInput = element(by.css('input#field_semestre'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setSurnameInput = function (surname) {
        this.surnameInput.sendKeys(surname);
    }

    getSurnameInput = function () {
        return this.surnameInput.getAttribute('value');
    }

    setSemestreInput = function (semestre) {
        this.semestreInput.sendKeys(semestre);
    }

    getSemestreInput = function () {
        return this.semestreInput.getAttribute('value');
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
