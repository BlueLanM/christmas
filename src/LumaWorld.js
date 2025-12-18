import { extend } from "@react-three/fiber";
import { LumaSplatsThree } from "@lumaai/luma-web";

extend({ LumaSplats: LumaSplatsThree });

export default function LumaWorld({ visible }) {
	// 如果不可见,直接返回 null 避免加载
	if (!visible) return null;

	return (
		<lumaSplats
			source="https://lumalabs.ai/capture/4da7cf32-865a-4515-8cb9-9dfc574c90c2"
			enableThreeShaderIntegration={false}
			position={[-250, -113, 50]}
			scale={208.5}
		/>
	);
}