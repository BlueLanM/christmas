import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";

// 全局错误处理 - 抑制 LumaSplats 的 undefined URL 错误
window.addEventListener("unhandledrejection", (event) => {
	const errorMsg = event.reason?.message || event.reason?.toString() || "";
	// 检测是否是 luma-web 的 undefined URL 错误
	if (errorMsg.includes("undefined") || errorMsg.includes("404") || errorMsg.includes("fetch")) {
		const stack = event.reason?.stack || "";
		if (stack.includes("luma-web") || errorMsg === "undefined") {
			console.warn("LumaSplats: Suppressed internal resource loading warning");
			event.preventDefault();
		}
	}
});

// 全局错误处理 - 捕获同步错误
window.addEventListener("error", (event) => {
	const filename = event.filename || "";
	const message = event.message || "";

	// 抑制来自 luma-web 的 undefined 相关错误
	if ((message.includes("undefined") || message.includes("404"))
      && (filename.includes("luma-web") || filename.includes("christmas/undefined"))) {
		console.warn("LumaSplats: Suppressed resource loading warning");
		event.preventDefault();
		return false;
	}
});

// 拦截 console.error 中的 luma-web 错误
const originalConsoleError = console.error;
console.error = function(...args) {
	const errorStr = args.join(" ");
	// 如果错误信息包含 undefined URL 或 luma-web,抑制显示
	if (errorStr.includes("christmas/undefined")
      || (errorStr.includes("undefined") && errorStr.includes("luma"))) {
		console.warn("LumaSplats: Internal warning suppressed");
		return;
	}
	originalConsoleError.apply(console, args);
};

createRoot(document.getElementById("root")).render(<App />);