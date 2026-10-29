import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  FaRotate,
  FaBolt,
  FaBrain,
  FaCompass,
} from "react-icons/fa6";

const NODES_DATA = [
  {
    id: "gemini",
    name: "Gemini 1.5 AI",
    color: "#2563eb",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    icon: "✨",
    desc: "Dynamically synthesizes step-by-step personalized roadmaps",
    angleOffset: 0,
    radius: 42,
    yOffset: 6,
  },
  {
    id: "neural",
    name: "Neural Networks",
    color: "#06b6d4",
    textColor: "text-cyan-600",
    bgColor: "bg-cyan-50 border-cyan-200",
    icon: "🧠",
    desc: "Backpropagation, perceptrons, activations & architectures",
    angleOffset: (Math.PI * 2) / 6,
    radius: 44,
    yOffset: -10,
  },
  {
    id: "llm",
    name: "LLMs & RAG",
    color: "#8b5cf6",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    icon: "⚡",
    desc: "Attention mechanisms, vector retrieval & context memory",
    angleOffset: (Math.PI * 4) / 6,
    radius: 41,
    yOffset: 12,
  },
  {
    id: "pytorch",
    name: "PyTorch & Python",
    color: "#f97316",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    icon: "🔥",
    desc: "Tensors, autograd, GPU acceleration & deep learning pipelines",
    angleOffset: (Math.PI * 6) / 6,
    radius: 45,
    yOffset: -6,
  },
  {
    id: "agents",
    name: "Autonomous Agents",
    color: "#10b981",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
    icon: "🤖",
    desc: "Goal formulation, tool calling, memory & task execution",
    angleOffset: (Math.PI * 8) / 6,
    radius: 43,
    yOffset: 10,
  },
  {
    id: "algo",
    name: "Smart Quizzes",
    color: "#ec4899",
    textColor: "text-pink-600",
    bgColor: "bg-pink-50 border-pink-200",
    icon: "🎯",
    desc: "Dynamic question generators with automated scoring & feedback",
    angleOffset: (Math.PI * 10) / 6,
    radius: 46,
    yOffset: -12,
  },
];

const AICore3D = () => {
  const mountRef = useRef(null);
  const [activeNode, setActiveNode] = useState(NODES_DATA[0]);
  const [nodePositions, setNodePositions] = useState([]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isPulseBoost, setIsPulseBoost] = useState(false);
  const isInteractingRef = useRef(false);
  const autoRotateRef = useRef(true);
  const pulseBoostRef = useRef(false);

  useEffect(() => {
    autoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  useEffect(() => {
    pulseBoostRef.current = isPulseBoost;
  }, [isPulseBoost]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 480;
    let height = container.clientHeight || 480;

    // --- Three.js Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 115);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(50, 40, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6366f1, 2.0);
    dirLight2.position.set(-50, -30, -30);
    scene.add(dirLight2);

    const coreLight = new THREE.PointLight(0x3b82f6, 3, 70);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // --- Core Master Group ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Pulsing Icosahedron (Inner Energy Heart)
    const innerGeo = new THREE.IcosahedronGeometry(13, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Outer Wireframe Geodesic Shell
    const outerGeo = new THREE.IcosahedronGeometry(18, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerWire = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerWire);

    // 3. Floating Micro-Dodecahedron Shell
    const d製品Geo = new THREE.DodecahedronGeometry(22, 0);
    const d製品Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const d製品Mesh = new THREE.Mesh(d製品Geo, d製品Mat);
    coreGroup.add(d製品Mesh);

    // 4. Orbital Glowing Particle Rings
    const createRing = (radius, tube, color, rotX, rotZ) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 8, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        wireframe: true,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.z = rotZ;
      return ringMesh;
    };

    const ring1 = createRing(30, 0.35, 0x38bdf8, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(35, 0.3, 0x818cf8, -Math.PI / 4, -Math.PI / 5);
    coreGroup.add(ring1);
    coreGroup.add(ring2);

    // 5. Surrounding Cosmic Stardust Cloud
    const dustCount = 180;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const c1 = new THREE.Color(0x38bdf8);
    const c2 = new THREE.Color(0x818cf8);
    const c3 = new THREE.Color(0x34d399);

    for (let i = 0; i < dustCount; i++) {
      const r = 26 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? c1 : Math.random() > 0.3 ? c2 : c3;
      dustColors[i * 3] = chosenColor.r;
      dustColors[i * 3 + 1] = chosenColor.g;
      dustColors[i * 3 + 2] = chosenColor.b;
    }

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const dustSystem = new THREE.Points(dustGeo, dustMat);
    coreGroup.add(dustSystem);

    // 6. Interactive 3D Nodes (Meshes with lines connected to center)
    const nodeMeshes = [];
    const lineMeshes = [];

    const sphereGeo = new THREE.SphereGeometry(2.4, 16, 16);

    NODES_DATA.forEach((n) => {
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(n.color),
        emissive: new THREE.Color(n.color),
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.5,
      });

      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      coreGroup.add(sphereMesh);
      nodeMeshes.push({ mesh: sphereMesh, data: n });

      // Connecting laser beam to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(n.color),
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      coreGroup.add(line);
      lineMeshes.push(line);
    });

    // --- Interactive Mouse Drag & Pointer Tracking ---
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    let targetRotation = { x: 0.2, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      isInteractingRef.current = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      dragVelocity.x = deltaX * 0.006;
      dragVelocity.y = deltaY * 0.006;

      targetRotation.y += dragVelocity.x;
      targetRotation.x += dragVelocity.y;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
      setTimeout(() => {
        isInteractingRef.current = false;
      }, 1000);
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Pulsing effect
      const pulseMultiplier = pulseBoostRef.current ? 1.4 : 1.0;
      const pulse = 1 + Math.sin(time * 3) * 0.08 * pulseMultiplier;
      innerCore.scale.set(pulse, pulse, pulse);
      outerWire.scale.set(1 + Math.sin(time * 2) * 0.04, 1 + Math.sin(time * 2) * 0.04, 1 + Math.sin(time * 2) * 0.04);

      // Rotations
      ring1.rotation.y = time * 0.6;
      ring2.rotation.y = -time * 0.5;
      dustSystem.rotation.y = time * 0.05;
      d製品Mesh.rotation.x = time * 0.15;
      d製品Mesh.rotation.y = time * 0.2;

      // Auto rotation when not dragging
      if (autoRotateRef.current && !isInteractingRef.current) {
        targetRotation.y += 0.006;
        targetRotation.x = 0.2 + Math.sin(time * 0.4) * 0.1;
      }

      // Smooth damping interpolation
      coreGroup.rotation.y += (targetRotation.y - coreGroup.rotation.y) * 0.08;
      coreGroup.rotation.x += (targetRotation.x - coreGroup.rotation.x) * 0.08;

      // Position each knowledge node in orbital path
      const screenCoords = [];

      nodeMeshes.forEach((item, idx) => {
        const { mesh, data } = item;
        const currentAngle = data.angleOffset + time * 0.35;
        const x = Math.cos(currentAngle) * data.radius;
        const z = Math.sin(currentAngle) * data.radius;
        const y = data.yOffset + Math.sin(time * 1.5 + idx) * 3;

        mesh.position.set(x, y, z);

        // Update connecting laser
        const line = lineMeshes[idx];
        const linePos = line.geometry.attributes.position.array;
        linePos[3] = x * 0.88;
        linePos[4] = y * 0.88;
        linePos[5] = z * 0.88;
        line.geometry.attributes.position.needsUpdate = true;

        // Project 3D coordinate to 2D screen coordinate for HTML Overlay
        mesh.getWorldPosition(tempVec);
        tempVec.project(camera);

        const screenX = ((tempVec.x + 1) * width) / 2;
        const screenY = ((-tempVec.y + 1) * height) / 2;
        const isVisible = tempVec.z < 1.0;

        screenCoords.push({
          id: data.id,
          name: data.name,
          color: data.color,
          icon: data.icon,
          x: screenX,
          y: screenY,
          depth: tempVec.z,
          visible: isVisible,
          data: data,
        });
      });

      setNodePositions(screenCoords);

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      d製品Geo.dispose();
      d製品Mat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      sphereGeo.dispose();
      nodeMeshes.forEach((item) => item.mesh.material.dispose());
      lineMeshes.forEach((l) => {
        l.geometry.dispose();
        l.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[510px] rounded-3xl bg-slate-900/95 border border-slate-700/80 shadow-2xl overflow-hidden select-none">
      {/* Dynamic 3D Glow Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-8 w-44 h-44 bg-cyan-400/15 blur-2xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-8 w-44 h-44 bg-indigo-500/15 blur-2xl rounded-full pointer-events-none" />

      {/* Top Header Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/60 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-xs font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
            <FaBrain className="text-cyan-400" />
            <span>AI Knowledge Matrix</span>
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
            Three.js 3D
          </span>
        </div>

        {/* Quick Interaction Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            title={isAutoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
            className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer ${
              isAutoRotate
                ? "bg-blue-600/40 text-blue-300 border-blue-500/50 shadow-xs"
                : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white"
            }`}
          >
            <FaRotate className={isAutoRotate ? "animate-spin" : ""} style={{ animationDuration: "6s" }} />
          </button>

          <button
            onClick={() => {
              setIsPulseBoost(true);
              setTimeout(() => setIsPulseBoost(false), 1200);
            }}
            title="Energy Pulse Boost"
            className={`p-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer ${
              isPulseBoost
                ? "bg-emerald-500/40 text-emerald-300 border-emerald-400 shadow-lg shadow-emerald-500/30 scale-105"
                : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white"
            }`}
          >
            <FaBolt className={isPulseBoost ? "text-emerald-400" : ""} />
          </button>
        </div>
      </div>

      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating 3D Node Badges synced with real-time 3D projected coordinates */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {nodePositions.map((node) => {
          if (!node.visible) return null;
          // Scale down labels that are in the background for depth illusion
          const scale = Math.max(0.72, Math.min(1.05, 1.15 - (node.depth + 1) * 0.2));
          const opacity = Math.max(0.45, Math.min(1, 1.2 - (node.depth + 1) * 0.3));
          const isSelected = activeNode?.id === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.data)}
              style={{
                transform: `translate(${node.x}px, ${node.y}px) translate(-50%, -50%) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.round((1 - node.depth) * 50) + 10,
              }}
              className={`absolute pointer-events-auto transition-transform duration-75 group cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md shadow-lg border ${
                isSelected
                  ? "bg-white text-slate-900 border-cyan-400 shadow-cyan-500/30 ring-2 ring-cyan-400/50"
                  : "bg-slate-800/90 text-slate-200 border-slate-600/70 hover:bg-slate-700 hover:border-slate-400"
              }`}
            >
              <span className="text-xs">{node.icon}</span>
              <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
                {node.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Drawer / Info Banner */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
        {activeNode && (
          <div className="p-3.5 rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 shadow-sm"
                style={{ backgroundColor: `${activeNode.color}25`, color: activeNode.color }}
              >
                {activeNode.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {activeNode.name}
                  </h4>
                  <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    Active Track
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {activeNode.desc}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-700">
                Drag to 3D Orbit ✦
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-50">
        <span className="text-[10px] font-medium text-slate-400 tracking-wider flex items-center gap-1">
          <FaCompass size={10} />
          Hold & drag to explore in 3D
        </span>
      </div>
    </div>
  );
};

export default AICore3D;
