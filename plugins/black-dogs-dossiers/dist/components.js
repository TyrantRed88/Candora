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
function DossierField({
  label,
  value,
  slug,
  fieldClass
}) {
  const parsed = parseDossierValue(value);
  if (!parsed) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { class: fieldClass, children: [
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
          DossierField,
          {
            label: "CALLSIGN",
            value: operator.callsign,
            slug,
            fieldClass: "operator-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "CLASS",
            value: operator.class,
            slug,
            fieldClass: "operator-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "SPECIES",
            value: operator.species,
            slug,
            fieldClass: "operator-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "RANK",
            value: operator.rank,
            slug,
            fieldClass: "operator-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "ORGANIZATION",
            value: operator.organization,
            slug,
            fieldClass: "operator-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "SHIP",
            value: operator.ship,
            slug,
            fieldClass: "operator-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "MECH-ID",
            value: operator.mech,
            slug,
            fieldClass: "operator-dossier__field"
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
          DossierField,
          {
            label: "PILOT",
            value: mech.pilot,
            slug,
            fieldClass: "mech-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "CALLSIGN",
            value: mech.pilotCallsign,
            slug,
            fieldClass: "mech-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "AFFILIATION",
            value: mech.affiliation,
            slug,
            fieldClass: "mech-dossier__field"
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
function renderShip(ship, frontmatter, slug) {
  const name = ship.name ?? (typeof frontmatter.title === "string" ? frontmatter.title : "UNREGISTERED VESSEL");
  const image = resolveStatic(ship.image, slug);
  const hasSpecs = Boolean(
    ship.specs?.length || ship.specs?.crew || ship.specs?.complement || ship.specs?.armament
  );
  return /* @__PURE__ */ jsxs("section", { class: "black-dogs-dossier ship-dossier", children: [
    /* @__PURE__ */ jsx("div", { class: "ship-dossier__register", children: "BLACK DOGS PMC // NAVAL ASSET DOSSIER" }),
    /* @__PURE__ */ jsx("div", { class: "ship-dossier__visual", children: image ? /* @__PURE__ */ jsx(
      "img",
      {
        src: image,
        alt: `${name} vessel record`
      }
    ) : /* @__PURE__ */ jsx("span", { class: "ship-dossier__no-visual", children: "NO VESSEL IMAGE" }) }),
    /* @__PURE__ */ jsxs("div", { class: "ship-dossier__identity", children: [
      /* @__PURE__ */ jsx("div", { class: "ship-dossier__name", children: name }),
      /* @__PURE__ */ jsxs("div", { class: "ship-dossier__grid", children: [
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "CLASS",
            value: ship.class,
            slug,
            fieldClass: "ship-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "TYPE",
            value: ship.type,
            slug,
            fieldClass: "ship-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "ROLE",
            value: ship.role,
            slug,
            fieldClass: "ship-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "REGISTRY",
            value: ship.registry,
            slug,
            fieldClass: "ship-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "MANUFACTURER",
            value: ship.manufacturer,
            slug,
            fieldClass: "ship-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "AFFILIATION",
            value: ship.affiliation,
            slug,
            fieldClass: "ship-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "COMMANDER",
            value: ship.commander,
            slug,
            fieldClass: "ship-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          StatusField,
          {
            value: ship.status,
            fieldClass: "ship-dossier__field"
          }
        )
      ] }),
      hasSpecs && /* @__PURE__ */ jsxs("div", { class: "ship-dossier__specs", children: [
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "LENGTH",
            value: ship.specs?.length,
            slug,
            fieldClass: "ship-dossier__spec-field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "CREW",
            value: ship.specs?.crew,
            slug,
            fieldClass: "ship-dossier__spec-field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "COMPLEMENT",
            value: ship.specs?.complement,
            slug,
            fieldClass: "ship-dossier__spec-field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "ARMAMENT",
            value: ship.specs?.armament,
            slug,
            fieldClass: "ship-dossier__spec-field"
          }
        )
      ] })
    ] })
  ] });
}
function renderFaction(faction, frontmatter, slug) {
  const name = faction.name ?? (typeof frontmatter.title === "string" ? frontmatter.title : "UNREGISTERED FACTION");
  const emblem = resolveStatic(faction.emblem, slug);
  return /* @__PURE__ */ jsxs("section", { class: "black-dogs-dossier faction-dossier", children: [
    /* @__PURE__ */ jsx("div", { class: "faction-dossier__register", children: "BLACK DOGS PMC // FACTION INTELLIGENCE DOSSIER" }),
    /* @__PURE__ */ jsx("div", { class: "faction-dossier__emblem", children: emblem ? /* @__PURE__ */ jsx(
      "img",
      {
        src: emblem,
        alt: `${name} emblem`
      }
    ) : /* @__PURE__ */ jsx("span", { class: "faction-dossier__no-emblem", children: "NO HERALDIC RECORD" }) }),
    /* @__PURE__ */ jsxs("div", { class: "faction-dossier__identity", children: [
      /* @__PURE__ */ jsx("div", { class: "faction-dossier__name", children: name }),
      /* @__PURE__ */ jsxs("div", { class: "faction-dossier__grid", children: [
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "TYPE",
            value: faction.type,
            slug,
            fieldClass: "faction-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "ROLE",
            value: faction.role,
            slug,
            fieldClass: "faction-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "LEADER",
            value: faction.leader,
            slug,
            fieldClass: "faction-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "HEADQUARTERS",
            value: faction.headquarters,
            slug,
            fieldClass: "faction-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "TERRITORY",
            value: faction.territory,
            slug,
            fieldClass: "faction-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "PARENT",
            value: faction.parent,
            slug,
            fieldClass: "faction-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "ALLEGIANCE",
            value: faction.allegiance,
            slug,
            fieldClass: "faction-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          StatusField,
          {
            value: faction.status,
            fieldClass: "faction-dossier__field"
          }
        )
      ] })
    ] })
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
          DossierField,
          {
            label: "TYPE",
            value: location.type,
            slug,
            fieldClass: "location-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "ROLE",
            value: location.role,
            slug,
            fieldClass: "location-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "SYSTEM",
            value: location.system,
            slug,
            fieldClass: "location-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "SECTOR",
            value: location.sector,
            slug,
            fieldClass: "location-dossier__field"
          }
        ),
        /* @__PURE__ */ jsx(
          DossierField,
          {
            label: "AUTHORITY",
            value: location.authority,
            slug,
            fieldClass: "location-dossier__field"
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
      target: "characters"
    },
    {
      code: "02",
      title: "Mechs",
      detail: "Combat frames, systems, deployments, and technical records.",
      target: "mechs"
    },
    {
      code: "03",
      title: "Ships",
      detail: "Naval assets, support craft, and fleet intelligence.",
      target: "ships"
    },
    {
      code: "04",
      title: "Factions",
      detail: "Governments, corporations, militaries, faiths, and organizations.",
      target: "factions"
    },
    {
      code: "05",
      title: "Locations",
      detail: "Planets, stations, systems, sectors, and strategic sites.",
      target: "locations"
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
  const ship = frontmatter.ship;
  if (ship) {
    return renderShip(
      ship,
      frontmatter,
      fileData.slug
    );
  }
  const faction = frontmatter.faction;
  if (faction) {
    return renderFaction(
      faction,
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
