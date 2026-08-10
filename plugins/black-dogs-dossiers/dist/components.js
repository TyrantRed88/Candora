// src/BlackDogsDossier.tsx
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
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
function resolvePage(target, slug) {
  const cleanTarget = target.replace(/\.md$/i, "").replace(/^\/+/, "");
  const currentSlug = slug ?? "";
  const depth = Math.max(
    0,
    currentSlug.split("/").length - 1
  );
  const root = depth === 0 ? "." : Array(depth).fill("..").join("/");
  return `${root}/${cleanTarget}`;
}
function parseDossierValue(value) {
  if (!value) {
    return void 0;
  }
  const match = value.match(
    /^\[\[([^|\]]+)(?:\|([^\]]+))?\]\]$/
  );
  if (!match) {
    return {
      label: value
    };
  }
  const target = match[1].trim();
  const label = match[2]?.trim() ?? target.split("/").pop() ?? target;
  return {
    label,
    target
  };
}
function OperatorField({
  label,
  value,
  slug
}) {
  const parsed = parseDossierValue(value);
  if (!parsed) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { class: "operator-dossier__field", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("strong", { children: parsed.target ? /* @__PURE__ */ jsx("a", { href: resolvePage(parsed.target, slug), children: parsed.label }) : parsed.label })
  ] });
}
function StatusField({
  value,
  fieldClass
}) {
  const normalized = value?.trim().toLowerCase() ?? "unknown";
  let statusClass = "status-unknown";
  let statusText = "UNKNOWN";
  if (normalized === "active") {
    statusClass = "status-active";
    statusText = "ACTIVE";
  }
  if (normalized === "inactive") {
    statusClass = "status-inactive";
    statusText = "INACTIVE";
  }
  return /* @__PURE__ */ jsxs("div", { class: `${fieldClass} dossier-field--status`, children: [
    /* @__PURE__ */ jsx("span", { children: "STATUS" }),
    /* @__PURE__ */ jsxs("strong", { class: `dossier-status ${statusClass}`, children: [
      /* @__PURE__ */ jsx("i", { "aria-hidden": "true" }),
      statusText
    ] })
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
function LocationField({
  label,
  value,
  slug
}) {
  const parsed = parseDossierValue(value);
  if (!parsed) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { class: "location-dossier__field", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("strong", { children: parsed.target ? /* @__PURE__ */ jsx("a", { href: resolvePage(parsed.target, slug), children: parsed.label }) : parsed.label })
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
            value: operator.callsign,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "CLASS",
            value: operator.class,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "SPECIES",
            value: operator.species,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "RANK",
            value: operator.rank,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "ORGANIZATION",
            value: operator.organization,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "SHIP",
            value: operator.ship,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          OperatorField,
          {
            label: "MECH-ID",
            value: operator.mech,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          StatusField,
          {
            value: operator.status,
            fieldClass: "operator-dossier__field"
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
            label: "AFFILIATION",
            value: mech.affiliation
          }
        ),
        /* @__PURE__ */ jsx(
          StatusField,
          {
            value: mech.status,
            fieldClass: "mech-dossier__field"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { class: "mech-dossier__visual", children: image ? /* @__PURE__ */ jsx(
      "img",
      {
        src: image,
        alt: `${name} combat frame`
      }
    ) : /* @__PURE__ */ jsx("span", { class: "mech-dossier__no-visual", children: "NO VISUAL RECORD" }) })
  ] });
}
function renderLocation(location, frontmatter, slug) {
  const name = location.name ?? (typeof frontmatter.title === "string" ? frontmatter.title : "UNREGISTERED LOCATION");
  const image = resolveStatic(location.image, slug);
  return /* @__PURE__ */ jsxs("section", { class: "black-dogs-dossier location-dossier", children: [
    /* @__PURE__ */ jsx("div", { class: "location-dossier__register", children: "BLACK DOGS PMC // LOCATION DOSSIER" }),
    /* @__PURE__ */ jsx("div", { class: "location-dossier__visual", children: image ? /* @__PURE__ */ jsx(
      "img",
      {
        src: image,
        alt: `${name} survey record`
      }
    ) : /* @__PURE__ */ jsx("span", { class: "location-dossier__no-visual", children: "NO SURVEY IMAGE" }) }),
    /* @__PURE__ */ jsxs("div", { class: "location-dossier__identity", children: [
      /* @__PURE__ */ jsx("div", { class: "location-dossier__name", children: name }),
      /* @__PURE__ */ jsxs("div", { class: "location-dossier__grid", children: [
        /* @__PURE__ */ jsx(
          LocationField,
          {
            label: "TYPE",
            value: location.type,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          LocationField,
          {
            label: "ROLE",
            value: location.role,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          LocationField,
          {
            label: "SYSTEM",
            value: location.system,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          LocationField,
          {
            label: "SECTOR",
            value: location.sector,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          LocationField,
          {
            label: "AUTHORITY",
            value: location.authority,
            slug
          }
        ),
        /* @__PURE__ */ jsx(
          StatusField,
          {
            value: location.status,
            fieldClass: "location-dossier__field"
          }
        )
      ] })
    ] })
  ] });
}
function renderHome(home, frontmatter, slug) {
  const title = home.title ?? (typeof frontmatter.title === "string" ? frontmatter.title : "BLACK DOGS ARCHIVE");
  const logo = resolveStatic(home.logo, slug);
  const categories = [
    {
      code: "01",
      title: "Operators",
      detail: "Personnel records, assignments, and field identities.",
      target: "Characters"
    },
    {
      code: "02",
      title: "Mechs",
      detail: "Combat frames, systems, deployments, and technical records.",
      target: "Mechs"
    },
    {
      code: "03",
      title: "Ships",
      detail: "Naval assets, support craft, and fleet intelligence.",
      target: "Ships"
    },
    {
      code: "04",
      title: "Factions",
      detail: "Governments, corporations, militaries, faiths, and organizations.",
      target: "Factions"
    },
    {
      code: "05",
      title: "Locations",
      detail: "Planets, stations, systems, sectors, and strategic sites.",
      target: "Locations"
    }
  ];
  return /* @__PURE__ */ jsxs("section", { class: "black-dogs-dossier archive-home", children: [
    /* @__PURE__ */ jsxs("header", { class: "archive-home__hero", children: [
      /* @__PURE__ */ jsx("div", { class: "archive-home__logo", children: logo && /* @__PURE__ */ jsx(
        "img",
        {
          src: logo,
          alt: "Black Dogs PMC"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { class: "archive-home__identity", children: [
        /* @__PURE__ */ jsx("div", { class: "archive-home__register", children: "BLACK DOGS PMC // ARCHIVAL ACCESS NODE" }),
        /* @__PURE__ */ jsx("h1", { class: "archive-home__title", children: title }),
        /* @__PURE__ */ jsx("div", { class: "archive-home__subtitle", children: home.subtitle })
      ] }),
      /* @__PURE__ */ jsxs("div", { class: "archive-home__telemetry", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { children: "NETWORK" }),
          /* @__PURE__ */ jsxs("strong", { class: "dossier-status status-active", children: [
            /* @__PURE__ */ jsx("i", { "aria-hidden": "true" }),
            home.status ?? "ACTIVE"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { children: "ACCESS" }),
          /* @__PURE__ */ jsx("strong", { children: home.classification ?? "INTERNAL" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { class: "archive-home__section-label", children: "ARCHIVE DIRECTORY" }),
    /* @__PURE__ */ jsx("nav", { class: "archive-home__directory", children: categories.map((category) => /* @__PURE__ */ jsxs(
      "a",
      {
        class: "archive-home__category",
        href: resolvePage(category.target, slug),
        children: [
          /* @__PURE__ */ jsx("span", { class: "archive-home__category-code", children: category.code }),
          /* @__PURE__ */ jsx("strong", { children: category.title }),
          /* @__PURE__ */ jsx("p", { children: category.detail }),
          /* @__PURE__ */ jsx("span", { class: "archive-home__category-access", children: "OPEN RECORDS \u2192" })
        ]
      }
    )) }),
    home.featured && home.featured.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { class: "archive-home__section-label", children: "PRIORITY RECORDS" }),
      /* @__PURE__ */ jsx("div", { class: "archive-home__featured", children: home.featured.map((record) => /* @__PURE__ */ jsxs(
        "a",
        {
          class: "archive-home__featured-record",
          href: record.target ? resolvePage(record.target, slug) : "#",
          children: [
            /* @__PURE__ */ jsx("span", { children: record.label }),
            /* @__PURE__ */ jsx("strong", { children: record.title }),
            /* @__PURE__ */ jsx("small", { children: record.detail })
          ]
        }
      )) })
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
  const location = frontmatter.location;
  if (location) {
    return renderLocation(
      location,
      frontmatter,
      fileData.slug
    );
  }
  const home = frontmatter.home;
  if (home) {
    return renderHome(
      home,
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
