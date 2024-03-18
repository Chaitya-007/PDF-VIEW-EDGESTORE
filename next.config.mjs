/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // If the build target is server-side, configure node-loader for .node files
        if (isServer) {
            config.module.rules.push({
                test: /\.node$/,
                loader: 'node-loader',
            });
        }

        return config;
    },
};

// module.exports = nextConfig;
export default nextConfig;
