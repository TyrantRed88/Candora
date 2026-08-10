import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import style from "../styles/blackDogsMasthead.scss"

const BlackDogsMasthead: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const baseDir = fileData.slug ?? ""

  return (
    <div class="bd-masthead">
      <a class="bd-masthead-home" href={resolveRelative(baseDir, "/")}>
        <img
          class="bd-masthead-logo"
          src="/static/images/black-dogs-logo.png"
          alt="Black Dogs PMC"
        />

        <div class="bd-masthead-copy">
          <div class="bd-masthead-title">
            BLACK DOGS
            <br />
            ARCHIVE
          </div>

          <div class="bd-masthead-rule">
            <span />
          </div>

          <div class="bd-masthead-subtitle">
            PMC // INTELLIGENCE NETWORK
          </div>
        </div>
      </a>
    </div>
  )
}

BlackDogsMasthead.css = style

export default (() => BlackDogsMasthead) satisfies QuartzComponentConstructor