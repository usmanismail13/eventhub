import { useAppKit } from "@reown/appkit/react";

function ConnectWallet() {
  const { open } = useAppKit();

  return (
    <button onClick={() => open()}>
      Connect Wallet
    </button>
  );
}

export default ConnectWallet;