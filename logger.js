import {FluentClient} from '@fluent-org/logger';
import process from 'node:process';

const FLUENTD_HOST = process.env.FLUENTD_HOST;
const FLUENTD_PORT = process.env.FLUENTD_PORT;

const logger = new FluentClient('laba', {
    socket: {
        host: FLUENTD_HOST, port: FLUENTD_PORT, timeout: 3000,
    }
});

export {logger};