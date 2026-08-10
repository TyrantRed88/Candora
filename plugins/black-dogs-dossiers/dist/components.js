// src/operatorDossier.scss
var operatorDossier_default = '.operator-dossier {\r\n  position: relative;\r\n\r\n  display: grid;\r\n  grid-template-columns:\r\n    minmax(145px, 0.72fr)\r\n    minmax(0, 2fr)\r\n    minmax(100px, 0.5fr);\r\n\r\n  gap: 1rem;\r\n\r\n  margin: 0 0 1.6rem;\r\n  padding: 2.15rem 1rem 1rem;\r\n\r\n  background:\r\n    linear-gradient(\r\n      180deg,\r\n      rgba(7, 20, 31, 0.92),\r\n      rgba(3, 11, 18, 0.94)\r\n    );\r\n\r\n  border:\r\n    1px solid var(--bd-border-dim);\r\n\r\n  clip-path: polygon(\r\n    0 12px,\r\n    12px 0,\r\n    calc(100% - 12px) 0,\r\n    100% 12px,\r\n    100% calc(100% - 12px),\r\n    calc(100% - 12px) 100%,\r\n    12px 100%,\r\n    0 calc(100% - 12px)\r\n  );\r\n\r\n  box-shadow:\r\n    inset 0 0 24px\r\n      rgba(0, 17, 30, 0.42);\r\n}\r\n\r\n.operator-dossier::before {\r\n  content: "";\r\n\r\n  position: absolute;\r\n  top: -1px;\r\n  left: 1rem;\r\n\r\n  width: 4rem;\r\n  height: 3px;\r\n\r\n  background:\r\n    repeating-linear-gradient(\r\n      120deg,\r\n      var(--bd-red) 0 7px,\r\n      transparent 7px 11px\r\n    );\r\n}\r\n\r\n.operator-dossier__register {\r\n  position: absolute;\r\n\r\n  top: 0.65rem;\r\n  left: 1rem;\r\n\r\n  font-family:\r\n    "Share Tech Mono",\r\n    monospace;\r\n\r\n  font-size: 0.62rem;\r\n\r\n  color: var(--bd-red);\r\n\r\n  letter-spacing: 0.14em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.operator-dossier__portrait,\r\n.operator-dossier__badge {\r\n  border:\r\n    1px solid var(--bd-border-dim);\r\n\r\n  background:\r\n    rgba(2, 10, 17, 0.78);\r\n\r\n  overflow: hidden;\r\n}\r\n\r\n.operator-dossier__portrait {\r\n  min-height: 220px;\r\n}\r\n\r\n.operator-dossier__portrait img {\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  object-fit: cover;\r\n\r\n  margin: 0 !important;\r\n  padding: 0 !important;\r\n\r\n  border: 0 !important;\r\n  box-shadow: none !important;\r\n\r\n  background: transparent !important;\r\n}\r\n\r\n.operator-dossier__identity {\r\n  min-width: 0;\r\n}\r\n\r\n.operator-dossier__name {\r\n  position: relative;\r\n\r\n  margin-bottom: 1rem;\r\n  padding-bottom: 0.45rem;\r\n\r\n  border-bottom:\r\n    1px solid var(--bd-border-dim);\r\n\r\n  font-family:\r\n    "Rajdhani",\r\n    "Arial Narrow",\r\n    sans-serif;\r\n\r\n  color: var(--bd-text-bright);\r\n\r\n  font-size:\r\n    clamp(1.75rem, 3vw, 2.5rem);\r\n\r\n  line-height: 0.95;\r\n  font-weight: 700;\r\n\r\n  letter-spacing: 0.07em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.operator-dossier__name::after {\r\n  content: "";\r\n\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: -2px;\r\n\r\n  width: 4rem;\r\n  height: 3px;\r\n\r\n  background: var(--bd-red);\r\n}\r\n\r\n.operator-dossier__grid {\r\n  display: grid;\r\n\r\n  grid-template-columns:\r\n    repeat(2, minmax(0, 1fr));\r\n\r\n  gap: 0.55rem 0.75rem;\r\n}\r\n\r\n.operator-dossier__field {\r\n  display: grid;\r\n\r\n  grid-template-columns:\r\n    5.25rem minmax(0, 1fr);\r\n\r\n  min-height: 2rem;\r\n\r\n  background:\r\n    rgba(2, 10, 17, 0.72);\r\n\r\n  border:\r\n    1px solid var(--bd-border-dim);\r\n}\r\n\r\n.operator-dossier__field span,\r\n.operator-dossier__field strong {\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  font-family:\r\n    "Share Tech Mono",\r\n    monospace;\r\n}\r\n\r\n.operator-dossier__field span {\r\n  padding: 0.35rem 0.45rem;\r\n\r\n  color: var(--bd-muted);\r\n\r\n  font-size: 0.58rem;\r\n  letter-spacing: 0.08em;\r\n}\r\n\r\n.operator-dossier__field strong {\r\n  padding: 0.3rem 0.5rem;\r\n\r\n  border-left:\r\n    1px solid var(--bd-border-dim);\r\n\r\n  color: #c7edff;\r\n\r\n  font-size: 0.88rem;\r\n  font-weight: 400;\r\n\r\n  letter-spacing: 0.1em;\r\n  text-transform: uppercase;\r\n\r\n  text-shadow:\r\n    0 0 7px\r\n      rgba(117, 182, 219, 0.18);\r\n}\r\n\r\n.operator-dossier__badge {\r\n  display: flex;\r\n\r\n  align-items: center;\r\n  justify-content: center;\r\n\r\n  min-height: 140px;\r\n  padding: 0.75rem;\r\n}\r\n\r\n.operator-dossier__badge img {\r\n  max-width: 100%;\r\n  max-height: 150px;\r\n\r\n  margin: 0 !important;\r\n  padding: 0 !important;\r\n\r\n  object-fit: contain;\r\n\r\n  border: 0 !important;\r\n  box-shadow: none !important;\r\n\r\n  background: transparent !important;\r\n}\r\n\r\n@media (max-width: 1000px) {\r\n  .operator-dossier {\r\n    grid-template-columns:\r\n      150px minmax(0, 1fr);\r\n  }\r\n\r\n  .operator-dossier__badge {\r\n    grid-column: 1 / -1;\r\n    min-height: auto;\r\n  }\r\n\r\n  .operator-dossier__badge img {\r\n    max-height: 85px;\r\n  }\r\n}\r\n\r\n@media (max-width: 700px) {\r\n  .operator-dossier {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .operator-dossier__portrait {\r\n    min-height: 280px;\r\n  }\r\n\r\n  .operator-dossier__grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}';

// src/OperatorDossier.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
function Field({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { class: "operator-dossier__field", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("strong", { children: value ?? "\u2014" })
  ] });
}
var OperatorDossier = ({
  fileData
}) => {
  const frontmatter = fileData.frontmatter;
  const operator = frontmatter?.operator;
  if (!operator) {
    return null;
  }
  const name = operator.name ?? (typeof frontmatter?.title === "string" ? frontmatter.title : "UNREGISTERED OPERATOR");
  const resolveStatic = (path) => {
    if (!path) return void 0;
    const cleanPath = path.replace(/^\/+/, "").replace(/^static\//, "");
    const slug = fileData.slug ?? "";
    const depth = Math.max(0, slug.split("/").length - 1);
    const root = depth === 0 ? "." : Array(depth).fill("..").join("/");
    return `${root}/static/${cleanPath}`;
  };
  const portrait = resolveStatic(operator.portrait);
  const badge = resolveStatic(operator.badge);
  return /* @__PURE__ */ jsxs("section", { class: "operator-dossier", children: [
    /* @__PURE__ */ jsx("div", { class: "operator-dossier__register", children: "BLACK DOGS PMC // OPERATOR DOSSIER" }),
    /* @__PURE__ */ jsx("div", { class: "operator-dossier__portrait", children: portrait && /* @__PURE__ */ jsx(
      "img",
      {
        src: portrait,
        alt: `${name} portrait`
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { class: "operator-dossier__identity", children: [
      /* @__PURE__ */ jsx("div", { class: "operator-dossier__name", children: name }),
      /* @__PURE__ */ jsxs("div", { class: "operator-dossier__grid", children: [
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "CALLSIGN",
            value: operator.callsign
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "CLASS",
            value: operator.class
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "SPECIES",
            value: operator.species
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "RANK",
            value: operator.rank
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "MECH-ID",
            value: operator.mech
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            label: "STATUS",
            value: operator.status
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { class: "operator-dossier__badge", children: badge && /* @__PURE__ */ jsx(
      "img",
      {
        src: badge,
        alt: `${name} badge`
      }
    ) })
  ] });
};
OperatorDossier.css = operatorDossier_default;
var OperatorDossierConstructor = () => OperatorDossier;
var OperatorDossier_default = OperatorDossierConstructor;
export {
  OperatorDossier_default as OperatorDossier
};
