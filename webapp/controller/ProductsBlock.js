sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var ProductsBlock = BlockBase.extend("sap.uxap.sample.SharedBlocks.products.ProductsBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "sap.uxap.sample.SharedBlocks.products.ProductsBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "sap.uxap.sample.SharedBlocks.products.ProductsBlock",
					type: "XML"
				}
			}
		}
	});

	return ProductsBlock;
}, true);

