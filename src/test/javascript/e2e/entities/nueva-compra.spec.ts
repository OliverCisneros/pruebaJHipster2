import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('NuevaCompra e2e test', () => {

    let navBarPage: NavBarPage;
    let nuevaCompraDialogPage: NuevaCompraDialogPage;
    let nuevaCompraComponentsPage: NuevaCompraComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load NuevaCompras', () => {
        navBarPage.goToEntity('nueva-compra');
        nuevaCompraComponentsPage = new NuevaCompraComponentsPage();
        expect(nuevaCompraComponentsPage.getTitle()).toMatch(/pruebaJHipster2App.nuevaCompra.home.title/);

    });

    it('should load create NuevaCompra dialog', () => {
        nuevaCompraComponentsPage.clickOnCreateButton();
        nuevaCompraDialogPage = new NuevaCompraDialogPage();
        expect(nuevaCompraDialogPage.getModalTitle()).toMatch(/pruebaJHipster2App.nuevaCompra.home.createOrEditLabel/);
        nuevaCompraDialogPage.close();
    });

    it('should create and save NuevaCompras', () => {
        nuevaCompraComponentsPage.clickOnCreateButton();
        nuevaCompraDialogPage.setIdventaInput('5');
        expect(nuevaCompraDialogPage.getIdventaInput()).toMatch('5');
        nuevaCompraDialogPage.setCantidadComprarInput('5');
        expect(nuevaCompraDialogPage.getCantidadComprarInput()).toMatch('5');
        nuevaCompraDialogPage.setFechaTransaccionInput('2000-12-31');
        expect(nuevaCompraDialogPage.getFechaTransaccionInput()).toMatch('2000-12-31');
        nuevaCompraDialogPage.personaSelectLastOption();
        nuevaCompraDialogPage.productoSelectLastOption();
        nuevaCompraDialogPage.save();
        expect(nuevaCompraDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NuevaCompraComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-nueva-compra div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NuevaCompraDialogPage {
    modalTitle = element(by.css('h4#myNuevaCompraLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idventaInput = element(by.css('input#field_idventa'));
    cantidadComprarInput = element(by.css('input#field_cantidadComprar'));
    fechaTransaccionInput = element(by.css('input#field_fechaTransaccion'));
    personaSelect = element(by.css('select#field_persona'));
    productoSelect = element(by.css('select#field_producto'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdventaInput = function (idventa) {
        this.idventaInput.sendKeys(idventa);
    }

    getIdventaInput = function () {
        return this.idventaInput.getAttribute('value');
    }

    setCantidadComprarInput = function (cantidadComprar) {
        this.cantidadComprarInput.sendKeys(cantidadComprar);
    }

    getCantidadComprarInput = function () {
        return this.cantidadComprarInput.getAttribute('value');
    }

    setFechaTransaccionInput = function (fechaTransaccion) {
        this.fechaTransaccionInput.sendKeys(fechaTransaccion);
    }

    getFechaTransaccionInput = function () {
        return this.fechaTransaccionInput.getAttribute('value');
    }

    personaSelectLastOption = function () {
        this.personaSelect.all(by.tagName('option')).last().click();
    }

    personaSelectOption = function (option) {
        this.personaSelect.sendKeys(option);
    }

    getPersonaSelect = function () {
        return this.personaSelect;
    }

    getPersonaSelectedOption = function () {
        return this.personaSelect.element(by.css('option:checked')).getText();
    }

    productoSelectLastOption = function () {
        this.productoSelect.all(by.tagName('option')).last().click();
    }

    productoSelectOption = function (option) {
        this.productoSelect.sendKeys(option);
    }

    getProductoSelect = function () {
        return this.productoSelect;
    }

    getProductoSelectedOption = function () {
        return this.productoSelect.element(by.css('option:checked')).getText();
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
