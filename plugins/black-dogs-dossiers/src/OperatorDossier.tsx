import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../../quartz/components/types"

import style from "./operatorDossier.scss"

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

function Field({
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

const OperatorDossier: QuartzComponent = ({
  fileData,
}: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter as
    | Record<string, unknown>
    | undefined

  const operator = frontmatter?.operator as
    | OperatorData
    | undefined

  if (!operator) {
    return null
  }

  const name =
    operator.name ??
    (typeof frontmatter?.title === "string"
      ? frontmatter.title
      : "UNREGISTERED OPERATOR")

const resolveStatic = (path?: string) => {
  if (!path) return undefined

  const cleanPath = path
    .replace(/^\/+/, "")
    .replace(/^static\//, "")

  const slug = fileData.slug ?? ""
  const depth = Math.max(0, slug.split("/").length - 1)

  const root = depth === 0
    ? "."
    : Array(depth).fill("..").join("/")

  return `${root}/static/${cleanPath}`
}

const portrait = resolveStatic(operator.portrait)
const badge = resolveStatic(operator.badge)

  return (
    <section class="operator-dossier">
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
          <Field
            label="CALLSIGN"
            value={operator.callsign}
          />

          <Field
            label="CLASS"
            value={operator.class}
          />

          <Field
            label="SPECIES"
            value={operator.species}
          />

          <Field
            label="RANK"
            value={operator.rank}
          />

          <Field
            label="MECH-ID"
            value={operator.mech}
          />

          <Field
            label="STATUS"
            value={operator.status}
          />
        </div>
      </div>

      <div class="operator-dossier__badge">
        {badge && (
          <img
            src={badge}
            alt={`${name} badge`}
          />
        )}
      </div>
    </section>
  )
}

OperatorDossier.css = style

const OperatorDossierConstructor: QuartzComponentConstructor = () =>
  OperatorDossier

export default OperatorDossierConstructor