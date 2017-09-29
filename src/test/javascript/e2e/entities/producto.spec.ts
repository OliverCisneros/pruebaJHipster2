import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Producto e2e test', () => {

    let navBarPage: NavBarPage;
    let productoDialogPage: ProductoDialogPage;
    let productoComponentsPage: ProductoComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Productos', () => {
        navBarPage.goToEntity('producto');
        productoComponentsPage = new ProductoComponentsPage();
        expect(productoComponentsPage.getTitle()).toMatch(/pruebaJHipster2App.producto.home.title/);

    });

    it('should load create Producto dialog', () => {
        productoComponentsPage.clickOnCreateButton();
        productoDialogPage = new ProductoDialogPage();
        expect(productoDialogPage.getModalTitle()).toMatch(/pruebaJHipster2App.producto.home.createOrEditLabel/);
        productoDialogPage.close();
    });

    it('should create and save Productos', () => {
        productoComponentsPage.clickOnCreateButton();
        productoDialogPage.setIdProductoInput('5');
        expect(productoDialogPage.getIdProductoInput()).toMatch('5');
        productoDialogPage.setNombreProductoInput('nombreProducto');
        expect(productoDialogPage.getNombreProductoInput()).toMatch('nombreProducto');
        productoDialogPage.setPrecioVentaInput('5');
        expect(productoDialogPage.getPrecioVentaInput()).toMatch('5');
        productoDialogPage.setCantidadInput('5');
        expect(productoDialogPage.getCantidadInput()).toMatch('5');
        productoDialogPage.save();
        expect(productoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-producto div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductoDialogPage {
    modalTitle = element(by.css('h4#myProductoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idProductoInput = element(by.css('input#field_idProducto'));
    nombreProductoInput = element(by.css('input#field_nombreProducto'));
    precioVentaInput = element(by.css('input#field_precioVenta'));
    cantidadInput = element(by.css('input#field_cantidad'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdProductoInput = function (idProducto) {
        this.idProductoInput.sendKeys(idProducto);
    }

    getIdProductoInput = function () {
        return this.idProductoInput.getAttribute('value');
    }

    setNombreProductoInput = function (nombreProducto) {
        this.nombreProductoInput.sendKeys(nombreProducto);
    }

    getNombreProductoInput = function () {
        return this.nombreProductoInput.getAttribute('value');
    }

    setPrecioVentaInput = function (precioVenta) {
        this.precioVentaInput.sendKeys(precioVenta);
    }

    getPrecioVentaInput = function () {
        return this.precioVentaInput.getAttribute('value');
    }

    setCantidadInput = function (cantidad) {
        this.cantidadInput.sendKeys(cantidad);
    }

    getCantidadInput = function () {
        return this.cantidadInput.getAttribute('value');
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
