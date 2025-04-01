"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import useStore from "@/store/useStore";

const TextEditor = () => {
    const editorRef = useRef<any>(null);
    const { editor, setEditor } = useStore();

    return (
        <div>
            <Editor
                apiKey="uy3m0g2dhyabfgdfcu3p92o8kb6wq7078f3iti3n0pimx476"
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={editor}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: "lists link image code",
                    toolbar:
                        "undo redo | formatselect | bold italic | alignleft aligncenter alignright | code",
                }}
                onEditorChange={(content) => setEditor(content)}
            />
            {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
        </div>
    );
};

export default TextEditor;
