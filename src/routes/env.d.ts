interface ImportMetaEnv {
	// safe to expose on the client
	readonly VITE_POCKETBASE_URL: string;
	// server only
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
