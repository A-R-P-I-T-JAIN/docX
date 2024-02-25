"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useSocket } from "../socketContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const socket = useSocket();
  const [documents, setDocuments] = useState([]);
  const [sharedDocuments, setSharedDocuments] = useState([]);

  useEffect(() => {
    if (socket == null) return;

    const handler = (id) => {
      // router.push(`document/${id}`);
      window.open (`http://localhost:3000/document/${id}`, '_ blank');
    };

    socket.on("document-created", handler);

    return () => {
      socket.off("document-created", handler);
    };
  }, [socket, router]);

  useEffect(() => {
    if (socket == null || user == null) return;

    socket.on("recieve-owned-docs", (documents) => {
      console.log("recieved");
      setDocuments(documents);
    });
    socket.on("recieve-shared-docs", (documents) => {
      console.log("recieved");
      setSharedDocuments(documents);
    });

    socket.emit("get-owned-docs", { userId: user.id });
    socket.emit("get-shared-docs", { userId: user.id });
  }, [socket, user]);

  const addHandler = () => {
    const id = uuidV4();
    socket.emit("create-document", {
      id,
      userId: user.id,
      emailId: user.emailAddresses[0].emailAddress,
    });
  };

  return (
    <div className="w-screen min-h-[80vh] bg-black flex flex-col items-center pt-10">
      <div className="w-[95%] md:w-[80%] border-b-2 border-white py-2 flex gap-4 overflow-x-scroll">
        <div
          className="w-20 md:w-32 h-28 md:h-40 bg-white flex flex-col items-center justify-center cursor-pointer"
          onClick={addHandler}
        >
          <Image src="/plus-icon.svg" width={30} height={30} />
          <p className="text-center text-sm">New document</p>
        </div>
      </div>
      <h1 className="w-[95%] md:w-[80%] text-white text-2xl md:text-4xl font-semibold my-2">
        Owned documents
      </h1>
      <div className="w-[95%] md:w-[80%] border-b-2 border-white py-2 flex gap-4 overflow-x-scroll">
        {documents && documents.length > 0 ? (
          documents.toReversed().map((doc) => (
            <div
              key={doc._id} // Make sure to include a unique key when rendering a list of elements
              className="w-20 md:w-32 h-28 md:h-40 px-6 bg-white flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                // router.push(`/document/${doc._id}`);
                window.open (`http://localhost:3000/document/${doc._id}`, '_ blank');
              }}
            >
              <p>{doc.name}</p>
            </div>
          ))
        ) : (
          <div className=" text-2xl md:text-4xl text-white w-full flex items-center justify-center my-6">
            No Documents...
          </div>
        )}
      </div>
      <h1 className="w-[95%] md:w-[80%] text-white text-2xl md:text-4xl font-semibold my-2">
        Shared documents
      </h1>
      <div className="w-[95%] md:w-[80%] border-b-2 border-white py-2 flex gap-4 overflow-x-scroll">
        {sharedDocuments && sharedDocuments.length > 0 ? (
          sharedDocuments.map((doc) => (
            <div
              key={doc._id}
              className="w-20 md:w-32 h-28 md:h-40 px-6 bg-white flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                // router.push(`/document/${doc._id}`);
                window.open (`http://localhost:3000/document/${doc._id}`, '_ blank');
              }}
            >
              <p>{doc.name}</p>
            </div>
          ))
        ) : (
          <div className=" text-2xl md:text-4xl text-white w-full flex items-center justify-center my-6">
            No Documents...
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
