"use client";
import React, { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { useSocket } from "@/app/socketContext";
import { clerkClient, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  EmailIcon,
  EmailShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block", "link"],
];

const Page = ({ params }) => {
  const isMobile = window.innerWidth < 700;
  const router = useRouter();
  const id = params.documentId;
  const socket = useSocket();
  const { user } = useUser();
  const [owner, setOwner] = useState();
  const [name, setName] = useState();
  const [sharedWith, setSharedWith] = useState([]);
  const [quill, setQuill] = useState(null);
  const [showShare, setShowShare] = useState(isMobile ? false : true);
  const [share, setShare] = useState(false);

  const url = `http://localhost:3000/document/${id}`;
  const publicUrl = `http://localhost:3000/readOnly/${id}`;

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("handling")
      socket.emit("disconnect-user",id);
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("changed-name", (name) => {
      setName(name);
    });

    socket.on("document-not-found", () => {
      toast.error("Document not found");
      router.push("/document");
    });
  }, [socket, router]);

  useEffect(() => {
    if (!socket || !quill || !user) return;

    socket.once(
      "load-documents",
      async ({ document, owner, sharedWith, name }) => {
        quill.setContents(document);
        quill.enable();
        setOwner(owner.emailId);
        setSharedWith(sharedWith);
        setName(name);
      }
    );
    socket.emit("get-documents", {
      id,
      userId: user.id,
      emailId: user.emailAddresses[0].emailAddress,
    });
  }, [socket, quill, id, user]);

  useEffect(() => {
    if (!socket || !quill) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    const q = new Quill("#container", {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        },
      },
    });
    q.disable();
    q.setText("Loading...")
    setQuill(q);

    return () => {
      q.off("text-change");
    };
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("recieve-changes", handler);

    return () => {
      socket.off("recieve-changes", handler);
    };
  }, [socket, quill]);

  return (
    <>
      <div className="flex items-center justify-start w-screen h-screen relative">
        <div
          className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center gap-8 py-3 px-6 rounded-lg"
          style={{
            display: share ? "" : "none",
          }}
        >
          <h1 className="text-3xl">Share your link to:</h1>
          <div className="flex items-center justify-center gap-3">
            <WhatsappShareButton url={url} title="Docx Invitation">
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <EmailShareButton url={url} title="Docx Invitation">
              <EmailIcon size={40} round={true} />
            </EmailShareButton>
            <FacebookMessengerShareButton url={url} title="Docx Invitation">
              <FacebookMessengerIcon size={40} round={true} />
            </FacebookMessengerShareButton>
            <Image src="/copy.svg" width={40} height={40} className="cursor-pointer" onClick={() => {
                navigator.clipboard.writeText(url);
                toast.success("Copied to clipboard!");
                setShare((show) => !show);
            }} />
          </div>
        </div>
        <div
          className="w-8 h-8 bg-white rounded-full absolute bottom-16 right-2 z-50 flex items-center justify-center"
          style={{
            display: isMobile ? "" : "none",
          }}
          onClick={() => setShowShare((show) => !show)}
        >
          <Image src="/share.svg" width={20} height={20} />
        </div>
        <div
          className="share h-screen w-screen md:w-[25vw] bg-black border-r-2 border-r-white border-t-2 border-t-white flex flex-col justify-between"
          style={{
            display: showShare ? "" : "none",
          }}
        >
          <div className="text-white w-full px-4 py-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => socket.emit("name-change", name)}
              className="bg-transparent text-4xl mb-5 w-full"
            />
            <h1 className="text-3xl font-semibold my-3">Owner:</h1>
            {owner && <p>{owner}</p>}
            <h1 className="text-3xl font-semibold my-3">Shared with:</h1>
            {sharedWith.map((a, index) => (
              <p key={index}>{a.emailId}</p>
            ))}
          </div>
          <div className="flex flex-col mb-20">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => {
                navigator.clipboard.writeText(publicUrl);
                toast.success("Copied public link to clipboard!");
              }}
            >
              Copy Public Link
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => setShare((show) => !show)}
            >
              Share
            </button>
          </div>
        </div>
        <div className="bg-black h-screen overflow-y-scroll overflow-x-hidden">
          <div
            id="container"
            className="border-none flex items-center justify-center w-screen md:w-[75vw]"
          ></div>
        </div>
      </div>
    </>
  );
};

export default Page;
