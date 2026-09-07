//@ts-check

const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		svgr: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "8000",
				pathname: "/media/**",
			},
		],
	},
	compiler: {},
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
