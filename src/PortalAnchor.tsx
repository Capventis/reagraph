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
  const { contextMenuPortal, contextMenuScreenPosition } = useStore(state => ({
    contextMenuPortal: state.contextMenuPortal,
    contextMenuScreenPosition: state.contextMenuScreenPosition
  }));

  if (
    !contextMenuPortal ||
    !contextMenuPortal.content ||
    !contextMenuScreenPosition
  ) {
    return null;
  }

  const { x, y } = contextMenuScreenPosition;

  if (!contextMenuPortal.content || !contextMenuScreenPosition) return null;

  console.log(
    'creating portal at',
    contextMenuScreenPosition,
    contextMenuPortal
  );

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 9999,
        pointerEvents: 'auto',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {contextMenuPortal.content}
    </div>,
    document.body
  );
};
