import React, { InputHTMLAttributes } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "bullet" }],
  ],
};

const formats = ["header", "bold", "italic", "underline", "list", "bullet"];

type TextEditorProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  value?: string;
  rows?: number;
  onValueChange?: (value: string) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  rows = 4,
  onValueChange,
  ...inputAttributes
}) => {
  const ROW_HEIGHT = 20;
  const editorHeight = `h-[${rows * ROW_HEIGHT}px]`;

  return (
    <ReactQuill
      className={editorHeight}
      placeholder={inputAttributes.placeholder}
      value={value}
      onChange={onValueChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default TextEditor;
