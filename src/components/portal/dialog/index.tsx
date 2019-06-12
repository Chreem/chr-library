import * as React from 'react'
import {useEffect, useRef} from "react";
import {createPortal} from 'react-dom'

export default () => {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = document.createElement('div');
    node.className = 'dialog-container';
    root.current = node;
    document.body.appendChild(node);
    return () => document.body.removeChild(node);
  }, []);

  return createPortal(
    (<div className="dialog">dialog</div>),
    root.current
  );
}