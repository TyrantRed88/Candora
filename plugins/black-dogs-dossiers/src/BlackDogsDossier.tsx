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


function OperatorField({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  return (
    <div class="operator-dossier__field">
      <span>{label}</span>
      <strong>{value ?? "—"}</strong>
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
          />

          <OperatorField
            label="CLASS"
            value={operator.class}
          />

          <OperatorField
            label="SPECIES"
            value={operator.species}
          />

          <OperatorField
            label="RANK"
            value={operator.rank}
          />

          <OperatorField
            label="MECH-ID"
            value={operator.mech}
          />

          <OperatorField
            label="STATUS"
            value={operator.status}
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
            label="ROLE"
            value={mech.role}
          />

          <MechField
            label="CLASS"
            value={mech.class}
          />

          <MechField
            label="AFFILIATION"
            value={mech.affiliation}
          />

          <MechField
            label="STATUS"
            value={mech.status}
          />

        </div>
      </div>

      <div class="mech-dossier__frame">

        <div class="mech-dossier__frame-title">
          FRAME PROFILE
        </div>

        <FrameField
          label="POWER"
          value={mech.frame?.power}
        />

        <FrameField
          label="MOBILITY"
          value={mech.frame?.mobility}
        />

        <FrameField
          label="SYSTEMS"
          value={mech.frame?.systems}
        />

        <FrameField
          label="INTEGRITY"
          value={mech.frame?.integrity}
        />

      </div>

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

  return null
}


const BlackDogsDossierConstructor:
  QuartzComponentConstructor = () =>
    BlackDogsDossier

export default BlackDogsDossierConstructor