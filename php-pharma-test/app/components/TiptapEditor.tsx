"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useCallback, useState } from "react";
import "./tiptap.css";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Write your content here...",
  onImageUpload,
}: TiptapEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const colors = [
    "#000000", // Black
    "#ffffff", // White
    "#dc2626", // Red
    "#ea580c", // Orange
    "#ca8a04", // Yellow
    "#16a34a", // Green
    "#0284c7", // Blue
    "#9333ea", // Purple
    "#db2777", // Pink
    "#64748b", // Gray
  ];

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && editor) {
        try {
          setIsUploadingImage(true);
          if (onImageUpload) {
            // Use custom upload handler if provided
            const url = await onImageUpload(file);
            editor.chain().focus().setImage({ src: url }).run();
          } else {
            // Fallback to data URL
            const reader = new FileReader();
            reader.onload = (event) => {
              const url = event.target?.result as string;
              editor.chain().focus().setImage({ src: url }).run();
            };
            reader.readAsDataURL(file);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload image");
        } finally {
          setIsUploadingImage(false);
        }
      }
    };
    input.click();
  }, [editor, onImageUpload]);

  const setColor = useCallback(
    (color: string) => {
      if (editor) {
        editor.chain().focus().setColor(color).run();
        setSelectedColor(color);
        setShowColorPicker(false);
      }
    },
    [editor]
  );

  const unsetColor = useCallback(() => {
    if (editor) {
      editor.chain().focus().unsetColor().run();
      setShowColorPicker(false);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-300 p-2 flex flex-wrap gap-1 shadow-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded hover:bg-blue-50 font-bold text-gray-700 border transition-colors ${
            editor.isActive("bold")
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded hover:bg-blue-50 italic text-gray-700 border transition-colors ${
            editor.isActive("italic")
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 rounded hover:bg-blue-50 line-through text-gray-700 border transition-colors ${
            editor.isActive("strike")
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          S
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-1.5 rounded hover:bg-blue-50 text-gray-700 border transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1.5 rounded hover:bg-blue-50 text-gray-700 border transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-3 py-1.5 rounded hover:bg-blue-50 text-gray-700 border transition-colors ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          H3
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded hover:bg-blue-50 text-gray-700 border transition-colors ${
            editor.isActive("bulletList")
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded hover:bg-blue-50 text-gray-700 border transition-colors ${
            editor.isActive("orderedList")
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 rounded hover:bg-blue-50 text-gray-700 border transition-colors ${
            editor.isActive("blockquote")
              ? "bg-blue-100 border-blue-300"
              : "border-transparent"
          }`}
        >
          Quote
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        {/* Text Color Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="px-3 py-1.5 rounded hover:bg-blue-50 flex items-center gap-1 text-gray-700 border border-transparent"
          >
            <span>A</span>
            <div
              className="w-4 h-0.5 rounded"
              style={{ backgroundColor: selectedColor }}
            ></div>
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10">
              <div className="grid grid-cols-5 gap-2 mb-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setColor(color)}
                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <div className="border-t border-gray-200 pt-2 space-y-2">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-8 rounded cursor-pointer"
                />
                <button
                  type="button"
                  onClick={unsetColor}
                  className="w-full px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Reset Color
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-1.5 rounded hover:bg-blue-50 text-gray-700 border border-transparent"
          title="Add image from URL"
        >
          🔗 URL
        </button>
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={isUploadingImage}
          className="px-3 py-1.5 rounded hover:bg-blue-50 disabled:opacity-50 text-gray-700 border border-transparent"
          title="Upload image file"
        >
          {isUploadingImage ? "⏳" : "📤"} Upload
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1.5 rounded hover:bg-blue-50 disabled:opacity-50 text-gray-700 border border-transparent"
        >
          ↶ Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1.5 rounded hover:bg-blue-50 disabled:opacity-50 text-gray-700 border border-transparent"
        >
          ↷ Redo
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
