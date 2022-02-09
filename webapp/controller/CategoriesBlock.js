sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var CategoriesBlock = BlockBase.extend("sap.uxap.sample.SharedBlocks.categories.CategoriesBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "sap.uxap.sample.SharedBlocks.categories.CategoriesBlock",
					type: "XML"
				},
				Expanded: {
					viewName: "sap.uxap.sample.SharedBlocks.categories.CategoriesBlock",
					type: "XML"
				}
			}
		}
	});

	return CategoriesBlock;
}, true);

