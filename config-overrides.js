module.exports = {
  webpack: (config) => {

	
    const oneOfs = config.module.rules.find((rule) => !!rule.oneOf).oneOf;
    for (const oneOf of oneOfs) {
		oneOf?.use?.forEach((someUse) => {
			if (!someUse?.options?.modules?.mode) return;
			// someUse.options.modules.localIdentName = '[local]_';
			someUse.options.modules.getLocalIdent = (context, localIdentName, localName, options) => {
			  return localName;
			}
		});
	}
	
    return config;
  }
};
