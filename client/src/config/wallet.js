import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet } from "@reown/appkit/networks";

const projectId = "d2890fdcbc8aea9b136ba91c53c0d1b2";

const metadata = {
  name: "EventHub",
  description: "Event booking platform",
  url: window.location.origin,
  icons: [],
};

const ethersAdapter = new EthersAdapter();

export const appKit = createAppKit({
  adapters: [ethersAdapter],
  networks: [mainnet],
  projectId,
  metadata,
});