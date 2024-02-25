"use client"
import React, { useEffect, useState } from 'react'
import Quill from "quill";
import { useSocket } from '@/app/socketContext';

const Page = ({params}) => {

  const socket = useSocket()

    const id = params.readId
    console.log(id,"1111")

    const [quill, setQuill] = useState(null);

    useEffect(() => {
      if (socket == null || quill == null) return;
  
      socket.once("load-readonly-document", async({document}) => {
        quill.setContents(document);
      });
      socket.emit("get-readonly-document", id);
    }, [socket, quill, id]);

    useEffect(() => {
        const q = new Quill("#container2", {
            readOnly: true,
            modules: {
              toolbar: null
            },
            theme: 'snow'
        });
        setQuill(q);
        // return () => {
        //   q.off("text-change");
        // };
      }, []);

  return (
    <>
    <div id='container2' className="flex items-center justify-center py-5" ></div>
    </>
  )
}

export default Page
