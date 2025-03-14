import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { aptosClient } from "@/utils/aptosClient";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface NFT {
  id: string;
  name: string;
  image: string;
}

const allNFTs: NFT[] = [
  { id: "1", name: "Sword", image: "./assets/sword-basic.png" },
  { id: "2", name: "Fire", image: "./assets/element-fire.png" },
  { id: "3", name: "Water", image: "./assets/element-water.png" },
];

export function CraftNFT() {
  const { signAndSubmitTransaction } = useWallet();
  const [selectedNFT1, setSelectedNFT1] = useState<NFT | null>(null);
  const [selectedNFT2, setSelectedNFT2] = useState<NFT | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAreaClick = (area: string) => {
    setSelectedArea(area);
    setIsModalOpen(true);
  };

  const handleNFTSelect = (nft: NFT) => {
    if (selectedArea === "area1") {
      if (selectedNFT1?.id === nft.id) {
        setSelectedNFT1(null);
      } else {
        setSelectedNFT1(nft);
      }
    } else if (selectedArea === "area2") {
      if (selectedNFT2?.id === nft.id) {
        setSelectedNFT2(null);
      } else {
        setSelectedNFT2(nft);
      }
    }
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedNFT1 || !selectedNFT2) return;

    const payload: InputTransactionData = {
      data: {
        function: `${import.meta.env.VITE_MODULE_ADDRESS}::module::function`, // TODO: Add module and function names
        typeArguments: [],
        functionArguments: [selectedNFT1.id, selectedNFT2.id], // TODO: set correct arguments
      },
    };

    try {
      const txn = await signAndSubmitTransaction(payload);
      await aptosClient().waitForTransaction(txn.hash);
      console.log("Transaction successful:", txn);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <>
      <LaunchpadHeader title="Craft NFT" />

      <div className="container mx-auto p-4 pt-8">
        <h2 className="text-2xl mb-8 text-center">Combine Your NFTs</h2>

        <div className="flex justify-around items-start max-w-3xl mx-auto">
          {/* Area 1 */}
          <div className="w-1/3 p-4 border cursor-pointer" onClick={() => handleAreaClick("area1")}>
            {selectedNFT1 ? (
              <div>
                <div>
                  <img src={selectedNFT1.image} alt={selectedNFT1.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-center pt-2">{selectedNFT1.name}</p>
              </div>
            ) : (
              <p className="text-center">Click to select NFT 1</p>
            )}
          </div>

          {/* Area 2 */}
          <div className="w-1/3 p-4 border cursor-pointer" onClick={() => handleAreaClick("area2")}>
            {selectedNFT2 ? (
              <div>
                <div>
                  <img src={selectedNFT2.image} alt={selectedNFT2.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-center pt-2">{selectedNFT2.name}</p>
              </div>
            ) : (
              <p className="text-center">Click to select NFT 2</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-12">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
            disabled={!selectedNFT1 || !selectedNFT2}
          >
            Craft a new NFT
          </button>
        </div>

        {/* Modal for selecting NFTs */}
        <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />
            <Dialog.Content
              className="fixed bg-white p-6 shadow-lg rounded-lg"
              style={{
                maxWidth: "600px",
                maxHeight: "80%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflow: "auto",
              }}
            >
              <Dialog.Title className="text-xl text-center mb-4">Select an NFT</Dialog.Title>
              <div className="grid grid-cols-3 gap-4">
                {allNFTs.map((nft) => {
                  const isDisabled =
                    (selectedArea === "area1" && nft.id === selectedNFT2?.id) ||
                    (selectedArea === "area2" && nft.id === selectedNFT1?.id);
                  const isSelectedInSameArea =
                    (selectedArea === "area1" && nft.id === selectedNFT1?.id) ||
                    (selectedArea === "area2" && nft.id === selectedNFT2?.id);

                  return (
                    <div
                      key={nft.id}
                      className={`${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                      onClick={() => !isDisabled && handleNFTSelect(nft)}
                    >
                      <div className={`relative p-2 border ${isSelectedInSameArea ? "border-2 border-green-400" : ""}`}>
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className={`w-full h-full object-cover  ${isDisabled ? "opacity-50 grayscale-[50%]" : ""}`}
                        />
                        {isDisabled && <div className="absolute inset-0 bg-black opacity-80"></div>}
                      </div>
                      <p className={`text-center pt-2 ${isDisabled ? "opacity-50" : ""}`}>{nft.name}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end mt-6">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}
