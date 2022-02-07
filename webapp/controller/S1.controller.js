sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.Fragment } Fragment
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("rrm.controller.S1", {
            onInit: function () {

                // Modelo criado para usar apenas nos Fragments - Inicial
                this._oModelListItemProduct = new sap.ui.model.json.JSONModel()
                this.getView().setModel(this._oModelListItemProduct, "modelListItemProduct")
                // Modelo criado para usar apenas nos Fragments - Final

                // Modelo API principal - Inicial
                this._oModelDefault = this.getOwnerComponent().getModel("modelDefault")
                // Modelo API principal - Final

                // Modelo para obter os valores dos Control/Element (campos do ecrã) - Inicial
                this._oModelControl = this.getOwnerComponent().getModel("modelControl")
                // Modelo para obter os valores dos Control/Element (campos do ecrã) - Fim

                this._oModelControl.listProduct = this.byId("listProducts")

            },

            clearModelListItemProduct: function () {
                this._oModelListItemProduct.setProperty("/IDProductListItem", "")
                this._oModelListItemProduct.setProperty("/NameProductListItem", "")
                this._oModelListItemProduct.setProperty("/PriceProductListItem", "")
            },

            onSearch: function (oEvent) {

                if (this._oModelControl.getProperty("/valueSearchProducts") == "") {
                    this._oModelControl.listProduct.getBinding("items").filter()
                } else {
                    var oFilter = new sap.ui.model.Filter({
                        path: "Name",
                        operator: sap.ui.model.FilterOperator.Contains,
                        value1: this._oModelControl.getProperty("/valueSearchProducts")
                    })

                    this._oModelControl.listProduct.getBinding("items").filter(oFilter)
                }

            },


            onItemPress: function (oEvent) {

                var oParameters = {
                    ID: oEvent.getParameters().listItem.getBindingContext("modelDefault").getProperty("ID"),
                    Name: oEvent.getParameters().listItem.getBindingContext("modelDefault").getProperty("Name"),
                    Price: oEvent.getParameters().listItem.getBindingContext("modelDefault").getProperty("Price")
                }

                this.getOwnerComponent().getRouter().navTo("detailProducts", oParameters)

            },

            onApiDocumentation: function (oEvent) {
                window.open("https://services.odata.org/V2/(S(eh10zbbvzhmbellfgwmw2o4oraulromanomendonca))/OData/OData.svc/");
            },

            onCreateNewProducts: function (oEvent) {

                if (!this.byId("popupCreateNewProduct")) {
                    this.clearModelListItemProduct()
                    var oView = this.getView()

                    var mOptions = {
                        name: "rrm.view.CreateProduct",
                        id: oView.getId(),
                        controller: this
                    }

                    Fragment.load(mOptions).then(function (oDialog) {

                        this.getLastIdListProduct() // Pegar o ultimo ID da lista de produtos e incrementar mais 1, para que não tenhamos IDs repetidos.
                        oView.addDependent(oDialog)
                        oDialog.open()

                    }.bind(this))

                } else {
                    this.byId("popupCreateNewProduct").open();
                }
            },

            onCreateProduct: function (oEvent) {

                var oParameters = {
                    success: this.onSuccessCreateProducts.bind(this),
                    error: this.errorCreateProducts.bind(this)
                }

                var oProducts = {
                    ID: this._oModelListItemProduct.getProperty("/IDProductListItem"),
                    Name: this._oModelListItemProduct.getProperty("/NameProductListItem"),
                    Price: this._oModelListItemProduct.getProperty("/PriceProductListItem")
                }

                this._oModelDefault.create("/Products", oProducts, oParameters)

            },

            onCancelCreateProduct: function (oEvent) {
                this.byId("popupCreateNewProduct").close()
            },

            onSuccessCreateProducts: function (oData, response) {

                sap.m.MessageToast.show("Product created with success. ID Product: " + oData.ID + ".", {
                    duration: 2000,                  // default
                    width: "15em",                   // default
                    my: "center bottom",             // default
                    at: "center bottom",             // default
                    of: window,                      // default
                    offset: "0 0",                   // default
                    collision: "fit fit",            // default
                    onClose: null,                   // default
                    autoClose: true,                 // default
                    animationTimingFunction: "ease", // default
                    animationDuration: 1000,         // default
                    closeOnBrowserNavigation: true   // default
                });

                this._oModelDefault.refresh()
                this.clearModelListItemProduct()
                this.onCancelCreateProduct()
            },

            errorCreateProducts: function (response) {
                // Tratar error
            },

            onModifyProducts: function (oEvent) {
                debugger
                if (!this.byId("popupModifyProduct")) {
                    var oView = this.getView()

                    var mOptions = {
                        name: "rrm.view.ModifyProduct",
                        id: oView.getId(),
                        controller: this
                    }

                    Fragment.load(mOptions).then(function (oDialog) {
                        this.clearModelListItemProduct()
                        oView.addDependent(oDialog)
                        oDialog.open()
                    }.bind(this))

                } else {
                    this.clearModelListItemProduct()
                    this.byId("popupModifyProduct").open();
                }

            },

            onListItemPressModifyProduct: function (oEvent) {
                this.clearModelListItemProduct()
                var oContextListItem = oEvent.getParameters().listItem.getBindingContext("modelDefault")
                this._oModelListItemProduct.setProperty("/IDProductListItem", oContextListItem.getProperty("ID"))
                this._oModelListItemProduct.setProperty("/NameProductListItem", oContextListItem.getProperty("Name"))
                this._oModelListItemProduct.setProperty("/PriceProductListItem", oContextListItem.getProperty("Price"))
            },

            onDeleteListItemProduct: function (oEvent) {
                debugger

                var oParameters = {
                    success: this.successDeleteListItemProduct.bind(this),
                    error: this.errorDeleteListItemProduct.bind(this)
                }

                var sPath = oEvent.getParameters().listItem.getBindingContext("modelDefault").getPath()
                this._oModelDefault.remove(sPath, oParameters)
            },

            successDeleteListItemProduct: function (oData, response) {

                sap.m.MessageToast.show("Product removed with success.", {
                    duration: 2000,                  // default
                    width: "15em",                   // default
                    my: "center bottom",             // default
                    at: "center bottom",             // default
                    of: window,                      // default
                    offset: "0 0",                   // default
                    collision: "fit fit",            // default
                    onClose: null,                   // default
                    autoClose: true,                 // default
                    animationTimingFunction: "ease", // default
                    animationDuration: 1000,         // default
                    closeOnBrowserNavigation: true   // default
                });

                this._oModelDefault.refresh()

            },

            errorDeleteListItemProduct: function (response) {
                // Tratar error
            },

            onModifyProduct: function (oEvent) {
                debugger
                if (!this._oModelListItemProduct.getProperty("/IDProductListItem") == "") {

                    var sPath = this._oModelDefault.createKey("/Products", {
                        ID: this._oModelListItemProduct.getProperty("/IDProductListItem")
                    })

                    var oData = {
                        ID: this._oModelListItemProduct.getProperty("/IDProductListItem"),
                        Name: this._oModelListItemProduct.getProperty("/NameProductListItem"),
                        Price: this._oModelListItemProduct.getProperty("/PriceProductListItem")
                    }

                    var oParameters = {
                        success: this.successModifyLisItemProduct.bind(this),
                        error: this.errorModifyListItemProduct.bind(this)
                    }
                    debugger
                    this._oModelDefault.update(sPath, oData, oParameters)

                }

            },

            successModifyLisItemProduct: function (oData, response) {
                debugger
                sap.m.MessageToast.show("Product updated with success.", {
                    duration: 2000,                  // default
                    width: "15em",                   // default
                    my: "center bottom",             // default
                    at: "center bottom",             // default
                    of: window,                      // default
                    offset: "0 0",                   // default
                    collision: "fit fit",            // default
                    onClose: null,                   // default
                    autoClose: true,                 // default
                    animationTimingFunction: "ease", // default
                    animationDuration: 1000,         // default
                    closeOnBrowserNavigation: true   // default
                });

                this._oModelDefault.refresh()
                this.clearModelListItemProduct()
                this.onCancelModifyProduct()

            },

            errorModifyListItemProduct: function (response) {
                // Tratar error
            },

            onCancelModifyProduct: function (oEvent) {
                this.byId("popupModifyProduct").close()
            },

            getLastIdListProduct: function () {
                var sLengthListProduct = this._oModelControl.listProduct.getBinding("items").getContexts().slice(-1)[0].getObject()
                sLengthListProduct.ID = sLengthListProduct.ID + 1
                this._oModelListItemProduct.setProperty("/IDProductListItem", sLengthListProduct.ID)
            }

        });
    });
