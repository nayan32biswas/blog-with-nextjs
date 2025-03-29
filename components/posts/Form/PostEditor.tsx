"use client";

import React from "react";
import { Descendant } from "slate";

import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PostEditor() {
  const [editorContent, setEditorContent] = React.useState<Descendant[]>();

  const [title, setTitle] = React.useState("");

  const handleSave = () => {
    console.log("Saved Content:", editorContent);
    // Send `editorContent` to the API or database
  };

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Create New Post</h1>

        <Input
          type="text"
          placeholder="Post Title"
          className="mb-4 text-2xl font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="bg-card mb-4 rounded-lg">
          <RichTextEditor onChange={setEditorContent} />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSave}>Publish</Button>
        </div>
      </div>
    </div>
  );
}
