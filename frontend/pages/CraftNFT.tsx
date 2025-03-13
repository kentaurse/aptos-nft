import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { aptosClient } from "@/utils/aptosClient";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface NFT {
  id: string;
  name: string;
  image: string;
}

const initialParentNFTs: NFT[] = [
  { id: "1", name: "Parent NFT 1", image: "./assets/sword.png" },
  { id: "2", name: "Parent NFT 2", image: "./assets/sword.png" },
];

const initialChildrenNFTsData: NFT[] = [
  { id: "1", name: "Child NFT 1", image: "./assets/fire.png" },
  { id: "2", name: "Child NFT 2", image: "./assets/fire.png" },
  { id: "3", name: "Child NFT 3", image: "./assets/fire.png" },
];

export function CraftNFT() {
  const { signAndSubmitTransaction } = useWallet();
  const [selectedParent, setSelectedParent] = useState<NFT | null>(null);
  const [selectedChildren, setSelectedChildren] = useState<NFT[]>([]);
  const [initialChildrenNFTs, setInitialChildrenNFTs] = useState<NFT[]>(initialChildrenNFTsData);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && over.id === "droppable-area" && active.id !== over.id) {
      handleChildDrop(active.id.toString());
    } else if (!over) {
      handleUnselectChild(active.id.toString());
    } else if (over && active.id !== over.id) {
      setSelectedChildren((prev) => {
        const oldIndex = prev.findIndex((nft) => nft.id === active.id);
        const newIndex = prev.findIndex((nft) => nft.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleParentSelect = (nft: NFT) => {
    setSelectedParent(nft);
  };

  const handleChildDrop = (id: string) => {
    const droppedNFT = initialChildrenNFTs.find((nft) => nft.id === id);
    if (droppedNFT && !selectedChildren.find((nft) => nft.id === droppedNFT.id)) {
      setSelectedChildren((prev) => [...prev, droppedNFT]);
      setInitialChildrenNFTs((prev) => prev.filter((nft) => nft.id !== id));
    }
  };

  const handleUnselectChild = (id: string) => {
    const removedNFT = selectedChildren.find((nft) => nft.id === id);
    if (removedNFT) {
      setSelectedChildren((prev) => prev.filter((nft) => nft.id !== id));
      setInitialChildrenNFTs((prev) => [...prev, removedNFT]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedParent || selectedChildren.length === 0) return;

    const payload: InputTransactionData = {
      data: {
        function: `${import.meta.env.VITE_MODULE_ADDRESS}::module::function`, // TODO: Add module and function names
        typeArguments: [],
        functionArguments: [selectedParent.id, selectedChildren.map((nft) => nft.id)],
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

      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-1/4 p-4">
            <h2 className="text-xl mb-2">Select Parent NFT</h2>
            <div className="grid grid-cols-2 gap-2">
              {initialParentNFTs.map((nft) => (
                <button
                  key={nft.id}
                  className={`w-full h-32 border ${
                    selectedParent?.id === nft.id ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => handleParentSelect(nft)}
                >
                  <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-3/4 flex justify-center items-start p-4">
            {selectedParent && (
              <div className="text-center">
                <h2 className="text-xl">Selected Parent NFT</h2>
                <div className="w-64 h-64 mx-auto border border-blue-500 mt-4">
                  <img src={selectedParent.image} alt={selectedParent.name} className="w-full h-full object-cover" />
                  <p className="mt-2">{selectedParent.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedParent && (
          <div className="mt-10 text-center">
            <h2 className="text-xl">Children NFTs</h2>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <DroppableArea id="droppable-area">
                <SortableContext items={selectedChildren.map((nft) => nft.id)}>
                  <div className="flex space-x-4 mt-4 justify-center">
                    {selectedChildren.map((nft) => (
                      <SortableNFT key={nft.id} nft={nft} />
                    ))}
                  </div>
                </SortableContext>
              </DroppableArea>
              <div className="flex space-x-4 justify-center">
                {initialChildrenNFTs.map((nft) => (
                  <DraggableChildNFT key={nft.id} nft={nft} />
                ))}
              </div>
              <DragOverlay>
                {activeId ? (
                  <div className="w-24 h-24 border border-green-500">
                    <img
                      src={
                        initialChildrenNFTs.find((nft) => nft.id === activeId)?.image ||
                        selectedChildren.find((nft) => nft.id === activeId)?.image
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <p className="text-center">
                      {initialChildrenNFTs.find((nft) => nft.id === activeId)?.name ||
                        selectedChildren.find((nft) => nft.id === activeId)?.name}
                    </p>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        )}

        <div className="mt-20 text-center">
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
  );
}

const DraggableChildNFT: React.FC<{ nft: NFT }> = ({ nft }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: nft.id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="w-24 h-24 border border-gray-300">
      <img src={nft.image} alt={nft.name} />
      <p className="text-center">{nft.name}</p>
    </div>
  );
};

const DroppableArea: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="border-2 border-dashed border-gray-500 p-4">
      {children}
    </div>
  );
};

const SortableNFT: React.FC<{ nft: NFT }> = ({ nft }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: nft.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="w-24 h-24 border border-green-500">
      <img src={nft.image} alt={nft.name} />
      <p className="text-center">{nft.name}</p>
    </div>
  );
};
