import { create } from "ipfs-http-client";

const projectId = "2Xi31agz7M8y7BuefMlhbswjv3L";
const projectSecret = "1d72178ee211645564992adfd6ddc6f2";


// Configure the IPFS client
const ipfs = create({
  host: "ipfs.infura.io", // You can use Infura or your own IPFS node
  port: 5001,
  protocol: "https",
  headers: {
    authorization: "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64"),
  },
});

const VALID_MEDIA_EXTENSIONS = ["png", "jpg", "jpeg", "gltf"];
type CollectionMetadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
};
// type ImageAttribute = {
//   trait_type: string;
//   value: string;
// };
// type ImageMetadata = {
//   name: string;
//   description: string;
//   image: string;
//   external_url: string;
//   attributes: ImageAttribute[];
// };

export const uploadCollectionData = async (
  // aptosWallet: any,
  fileList: FileList,
): Promise<{
  collectionName: string;
  collectionDescription: string;
  maxSupply: number;
  projectUri: string;
}> => {
  const files: File[] = [];
  for (let i = 0; i < fileList.length; i++) {
    files.push(fileList[i]);
  }

  console.log("AVH", projectId);

  const collectionFiles = files.filter((file) => file.name.includes("collection"));
  if (collectionFiles.length !== 2) {
    throw new Error("Please make sure you include both collection.json and collection image file");
  }

  const collectionMetadataFile = collectionFiles.find((file) => file.name === "collection.json");
  if (!collectionMetadataFile) {
    throw new Error("Collection metadata not found, please make sure you include collection.json file");
  }

  const collectionCover = collectionFiles.find((file) =>
    VALID_MEDIA_EXTENSIONS.some((ext) => file.name.endsWith(`.${ext}`)),
  );
  if (!collectionCover) {
    throw new Error("Collection cover not found, please make sure you include the collection image file");
  }

  const mediaExt = collectionCover.name.split(".").pop();
  const nftImageMetadatas = files.filter((file) => file.name.endsWith("json") && file.name !== "collection.json");
  if (nftImageMetadatas.length === 0) {
    throw new Error("Image metadata not found, please make sure you include the NFT json files");
  }

  const imageFiles = files.filter((file) => file.name.endsWith(`.${mediaExt}`) && file.name !== collectionCover.name);
  if (imageFiles.length === 0) {
    throw new Error("Image files not found, please make sure you include the NFT image files");
  }

  if (nftImageMetadatas.length !== imageFiles.length) {
    throw new Error("Mismatch between NFT metadata json files and images files");
  }

  // Upload images and metadata to IPFS
  // const ipfsUploads: { path: string; cid: string }[] = [];
  const uploadFileToIpfs = async (file: File) => {
    const added = await ipfs.add(file);
    return added.path;
  };

  const imageFolderCid = await uploadFileToIpfs(collectionCover);

  const updatedCollectionMetadata: CollectionMetadata = JSON.parse(await collectionMetadataFile.text());
  updatedCollectionMetadata.image = `ipfs://${imageFolderCid}`;

  // const updatedImageMetadatas = await Promise.all(
  //   nftImageMetadatas.map(async (file) => {
  //     const metadata: ImageMetadata = JSON.parse(await file.text());
  //     const imageFile = imageFiles.find((img) => img.name === file.name.replace("json", `${mediaExt}`));
  //     const imageCid = await uploadFileToIpfs(imageFile!);
  //     metadata.image = `ipfs://${imageCid}`;
  //     const updatedMetadata = new File([JSON.stringify(metadata)], file.name, { type: file.type });
  //     return updatedMetadata;
  //   }),
  // );

  const updatedMetadataCid = await uploadFileToIpfs(
    new File([JSON.stringify(updatedCollectionMetadata)], "collection.json", {
      type: collectionMetadataFile.type,
    }),
  );

  return {
    projectUri: `ipfs://${updatedMetadataCid}`,
    maxSupply: imageFiles.length,
    collectionName: updatedCollectionMetadata.name,
    collectionDescription: updatedCollectionMetadata.description,
  };
};
