import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  Sun,
  Layers,
  RotateCw,
  Compass,
  Volume2,
  Sparkles,
  Maximize2,
  Sliders,
  CheckCircle2,
  Info,
  MapPin,
  Eye
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { MANUSCRIPTS } from "../../data/viewer";
import { loadManuscripts } from "../../services/contentDb";
import { speakWithFallback } from "../../services/speech";
import { toIAST } from "../../services/sanskrit";

// Physical Substrate Material presets for Three.js
const SUBSTRATES = {
  talapatra: {
    id: "talapatra",
    label: "Tālapatra (Palm Leaf)",
    labelHi: "ताडपत्रम् (ताड़ का पत्ता)",
    roughness: 0.78,
    metalness: 0.04,
    color: 0xd4b26f,
    edgeColor: 0x6e5229,
    width: 3.4,
    height: 0.06,
    depth: 0.42,
    hasCordHole: true
  },
  bhurjapatra: {
    id: "bhurjapatra",
    label: "Bhūrjapatra (Birch Bark)",
    labelHi: "भूर्जपत्रम् (भोजपत्र)",
    roughness: 0.88,
    metalness: 0.02,
    color: 0xc9a475,
    edgeColor: 0x543c1c,
    width: 3.2,
    height: 0.04,
    depth: 0.52,
    hasCordHole: false
  },
  tamrashasana: {
    id: "tamrashasana",
    label: "Tāmra-śāsana (Copper Plate)",
    labelHi: "ताम्रशासनम् (तांबे की पट्टिका)",
    roughness: 0.32,
    metalness: 0.88,
    color: 0xbd6d40,
    edgeColor: 0x2e6b54, // Verdigris oxidation
    width: 3.0,
    height: 0.08,
    depth: 0.65,
    hasCordHole: true
  }
};

// Hotspot metadata anchors
const HOTSPOTS = [
  {
    id: "h1",
    label: "Maṅgalācaraṇa (Auspicious Invocation)",
    desc: "Opening invocation dedicated to Agni or the lineage deity, written in archaic Grantha / early Nāgarī ligatures.",
    pos: [-1.1, 0.12, 0],
    pinPos: { x: "22%", y: "45%" }
  },
  {
    id: "h2",
    label: "Bhedam (Binding Cord Piercing)",
    desc: "Central circular perforation where the sūtra cord was threaded to bind 200+ folios between wooden protective covers (kavatacāla).",
    pos: [0, 0.12, 0],
    pinPos: { x: "50%", y: "45%" }
  },
  {
    id: "h3",
    label: "Colophon & Scribe Marker",
    desc: "Metrical closing indicating the scribe's scriptorium, the Saka era date, and protective shloka against ink-smear.",
    pos: [1.1, 0.12, 0],
    pinPos: { x: "78%", y: "45%" }
  }
];

function Manuscript3DCanvas({
  manuscript,
  substrateKey,
  isRakingLight,
  rakingAzimuth,
  rakingElevation,
  isFlipped,
  hasCordBound,
  activeHotspot,
  setActiveHotspot,
  isDark
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rakingLightRef = useRef(null);
  const leafGroupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x0f131a : 0xf4f1eb);

    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.0;
    controls.maxDistance = 8.0;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, isRakingLight ? 0.2 : 0.65);
    scene.add(ambientLight);

    // Main Studio Light
    const studioLight = new THREE.DirectionalLight(0xffffff, isRakingLight ? 0.3 : 1.2);
    studioLight.position.set(2, 4, 3);
    studioLight.castShadow = true;
    scene.add(studioLight);

    // Raking Light Torch (Oblique angle to expose incised stylus grooves)
    const rakingLight = new THREE.DirectionalLight(0xffeedd, isRakingLight ? 3.0 : 0.0);
    rakingLight.castShadow = true;
    rakingLight.shadow.mapSize.width = 1024;
    rakingLight.shadow.mapSize.height = 1024;
    scene.add(rakingLight);
    rakingLightRef.current = rakingLight;

    // Build Artifact Mesh
    const sub = SUBSTRATES[substrateKey] || SUBSTRATES.talapatra;
    const leafGroup = new THREE.Group();
    leafGroupRef.current = leafGroup;

    // Substrate body
    const leafGeo = new THREE.BoxGeometry(sub.width, sub.height, sub.depth);
    const leafMat = new THREE.MeshStandardMaterial({
      color: sub.color,
      roughness: sub.roughness,
      metalness: sub.metalness
    });
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.castShadow = true;
    leaf.receiveShadow = true;
    leafGroup.add(leaf);

    // Weathered Organic Border / Beaten Lip
    const borderGeo = new THREE.BoxGeometry(sub.width + 0.03, sub.height * 0.9, sub.depth + 0.03);
    const borderMat = new THREE.MeshStandardMaterial({
      color: sub.edgeColor,
      roughness: 0.9,
      metalness: sub.metalness * 0.5
    });
    const border = new THREE.Mesh(borderGeo, borderMat);
    border.position.y = -0.005;
    leafGroup.add(border);

    // Central Bhedam (Cord Hole)
    if (sub.hasCordHole) {
      const holeGeo = new THREE.CylinderGeometry(0.04, 0.04, sub.height + 0.02, 16);
      const holeMat = new THREE.MeshStandardMaterial({ color: 0x221a10, roughness: 0.95 });
      const holeMesh = new THREE.Mesh(holeGeo, holeMat);
      leafGroup.add(holeMesh);

      // Threaded Sūtra Cord
      if (hasCordBound) {
        const cordGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8);
        const cordMat = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.8 });
        const cord = new THREE.Mesh(cordGeo, cordMat);
        cord.rotation.x = Math.PI / 4;
        cord.position.set(0, 0.15, 0.05);
        leafGroup.add(cord);
      }
    }

    // High-Resolution Devanagari / Grantha Surface Canvas
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 1024;
    textCanvas.height = 128;
    const ctx = textCanvas.getContext("2d");

    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, 1024, 128);

    ctx.fillStyle = substrateKey === "tamrashasana" ? "#3b1e08" : "#2a1e12";
    ctx.font = 'bold 34px "Noto Sans Devanagari", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const displayVerse =
      manuscript.transcription.length > 56
        ? manuscript.transcription.slice(0, 56) + "…"
        : manuscript.transcription;
    ctx.fillText(displayVerse, 512, 64);

    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.needsUpdate = true;
    const textMat = new THREE.MeshStandardMaterial({
      map: textTexture,
      transparent: true,
      roughness: 0.4,
      metalness: 0.1
    });

    const textPlaneGeo = new THREE.PlaneGeometry(sub.width * 0.92, sub.depth * 0.7);
    const textPlane = new THREE.Mesh(textPlaneGeo, textMat);
    textPlane.rotation.x = -Math.PI / 2;
    textPlane.position.y = sub.height / 2 + 0.005;
    leafGroup.add(textPlane);

    // Initial group placement
    leafGroup.position.set(0, 0.3, 0);
    leafGroup.rotation.x = 0.25;
    scene.add(leafGroup);

    let animId = 0;
    const animate = () => {
      controls.update();

      // Smooth leaf flip animation
      if (leafGroupRef.current) {
        const targetRotY = isFlipped ? Math.PI : 0;
        leafGroupRef.current.rotation.y += (targetRotY - leafGroupRef.current.rotation.y) * 0.08;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    sceneRef.current = { scene, camera, renderer, controls, ambientLight, studioLight, animId };

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      leafGeo.dispose();
      leafMat.dispose();
      borderGeo.dispose();
      borderMat.dispose();
      textTexture.dispose();
      textMat.dispose();
      renderer.dispose();
    };
  }, [manuscript, substrateKey, isDark, hasCordBound]);

  // Update Raking Light Position based on user sliders
  useEffect(() => {
    if (rakingLightRef.current) {
      if (isRakingLight) {
        rakingLightRef.current.intensity = 3.2;
        const radAz = (rakingAzimuth * Math.PI) / 180;
        const radEl = (rakingElevation * Math.PI) / 180;
        const dist = 3.5;
        rakingLightRef.current.position.set(
          dist * Math.cos(radAz) * Math.cos(radEl),
          dist * Math.sin(radEl),
          dist * Math.sin(radAz) * Math.cos(radEl)
        );
      } else {
        rakingLightRef.current.intensity = 0.0;
      }
    }
    if (sceneRef.current) {
      sceneRef.current.ambientLight.intensity = isRakingLight ? 0.25 : 0.65;
      sceneRef.current.studioLight.intensity = isRakingLight ? 0.35 : 1.2;
    }
  }, [isRakingLight, rakingAzimuth, rakingElevation]);

  return (
    <div style={{ position: "relative", width: "100%", height: 500, borderRadius: 12, overflow: "hidden" }}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", cursor: "grab" }}
      />

      {/* 3D Spatial Hotspots UI Overlay */}
      {HOTSPOTS.map((h) => {
        const isSelected = activeHotspot?.id === h.id;
        return (
          <button
            key={h.id}
            onClick={() => setActiveHotspot(isSelected ? null : h)}
            title={h.label}
            style={{
              position: "absolute",
              left: h.pinPos.x,
              top: h.pinPos.y,
              transform: "translate(-50%, -50%)",
              background: isSelected ? "var(--vt-orange)" : "rgba(255, 255, 255, 0.9)",
              color: isSelected ? "#fff" : "var(--vt-orange)",
              border: "2px solid var(--vt-orange)",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              zIndex: 10,
              transition: "all 0.2s ease"
            }}
          >
            <MapPin size={14} />
          </button>
        );
      })}
    </div>
  );
}

export default function Viewer3DPage() {
  const { t, lang } = useLanguage();
  const hi = lang === "hi";

  const [manuscripts, setManuscripts] = useState(MANUSCRIPTS);
  const [activeMs, setActiveMs] = useState(MANUSCRIPTS[0]);
  const [substrate, setSubstrate] = useState("talapatra");

  // RTI Raking Light states
  const [isRakingLight, setIsRakingLight] = useState(false);
  const [rakingAzimuth, setRakingAzimuth] = useState(45);
  const [rakingElevation, setRakingElevation] = useState(20);

  // Kinematics states
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasCordBound, setHasCordBound] = useState(true);

  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let live = true;
    loadManuscripts().then((rows) => {
      if (live && rows && rows.length > 0) {
        setManuscripts(rows);
        setActiveMs(rows[0]);
      }
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const check = () => {
      setIsDark(document.body.classList.contains("dark") || document.documentElement.classList.contains("dark"));
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-container" style={{ maxWidth: 1280, margin: "0 auto", paddingBottom: 60 }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 20 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--vt-orange)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
          <Sparkles size={16} />
          <span>Epigraphic Artifact Simulation</span>
        </div>
        <h2 style={{ fontSize: 30, margin: "4px 0 8px" }}>{t("3D Indic Artifact & Manuscript Studio")}</h2>
        <p style={{ color: "var(--vt-muted)", maxWidth: 800 }}>
          {t("Photorealistic Three.js physical material rendering for palm leaves, birch bark, and copper plates. Features virtual RTI raking light inspection to read incised stylus inscriptions.")}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20, alignItems: "start" }}>
        {/* Left Column: 3D Scene & Inspection Controls */}
        <div>
          <div className="card" style={{ padding: 14 }}>
            {/* Substrate Selector & Flip Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", gap: 6 }}>
                {Object.values(SUBSTRATES).map((s) => (
                  <button
                    key={s.id}
                    className={`btn ${substrate === s.id ? "btn-primary" : "btn-secondary"}`}
                    style={{ fontSize: 12, padding: "6px 12px" }}
                    onClick={() => setSubstrate(s.id)}
                  >
                    {hi ? s.labelHi : s.label}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", gap: 6 }}>
                <button
                  className={`btn ${isFlipped ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: 12, padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <RotateCw size={13} />
                  <span>{isFlipped ? t("Verso (Back)") : t("Recto (Front)")}</span>
                </button>

                <button
                  className={`btn ${!hasCordBound ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: 12, padding: "6px 12px" }}
                  onClick={() => setHasCordBound(!hasCordBound)}
                >
                  {hasCordBound ? t("Untie Sūtra Cord") : t("Tie Sūtra Cord")}
                </button>
              </div>
            </div>

            {/* 3D Canvas */}
            <Manuscript3DCanvas
              manuscript={activeMs}
              substrateKey={substrate}
              isRakingLight={isRakingLight}
              rakingAzimuth={rakingAzimuth}
              rakingElevation={rakingElevation}
              isFlipped={isFlipped}
              hasCordBound={hasCordBound}
              activeHotspot={activeHotspot}
              setActiveHotspot={setActiveHotspot}
              isDark={isDark}
            />

            {/* Virtual RTI (Raking Light) Inspector Toolbar */}
            <div style={{ marginTop: 14, padding: 14, background: "var(--vt-bg)", borderRadius: 8, border: "1px solid var(--vt-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Sun size={16} color="var(--vt-orange)" />
                  <span style={{ fontWeight: 700, fontSize: 13, color: "var(--vt-text)" }}>
                    {t("Virtual RTI / Raking Light Inspector")}
                  </span>
                </div>
                <button
                  className={`btn ${isRakingLight ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: 12, padding: "4px 12px" }}
                  onClick={() => setIsRakingLight(!isRakingLight)}
                >
                  {isRakingLight ? t("RTI Active") : t("Enable Raking Torch")}
                </button>
              </div>

              {isRakingLight && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, paddingTop: 6 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                      <span>Azimuth Angle (Compass)</span>
                      <span>{rakingAzimuth}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rakingAzimuth}
                      onChange={(e) => setRakingAzimuth(parseInt(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--vt-orange)" }}
                    />
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--vt-muted)", marginBottom: 4 }}>
                      <span>Elevation Angle (Grazing Relief)</span>
                      <span>{rakingElevation}°</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="85"
                      value={rakingElevation}
                      onChange={(e) => setRakingElevation(parseInt(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--vt-orange)" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Manuscript Catalogue & Active Hotspot Inspector */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Active Hotspot Drawer */}
          {activeHotspot && (
            <div
              className="card"
              style={{
                padding: 16,
                border: "2px solid var(--vt-orange)",
                background: "rgba(230, 81, 0, 0.05)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--vt-orange)", textTransform: "uppercase" }}>
                  📍 SPATIAL 3D HOTSPOT
                </span>
                <button
                  className="btn btn-secondary"
                  style={{ padding: "2px 8px", fontSize: 11 }}
                  onClick={() => setActiveHotspot(null)}
                >
                  {t("Close")}
                </button>
              </div>
              <h4 style={{ margin: "0 0 6px", fontSize: 16 }}>{activeHotspot.label}</h4>
              <p style={{ margin: 0, fontSize: 13, color: "var(--vt-text-light)", lineHeight: 1.6 }}>
                {activeHotspot.desc}
              </p>
            </div>
          )}

          {/* Active Manuscript Metadata Card */}
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 18 }}>
              {hi ? activeMs.nameHi ?? activeMs.name : activeMs.name}
            </h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
              <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: 4, background: "var(--vt-bg)", border: "1px solid var(--vt-border)" }}>
                {activeMs.script}
              </span>
              <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: 4, background: "var(--vt-bg)", border: "1px solid var(--vt-border)" }}>
                {activeMs.period}
              </span>
            </div>

            <div
              style={{
                padding: 14,
                background: "var(--vt-bg)",
                borderRadius: 8,
                border: "1px solid var(--vt-border)",
                fontSize: 18,
                lineHeight: 1.8,
                fontFamily: "'Noto Sans Devanagari', serif",
                marginBottom: 12
              }}
            >
              {activeMs.transcription}
            </div>

            <div style={{ fontSize: 13, color: "var(--vt-muted)", fontFamily: "serif", marginBottom: 16 }}>
              IAST: {toIAST(activeMs.transcription)}
            </div>

            <button
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}
              onClick={() => speakWithFallback(activeMs.transcription, "sa")}
            >
              <Volume2 size={14} />
              <span>{t("Listen to Traditional Recitation")}</span>
            </button>
          </div>

          {/* Manuscript Corpus Catalogue */}
          <div className="card" style={{ padding: 18 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>{t("Manuscript Collection")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 220, overflowY: "auto" }}>
              {manuscripts.map((ms) => {
                const isSelected = activeMs.id === ms.id;
                return (
                  <div
                    key={ms.id}
                    onClick={() => setActiveMs(ms)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 6,
                      cursor: "pointer",
                      border: isSelected ? "1.5px solid var(--vt-orange)" : "1px solid var(--vt-border)",
                      background: isSelected ? "rgba(230, 81, 0, 0.08)" : "var(--vt-bg)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--vt-text)" }}>
                        {hi ? ms.nameHi ?? ms.name : ms.name}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--vt-muted)" }}>
                        {ms.script} · {ms.period}
                      </div>
                    </div>
                    {isSelected && (
                      <span style={{ fontSize: 11, color: "var(--vt-orange)", fontWeight: 700 }}>
                        {t("Active")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
