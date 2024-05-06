import {
  IpfsClientServerStats,
  IpfsGatewayRequests,
  ipfsClientServerStatsSchema,
  ipfsGatewayRequestsSchema,
} from "@/server";

export class IpfsStatsService {
  constructor() {}

  async getClientServerStats(): Promise<IpfsClientServerStats> {
    return fetch(
      "https://probelab.io/plots/latest/ipfs-servers-vs-clients.json"
    )
      .then((res) => res.json())
      .then((data) => ipfsClientServerStatsSchema.parse(data));
  }

  async getGatewayRequests(): Promise<IpfsGatewayRequests> {
    return fetch(
      "https://probelab.io/plots/latest/gateway-requests-overall.json"
    )
      .then((res) => res.json())
      .then((data) => ipfsGatewayRequestsSchema.parse(data));
  }
}
