import React from "react";
import { Quill } from "react-quill";
import Delta from "quill-delta";
import { GrCopy, GrCut } from "react-icons/gr";
import { MdContentPasteOff, MdContentPaste } from "react-icons/md";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}
function copyText() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = selectedText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
}

function cutText() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = selectedText;
    dummy.select();
    document.execCommand("cut");
    document.body.removeChild(dummy);
  }
}
function pasteWithoutFormat() {
  // document.execCommand(
  //   "insertText",
  //   false,
  //   clipboardData.getData("text/plain")
  // );
}

function pasteText(e) {
  // document.execCommand("insertHTML", false, clipboardData.getData("text/html"));
  // console.log(navigator.clipboard.readText());
  navigator.clipboard.readText().then((text) => {
    this.quill.clipboard.insertText(this.quill.getSelection().index, text);
  });
}

const Size = Quill.import("formats/size");
Size.whitelist = ["8", "9", "13", "14"];
Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "Inter",
  "lucida",
];
Quill.register(Font, true);

export const modules = (props) => ({
  toolbar: {
    container: "#" + props,
    handlers: {
      undo: undoChange,
      redo: redoChange,
      copy: copyText,
      cut: cutText,
      paste: pasteText,
      pasteWithoutFormat: pasteWithoutFormat,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = (props) => {
  return (
    <>
      {props.toolbarId !== undefined && (
        <div id={props.toolbarId}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <select className="ql-font">
              <option value="arial"> Arial </option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
              <option value="helvetica">Helvetica</option>
              <option value="Inter" selected>
                Inter
              </option>
              <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size">
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="13" selected>
                13
              </option>
              <option value="14">14</option>
            </select>
            <select className="ql-header">
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
              <option value="4">Heading 4</option>
              <option value="5">Heading 5</option>
              <option value="6">Heading 6</option>
              <option value="" selected>
                Normal
              </option>
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button className="ql-direction" />
          </span>
          <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
          <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block" />
            <button className="ql-clean" />
          </span>
          <span className="ql-formats">
            <button className="ql-undo">
              <CustomUndo />
            </button>
            <button className="ql-redo">
              <CustomRedo />
            </button>
          </span>
          <span className="ql-formats">
            <button className="ql-copy">
              <GrCopy />
            </button>
            <button className="ql-cut">
              <GrCut></GrCut>
            </button>
            <button className="ql-paste">
              <MdContentPaste />
            </button>
            <button className="ql-paste-without-format">
              <MdContentPasteOff />
            </button>
          </span>
        </div>
      )}
    </>
  );
};
export default QuillToolbar;
