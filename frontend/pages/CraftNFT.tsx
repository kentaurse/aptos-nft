import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { aptosClient } from "@/utils/aptosClient";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface NFT {
    id: string;
    name: string;
    image: string; 
}

const initialParentNFTs: NFT[] = [
    { id: '1', name: 'Parent NFT 1', image: './assets/sword.png' },
    { id: '2', name: 'Parent NFT 2', image: './assets/sword.png' },
];
  
const initialChildrenNFTs: NFT[] = [
    { id: '1', name: 'Child NFT 1', image: './assets/fire.png' },
    { id: '2', name: 'Child NFT 2', image: './assets/fire.png' },
    { id: '3', name: 'Child NFT 3', image: './assets/fire.png' },
];

export function CraftNFT() {
    const { signAndSubmitTransaction } = useWallet();
    const [selectedParent, setSelectedParent] = useState<NFT | null>(null);
    const [selectedChildren, setSelectedChildren] = useState<NFT[]>([]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const draggedItem = initialChildrenNFTs.find(
        (nft) => nft.id === result.draggableId
        );
        if (draggedItem) {
        setSelectedChildren((prev) => [...prev, draggedItem]);
        }
    };

    const handleParentSelect = (nft: NFT) => {
        setSelectedParent(nft);
    };

    const handleSubmit = async () => {
        if (!selectedParent || selectedChildren.length === 0) return;

        const payload: InputTransactionData = {
            data: {
                function: `${import.meta.env.VITE_MODULE_ADDRESS}::module::function`, // TODO: Add module and function names
                typeArguments: [],
                functionArguments: [
                    selectedParent.id,
                    selectedChildren.map((nft) => nft.id),
                ],
            }
        };

        try {
            const txn = await signAndSubmitTransaction(payload);
            await aptosClient().waitForTransaction(txn.hash);
            console.log('Transaction successful:', txn);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    return (
        <>
            <LaunchpadHeader title="Craft NFT" />

            <div className="container mx-auto p-4">
                <div className="flex justify-center space-x-4">
                    {initialParentNFTs.map((nft) => (
                        <div
                            key={nft.id}
                            className={`w-32 h-32 border ${
                                selectedParent?.id === nft.id ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            onClick={() => handleParentSelect(nft)}
                        >
                            <img src={nft.image} alt={nft.name} />
                            <p className="text-center">{nft.name}</p>
                        </div>
                     ))}
                </div>

                {selectedParent && (
                    <div className="mt-8 text-center">
                        <h2 className="text-xl">Selected Parent NFT</h2>
                        <div className="w-64 h-64 mx-auto border border-blue-500 mt-4">
                            <img src={selectedParent.image} alt={selectedParent.name} />
                            <p>{selectedParent.name}</p>
                        </div>
                    </div>
                )}

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="children" direction="horizontal">
                        {(provided) => (
                            <div
                                className="flex space-x-4 mt-8 justify-center"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {initialChildrenNFTs.map((nft, index) => (
                                    <Draggable key={nft.id} draggableId={nft.id} index={index}>
                                        {(provided) => (
                                            <div
                                                className="w-24 h-24 border border-gray-300"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <img src={nft.image} alt={nft.name} />
                                                <p className="text-center">{nft.name}</p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                         )}
                    </Droppable>
                </DragDropContext>

                <div className="mt-8 text-center">
                    <h2 className="text-xl">Selected Children NFTs</h2>
                    <div className="flex space-x-4 mt-4 justify-center">
                        {selectedChildren.map((nft) => (
                            <div key={nft.id} className="w-24 h-24 border border-green-500">
                                <img src={nft.image} alt={nft.name} />
                                <p className="text-center">{nft.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleSubmit}
                        disabled={!selectedParent || selectedChildren.length === 0}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}