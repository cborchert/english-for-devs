interface ImportMetaEnv {
	// safe to expose on the client
	readonly VITE_POCKETBASE_URL: string;
	// server only
	readonly VITE_GOOGLE_CLOUD_TEXT_TO_SPEECH_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
