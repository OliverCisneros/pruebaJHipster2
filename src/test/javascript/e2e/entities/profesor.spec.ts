import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Profesor e2e test', () => {

    let navBarPage: NavBarPage;
    let profesorDialogPage: ProfesorDialogPage;
    let profesorComponentsPage: ProfesorComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Profesors', () => {
        navBarPage.goToEntity('profesor');
        profesorComponentsPage = new ProfesorComponentsPage();
        expect(profesorComponentsPage.getTitle()).toMatch(/pruebaJHipster2App.profesor.home.title/);

    });

    it('should load create Profesor dialog', () => {
        profesorComponentsPage.clickOnCreateButton();
        profesorDialogPage = new ProfesorDialogPage();
        expect(profesorDialogPage.getModalTitle()).toMatch(/pruebaJHipster2App.profesor.home.createOrEditLabel/);
        profesorDialogPage.close();
    });

    it('should create and save Profesors', () => {
        profesorComponentsPage.clickOnCreateButton();
        profesorDialogPage.setNombreProfeInput('nombreProfe');
        expect(profesorDialogPage.getNombreProfeInput()).toMatch('nombreProfe');
        profesorDialogPage.save();
        expect(profesorDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProfesorComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-profesor div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProfesorDialogPage {
    modalTitle = element(by.css('h4#myProfesorLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nombreProfeInput = element(by.css('input#field_nombreProfe'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNombreProfeInput = function (nombreProfe) {
        this.nombreProfeInput.sendKeys(nombreProfe);
    }

    getNombreProfeInput = function () {
        return this.nombreProfeInput.getAttribute('value');
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
