import React from "react"
import { Link } from "gatsby"
import {
  Icon,
  icons,
  SPACING,
  MEDIA_QUERIES,
  COLORS,
  LINK_STYLES,
} from "@umich-lib/core"
import {
  Expandable,
  ExpandableChildren,
  ExpandableButton,
} from "@umich-lib/core"

const visuallyHiddenCSS = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: "1px",
}

export default function Metadata({ data, kind }) {
  const isCondensed = kind === "condensed"
  const metadataCSS = !isCondensed
    ? {
        [MEDIA_QUERIES.LARGESCREEN]: {
          display: "grid",
          gridTemplateColumns: "9rem 1fr",
          gridColumnGap: SPACING["S"],
          "dt:not(:first-of-type) + dd": {
            paddingTop: SPACING["XS"],
          },
        },
      }
    : {
        dt: {
          ...visuallyHiddenCSS,
        },
        "dt:not(:first-of-type) + dd": {
          paddingTop: SPACING["XS"],
        },
      }

  // Only show expandable if more than 5.
  function expandable(desc) {
    if (desc.length <= 5) {
      return {
        show: desc.length,
        expandable: false,
      }
    }

    return {
      show: 4,
      expandable: true,
    }
  }

  return (
    <dl
      css={{
        ...metadataCSS,
        "dt:not(:first-of-type)": {
          paddingTop: SPACING["XS"],
        },
      }}
    >
      {data.map((d, i) => (
        <Expandable key={"expandable-metadata-dt-dd-" + i}>
          <dt
            css={{
              gridColumnStart: "1",
              color: COLORS.neutral["300"],
            }}
          >
            {d.term}
          </dt>
          <ExpandableChildren show={expandable(d.description).show}>
            {d.description.map(d => (
              <dd
                css={{
                  gridColumnStart: "2",
                  display: "flex",
                  alignItems: "top",
                }}
              >
                <Description data={d} />
              </dd>
            ))}
          </ExpandableChildren>

          {expandable(d.description).expandable && (
            <dd
              css={{
                gridColumnStart: "2",
                display: "flex",
                alignItems: "top",
              }}
            >
              <ExpandableButton
                name={d.term}
                count={d.description.length}
                kind="subtle"
                small
                css={{
                  marginTop: SPACING["XS"],
                }}
              />
            </dd>
          )}
        </Expandable>
      ))}
    </dl>
  )
}

function Description({ data }) {
  if (Array.isArray(data)) {
    return (
      <ol
        css={{
          margin: "0",
          padding: "0",
        }}
      >
        {data.map((d, i) => (
          <li
            css={{
              display: "inline-block",
            }}
          >
            {i > 0 && (
              <span
                css={{
                  color: COLORS.neutral["300"],
                }}
              >
                <Icon d={icons["navigate_next"]} />
              </span>
            )}
            <Description data={d} />
          </li>
        ))}
      </ol>
    )
  }

  const { icon, text, image } = data

  return (
    <DescriptionItem {...data}>
      {icon && (
        <span
          css={{
            marginRight: SPACING["2XS"],
            color: COLORS.neutral["300"],
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon icon={icon} size={16} />
        </span>
      )}

      {image ? (
        <div>
          <span
            css={{
              display: "block",
            }}
          >
            {text}
          </span>
          <img
            src={image}
            alt=""
            css={{
              maxWidth: "16rem",
              width: "100%",
              paddingTop: SPACING["XS"],
            }}
          />
        </div>
      ) : (
        <>{text}</>
      )}
    </DescriptionItem>
  )
}

function DescriptionItem({ href, search, children }) {
  if (href || search) {
    return (
      <DescriptionItemLink href={href} search={search}>
        {children}
      </DescriptionItemLink>
    )
  }

  return children
}

function DescriptionItemLink({ href, search, children }) {
  if (href) {
    return (
      <a css={LINK_STYLES["subtle"]} href={href}>
        {children}
      </a>
    )
  }

  return <SearchLink search={search}>{children}</SearchLink>
}

function SearchLink({ children, search }) {
  const to = "/search-link"

  return (
    <Link
      css={{
        textDecoration: "underline",
        ":hover": {
          textDecorationThickness: "2px",
        },
      }}
      to={to}
    >
      {children}
    </Link>
  )
}
