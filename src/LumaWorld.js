import { extend } from "@react-three/fiber";
import { LumaSplatsThree } from "@lumaai/luma-web";
import { useEffect, useState } from "react";

extend({ LumaSplats: LumaSplatsThree });

export default function LumaWorld({ visible }) {
	const [error, setError] = useState(false);

	// 如果不可见或发生错误,直接返回 null
	if (!visible || error) return null;

	useEffect(() => {
		// 捕获可能的 Luma 加载错误
		const handleError = (event) => {
			if (event.message && event.message.includes("undefined")) {
				console.warn("LumaSplats loading warning suppressed");
				setError(true);
				event.preventDefault();
			}
		};

		window.addEventListener("error", handleError);
		return () => window.removeEventListener("error", handleError);
	}, []);

	try {
		return (
			<lumaSplats
				source="https://lumalabs.ai/capture/4da7cf32-865a-4515-8cb9-9dfc574c90c2"
				enableThreeShaderIntegration={false}
				position={[-250, -113, 50]}
				scale={208.5}
			/>
		);
	} catch (err) {
		console.warn("LumaSplats render error:", err);
		return null;
	}
}