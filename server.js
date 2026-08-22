import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });

// Serve official Ultraviolet background scripts
fastify.register(fastifyStatic, {
    root: uvPath,
    prefix: '/uv/',
    decorateReply: false
});

// Serve your custom index.html website files from the public folder
fastify.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/'
});

// Start listening for connections (Render assigns the port automatically)
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
