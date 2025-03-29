import { css } from "@emotion/css";

export const editorStyles = css`
  /* Reset the container context */
  all: initial;
  display: block;
  box-sizing: border-box;

  /* Establish a new styling context */
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333;
  line-height: 1.5;

  /* Container presentation */
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 18px;
  background: white;

  /* Reset specific elements that Slate will use */
  & p {
    display: block;
    margin: 0 0 1em 0;
    padding: 0;
  }

  & h1 {
    display: block;
    font-size: 2em;
    font-weight: bold;
    margin: 0.67em 0;
  }

  & h2 {
    display: block;
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.83em 0;
  }

  & strong,
  & b {
    font-weight: bold;
  }

  & em,
  & i {
    font-style: italic;
  }

  & u {
    text-decoration: underline;
  }

  & ul {
    display: block;
    list-style-type: disc;
    margin: 1em 0;
    padding-left: 40px;
  }

  & ol {
    display: block;
    list-style-type: decimal;
    margin: 1em 0;
    padding-left: 40px;
  }

  & li {
    display: list-item;
  }

  & blockquote {
    display: block;
    margin: 1em 0;
    padding-left: 1em;
    border-left: 3px solid #ddd;
  }

  & code {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
  }

  & pre {
    white-space: pre-wrap;
    margin: 1em 0;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 3px;
  }

  /* Ensure the editor toolbars are styled correctly */
  & .toolbar {
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  & .toolbar button {
    background: #f3f3f3;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 14px;
  }

  & .toolbar button:hover {
    background: #e9e9e9;
  }

  & .toolbar button.active {
    background: #ddd;
  }

  /* Ensure links maintain styling */
  & a {
    color: #0074d9;
    text-decoration: underline;
    cursor: pointer;
  }

  /* Style the editable area */
  & [data-slate-editor] {
    outline: none;
    min-height: 150px;
  }

  html,
  input,
  textarea {
    font-family: "Roboto", sans-serif;
    line-height: 1.4;
    background: #eee;
  }

  body {
    margin: 0;
  }

  p {
    margin: 0;
  }

  pre {
    padding: 10px;
    background-color: #eee;
    white-space: pre-wrap;
  }

  :not(pre) > code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
  }

  img {
    max-width: 100%;
    max-height: 20em;
  }

  blockquote {
    border-left: 2px solid #ddd;
    margin-left: 0;
    margin-right: 0;
    padding-left: 10px;
    color: #aaa;
    font-style: italic;
  }

  blockquote[dir="rtl"] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #ddd;
  }

  table {
    border-collapse: collapse;
  }

  td {
    padding: 10px;
    border: 2px solid #ddd;
  }

  input {
    box-sizing: border-box;
    font-size: 0.85em;
    width: 100%;
    padding: 0.5em;
    border: 2px solid #ddd;
    background: #fafafa;
  }

  input:focus {
    outline: 0;
    border-color: blue;
  }

  iframe {
    width: 100%;
    border: 1px solid #eee;
  }

  [data-slate-editor] > * + * {
    margin-top: 1em;
  }

  .fancy {
    background-color: rgb(218, 225, 255);
    padding: 40px;
    font-size: 20px;
    min-height: 150px;
    outline: 3px dashed rgb(0, 94, 128);
    border-radius: 20px;
    outline-offset: -20px;
    white-space: pre-wrap;
  }
`;
