import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from './store';

// Utility to get the screen position of a DOM element
function getAnchorScreenPosition(ref: HTMLElement | null) {
  if (!ref) return null;
  const rect = ref.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

export const PortalAnchor = () => {
  const { content, ref, position } = useStore(s => s.contextMenuPortal);
  console.log(content, ref, position);
  let screenPos: { x: number; y: number } | null = null;

  if (
    position &&
    typeof position.x === 'number' &&
    typeof position.y === 'number'
  ) {
    screenPos = position;
  } else if (ref instanceof HTMLElement) {
    screenPos = getAnchorScreenPosition(ref);
  }

  if (!content || !screenPos) return null;

  console.log('creating portal at', screenPos);

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: screenPos.x,
        top: screenPos.y,
        zIndex: 9999,
        pointerEvents: 'auto',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {content}
    </div>,
    document.body
  );
};
