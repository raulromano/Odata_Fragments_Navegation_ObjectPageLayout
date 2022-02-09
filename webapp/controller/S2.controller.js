sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("rrm.controller.S2", {
            onInit: function () {
                this._oModelListProduct = new sap.ui.model.json.JSONModel()
                this.getView().setModel(this._oModelListProduct, "modelListProduct")
                this.getOwnerComponent().getRouter().getRoute("detailProducts").attachPatternMatched(this.onPatternMatched, this)
            
                
            },


            onPatternMatched: function (oEvent) {
                this._oModelListProduct.setProperty("/IDProduct", oEvent.mParameters.arguments.ID)
                this._oModelListProduct.setProperty("/NameProduct", oEvent.mParameters.arguments.Name)
                this._oModelListProduct.setProperty("/PriceProduct", oEvent.mParameters.arguments.Price)
                this.getOwnerComponent().getModel("modelControl").setProperty("/layoutFlexible", "TwoColumnsMidExpanded")
            },


            onButtonPress: function (oEvent) {

                this.getOwnerComponent().getModel("modelControl").setProperty("/layoutFlexible", "OneColumn")
                this.getOwnerComponent().getRouter().navTo("inicial")

            }


           

        });
    });
