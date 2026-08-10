// src/BlackDogsDossier.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
function resolveStatic(path, slug) {
  if (!path) return void 0;
  const cleanPath = path.replace(/^\/+/, "").replace(/^static\//, "");
  const currentSlug = slug ?? "";
  const depth = Math.max(
    0,
    currentSlug.split("/").length - 1
  );
  const root = depth === 0 ? "." : Array(depth).fill("..").join("/");
  return `${root}/static/${cleanPath}`;
}
function OperatorField({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { class: "operator-dossier__field", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("strong", { children: value ?? "\u2014" })
  ] });
}
function MechField({
  label,
  value
}) {
  if (!value) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { class: "mech-dossier__field", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("strong", { children: value })
  ] });
}
function FrameField({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { class: "mech-dossier__frame-field", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("strong", { children: value ?? "\u2014" })
  ] });
}
function renderOperator(operator, frontmatter, slug) {
  const name = operator.name ?? (typeof frontmatter.title === "string" ? frontmatter.title : "UNREGISTERED OPERATOR");
  const portrait = resolveStatic(operator.portrait, slug);
  const badge = resolveStatic(operator.badge, slug);
  return /* @__PURE__ */ jsxs("section", { class: "black-dogs-dossier operator-dossier", children: [
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
          OperatorField,
          {
            label: "CALLSIGN",
            value: operator.callsign
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "CLASS",
            value: operator.class
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "SPECIES",
            value: operator.species
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "RANK",
            value: operator.rank
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "MECH-ID",
            value: operator.mech
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
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
        alt: `${name} insignia`
      }
    ) })
  ] });
}
function renderMech(mech, frontmatter, slug) {
  const name = mech.name ?? (typeof frontmatter.title === "string" ? frontmatter.title : "UNREGISTERED FRAME");
  const image = resolveStatic(mech.image, slug);
  return /* @__PURE__ */ jsxs("section", { class: "black-dogs-dossier mech-dossier", children: [
    /* @__PURE__ */ jsx("div", { class: "mech-dossier__register", children: "BLACK DOGS PMC // MECH DOSSIER" }),
    /* @__PURE__ */ jsx("div", { class: "mech-dossier__visual", children: image ? /* @__PURE__ */ jsx(
      "img",
      {
        src: image,
        alt: `${name} combat frame`
      }
    ) : /* @__PURE__ */ jsx("span", { class: "mech-dossier__no-visual", children: "NO VISUAL RECORD" }) }),
    /* @__PURE__ */ jsxs("div", { class: "mech-dossier__identity", children: [
      /* @__PURE__ */ jsx("div", { class: "mech-dossier__name", children: name }),
      /* @__PURE__ */ jsxs("div", { class: "mech-dossier__grid", children: [
        /* @__PURE__ */ jsx(
          MechField,
          {
            label: "PILOT",
            value: mech.pilot
          }
        ),
        /* @__PURE__ */ jsx(
          MechField,
          {
            label: "CALLSIGN",
            value: mech.pilotCallsign
          }
        ),
        /* @__PURE__ */ jsx(
          MechField,
          {
            label: "ROLE",
            value: mech.role
          }
        ),
        /* @__PURE__ */ jsx(
          MechField,
          {
            label: "CLASS",
            value: mech.class
          }
        ),
        /* @__PURE__ */ jsx(
          MechField,
          {
            label: "AFFILIATION",
            value: mech.affiliation
          }
        ),
        /* @__PURE__ */ jsx(
          MechField,
          {
            label: "STATUS",
            value: mech.status
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { class: "mech-dossier__frame", children: [
      /* @__PURE__ */ jsx("div", { class: "mech-dossier__frame-title", children: "FRAME PROFILE" }),
      /* @__PURE__ */ jsx(
        FrameField,
        {
          label: "POWER",
          value: mech.frame?.power
        }
      ),
      /* @__PURE__ */ jsx(
        FrameField,
        {
          label: "MOBILITY",
          value: mech.frame?.mobility
        }
      ),
      /* @__PURE__ */ jsx(
        FrameField,
        {
          label: "SYSTEMS",
          value: mech.frame?.systems
        }
      ),
      /* @__PURE__ */ jsx(
        FrameField,
        {
          label: "INTEGRITY",
          value: mech.frame?.integrity
        }
      )
    ] })
  ] });
}
var BlackDogsDossier = ({
  fileData
}) => {
  const frontmatter = fileData.frontmatter;
  if (!frontmatter) {
    return null;
  }
  const operator = frontmatter.operator;
  if (operator) {
    return renderOperator(
      operator,
      frontmatter,
      fileData.slug
    );
  }
  const mech = frontmatter.mech;
  if (mech) {
    return renderMech(
      mech,
      frontmatter,
      fileData.slug
    );
  }
  return null;
};
var BlackDogsDossierConstructor = () => BlackDogsDossier;
var BlackDogsDossier_default = BlackDogsDossierConstructor;
export {
  BlackDogsDossier_default as BlackDogsDossier
};
