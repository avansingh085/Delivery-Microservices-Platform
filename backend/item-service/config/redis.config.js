import { Redis } from "@upstash/redis";
import { REDIS_ENDPOINT, REDIS_PASS } from "./server.config.js";

const redis = new Redis({
    url: REDIS_ENDPOINT,
    token: REDIS_PASS,
});

export const RedisGet = async (key) => {
    try {
        return await redis.get(key);
    } catch (err) {
        return null;
    }
};

export const RedisSet = async (key, value, ttl = 3600) => {
    try {
        await redis.set(key, value, { ex: ttl });
    } catch (err) {
        console.error(err);
    }
};

export default {
    redis,
    RedisGet,
    RedisSet,
};