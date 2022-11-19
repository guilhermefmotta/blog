module.exports = {
    images: {
        unoptimized: true,
    },
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/' },
            '/about': { page: '/about' },
            '/contact': { page: '/contact' },
        }
    },
}