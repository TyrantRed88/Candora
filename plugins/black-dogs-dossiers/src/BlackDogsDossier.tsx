import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../../quartz/components/types"


/* =========================================================
   DATA TYPES
   ========================================================= */

interface OperatorData {
  name?: string
  callsign?: string
  class?: string
  species?: string
  rank?: string

  organization?: string
  ship?: string
  mech?: string

  status?: string
  portrait?: string
  badge?: string
}
interface MechFrameData {
  power?: string
  mobility?: string
  systems?: string
  integrity?: string
}

interface MechData {
  name?: string

  pilot?: string
  pilotCallsign?: string

  role?: string
  class?: string

  affiliation?: string
  status?: string

  image?: string

  frame?: MechFrameData
}

interface ShipSpecsData {
  length?: string
  crew?: string
  complement?: string
  armament?: string
}

interface ShipData {
  name?: string

  class?: string
  type?: string
  role?: string

  registry?: string
  manufacturer?: string

  affiliation?: string
  commander?: string

  status?: string
  image?: string

  specs?: ShipSpecsData
}

interface FactionData {
  name?: string

  type?: string
  role?: string

  leader?: string
  headquarters?: string
  territory?: string

  parent?: string
  allegiance?: string

  status?: string
  emblem?: string
}

interface LocationData {
  name?: string

  type?: string
  role?: string

  system?: string
  sector?: string

  authority?: string
  status?: string

  image?: string
}
interface HomeFeaturedData {
  label?: string
  title?: string
  detail?: string
  target?: string
}

interface HomeData {
  title?: string
  subtitle?: string
  status?: string
  classification?: string
  logo?: string
  featured?: HomeFeaturedData[]
}
/* =========================================================
   SHARED HELPERS
   ========================================================= */
function resolveStatic(
  path: string | undefined,
  slug: string | undefined,
) {
  if (!path) return undefined

  const cleanPath = path
    .replace(/^\/+/, "")
    .replace(/^static\//, "")

  const currentSlug = slug ?? ""

  const depth = Math.max(
    0,
    currentSlug.split("/").length - 1,
  )

  const root =
    depth === 0
      ? "."
      : Array(depth).fill("..").join("/")

  return `${root}/static/${cleanPath}`
}
function resolvePage(
  target: string,
  slug: string | undefined,
) {
  const cleanTarget = target
    .replace(/\.md$/i, "")
    .replace(/^\/+/, "")

  const currentSlug = slug ?? ""

  const depth = Math.max(
    0,
    currentSlug.split("/").length - 1,
  )

  const root =
    depth === 0
      ? "."
      : Array(depth).fill("..").join("/")

  return `${root}/${cleanTarget}`
}


function parseDossierValue(value?: string) {
  if (!value) {
    return undefined
  }
  const match = value.match(
    /^\[\[([^|\]]+)(?:\|([^\]]+))?\]\]$/,
  )

  if (!match) {
    return {
      label: value,
    }
  }

  const target = match[1].trim()

  const label =
    match[2]?.trim() ??
    target.split("/").pop() ??
    target

  return {
    label,
    target,
  }
}


function DossierField({
  label,
  value,
  slug,
  fieldClass,
}: {
  label: string
  value?: string
  slug?: string
  fieldClass: string
}) {
  const parsed = parseDossierValue(value)

  if (!parsed) {
    return null
  }

  return (
    <div class={fieldClass}>
      <span>{label}</span>

      <strong>
        {parsed.target ? (
          <a href={resolvePage(parsed.target, slug)}>
            {parsed.label}
          </a>
        ) : (
          parsed.label
        )}
      </strong>
    </div>
  )
}

function StatusField({
  value,
  fieldClass,
}: {
  value?: string
  fieldClass: string
}) {
  const normalized =
    value?.trim().toLowerCase() ?? "unknown"
  let statusClass = "status-unknown"
  let statusText = "UNKNOWN"

  if (normalized === "active") {
    statusClass = "status-active"
    statusText = "ACTIVE"
  }

  if (normalized === "inactive") {
    statusClass = "status-inactive"
    statusText = "INACTIVE"
  }

  return (
    <div class={`${fieldClass} dossier-field--status`}>
      <span>STATUS</span>

      <strong class={`dossier-status ${statusClass}`}>
        <i aria-hidden="true" />
        {statusText}
      </strong>
    </div>
  )
}


function FrameField({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  return (
    <div class="mech-dossier__frame-field">
      <span>{label}</span>
      <strong>{value ?? "—"}</strong>
    </div>
  )
}
/* =========================================================
   OPERATOR VIEW
   ========================================================= */

function renderOperator(
  operator: OperatorData,
  frontmatter: Record<string, unknown>,
  slug: string | undefined,
) {
  const name =
    operator.name ??
    (typeof frontmatter.title === "string"
      ? frontmatter.title
      : "UNREGISTERED OPERATOR")

  const portrait =
    resolveStatic(operator.portrait, slug)
  const badge =
    resolveStatic(operator.badge, slug)

  return (
    <section class="black-dogs-dossier operator-dossier">

      <div class="operator-dossier__register">
        BLACK DOGS PMC // OPERATOR DOSSIER
      </div>

      <div class="operator-dossier__portrait">
        {portrait && (
          <img
            src={portrait}
            alt={`${name} portrait`}
          />
        )}
      </div>

      <div class="operator-dossier__identity">
        <div class="operator-dossier__name">
          {name}
        </div>

        <div class="operator-dossier__grid">

          <DossierField
            label="CALLSIGN"
            value={operator.callsign}
            slug={slug}
            fieldClass="operator-dossier__field"
          />

          <DossierField
            label="CLASS"
            value={operator.class}
            slug={slug}
            fieldClass="operator-dossier__field"
          />

          <DossierField
            label="SPECIES"
            value={operator.species}
            slug={slug}
            fieldClass="operator-dossier__field"
          />
          <DossierField
            label="RANK"
            value={operator.rank}
            slug={slug}
            fieldClass="operator-dossier__field"
          />

          <DossierField
            label="ORGANIZATION"
            value={operator.organization}
            slug={slug}
            fieldClass="operator-dossier__field"
          />

          <DossierField
            label="SHIP"
            value={operator.ship}
            slug={slug}
            fieldClass="operator-dossier__field"
          />

          <DossierField
            label="MECH-ID"
            value={operator.mech}
            slug={slug}
            fieldClass="operator-dossier__field"
          />
          <StatusField
            value={operator.status}
            fieldClass="operator-dossier__field"
          />

        </div>
      </div>

      <div class="operator-dossier__badge">
        {badge && (
          <img
            src={badge}
            alt={`${name} insignia`}
          />
        )}
      </div>

    </section>
  )
}


/* =========================================================
   MECH VIEW
   ========================================================= */
function renderMech(
  mech: MechData,
  frontmatter: Record<string, unknown>,
  slug: string | undefined,
) {
  const name =
    mech.name ??
    (typeof frontmatter.title === "string"
      ? frontmatter.title
      : "UNREGISTERED FRAME")

  const image =
    resolveStatic(mech.image, slug)

  return (
    <section class="black-dogs-dossier mech-dossier">

      <div class="mech-dossier__register">
        BLACK DOGS PMC // MECH DOSSIER
      </div>

      <div class="mech-dossier__identity">
        <div class="mech-dossier__name">
          {name}
        </div>

        <div class="mech-dossier__grid">

          <DossierField
            label="PILOT"
            value={mech.pilot}
            slug={slug}
            fieldClass="mech-dossier__field"
          />

          <DossierField
            label="CALLSIGN"
            value={mech.pilotCallsign}
            slug={slug}
            fieldClass="mech-dossier__field"
          />

          <DossierField
            label="AFFILIATION"
            value={mech.affiliation}
            slug={slug}
            fieldClass="mech-dossier__field"
          />
          <StatusField
            value={mech.status}
            fieldClass="mech-dossier__field"
          />

        </div>

      </div>

      <div class="mech-dossier__visual">
        {image ? (
          <img
            src={image}
            alt={`${name} combat frame`}
          />
        ) : (
          <span class="mech-dossier__no-visual">
            NO VISUAL RECORD
          </span>
        )}
      </div>

    </section>
  )
}
/* =========================================================
   SHIP VIEW
   ========================================================= */

function renderShip(
  ship: ShipData,
  frontmatter: Record<string, unknown>,
  slug: string | undefined,
) {
  const name =
    ship.name ??
    (typeof frontmatter.title === "string"
      ? frontmatter.title
      : "UNREGISTERED VESSEL")

  const image =
    resolveStatic(ship.image, slug)

  const hasSpecs = Boolean(
    ship.specs?.length ||
    ship.specs?.crew ||
    ship.specs?.complement ||
    ship.specs?.armament,
  )

  return (
    <section class="black-dogs-dossier ship-dossier">

      <div class="ship-dossier__register">
        BLACK DOGS PMC // NAVAL ASSET DOSSIER
      </div>

      <div class="ship-dossier__visual">
        {image ? (
          <img
            src={image}
            alt={`${name} vessel record`}
          />
        ) : (
          <span class="ship-dossier__no-visual">
            NO VESSEL IMAGE
          </span>
        )}
      </div>

      <div class="ship-dossier__identity">

        <div class="ship-dossier__name">
          {name}
        </div>

        <div class="ship-dossier__grid">

          <DossierField
            label="CLASS"
            value={ship.class}
            slug={slug}
            fieldClass="ship-dossier__field"
          />

          <DossierField
            label="TYPE"
            value={ship.type}
            slug={slug}
            fieldClass="ship-dossier__field"
          />

          <DossierField
            label="ROLE"
            value={ship.role}
            slug={slug}
            fieldClass="ship-dossier__field"
          />

          <DossierField
            label="REGISTRY"
            value={ship.registry}
            slug={slug}
            fieldClass="ship-dossier__field"
          />

          <DossierField
            label="MANUFACTURER"
            value={ship.manufacturer}
            slug={slug}
            fieldClass="ship-dossier__field"
          />

          <DossierField
            label="AFFILIATION"
            value={ship.affiliation}
            slug={slug}
            fieldClass="ship-dossier__field"
          />

          <DossierField
            label="COMMANDER"
            value={ship.commander}
            slug={slug}
            fieldClass="ship-dossier__field"
          />

          <StatusField
            value={ship.status}
            fieldClass="ship-dossier__field"
          />

        </div>

        {hasSpecs && (
          <div class="ship-dossier__specs">

            <DossierField
              label="LENGTH"
              value={ship.specs?.length}
              slug={slug}
              fieldClass="ship-dossier__spec-field"
            />

            <DossierField
              label="CREW"
              value={ship.specs?.crew}
              slug={slug}
              fieldClass="ship-dossier__spec-field"
            />

            <DossierField
              label="COMPLEMENT"
              value={ship.specs?.complement}
              slug={slug}
              fieldClass="ship-dossier__spec-field"
            />

            <DossierField
              label="ARMAMENT"
              value={ship.specs?.armament}
              slug={slug}
              fieldClass="ship-dossier__spec-field"
            />

          </div>
        )}

      </div>

    </section>
  )
}

/* =========================================================
   FACTION VIEW
   ========================================================= */

function renderFaction(
  faction: FactionData,
  frontmatter: Record<string, unknown>,
  slug: string | undefined,
) {
  const name =
    faction.name ??
    (typeof frontmatter.title === "string"
      ? frontmatter.title
      : "UNREGISTERED FACTION")

  const emblem =
    resolveStatic(faction.emblem, slug)

  return (
    <section class="black-dogs-dossier faction-dossier">

      <div class="faction-dossier__register">
        BLACK DOGS PMC // FACTION INTELLIGENCE DOSSIER
      </div>

      <div class="faction-dossier__emblem">
        {emblem ? (
          <img
            src={emblem}
            alt={`${name} emblem`}
          />
        ) : (
          <span class="faction-dossier__no-emblem">
            NO HERALDIC RECORD
          </span>
        )}
      </div>

      <div class="faction-dossier__identity">

        <div class="faction-dossier__name">
          {name}
        </div>

        <div class="faction-dossier__grid">

          <DossierField
            label="TYPE"
            value={faction.type}
            slug={slug}
            fieldClass="faction-dossier__field"
          />

          <DossierField
            label="ROLE"
            value={faction.role}
            slug={slug}
            fieldClass="faction-dossier__field"
          />

          <DossierField
            label="LEADER"
            value={faction.leader}
            slug={slug}
            fieldClass="faction-dossier__field"
          />

          <DossierField
            label="HEADQUARTERS"
            value={faction.headquarters}
            slug={slug}
            fieldClass="faction-dossier__field"
          />

          <DossierField
            label="TERRITORY"
            value={faction.territory}
            slug={slug}
            fieldClass="faction-dossier__field"
          />

          <DossierField
            label="PARENT"
            value={faction.parent}
            slug={slug}
            fieldClass="faction-dossier__field"
          />

          <DossierField
            label="ALLEGIANCE"
            value={faction.allegiance}
            slug={slug}
            fieldClass="faction-dossier__field"
          />

          <StatusField
            value={faction.status}
            fieldClass="faction-dossier__field"
          />

        </div>

      </div>

    </section>
  )
}

/* =========================================================
   LOCATION VIEW
   ========================================================= */

function renderLocation(
  location: LocationData,
  frontmatter: Record<string, unknown>,
  slug: string | undefined,
) {
  const name =
    location.name ??
    (typeof frontmatter.title === "string"
      ? frontmatter.title
      : "UNREGISTERED LOCATION")

  const image =
    resolveStatic(location.image, slug)
  return (
    <section class="black-dogs-dossier location-dossier">

      <div class="location-dossier__register">
        BLACK DOGS PMC // LOCATION DOSSIER
      </div>

      <div class="location-dossier__visual">
        {image ? (
          <img
            src={image}
            alt={`${name} survey record`}
          />
        ) : (
          <span class="location-dossier__no-visual">
            NO SURVEY IMAGE
          </span>
        )}
      </div>
      <div class="location-dossier__identity">

        <div class="location-dossier__name">
          {name}
        </div>

        <div class="location-dossier__grid">

          <DossierField
            label="TYPE"
            value={location.type}
            slug={slug}
            fieldClass="location-dossier__field"
          />

          <DossierField
            label="ROLE"
            value={location.role}
            slug={slug}
            fieldClass="location-dossier__field"
          />
          <DossierField
            label="SYSTEM"
            value={location.system}
            slug={slug}
            fieldClass="location-dossier__field"
          />

          <DossierField
            label="SECTOR"
            value={location.sector}
            slug={slug}
            fieldClass="location-dossier__field"
          />

          <DossierField
            label="AUTHORITY"
            value={location.authority}
            slug={slug}
            fieldClass="location-dossier__field"
          />

          <StatusField
            value={location.status}
            fieldClass="location-dossier__field"
          />
        </div>

      </div>

    </section>
  )
}

/* =========================================================
   HOME
   ========================================================= */

   function renderHome(
  home: HomeData,
  frontmatter: Record<string, unknown>,
  slug: string | undefined,
) {
  const title =
    home.title ??
    (typeof frontmatter.title === "string"
      ? frontmatter.title
      : "BLACK DOGS ARCHIVE")

  const logo =
    resolveStatic(home.logo, slug)
  const categories = [
    {
      code: "01",
      title: "Operators",
      detail: "Personnel records, assignments, and field identities.",
      target: "characters",
    },
    {
      code: "02",
      title: "Mechs",
      detail: "Combat frames, systems, deployments, and technical records.",
      target: "mechs",
    },
    {
      code: "03",
      title: "Ships",
      detail: "Naval assets, support craft, and fleet intelligence.",
      target: "ships",
    },
    {
      code: "04",
      title: "Factions",
      detail: "Governments, corporations, militaries, faiths, and organizations.",
      target: "factions",
    },
    {
      code: "05",
      title: "Locations",
      detail: "Planets, stations, systems, sectors, and strategic sites.",
      target: "locations",
    },
  ]
  return (
    <section class="black-dogs-dossier archive-home">

      <header class="archive-home__hero">

        <div class="archive-home__logo">
          {logo && (
            <img
              src={logo}
              alt="Black Dogs PMC"
            />
          )}
        </div>

        <div class="archive-home__identity">

          <div class="archive-home__register">
            BLACK DOGS PMC // ARCHIVAL ACCESS NODE
          </div>
          <h1 class="archive-home__title">
            {title}
          </h1>

          <div class="archive-home__subtitle">
            {home.subtitle}
          </div>

        </div>

        <div class="archive-home__telemetry">

          <div>
            <span>NETWORK</span>

            <strong class="dossier-status status-active">
              <i aria-hidden="true" />
              {home.status ?? "ACTIVE"}
            </strong>
          </div>
          <div>
            <span>ACCESS</span>
            <strong>{home.classification ?? "INTERNAL"}</strong>
          </div>

        </div>

      </header>


      <div class="archive-home__section-label">
        ARCHIVE DIRECTORY
      </div>

      <nav class="archive-home__directory">
        {categories.map((category) => (
          <a
            class="archive-home__category"
            href={resolvePage(category.target, slug)}
          >
            <span class="archive-home__category-code">
              {category.code}
            </span>

            <strong>
              {category.title}
            </strong>

            <p>
              {category.detail}
            </p>
            <span class="archive-home__category-access">
              OPEN RECORDS →
            </span>
          </a>
        ))}

      </nav>


      {home.featured && home.featured.length > 0 && (
        <>
          <div class="archive-home__section-label">
            PRIORITY RECORDS
          </div>

          <div class="archive-home__featured">
            {home.featured.map((record) => (
              <a
                class="archive-home__featured-record"
                href={
                  record.target
                    ? resolvePage(record.target, slug)
                    : "#"
                }
              >
                <span>{record.label}</span>

                <strong>
                  {record.title}
                </strong>
                <small>
                  {record.detail}
                </small>
              </a>
            ))}

          </div>
        </>
      )}

    </section>
  )
}

/* =========================================================
   DOSSIER DISPATCHER
   ========================================================= */

const BlackDogsDossier: QuartzComponent = ({
  fileData,
}: QuartzComponentProps) => {
  const frontmatter =
    fileData.frontmatter as
      | Record<string, unknown>
      | undefined

  if (!frontmatter) {
    return null
  }

  const operator =
    frontmatter.operator as
      | OperatorData
      | undefined

  if (operator) {
    return renderOperator(
      operator,
      frontmatter,
      fileData.slug,
    )
  }

  const mech =
    frontmatter.mech as
      | MechData
      | undefined
  if (mech) {
    return renderMech(
      mech,
      frontmatter,
      fileData.slug,
    )
  }

  const ship =
    frontmatter.ship as
      | ShipData
      | undefined

  if (ship) {
    return renderShip(
      ship,
      frontmatter,
      fileData.slug,
    )
  }

  const faction =
    frontmatter.faction as
      | FactionData
      | undefined

  if (faction) {
    return renderFaction(
      faction,
      frontmatter,
      fileData.slug,
    )
  }

  const location =
  frontmatter.location as
    | LocationData
    | undefined

if (location) {
  return renderLocation(
    location,
    frontmatter,
    fileData.slug,
  )
}

const home =
  frontmatter.home as
    | HomeData
    | undefined

if (home) {
  return renderHome(
    home,
    frontmatter,
    fileData.slug,
  )
}
  return null
}

const BlackDogsDossierConstructor:
  QuartzComponentConstructor = () =>
    BlackDogsDossier

export default BlackDogsDossierConstructor
