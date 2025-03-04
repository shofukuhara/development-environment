import { UpdateViewportSize } from "./utils/viewport-utils";
import { BreakpointObserver } from "./utils/breakpoint-utils";
// 共通処理格納
const commonModules = {
  common: () => {},
};

// 各ページごとの処理格納
const pageModules = {
  // home: () => {},
};

// 各ページの処理チェック
const page = document.querySelector("[data-page]");
if (page) {
  const pageAttribute = page.getAttribute("data-page");
  commonModules.common(); // 共通処理を実行
  if (pageModules[pageAttribute]) {
    pageModules[pageAttribute](); // 各ページの処理を実行
  }
}
