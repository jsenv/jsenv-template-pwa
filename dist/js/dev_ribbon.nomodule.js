System.register([], function (_export, _context) {
  "use strict";

  var devRibbonContainer;
  return {
    setters: [],
    execute: function () {
      devRibbonContainer = document.createElement("div");
      devRibbonContainer.id = "dev_ribbon_container";
      devRibbonContainer.innerHTML = "\n<div id=\"dev_ribbon\">\n  <div id=\"dev_ribbon_text\">DEV</span>\n</div>\n<style>\n#dev_ribbon_container {\n  position: absolute;\n  z-index: 1001;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n}\n#dev_ribbon {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n  width: 100%;\n  height: 100%;\n}\n#dev_ribbon_text {\n  position: absolute;\n  left: 0px;\n  top: 20px;\n  transform: rotate(45deg);\n  display: block;\n  width: 125px;\n  line-height: 36px;\n  background-color: orange;\n  color: rgb(55, 7, 7);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);\n  font-weight: 700;\n  font-size: 16px;\n  font-family: \"Lato\", sans-serif;\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  user-select: none;\n}\n</style>";
      document.body.appendChild(devRibbonContainer);
    }
  };
});