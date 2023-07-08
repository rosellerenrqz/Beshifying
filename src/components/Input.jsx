import React, { useState, useRef, useEffect } from "react";

const Input = () => {
  const [text, setText] = useState("");
  const [hasText, setHasText] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const textRef = useRef(null);

  const textHandler = (e) => {
    const inputVal = e.target.value;
    const modifiedText = inputVal.split(" ").join("🤸");
    setText(modifiedText);
    setHasText(inputVal !== "");
  };

  const blurHandler = () => {
    if (!hasText) {
      setHasText(false);
    }
  };

  const handleHighlight = () => {
    if (textRef.current) {
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const copyHandler = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);

  return (
    <>
      <div className="bg-white mt-40 p-7 text-center rounded-xl mx-auto max-w-sm sm:max-w-1xl md:max-w-2xl lg:max-w-4xl shadow-lg">
        <div className="font-bold text-2xl sm:text-2xl lg:text-4xl md md:text-2xl mb-4">
          🌟 Start Beshifying... 🌟
        </div>
        <input
          type="text"
          placeholder="Input Beshifying Words"
          onChange={textHandler}
          onBlur={blurHandler}
          className="p-2 w-full md:w-2/4 border-b-2"
        />
        <div
          ref={textRef}
          className="mt-10 cursor-text select-all"
          onClick={handleHighlight}>
          {text}
        </div>
        {hasText && (
          <div className="flex flex-col md:flex-row justify-center items-center mt-5 space-y-3 md:space-y-0 md:space-x-3">
            <button
              className="px-4 py-1 text-white rounded-xl bg-blue-500 hover:bg-blue-400 active:bg-blue-300"
              onClick={handleHighlight}>
              Highlight
            </button>

            <button
              className="px-4 py-1 text-white rounded-xl bg-blue-500 hover:bg-blue-400 active:bg-blue-300"
              onClick={copyHandler}>
              {isCopied ? "Beshyfied!!!" : "Copy"}
            </button>
          </div>
        )}
        <div className="text-sm font-medium mt-10 mb-4 sm:text-base">
          Developed by{" "}
          <a
            href="https://www.facebook.com/enriquez.roseller/"
            target="blank"
            className="text-blue-700 underline">
            Roseller Enriquez Jr
          </a>
        </div>
      </div>
    </>
  );
};

export default Input;
