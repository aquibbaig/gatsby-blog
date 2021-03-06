import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
            />
            <p>
              This blog belongs to <strong>{author}</strong> who is a Web Developer and Architect at Zairza. Apart from writing code, I like to play soccer,
              listen to music and play video games. I am currently working as a summer intern at the umbrella organisation "FOSSi Foundation" under Google Summer Of Code. 
              {` `}
              <a href={`https://github.com/${social.github}`} target={`blank`}>
                Follow me on Github
              </a>
              <br/>
              <ul>
                <li><a href={`/tech`}>Gear</a></li>
                <li><a href={`/projects`}>Projects</a></li>
              </ul>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          github
        }
      }
    }
  }
`

export default Bio
