import { UpdateViewportSize } from "./utils/viewport-utils";
import { BreakpointObserver } from "./utils/breakpoint-utils";

const page = document.querySelector("[data-page]");
const pageAttribute = page.getAttribute("data-page");

// ================
// 共通
// ================
const commonModules = {
  viewport: new UpdateViewportSize(),
};

Object.values(commonModules).forEach((module) => module.init());

// ================
// 各ページ
// ================
const pageModules = {
  top: UpdateViewportSize,
};

if (pageAttribute in pageModules) {
  const instance = new pageModules[pageAttribute]();
  instance.init();
}
