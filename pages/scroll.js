import React, { useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";

export default function scroll() {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  const list = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="h-28">
    <ScrollableFeed className="flex flex-col-reverse">
      <div ref={messagesEndRef} />

      {list.map((value) => {
        return <h1>{value}</h1>;
      })}
    </ScrollableFeed>
    </div>
  );
}
