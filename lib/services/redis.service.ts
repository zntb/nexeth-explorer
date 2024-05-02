import { Redis, SetCommandOptions } from "@upstash/redis";

import { REDIS_SECRET, REDIS_URL } from "../constants";

export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      url: REDIS_URL,
      token: REDIS_SECRET,
    });
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string, opts?: SetCommandOptions) {
    return this.client.set(key, value, opts);
  }
}
