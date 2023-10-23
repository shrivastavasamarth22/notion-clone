"use client";

import "@blocknote/core/style.css";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

import { useEdgeStore } from "@/lib/edgestore";
import { useTheme } from "next-themes";

interface EditorProps {
    initialContent?: string;
    onChange: (value: string) => void;
    editable?: boolean;
}

export const Editor = ({ initialContent, onChange, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const {edgestore} = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })

        return response.url
    }

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
        uploadFile: handleUpload
    });

    return (
        <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
    );
};
