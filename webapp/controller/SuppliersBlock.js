sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var SuppliersBlock = BlockBase.extend("sap.uxap.sample.SharedBlocks.suppliers.SuppliersBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "sap.uxap.sample.SharedBlocks.suppliers.SuppliersBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "sap.uxap.sample.SharedBlocks.suppliers.SuppliersBlock",
					type: "XML"
				}
			}
		}
	});

	return SuppliersBlock;
}, true);

