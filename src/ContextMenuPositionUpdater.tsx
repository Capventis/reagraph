import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from 'store';
import { Vector3 } from 'three';

export const ContextMenuPositionUpdater = () => {
  const { camera, size } = useThree();
  const { position, setContextMenuScreenPosition } = useStore(s => ({
    position: s.contextMenuPortal.position,
    setContextMenuScreenPosition: s.setContextMenuScreenPosition
  }));

  useFrame(() => {
    if (
      position &&
      typeof position.x === 'number' &&
      typeof position.y === 'number'
    ) {
      const v = new Vector3(position.x, position.y);
      v.project(camera);
      const x = (v.x * 0.5 + 0.5) * size.width;
      const y = (v.y * -0.5 + 0.5) * size.height;
      setContextMenuScreenPosition({ x, y });
    }
  });

  return null;
};
