/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bhk-tobenski.s3.eu-north-1.amazonaws.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '*.tobenski.dk',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
