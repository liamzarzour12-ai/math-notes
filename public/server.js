import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });

// Serve official Ultraviolet proxy engine scripts
fastify.register(fastifyStatic, {
    root: uvPath,
    prefix: '/uv/',
    decorateReply: false
});

// Serve your premium iPad user interface
fastify.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/'
});

// Start the server (Railway automatically gives you a PORT environment variable)
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT || 8080, host: '0.0.0.0' });
        console.log(`Proxy running on port ${process.env.PORT || 8080}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
