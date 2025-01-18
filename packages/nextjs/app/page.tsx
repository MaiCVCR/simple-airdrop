'use client';

import { useState, useEffect } from "react";
import { useAccount, useTransaction } from "wagmi";
import { 
  useScaffoldReadContract,
  useScaffoldWriteContract,
  useScaffoldContract
} from "~~/hooks/scaffold-eth";
import Card from "~~/components/ui/Card";
import Button from "~~/components/ui/Button";
import { formatEther } from "viem";
import { notification } from "~~/utils/scaffold-eth";

const AirdropPage = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const [hasClaimed, setHasClaimed] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);

  // Get contract instance
  const { data: airdropContract } = useScaffoldContract({
    contractName: "Airdrop",
  });

  // Read contract data
  const { data: contractBalance } = useScaffoldReadContract({
    contractName: "SimpleToken",
    functionName: "balanceOf",
    args: [airdropContract?.address],
  });

  const { data: airdropAmount } = useScaffoldReadContract({
    contractName: "Airdrop",
    functionName: "airdropAmount",
  });

  const { data: hasAddressClaimed } = useScaffoldReadContract({
    contractName: "Airdrop",
    functionName: "hasAddressClaimed",
    args: [connectedAddress],
  });

  // Write contract function with correct syntax
  const { writeContractAsync, isMining } = useScaffoldWriteContract({
    contractName: "Airdrop",
  });

  // Wait for transaction
  const { isLoading: isWaiting, isSuccess } = useTransaction({
    hash: txHash as `0x${string}`,
  });

  useEffect(() => {
    if (isSuccess) {
      setHasClaimed(true);
      notification.success("Tokens claimed successfully!");
      setTxHash(null);
    }
  }, [isSuccess]);  

  useEffect(() => {
    if (hasAddressClaimed !== undefined) {
      setHasClaimed(hasAddressClaimed);
    }
  }, [hasAddressClaimed]);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Simple Airdrop Example</h1>
        <Card className="w-full max-w-2xl mx-4">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Token Airdrop</h2>
            <p className="text-center">Please connect your wallet to continue</p>
          </div>
        </Card>
      </div>
    );
  }

  const handleClaim = async () => {
    try {
      const hash = await writeContractAsync({
        functionName: "claimTokens",
      });
      if (hash) {
        setTxHash(hash);
      }
    } catch (error) {
      console.error("Error claiming tokens:", error);
      notification.error("Error claiming tokens");
    }
  };

  const isLoading = isMining || isWaiting;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Simple Airdrop Example</h1>
      <Card className="w-full max-w-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Token Airdrop</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-medium mb-2">Contract Balance</h3>
                <p className="text-xl">
                  {contractBalance ? formatEther(contractBalance) : "0"} TEST
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-medium mb-2">Airdrop Amount</h3>
                <p className="text-xl">
                  {airdropAmount ? formatEther(airdropAmount) : "0"} TEST
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">Your Status</h3>
              <p className="mb-4">
                {hasClaimed 
                  ? "You have already claimed your tokens" 
                  : "You haven't claimed your tokens yet"}
              </p>

              <Button 
                onClick={handleClaim} 
                disabled={hasClaimed || isLoading}
                className="w-full py-6 text-lg">
                {isLoading 
                  ? isWaiting 
                    ? "Confirming Transaction..." 
                    : "Claiming..." 
                  : hasClaimed 
                    ? "Already Claimed" 
                    : "Claim Tokens"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AirdropPage;