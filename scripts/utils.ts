import * as denoConf from '../deno.jsonc' with { type: 'json' };

export const getVersion = () => denoConf.default.version;
export const getTagVersion = () => `v` + getVersion();
