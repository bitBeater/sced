import * as denoConf from '../deno.json' with { type: 'json' };

export const getVersion = () => denoConf.default.version;
export const getTagVersion = () => `v` + getVersion();
