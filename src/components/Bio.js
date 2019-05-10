import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

function Bio() {
  const tags = {
    color: `#353535`
  }
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
              This Blog belongs to <strong>{author}</strong> who is a Web Developer from Bhubaneswar. I am an Open 
              Source full stack developer who specialises in javascript. The stuff I know includes <span style={tags}>nodejs</span>, 
              <span style={tags}>express</span>, <span style={tags}>Php Symfony</span>, 
              <span style={tags}> ReactJS</span>, <span style={tags}>mongoDb</span> and <span style={tags}>Redis</span>.
              {` `} <br/>
              <a href={`https://github.com/${social.github}`}>
                Hit me up on GitHub
              </a>
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
