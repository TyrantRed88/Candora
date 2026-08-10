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


function OperatorField({
  label,
  value,
  slug,
}: {
  label: string
  value?: string
  slug?: string
}) {
  const parsed = parseDossierValue(value)

  if (!parsed) {
    return null
  }

  return (
    <div class="operator-dossier__field">
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

function MechField({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  if (!value) {
    return null
  }

  return (
    <div class="mech-dossier__field">
      <span>{label}</span>
      <strong>{value}</strong>
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

function LocationField({
  label,
  value,
  slug,
}: {
  label: string
  value?: string
  slug?: string
}) {
  const parsed =
    parseDossierValue(value)

  if (!parsed) {
    return null
  }

  return (
    <div class="location-dossier__field">
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

          <OperatorField
            label="CALLSIGN"
            value={operator.callsign}
            slug={slug}
          />

          <OperatorField
            label="CLASS"
            value={operator.class}
            slug={slug}
          />

          <OperatorField
            label="SPECIES"
            value={operator.species}
            slug={slug}
          />

          <OperatorField
            label="RANK"
            value={operator.rank}
            slug={slug}
          />

          <OperatorField
            label="ORGANIZATION"
            value={operator.organization}
            slug={slug}
          />

          <OperatorField
            label="SHIP"
            value={operator.ship}
            slug={slug}
          />

          <OperatorField
            label="MECH-ID"
            value={operator.mech}
            slug={slug}
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

          <MechField
            label="PILOT"
            value={mech.pilot}
          />

          <MechField
            label="CALLSIGN"
            value={mech.pilotCallsign}
          />

          <MechField
            label="AFFILIATION"
            value={mech.affiliation}
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

          <LocationField
            label="TYPE"
            value={location.type}
            slug={slug}
          />

          <LocationField
            label="ROLE"
            value={location.role}
            slug={slug}
          />

          <LocationField
            label="SYSTEM"
            value={location.system}
            slug={slug}
          />

          <LocationField
            label="SECTOR"
            value={location.sector}
            slug={slug}
          />

          <LocationField
            label="AUTHORITY"
            value={location.authority}
            slug={slug}
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
      target: "Characters",
    },
    {
      code: "02",
      title: "Mechs",
      detail: "Combat frames, systems, deployments, and technical records.",
      target: "Mechs",
    },
    {
      code: "03",
      title: "Ships",
      detail: "Naval assets, support craft, and fleet intelligence.",
      target: "Ships",
    },
    {
      code: "04",
      title: "Factions",
      detail: "Governments, corporations, militaries, faiths, and organizations.",
      target: "Factions",
    },
    {
      code: "05",
      title: "Locations",
      detail: "Planets, stations, systems, sectors, and strategic sites.",
      target: "Locations",
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