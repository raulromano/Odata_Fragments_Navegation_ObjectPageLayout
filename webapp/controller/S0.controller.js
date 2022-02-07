sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("rrm.controller.S0", {
            onInit: function () {

                this.getOwnerComponent().getModel("modelControl").setProperty("/layoutFlexible", "OneColumn")

            }
        });
    });
