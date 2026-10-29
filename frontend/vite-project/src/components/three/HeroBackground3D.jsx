import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroBackground3D
 * An ambient, interactive 3D neural constellation and particle network
 * that reacts smoothly to cursor movement and provides depth to the Hero section.
 */
const HeroBackground3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Neural Constellation Network ---
    const particleCount = 75;
    const maxDistance = 45;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    const bounds = { x: 140, y: 80, z: 70 };

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * bounds.x * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      velocities.push({
        x: (Math.random() - 0.5) * 0.12,
        y: (Math.random() - 0.5) * 0.12,
        z: (Math.random() - 0.5) * 0.08,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Circular glowing particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(59, 130, 246, 1)");
    gradient.addColorStop(0.3, "rgba(99, 102, 241, 0.7)");
    gradient.addColorStop(0.7, "rgba(14, 165, 233, 0.2)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Dynamic Connection Lines
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Floating 3D Micro Polyhedra (representing AI knowledge gems drifting in space)
    const polyGroup = new THREE.Group();
    const polyGeometries = [
      new THREE.IcosahedronGeometry(2.5, 0),
      new THREE.OctahedronGeometry(2, 0),
      new THREE.TetrahedronGeometry(2.2, 0),
    ];
    const polyMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const floatingNodes = [];
    for (let i = 0; i < 9; i++) {
      const geo = polyGeometries[i % polyGeometries.length];
      const mesh = new THREE.Mesh(geo, polyMaterial.clone());
      mesh.position.set(
        (Math.random() - 0.5) * bounds.x * 1.6,
        (Math.random() - 0.5) * bounds.y * 1.6,
        (Math.random() - 0.5) * bounds.z
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        floatSpeed: 0.5 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y,
      };
      polyGroup.add(mesh);
      floatingNodes.push(mesh);
    }
    scene.add(polyGroup);

    // --- Mouse Parallax & Movement ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 22;
      targetMouseY = y * 14;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // --- Window Resize ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      camera.position.x = currentMouseX;
      camera.position.y = currentMouseY;
      camera.lookAt(0, 0, 0);

      // Rotate whole constellation slowly
      scene.rotation.y = elapsedTime * 0.03;
      scene.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Update particle positions & bounce inside boundary
      const posAttr = particleGeometry.attributes.position;
      const pArr = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pArr[i3] += velocities[i].x;
        pArr[i3 + 1] += velocities[i].y;
        pArr[i3 + 2] += velocities[i].z;

        if (Math.abs(pArr[i3]) > bounds.x) velocities[i].x *= -1;
        if (Math.abs(pArr[i3 + 1]) > bounds.y) velocities[i].y *= -1;
        if (Math.abs(pArr[i3 + 2]) > bounds.z) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Update dynamic lines between close nodes
      let lineVertexIndex = 0;
      let colorIndex = 0;

      const baseLineColorA = new THREE.Color(0x38bdf8); // sky-400
      const baseLineColorB = new THREE.Color(0x6366f1); // indigo-500

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;

          const dx = pArr[i3] - pArr[j3];
          const dy = pArr[i3 + 1] - pArr[j3 + 1];
          const dz = pArr[i3 + 2] - pArr[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const alpha = 1 - Math.sqrt(distSq) / maxDistance;

            // Point 1
            linePositions[lineVertexIndex++] = pArr[i3];
            linePositions[lineVertexIndex++] = pArr[i3 + 1];
            linePositions[lineVertexIndex++] = pArr[i3 + 2];

            // Point 2
            linePositions[lineVertexIndex++] = pArr[j3];
            linePositions[lineVertexIndex++] = pArr[j3 + 1];
            linePositions[lineVertexIndex++] = pArr[j3 + 2];

            // Lerp color
            const c = baseLineColorA.clone().lerp(baseLineColorB, alpha * 0.7);
            const intensity = alpha * 0.7;

            lineColors[colorIndex++] = c.r * intensity;
            lineColors[colorIndex++] = c.g * intensity;
            lineColors[colorIndex++] = c.b * intensity;

            lineColors[colorIndex++] = c.r * intensity;
            lineColors[colorIndex++] = c.g * intensity;
            lineColors[colorIndex++] = c.b * intensity;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Animate floating polyhedra
      floatingNodes.forEach((node) => {
        node.rotation.x += node.userData.rotSpeedX;
        node.rotation.y += node.userData.rotSpeedY;
        node.position.y =
          node.userData.baseY +
          Math.sin(elapsedTime * node.userData.floatSpeed + node.userData.floatOffset) * 4;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      polyGeometries.forEach((g) => g.dispose());
      polyMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: 0.95 }}
    />
  );
};

export default HeroBackground3D;
